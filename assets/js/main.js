/* Lion Force Investment Company , shared site behavior */
(function () {
  "use strict";

  /* ---------- gallery: auto-discover photos/videos ----------
     Nothing about the gallery is hardcoded , not the count, not a file
     list. A static site can't ask the server "what's in this folder?"
     (there's no directory listing), so instead we probe the numbered
     sequence: gallery-photo-01, -02, -03 ... with a cheap HEAD request
     each, and stop once we hit a run of misses. Drop a correctly-named
     file into the folder and it appears on the next page load , no code
     change needed.

     Keep the numbering contiguous (01, 02, 03 ...). One missing number is
     tolerated, but two in a row is read as "end of the sequence" , that's
     what stops the probing. The misses show up as 404s in the browser
     console: that's expected and harmless, it's simply how the end of the
     run gets detected without a server. */
  // Assigned further down, once their DOM prerequisites are known to exist.
  // Declared here so the async discovery callback below can call them.
  var initVideoCards = function () {};
  var initPhotoLightbox = function () {};

  var GALLERY_MAX = 99;        // two-digit sequence, per the naming scheme
  var GALLERY_GAP_TOLERANCE = 2;
  var GALLERY_BATCH = 4;       // probe a few at once so discovery stays fast

  function padTwo(n) { return (n < 10 ? "0" : "") + n; }

  // fetch() refuses file:// URLs, so opening the page straight off disk
  // (double-clicking the .html) has to probe a different way: let an
  // <img>/<video> element try to load the URL and watch which event fires.
  // Served over http(s) we use a HEAD request instead , no body downloaded.
  var CAN_FETCH_PROBE = location.protocol === "http:" || location.protocol === "https:";

  function probeViaElement(url, isVideo) {
    return new Promise(function (resolve) {
      var el;
      var done = function (ok) {
        if (!el) return;
        el.onload = el.onerror = null;
        if (isVideo) {
          el.onloadedmetadata = null;
          el.removeAttribute("src");
          el.load && el.load();
        }
        el = null;
        resolve(ok ? url : null);
      };
      if (isVideo) {
        el = document.createElement("video");
        el.preload = "metadata";           // header only, not the whole clip
        el.onloadedmetadata = function () { done(true); };
        el.onerror = function () { done(false); };
      } else {
        el = new Image();
        el.onload = function () { done(true); };
        el.onerror = function () { done(false); };
      }
      el.src = url;
    });
  }

  function probeExists(url, isVideo) {
    if (!CAN_FETCH_PROBE) return probeViaElement(url, isVideo);
    return fetch(url, { method: "HEAD" })
      .then(function (res) {
        if (!res.ok) return null;
        /* A 200 is NOT proof the file exists. Cloudflare Pages (and most
           static hosts) answer a missing asset by serving their 404 page
           with status 200 and Content-Type: text/html. Trusting the status
           alone made every probe look like a hit, so the grid ran to the
           full 99. Confirm the response is actually the media we asked for. */
        var type = (res.headers.get("content-type") || "").toLowerCase();
        if (!type) return url;                      // no header to judge by, trust the 200
        if (type.indexOf("text/html") === 0) return null;   // the host's fallback page
        return type.indexOf(isVideo ? "video/" : "image/") === 0 ? url : null;
      })
      .catch(function () { return null; });
  }

  // Resolves to the list of files that actually exist, in order.
  function discoverSequence(dir, prefix, extensions, isVideo) {
    return new Promise(function (resolve) {
      var found = [];
      var next = 1;
      var consecutiveMisses = 0;

      function probeIndex(n) {
        // Check the expected extension on its own first , that's the normal
        // case and costs a single request with no 404 noise. Only if it
        // misses do we try the alternates, and those go out together so a
        // gap costs two round-trips rather than one per extension.
        var base = dir + prefix + padTwo(n);
        return probeExists(base + extensions[0], isVideo).then(function (hit) {
          if (hit) return hit;
          var rest = extensions.slice(1);
          if (!rest.length) return null;
          return Promise.all(
            rest.map(function (ext) { return probeExists(base + ext, isVideo); })
          ).then(function (hits) {
            for (var i = 0; i < hits.length; i++) {
              if (hits[i]) return hits[i];
            }
            return null;
          });
        });
      }

      function runBatch() {
        if (next > GALLERY_MAX || consecutiveMisses >= GALLERY_GAP_TOLERANCE) {
          return resolve(found);
        }
        var batch = [];
        for (var i = 0; i < GALLERY_BATCH && next + i <= GALLERY_MAX; i++) {
          batch.push(probeIndex(next + i));
        }
        next += batch.length;
        Promise.all(batch).then(function (results) {
          results.forEach(function (url) {
            if (url) { found.push(url); consecutiveMisses = 0; }
            else { consecutiveMisses++; }
          });
          runBatch();
        });
      }
      runBatch();
    });
  }

  function galleryCardMenuHTML(src, filename) {
    return (
      '<div class="gallery-card-menu">' +
        '<button type="button" class="gallery-card-menu-toggle" aria-haspopup="true" aria-expanded="false" aria-label="More options" data-i18n-aria-label="gallery.moreOptionsAria">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>' +
        '</button>' +
        '<div class="gallery-card-menu-panel" role="menu">' +
          '<button type="button" class="gallery-card-menu-item" role="menuitem" data-action="download" data-src="' + src + '" data-filename="' + filename + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>' +
            '<span data-i18n="gallery.download">Download</span>' +
          '</button>' +
          '<button type="button" class="gallery-card-menu-item" role="menuitem" data-action="share" data-src="' + src + '" data-filename="' + filename + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="2.4"/><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="19" r="2.4"/><path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4"/></svg>' +
            '<span data-i18n="gallery.share">Share</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  var photoGrid = document.getElementById("photoGrid");
  var videoGrid = document.getElementById("videoGrid");
  var projectGrid = document.getElementById("projectGrid");

  function renderPhotoCards(urls) {
    urls.forEach(function (src, i) {
      var file = src.split("/").pop();
      var wrap = document.createElement("figure");
      // is-loading keeps the shimmer on the card itself until this
      // particular photo has actually decoded, so the card is never a
      // blank hole while the image is still coming down.
      wrap.className = "gallery-photo-card-wrap reveal is-loading";
      wrap.innerHTML =
        '<button type="button" class="gallery-photo-card" data-lightbox-index="' + i + '">' +
          '<img src="' + src + '" alt="Lion Force Investment Company gallery photo ' + (i + 1) + '" loading="lazy">' +
        '</button>' +
        galleryCardMenuHTML(src, file);
      var img = wrap.querySelector("img");
      var settle = function () { wrap.classList.remove("is-loading"); };
      if (img.complete && img.naturalWidth) settle();
      else {
        img.addEventListener("load", settle, { once: true });
        img.addEventListener("error", settle, { once: true });
      }
      photoGrid.appendChild(wrap);
    });
  }

  /* ---------- loading skeletons ----------
     Discovery is a round-trip per file, so on a slow connection the grids
     would sit visibly empty and read as "there's nothing here". Drop in
     shimmer placeholders straight away, then swap them for the real cards
     once discovery resolves. */
  var SKELETON_COUNT = 8;

  function showSkeletons(grid, kind) {
    if (!grid) return;
    var html = "";
    for (var i = 0; i < SKELETON_COUNT; i++) {
      html += '<div class="skeleton-card skeleton-card--' + kind + '" aria-hidden="true"></div>';
    }
    grid.innerHTML = html;
    grid.setAttribute("aria-busy", "true");
  }

  function clearSkeletons(grid) {
    if (!grid) return;
    grid.querySelectorAll(".skeleton-card").forEach(function (el) { el.remove(); });
    grid.setAttribute("aria-busy", "false");
  }

  // The actual href is filled in by i18n.js from a translated template, so
  // the prefilled WhatsApp message follows the visitor's chosen language.
  function whatsappEnquiryHTML(itemLabel) {
    return (
      '<a class="wa-enquire" target="_blank" rel="noopener"' +
        ' data-i18n-wa="projects.enquireMessage" data-wa-item="' + itemLabel + '"' +
        ' aria-label="Enquire about this property on WhatsApp" data-i18n-aria-label="projects.enquireAria">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.37 0-7.93 3.56-7.93 7.94 0 1.4.37 2.77 1.06 3.97L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01c4.37 0 7.93-3.56 7.93-7.94 0-2.12-.83-4.11-2.34-5.61l-.05-.03zM12.05 18.53h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.58 6.58 0 0 1-1.01-3.5c0-3.63 2.96-6.6 6.61-6.6 1.76 0 3.42.69 4.67 1.94a6.55 6.55 0 0 1 1.93 4.67c0 3.64-2.96 6.6-6.6 6.6zm3.6-4.95c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.31.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33-.11 0-.24-.02-.37-.02-.13 0-.34.05-.52.25-.18.2-.68.66-.68 1.62 0 .96.7 1.88.8 2.01.1.13 1.37 2.1 3.32 2.94.46.2.83.32 1.11.41.47.15.89.13 1.23.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.85.11-.94-.05-.09-.18-.14-.38-.24z"/></svg>' +
        '<span data-i18n="projects.enquireBtn">Enquire on WhatsApp</span>' +
      '</a>'
    );
  }

  function renderVideoCards(urls, grid, labelKey, withEnquiry) {
    urls.forEach(function (src, i) {
      var file = src.split("/").pop();
      var label = padTwo(i + 1);
      var wrap = document.createElement("div");
      wrap.className = "video-card-wrap reveal";
      wrap.innerHTML =
        '<button type="button" class="video-card" aria-haspopup="dialog" aria-label="Play video ' + (i + 1) + '" data-i18n-aria-label="gallery.videoAria">' +
          '<video class="video-card-preview" data-src="' + src + '" muted loop playsinline preload="none"></video>' +
          '<span class="video-card-scrim"></span>' +
          '<span class="video-card-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>' +
          '<span class="video-card-caption"><strong><span data-i18n="' + labelKey + '">Video</span> ' + label + '</strong><span data-i18n="gallery.videoSub">Tap to play</span></span>' +
        '</button>' +
        galleryCardMenuHTML(src, file) +
        (withEnquiry ? whatsappEnquiryHTML(label) : "");
      grid.appendChild(wrap);
    });
  }

  // Discovery is async, so the features that operate on these cards
  // (scroll-reveal, lightbox, video modal) are (re)initialised once the
  // cards are in the DOM. Those initialisers are written to be safe to
  // call twice , they skip anything they've already wired up.
  if (photoGrid || videoGrid || projectGrid) {
    // paint placeholders before the first probe goes out
    showSkeletons(photoGrid, "photo");
    showSkeletons(videoGrid, "video");
    showSkeletons(projectGrid, "project");

    Promise.all([
      photoGrid
        ? discoverSequence("assets/gallery/images/", "gallery-photo-", [".jpg", ".jpeg", ".png", ".webp"], false)
        : Promise.resolve([]),
      videoGrid
        ? discoverSequence("assets/gallery/videos/", "gallery-video-", [".mp4", ".webm", ".mov"], true)
        : Promise.resolve([]),
      projectGrid
        ? discoverSequence("assets/gallery/existing-properties/", "project-video-", [".mp4", ".webm", ".mov"], true)
        : Promise.resolve([]),
    ]).then(function (results) {
      clearSkeletons(photoGrid);
      clearSkeletons(videoGrid);
      clearSkeletons(projectGrid);
      if (photoGrid) renderPhotoCards(results[0]);
      if (videoGrid) renderVideoCards(results[1], videoGrid, "gallery.videoWord", false);
      if (projectGrid) renderVideoCards(results[2], projectGrid, "projects.propertyWord", true);
      if (window.LFIC_I18N) window.LFIC_I18N.setLang(window.LFIC_I18N.getLang());
      initScrollReveal();
      initVideoCards();
      initPhotoLightbox();
    });
  }

  /* ---------- gallery card "more options" menu (download / share) ----------
     Pure client-side , no backend. Download uses a plain <a download>,
     which the browser handles natively for same-origin files. Share tries
     the native OS share sheet (with the actual file, where supported),
     falling back to sharing a link, and finally to copying the link. */
  function showGalleryToast(message) {
    var toast = document.createElement("div");
    toast.className = "gallery-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add("is-visible"); });
    setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () { toast.remove(); }, 300);
    }, 2200);
  }

  function downloadGalleryItem(src, filename) {
    var a = document.createElement("a");
    a.href = src;
    a.download = filename || "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function shareGalleryItem(src, filename) {
    var absoluteUrl = new URL(src, window.location.href).href;
    var i18n = window.LFIC_I18N;
    var tt = function (key, fallback) { return i18n ? i18n.t(key) : fallback; };
    var shareData = { title: "Lion Force Investment Company", text: "Lion Force Investment Company , " + filename, url: absoluteUrl };

    function fallbackShare() {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(absoluteUrl).then(function () {
          showGalleryToast(tt("gallery.linkCopied", "Link copied!"));
        }).catch(function () {
          window.prompt("Copy this link:", absoluteUrl);
        });
      } else {
        window.prompt("Copy this link:", absoluteUrl);
      }
    }

    if (navigator.canShare) {
      fetch(src)
        .then(function (res) { return res.blob(); })
        .then(function (blob) {
          var file = new File([blob], filename, { type: blob.type });
          if (navigator.canShare({ files: [file] })) {
            return navigator.share({ files: [file], title: shareData.title, text: shareData.text });
          }
          throw new Error("file share unsupported");
        })
        .catch(function () {
          if (navigator.share) navigator.share(shareData).catch(function () {});
          else fallbackShare();
        });
    } else if (navigator.share) {
      navigator.share(shareData).catch(function () {});
    } else {
      fallbackShare();
    }
  }

  function closeAllGalleryMenus() {
    document.querySelectorAll(".gallery-card-menu.is-open").forEach(function (m) {
      m.classList.remove("is-open");
      var t = m.querySelector(".gallery-card-menu-toggle");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".gallery-card-menu-toggle");
    if (toggle) {
      var menu = toggle.closest(".gallery-card-menu");
      var wasOpen = menu.classList.contains("is-open");
      closeAllGalleryMenus();
      if (!wasOpen) {
        menu.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
      return;
    }

    var actionBtn = e.target.closest(".gallery-card-menu-item");
    if (actionBtn) {
      closeAllGalleryMenus();
      var action = actionBtn.getAttribute("data-action");
      var src = actionBtn.getAttribute("data-src");
      var filename = actionBtn.getAttribute("data-filename");
      if (action === "download") downloadGalleryItem(src, filename);
      if (action === "share") shareGalleryItem(src, filename);
      return;
    }

    if (!e.target.closest(".gallery-card-menu")) closeAllGalleryMenus();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllGalleryMenus();
  });

  /* ---------- sticky header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 640);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var navBackdrop = document.querySelector(".nav-backdrop");
  if (navToggle && navLinks) {
    var closeNav = function () {
      navToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      if (navBackdrop) navBackdrop.classList.remove("is-open");
      var navLang = document.querySelector(".nav-lang");
      if (navLang) navLang.classList.remove("is-open");
    };
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      if (navBackdrop) navBackdrop.classList.toggle("is-open", open);
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    if (navBackdrop) navBackdrop.addEventListener("click", closeNav);
    // tap/click anywhere outside the open drawer (and off the toggle itself) closes it
    document.addEventListener("click", function (e) {
      if (!navLinks.classList.contains("is-open")) return;
      if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- active nav link ---------- */
  var here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------- scroll reveal ---------- */
  var revealIo = null;
  if ("IntersectionObserver" in window) {
    revealIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
  }
  // Safe to call again after new .reveal elements are injected; already
  // observed elements are skipped.
  function initScrollReveal() {
    document.querySelectorAll(".reveal:not([data-reveal-init])").forEach(function (el, i) {
      el.setAttribute("data-reveal-init", "");
      if (revealIo) {
        el.style.setProperty("--i", i % 6);
        revealIo.observe(el);
      } else {
        el.classList.add("is-visible");
      }
    });
  }
  initScrollReveal();

  /* ---------- typewriter headlines ----------
     Types the headline in, holds for 5s, deletes it letter by letter, then
     retypes , looping for as long as the element exists. The text is always
     re-read from the data-typewriter attribute (rather than captured once),
     so a language change picked up by i18n.js restarts the cycle with the
     current-language text instead of finishing out a stale one. */
  var typeEls = document.querySelectorAll("[data-typewriter]");
  if (typeEls.length) {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var TYPE_MS = 60;
    var DELETE_MS = 35;
    var HOLD_MS = 5000;
    var RESTART_MS = 300;

    typeEls.forEach(function (el) {
      if (reduceMotion || !("IntersectionObserver" in window)) {
        el.textContent = el.getAttribute("data-typewriter") || "";
        new MutationObserver(function () {
          el.textContent = el.getAttribute("data-typewriter") || "";
        }).observe(el, { attributes: true, attributeFilter: ["data-typewriter"] });
        return;
      }

      el.textContent = "";
      var started = false;
      var cycleId = 0; // bumped to invalidate in-flight timeouts when the cycle restarts

      function runCycle() {
        var myId = ++cycleId;
        var text = el.getAttribute("data-typewriter") || "";

        (function typeStep(i) {
          if (myId !== cycleId) return;
          el.textContent = text.slice(0, i);
          if (i < text.length) {
            setTimeout(function () { typeStep(i + 1); }, TYPE_MS);
          } else {
            setTimeout(function () {
              if (myId !== cycleId) return;
              deleteStep(text.length);
            }, HOLD_MS);
          }
        })(0);

        function deleteStep(len) {
          if (myId !== cycleId) return;
          el.textContent = text.slice(0, len);
          if (len > 0) {
            setTimeout(function () { deleteStep(len - 1); }, DELETE_MS);
          } else {
            setTimeout(function () {
              if (myId !== cycleId) return;
              runCycle();
            }, RESTART_MS);
          }
        }
      }

      var typeIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !started) {
              started = true;
              runCycle();
              typeIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      typeIo.observe(el);

      // language switch changes the attribute , restart the loop with the new text
      new MutationObserver(function () {
        if (started) runCycle();
      }).observe(el, { attributes: true, attributeFilter: ["data-typewriter"] });
    });
  }

  /* ---------- image carousel (auto-advancing crossfade) ---------- */
  var carousels = document.querySelectorAll("[data-carousel]");
  if (carousels.length) {
    var carouselReduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousels.forEach(function (carousel) {
      var slides = carousel.querySelectorAll(".carousel-slide");
      if (slides.length < 2 || carouselReduceMotion) return;
      var current = 0;
      setInterval(function () {
        slides[current].classList.remove("is-active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("is-active");
      }, 5000);
    });
  }

  /* ---------- graceful placeholder for missing images ----------
     Any <img data-ph="filename.jpg"> that fails to load (because the
     real photo hasn't been dropped into assets/images/ yet) is swapped
     for a soft, labeled placeholder instead of a broken-image icon.
     Once the real file is added at that path, this never fires. */
  function placeholderSVG(label) {
    var safe = (label || "image").replace(/[<>&]/g, "");
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>" +
      "<defs>" +
      "<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='%23e9dfc6'/>" +
      "<stop offset='1' stop-color='%23f1dfc4'/>" +
      "</linearGradient>" +
      "<pattern id='p' width='28' height='28' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'>" +
      "<line x1='0' y1='0' x2='0' y2='28' stroke='%23d8c8a3' stroke-width='10'/>" +
      "</pattern>" +
      "</defs>" +
      "<rect width='800' height='600' fill='url(%23g)'/>" +
      "<rect width='800' height='600' fill='url(%23p)' opacity='0.35'/>" +
      "<g fill='none' stroke='%23a9631f' stroke-width='2.4' opacity='0.55'>" +
      "<rect x='330' y='230' width='140' height='100' rx='6'/>" +
      "<circle cx='368' cy='262' r='11'/>" +
      "<path d='M330 316 L378 274 L410 300 L470 246 L470 330 L330 330 Z'/>" +
      "</g>" +
      "<text x='400' y='372' font-family='Manrope,Arial,sans-serif' font-size='16' " +
      "font-weight='700' fill='%237c481b' text-anchor='middle' letter-spacing='0.5'>" +
      safe +
      "</text>" +
      "<text x='400' y='394' font-family='Manrope,Arial,sans-serif' font-size='11' " +
      "fill='%238b8770' text-anchor='middle'>drop this file into assets/images/</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=UTF-8," + svg;
  }

  document.querySelectorAll("img[data-ph]").forEach(function (img) {
    img.addEventListener(
      "error",
      function () {
        img.src = placeholderSVG(img.getAttribute("data-ph"));
        img.classList.add("img-missing");
      },
      { once: true }
    );
  });

  /* ---------- contact form: hand off to the user's own email app ----------
     Rather than posting to a third-party form backend, submit builds a
     mailto: link from the field values (subject + a readable body) and
     navigates to it , the visitor's mail client (or webmail, if that's
     their OS/browser default) opens pre-filled, and they just hit send. */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var statusEl = contactForm.querySelector(".form-status");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = {};
      new FormData(contactForm).forEach(function (value, key) { data[key] = value; });

      if (data._honey) return; // silently drop bot submissions

      var i18n = window.LFIC_I18N;
      var tt = function (key, fallback) { return i18n ? i18n.t(key) : fallback; };

      var subject = data.Subject || tt("contact.mailtoDefaultSubject", "Enquiry from the LFIC website");

      var bodyLines = [
        tt("contact.labelName", "Full Name") + ": " + data.Name,
        tt("contact.labelEmail", "Email Address") + ": " + data.Email,
      ];
      if (data.Phone) bodyLines.push(tt("contact.labelPhone", "Phone Number") + ": " + data.Phone);
      bodyLines.push("", data.Message);

      var mailto =
        "mailto:batejoel179@yahoo.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      // Trigger via a real <a> click rather than window.location.href , this is
      // the more reliable way to invoke the OS/browser's mail-app handoff across
      // browsers. Either way, if the visitor has no mail app registered (common
      // on desktop without Outlook/Mail set as default), NOTHING will visibly
      // happen and they'd otherwise seem stuck , so the status message always
      // includes a real, clickable mailto link as a guaranteed manual fallback.
      var trigger = document.createElement("a");
      trigger.href = mailto;
      trigger.rel = "noopener";
      document.body.appendChild(trigger);
      trigger.click();
      trigger.remove();

      statusEl.innerHTML =
        tt("contact.statusMailto", "Opening your email app with your message ready , just hit send there.") +
        ' <a href="' + mailto + '" class="form-status-link">' +
        tt("contact.statusMailtoFallback", "Didn't open? Click here to send it manually.") +
        "</a>";
      statusEl.className = "form-status is-success";
    });
  }

  /* ---------- video cards + shared lightbox modal ----------
     Supports any number of .video-card triggers on a page (the homepage
     has one; the gallery page has several), all sharing one modal player.
     Each card's own muted/looping preview clip plays as its thumbnail;
     clicking a card loads that card's clip into the shared modal. */
  var videoModal = document.getElementById("videoModal");
  if (videoModal) {
    var modalPlayer = document.getElementById("videoPlayer");
    var activeVideoTrigger = null;

    // Safe to call again after new cards are injected; already-wired
    // cards are skipped.
    initVideoCards = function () {
    document.querySelectorAll(".video-card:not([data-video-init])").forEach(function (card) {
      card.setAttribute("data-video-init", "");
      var previewVideo = card.querySelector(".video-card-preview");

      if (previewVideo && "IntersectionObserver" in window) {
        var previewIo = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                previewVideo.src = previewVideo.getAttribute("data-src");
                previewVideo.play().catch(function () {});
                previewIo.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        previewIo.observe(previewVideo);
      }

      card.addEventListener("click", function () {
        activeVideoTrigger = card;
        var src = previewVideo ? previewVideo.getAttribute("data-src") : "";
        modalPlayer.setAttribute("src", src);
        videoModal.classList.add("is-open");
        videoModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        if (previewVideo) previewVideo.pause();
        modalPlayer.currentTime = 0;
        modalPlayer.play().catch(function () {});
        var closeBtn = videoModal.querySelector(".video-modal-close");
        if (closeBtn) closeBtn.focus();
      });
    });
    };
    initVideoCards();

    function closeVideoModal() {
      videoModal.classList.remove("is-open");
      videoModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      modalPlayer.pause();
      modalPlayer.removeAttribute("src");
      modalPlayer.load();
      if (activeVideoTrigger) {
        var pv = activeVideoTrigger.querySelector(".video-card-preview");
        if (pv) pv.play().catch(function () {});
        activeVideoTrigger.focus();
      }
    }

    videoModal.querySelectorAll("[data-close-video]").forEach(function (el) {
      el.addEventListener("click", closeVideoModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoModal.classList.contains("is-open")) closeVideoModal();
    });
  }

  /* ---------- photo gallery lightbox ---------- */
  var photoLightbox = document.getElementById("photoLightbox");
  if (photoLightbox) {
    var lightboxImg = document.getElementById("photoLightboxImg");
    var lightboxPrev = document.getElementById("lightboxPrev");
    var lightboxNext = document.getElementById("lightboxNext");
    var photoList = [];
    var activePhotoIndex = 0;
    var activePhotoTrigger = null;

    function showPhoto(index) {
      activePhotoIndex = (index + photoList.length) % photoList.length;
      var photo = photoList[activePhotoIndex];
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.alt;
    }

    function openLightbox(index, trigger) {
      activePhotoTrigger = trigger;
      showPhoto(index);
      photoLightbox.classList.add("is-open");
      photoLightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      var closeBtn = photoLightbox.querySelector(".photo-lightbox-close");
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      photoLightbox.classList.remove("is-open");
      photoLightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      if (activePhotoTrigger) activePhotoTrigger.focus();
    }

    // Rebuilds the photo list from whatever cards are currently in the DOM,
    // so it picks up cards injected by discovery. Safe to call again.
    initPhotoLightbox = function () {
      var cards = document.querySelectorAll(".gallery-photo-card");
      photoList = Array.prototype.map.call(cards, function (card) {
        var img = card.querySelector("img");
        return { src: img.src, alt: img.alt };
      });
      cards.forEach(function (card, index) {
        if (card.hasAttribute("data-lightbox-init")) return;
        card.setAttribute("data-lightbox-init", "");
        card.addEventListener("click", function () { openLightbox(index, card); });
      });
    };
    initPhotoLightbox();

    photoLightbox.querySelectorAll("[data-close-lightbox]").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    if (lightboxPrev) lightboxPrev.addEventListener("click", function () { showPhoto(activePhotoIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener("click", function () { showPhoto(activePhotoIndex + 1); });
    document.addEventListener("keydown", function (e) {
      if (!photoLightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPhoto(activePhotoIndex - 1);
      if (e.key === "ArrowRight") showPhoto(activePhotoIndex + 1);
    });
  }
})();
