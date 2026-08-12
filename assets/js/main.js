/* Lion Force Investment Company — shared site behavior */
(function () {
  "use strict";

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
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- typewriter headlines ----------
     Types the headline in, holds for 5s, deletes it letter by letter, then
     retypes — looping for as long as the element exists. The text is always
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

      // language switch changes the attribute — restart the loop with the new text
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
     navigates to it — the visitor's mail client (or webmail, if that's
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

      statusEl.textContent = tt("contact.statusMailto", "Opening your email app with your message ready — just hit send there.");
      statusEl.className = "form-status is-success";

      window.location.href = mailto;
    });
  }

  /* ---------- home video card + lightbox ---------- */
  var videoTrigger = document.getElementById("videoTrigger");
  var videoModal = document.getElementById("videoModal");
  if (videoTrigger && videoModal) {
    var modalPlayer = document.getElementById("videoPlayer");
    var previewVideo = videoTrigger.querySelector(".video-card-preview");

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

    function openVideoModal() {
      if (!modalPlayer.getAttribute("src")) {
        modalPlayer.setAttribute("src", modalPlayer.getAttribute("data-src"));
      }
      videoModal.classList.add("is-open");
      videoModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      if (previewVideo) previewVideo.pause();
      modalPlayer.currentTime = 0;
      modalPlayer.play().catch(function () {});
      var closeBtn = videoModal.querySelector(".video-modal-close");
      if (closeBtn) closeBtn.focus();
    }

    function closeVideoModal() {
      videoModal.classList.remove("is-open");
      videoModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      modalPlayer.pause();
      if (previewVideo) previewVideo.play().catch(function () {});
      videoTrigger.focus();
    }

    videoTrigger.addEventListener("click", openVideoModal);
    videoModal.querySelectorAll("[data-close-video]").forEach(function (el) {
      el.addEventListener("click", closeVideoModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoModal.classList.contains("is-open")) closeVideoModal();
    });
  }
})();
