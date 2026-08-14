/* Lion Force Investment Company , bilingual (EN/FR) engine.
   Language choice is stored in localStorage so it persists across pages,
   scrolling, and browser tabs on this site. Must load BEFORE main.js so
   translated text (including typewriter headlines) is in place before
   main.js reads it. */
(function () {
  "use strict";

  var LANG_KEY = "lfic-lang";
  var WHATSAPP_BASE = "https://wa.me/237681127498";
  var CONTACT_EMAIL = "batejoel179@yahoo.com";

  var translations = {
    en: {
      common: {
        navHome: "Home",
        navAbout: "About",
        navServices: "Services",
        navGallery: "Gallery",
        navProjects: "Projects",
        navContact: "Contact",
        navLanguage: "Language",
        getInTouch: "Get in Touch",
        toggleMenu: "Toggle menu",
        langEnglish: "English",
        langFrench: "Français",
        switchToEnglish: "Switch to English",
        switchToFrench: "Passer au français",
        backToTop: "Back to top",
        footerTagline: "A Cameroonian investment and business enterprise creating economic opportunities and lasting value across real estate, commerce, trade, industry, and human resources.",
        footerQuickLinks: "Quick Links",
        footerOurServices: "Our Services",
        footerContact: "Contact",
        footerAddress: "Clerks Quarters, Buea, South West Region, Cameroon",
        footerCopyright: "© 2026 Lion Force Investment Company Limited. All rights reserved.",
        footerRegistered: "Registered under the OHADA Uniform Act on Commercial Companies · Buea, Cameroon",
        serviceRealEstate: "Real Estate & Investment",
        serviceGeneralCommerce: "General Commerce",
        serviceContractsSupplies: "Contracts & Supplies",
        serviceImportExport: "Import & Export",
        serviceWoodMetal: "Wood & Metal Works",
        serviceManpowerHR: "Manpower & HR",
        serviceLogistics: "Logistics & Transportation",
        learnMore: "Learn more"
      },
      meta: {
        homeTitle: "Lion Force Investment Company Ltd | Building Opportunities, Delivering Value",
        homeDesc: "Lion Force Investment Company Limited (L.F.I.C Ltd) is a Cameroonian investment and business enterprise operating in real estate, commerce, trade, industry, and human resources , based in Buea, South West Region.",
        aboutTitle: "About Us | Lion Force Investment Company Ltd",
        aboutDesc: "Learn who LFIC is , our story, vision, mission, core values, and the founder behind Lion Force Investment Company Limited in Buea, Cameroon.",
        servicesTitle: "Our Services | Lion Force Investment Company Ltd",
        servicesDesc: "Real estate & investment, general commerce, contracts & supplies, import & export, wood processing & metal works, manpower & HR, and logistics , explore LFIC's seven service sectors.",
        galleryTitle: "Gallery | Lion Force Investment Company Ltd",
        galleryDesc: "Browse photos and videos from Lion Force Investment Company Limited , Existing Projects, sites, and team at work in Buea, Cameroon.",
        projectsTitle: "Existing Projects | Lion Force Investment Company Ltd",
        projectsDesc: "Tour existing properties and completed projects by Lion Force Investment Company Limited in Buea, Cameroon , in video.",
        contactTitle: "Contact Us | Lion Force Investment Company Ltd",
        contactDesc: "Get in touch with Lion Force Investment Company Limited , Clerks Quarters, Buea, South West Region, Cameroon. Call, email, or find us on the map."
      },
      home: {
        heroEyebrow: "Buea, South West Region · Cameroon",
        heroTitle: "Building Opportunities, Delivering Value.",
        heroLead: "Lion Force Investment Company Limited is a Cameroonian investment and business enterprise creating economic opportunities, innovative solutions, and lasting value for individuals, businesses, institutions, and communities.",
        heroBtnServices: "Explore Our Services",
        heroBtnContact: "Contact Us",
        storyEyebrow: "Who We Are",
        storyTitle: "A business built on integrity, and a vision for shared growth.",
        storyLead: "Headquartered at Clerks Quarters, Buea, LFIC was established to promote economic growth, create employment opportunities, and deliver value-driven services across real estate, commerce, trade, industry, and human resources.",
        storyFounderHtml: "Founded and led by <strong style=\"color:var(--ink);\">Bate Joel Enow</strong> , a visionary entrepreneur and business leader with more than seven years of experience , LFIC is built on a commitment to integrity, transparency, professionalism, innovation, and customer satisfaction.",
        storyBtn: "Learn More About Us",
        servicesEyebrow: "What We Do",
        servicesTitle: "Seven sectors. One commitment to lasting value.",
        servicesLead: "From land and property to trade, industry, and people , every service LFIC offers is built to create real, lasting value.",
        card1Title: "Land, Property & Advisory",
        card1Desc: "Strategic land acquisition, property sales, land verification, property management, and investment advisory.",
        card2Title: "Trade & Distribution",
        card2Desc: "Buying, selling, and distribution of goods and services that respond to local and international market needs.",
        card3Title: "Institutional Supply",
        card3Desc: "Public and private sector contracts, and supply of equipment, materials, and construction goods.",
        card4Title: "Cross-Border Trade",
        card4Desc: "International trade through importation and exportation, opening doors to business expansion.",
        card5Title: "Processing & Value Addition",
        card5Desc: "Processing, transformation, and commercialisation of wood products and metal works.",
        card6Title: "Recruitment & Placement",
        card6Desc: "Manpower recruitment, placement, and workforce management connecting organisations with skilled professionals.",
        logisticsBtn: "See Logistics & Transportation, too",
        investEyebrow: "Registered. Professional. Transparent. Reliable.",
        investTitle: "Every opportunity has the potential to become an investment.",
        investLead: "At Lion Force Investment Company, we combine legitimate business operations, professional expertise, strategic opportunities, and customer-focused service to give our clients confidence in every engagement. We are committed to creating value for our clients, investors, partners, and stakeholders while contributing meaningfully to the socio-economic development of Cameroon and beyond.",
        badge1: "Registered under the OHADA Uniform Act",
        badge2: "Headquartered in Buea, Cameroon",
        badge3: "Client-Focused Service",
        videoAria: "Play video",
        videoLabel: "Watch the Video",
        videoSub: "See how LFIC turns opportunity into investment.",
        videoModalAria: "Video player",
        videoCloseAria: "Close video",
        teamEyebrow: "Our People",
        teamTitle: "The management team behind LFIC.",
        teamLead: "Leadership, partners, and specialists working together to turn opportunity into lasting value.",
        teamRankLeadership: "Leadership",
        teamRankPartners: "Partners",
        teamRankSpecialists: "Specialists & Advisors",
        roleFounderCeo: "Founder & CEO",
        roleCofounder: "Co-Founder & Daily Operations Manager",
        rolePartner: "Partner",
        roleLegal: "Legal Advisor",
        roleComms: "Communications & Marketing Engineer",
        roleCivil: "Civil Engineer",
        roleSurveyor: "Surveyor",
        ctaTitle: "Building Opportunities, Delivering Value.",
        ctaLead: "Tell us what you're trying to build, buy, move, or grow , LFIC is ready to help.",
        ctaBtn: "Contact Us"
      },
      about: {
        statementEyebrow: "About LFIC",
        statementHeadline: "WHO WE ARE",
        statementSub: "A Cameroonian investment and business enterprise creating economic opportunities, innovative solutions, and lasting value , for individuals, businesses, institutions, and communities.",
        storyEyebrow: "Our Story",
        storyTitle: "A Cameroonian enterprise built for lasting value.",
        storyLead: "Lion Force Investment Company Limited (L.F.I.C. Ltd) is a Cameroonian investment and business enterprise committed to creating economic opportunities, delivering innovative solutions, and generating lasting value for individuals, businesses, institutions, investors, and communities.",
        storyPara2: "Headquartered at Clerks Quarters, Buea, South West Region, Cameroon, LFIC was established with a vision of promoting economic growth, creating employment opportunities, and providing value-driven services across multiple sectors. The company operates across real estate and investment services, general commerce, contracts and supplies, import and export, wood processing and metal works, and manpower placement.",
        storyPara3: "Our real estate and investment activities include strategic land acquisition, property sales, land verification, property management, property consultancy, and investment advisory services , helping clients identify and pursue opportunities that contribute to long-term financial security and wealth creation.",
        visionEyebrow: "Our Vision",
        visionTitle: "Where we're headed",
        visionText: "To become one of Cameroon's leading investment and business enterprises, recognised for innovation, professionalism, integrity, and lasting value creation. We aspire to build a financially empowered society by connecting individuals, businesses, and institutions with strategic investment and business opportunities that contribute to sustainable growth.",
        missionEyebrow: "Our Mission",
        missionTitle: "How we get there",
        missionText: "To provide innovative, reliable, and sustainable investment, real estate, and business solutions that create economic opportunities, empower our clients, generate employment, and deliver lasting value. We achieve this by combining professional expertise, market knowledge, strategic partnerships, innovation, and a strong commitment to ethical business practices.",
        valuesEyebrow: "What We Stand For",
        valuesTitle: "Our Core Values",
        value1Title: "Integrity",
        value1Desc: "We conduct our business honestly, ethically, and responsibly.",
        value2Title: "Professionalism",
        value2Desc: "We maintain high standards of competence, service delivery, and accountability.",
        value3Title: "Transparency",
        value3Desc: "We promote clear communication and responsible transactions with our clients and partners.",
        value4Title: "Innovation",
        value4Desc: "We embrace new ideas, technologies, and approaches that create better solutions.",
        value5Title: "Customer Satisfaction",
        value5Desc: "We listen to our clients and work to provide solutions that respond to their needs and expectations.",
        value6Title: "Excellence",
        value6Desc: "We continuously strive to improve our services and deliver quality results.",
        value7Title: "Sustainable Value Creation",
        value7Desc: "We focus on opportunities that create lasting economic and social value.",
        leadershipEyebrow: "Leadership",
        leadershipTitle: "Founded and led with vision.",
        founderRole: "Founder & Manager",
        founderBio: "A visionary entrepreneur, investor, and business leader with more than seven years of experience. Bate Joel Enow founded Lion Force Investment Company Limited on a commitment to integrity, transparency, professionalism, innovation, and customer satisfaction , believing that investment should do more than generate returns. It should create opportunities, empower people, generate employment, and contribute to sustainable economic development.",
        commitmentEyebrow: "Our Commitment",
        commitmentTitle: "Every investment should create value.",
        commitmentText: "At Lion Force Investment Company Limited, we are committed to creating value for our clients, investors, partners, and stakeholders while contributing meaningfully to the socio-economic development of Cameroon and beyond. We believe that every opportunity has the potential to become an investment, and every investment should create value.",
        ctaTitle: "Want to work with LFIC?",
        ctaLead: "Reach out and let's talk about what you're trying to build, buy, move, or grow."
      },
      services: {
        statementEyebrow: "What We Do",
        statementHeadline: "OUR SERVICES",
        statementSub: "Registered. Professional. Transparent. Reliable. We combine legitimate business operations, professional expertise, and customer-focused service to give our clients confidence in every engagement.",
        svc1Eyebrow: "01 · Real Estate & Investment Services",
        svc1Title: "Land, property, and advisory built for long-term security",
        svc1Desc: "Our real estate and investment activities include strategic land acquisition, property sales, land verification, property management, property consultancy, and investment advisory services , helping clients identify and pursue opportunities that contribute to long-term financial security and wealth creation.",
        svc2Eyebrow: "02 · General Commerce",
        svc2Title: "Trade that responds to real market needs",
        svc2Desc: "We engage in the buying, selling, and distribution of a range of goods and services, facilitating commercial transactions that respond to local and international market needs.",
        svc3Eyebrow: "03 · Contracts & Supplies",
        svc3Title: "Reliable supply for businesses and institutions",
        svc3Desc: "We undertake public and private sector contracts and supply equipment, materials, office consumables, construction materials, and other essential goods required by businesses and institutions.",
        svc4Eyebrow: "04 · Import & Export",
        svc4Title: "Cross-border commerce, made accessible",
        svc4Desc: "We participate in international trade through the importation and exportation of various products, creating opportunities for business expansion and cross-border commerce.",
        svc5Eyebrow: "05 · Wood Processing & Metal Works",
        svc5Title: "Industrial value addition",
        svc5Desc: "We engage in the processing, transformation, and commercialisation of wood products and metal works, contributing to industrial development and value addition.",
        svc6Eyebrow: "06 · Manpower & Human Resource Services",
        svc6Title: "Connecting organisations with skilled people",
        svc6Desc: "We provide manpower recruitment, placement, and workforce management services, connecting organisations with qualified and skilled professionals.",
        svc7Eyebrow: "07 · Logistics & Transportation",
        svc7Title: "Efficient movement, storage, and delivery",
        svc7Desc: "We provide logistics solutions designed to facilitate the efficient movement, storage, and distribution of goods while supporting timely and cost-effective service delivery.",
        ctaTitle: "Not sure which service fits?",
        ctaLead: "Reach out and describe what you need , we'll point you to the right team."
      },
      gallery: {
        statementEyebrow: "See LFIC In Action",
        statementHeadline: "GALLERY",
        statementSub: "A look at Existing Projects, sites, and team at work , in pictures and video.",
        photosEyebrow: "Photos",
        photosTitle: "Moments from the field.",
        photosLead: "A closer look at LFIC's work, people, and projects around Buea.",
        videosEyebrow: "Videos",
        videosTitle: "See LFIC in motion.",
        videosLead: "Watch highlights from Existing Projects and day-to-day operations.",
        videoWord: "Video",
        videoSub: "Tap to play",
        videoAria: "Play video",
        photoAlt: "Lion Force Investment Company gallery photo",
        lightboxCloseAria: "Close photo viewer",
        lightboxPrevAria: "Previous photo",
        lightboxNextAria: "Next photo",
        moreOptionsAria: "More options",
        download: "Download",
        share: "Share",
        linkCopied: "Link copied!",
        ctaTitle: "Want to see more?",
        ctaLead: "Follow us on social media for the latest updates, or reach out directly."
      },
      projects: {
        statementEyebrow: "What We've Built",
        statementHeadline: "Existing Projects",
        statementSub: "Existing properties and completed developments , walk through each one on video.",
        propertiesEyebrow: "Existing Properties",
        propertiesTitle: "Take a walk through our properties.",
        propertiesLead: "Tap any property to watch the full walkthrough, or use the menu on a card to download it.",
        propertyWord: "Property",
        enquireBtn: "Enquire on WhatsApp",
        enquireAria: "Enquire about this property on WhatsApp",
        enquireMessage: "Hello Lion Force Investment Company, I saw Property {item} on your website and I'd like to know more about it , availability, price, and location. Thank you.",
        ctaTitle: "Interested in a property?",
        ctaLead: "Get in touch and we'll walk you through availability, pricing, and next steps."
      },
      partner: {
        eyebrow: "Partner With Us",
        title: "Let's build something together.",
        lead: "LFIC grows through partnership , with investors, landowners, suppliers, and professionals who share our commitment to doing business the right way. If that sounds like you, we'd like to hear from you.",
        card1Title: "Investors",
        card1Desc: "Put capital behind real estate and trade opportunities with clear terms, documented processes, and returns you can trace.",
        card2Title: "Landowners & Property Partners",
        card2Desc: "Have land or property to develop, sell, or manage? We handle verification, documentation, and bringing it to the right buyers.",
        card3Title: "Suppliers & Contractors",
        card3Desc: "Supply materials, equipment, or professional services for our contracts, construction, and logistics work across the South West.",
        ctaLead: "Tell us which fits you and we'll take it from there.",
        waBtn: "Discuss on WhatsApp",
        waAria: "Discuss a partnership on WhatsApp",
        waMessage: "Hello Lion Force Investment Company, I'd like to discuss a partnership with you. Here is what I have in mind:",
        emailBtn: "Send a Partnership Email",
        emailSubject: "Partnership enquiry , from the LFIC website"
      },
      contact: {
        statementEyebrow: "Let's Talk",
        statementHeadline: "GET IN TOUCH",
        statementSub: "Whatever you're planning , real estate, trade, supplies, or logistics , start the conversation today.",
        formEyebrow: "Send a Message",
        formTitle: "Tell us what you need.",
        formLead: "Fill in the form below and we'll open your email app with everything ready to send , we typically reply within a business day or two.",
        labelName: "Full Name",
        labelEmail: "Email Address",
        labelPhone: "Phone Number",
        labelSubject: "Subject",
        labelMessage: "Message",
        placeholderSubject: "e.g. Real Estate Enquiry",
        placeholderMessage: "Tell us what you're looking to build, buy, move, or grow…",
        btnSend: "Send Message",
        mailtoDefaultSubject: "Enquiry from the LFIC website",
        statusMailto: "Opening your email app with your message ready , just hit send there.",
        statusMailtoFallback: "Didn't open? Click here to send it manually.",
        reachEyebrow: "Reach Us Directly",
        reachTitle: "Prefer to call or write?",
        cardOfficeTitle: "Head Office",
        cardOfficeText: "Clerks Quarters, Buea<br>South West Region, Cameroon",
        cardPhoneTitle: "Phone",
        cardEmailTitle: "Email",
        cardWhatsAppTitle: "WhatsApp",
        cardFacebookTitle: "Facebook",
        cardTikTokTitle: "TikTok",
        cardInstagramTitle: "Instagram",
        findEyebrow: "Find Us",
        findTitle: "Clerks Quarters, Buea.",
        ctaTitle: "Building Opportunities, Delivering Value.",
        ctaLead: "Whatever you're planning , real estate, trade, supplies, or logistics , start the conversation today.",
        ctaBtn: "Call Us Now"
      }
    },

    fr: {
      common: {
        navHome: "Accueil",
        navAbout: "À Propos",
        navServices: "Services",
        navGallery: "Galerie",
        navProjects: "Projets",
        navContact: "Contact",
        navLanguage: "Langue",
        getInTouch: "Nous Contacter",
        toggleMenu: "Basculer le menu",
        langEnglish: "English",
        langFrench: "Français",
        switchToEnglish: "Switch to English",
        switchToFrench: "Passer au français",
        backToTop: "Retour en haut",
        footerTagline: "Une entreprise camerounaise d'investissement et d'affaires créant des opportunités économiques et une valeur durable dans l'immobilier, le commerce, le négoce, l'industrie et les ressources humaines.",
        footerQuickLinks: "Liens Rapides",
        footerOurServices: "Nos Services",
        footerContact: "Contact",
        footerAddress: "Clerks Quarters, Buea, Région du Sud-Ouest, Cameroun",
        footerCopyright: "© 2026 Lion Force Investment Company Limited. Tous droits réservés.",
        footerRegistered: "Enregistrée sous l'Acte Uniforme OHADA relatif aux sociétés commerciales · Buea, Cameroun",
        serviceRealEstate: "Immobilier & Investissement",
        serviceGeneralCommerce: "Commerce Général",
        serviceContractsSupplies: "Contrats & Fournitures",
        serviceImportExport: "Import & Export",
        serviceWoodMetal: "Bois & Métallurgie",
        serviceManpowerHR: "Main-d'Œuvre & RH",
        serviceLogistics: "Logistique & Transport",
        learnMore: "En savoir plus"
      },
      meta: {
        homeTitle: "Lion Force Investment Company Ltd | Bâtir des Opportunités, Livrer de la Valeur",
        homeDesc: "Lion Force Investment Company Limited (L.F.I.C Ltd) est une entreprise camerounaise d'investissement et d'affaires opérant dans l'immobilier, le commerce, le négoce, l'industrie et les ressources humaines , basée à Buea, Région du Sud-Ouest.",
        aboutTitle: "À Propos | Lion Force Investment Company Ltd",
        aboutDesc: "Découvrez qui est LFIC , notre histoire, notre vision, notre mission, nos valeurs fondamentales et le fondateur de Lion Force Investment Company Limited à Buea, Cameroun.",
        servicesTitle: "Nos Services | Lion Force Investment Company Ltd",
        servicesDesc: "Immobilier & investissement, commerce général, contrats & fournitures, import-export, transformation du bois & métallurgie, main-d'œuvre & RH, et logistique , découvrez les sept secteurs de services de LFIC.",
        galleryTitle: "Galerie | Lion Force Investment Company Ltd",
        galleryDesc: "Parcourez les photos et vidéos de Lion Force Investment Company Limited , nos projets, nos sites et notre équipe au travail à Buea, Cameroun.",
        projectsTitle: "Nos Projets | Lion Force Investment Company Ltd",
        projectsDesc: "Découvrez en vidéo les propriétés existantes et les projets réalisés par Lion Force Investment Company Limited à Buea, Cameroun.",
        contactTitle: "Contact | Lion Force Investment Company Ltd",
        contactDesc: "Contactez Lion Force Investment Company Limited , Clerks Quarters, Buea, Région du Sud-Ouest, Cameroun. Appelez, écrivez, ou trouvez-nous sur la carte."
      },
      home: {
        heroEyebrow: "Buea, Région du Sud-Ouest · Cameroun",
        heroTitle: "Bâtir des Opportunités, Livrer de la Valeur.",
        heroLead: "Lion Force Investment Company Limited est une entreprise camerounaise d'investissement et d'affaires qui crée des opportunités économiques, des solutions innovantes et une valeur durable pour les particuliers, les entreprises, les institutions et les communautés.",
        heroBtnServices: "Découvrir Nos Services",
        heroBtnContact: "Nous Contacter",
        factSectors: "Secteurs d'Activité",
        factCharter: "Charte de l'Entreprise",
        factFounder: "Expérience du Fondateur",
        storyEyebrow: "Qui Nous Sommes",
        storyTitle: "Une entreprise fondée sur l'intégrité, et une vision de croissance partagée.",
        storyLead: "Basée à Clerks Quarters, Buea, LFIC a été créée pour promouvoir la croissance économique, générer des opportunités d'emploi et offrir des services axés sur la valeur dans l'immobilier, le commerce, le négoce, l'industrie et les ressources humaines.",
        storyFounderHtml: "Fondée et dirigée par <strong style=\"color:var(--ink);\">Bate Joel Enow</strong> , un entrepreneur visionnaire et chef d'entreprise avec plus de sept ans d'expérience , LFIC repose sur un engagement envers l'intégrité, la transparence, le professionnalisme, l'innovation et la satisfaction client.",
        storyBtn: "En Savoir Plus Sur Nous",
        servicesEyebrow: "Ce Que Nous Faisons",
        servicesTitle: "Sept secteurs. Un seul engagement envers une valeur durable.",
        servicesLead: "Du foncier et de l'immobilier au commerce, à l'industrie et aux personnes , chaque service de LFIC est conçu pour créer une valeur réelle et durable.",
        card1Title: "Foncier, Immobilier & Conseil",
        card1Desc: "Acquisition foncière stratégique, vente de propriétés, vérification foncière, gestion immobilière et conseil en investissement.",
        card2Title: "Négoce & Distribution",
        card2Desc: "Achat, vente et distribution de biens et services qui répondent aux besoins des marchés locaux et internationaux.",
        card3Title: "Fourniture Institutionnelle",
        card3Desc: "Contrats des secteurs public et privé, et fourniture d'équipements, matériaux et biens de construction.",
        card4Title: "Commerce Transfrontalier",
        card4Desc: "Commerce international par l'importation et l'exportation, ouvrant la voie à l'expansion des affaires.",
        card5Title: "Transformation & Valeur Ajoutée",
        card5Desc: "Transformation, traitement et commercialisation de produits en bois et en métal.",
        card6Title: "Recrutement & Placement",
        card6Desc: "Recrutement de main-d'œuvre, placement et gestion des effectifs reliant les organisations à des professionnels qualifiés.",
        logisticsBtn: "Découvrez aussi la Logistique & le Transport",
        investEyebrow: "Enregistrée. Professionnelle. Transparente. Fiable.",
        investTitle: "Chaque opportunité a le potentiel de devenir un investissement.",
        investLead: "Chez Lion Force Investment Company, nous combinons des activités commerciales légitimes, une expertise professionnelle, des opportunités stratégiques et un service axé sur le client pour donner confiance à nos clients dans chaque engagement. Nous nous engageons à créer de la valeur pour nos clients, investisseurs, partenaires et parties prenantes tout en contribuant significativement au développement socio-économique du Cameroun et au-delà.",
        badge1: "Enregistrée sous l'Acte Uniforme OHADA",
        badge2: "Basée à Buea, Cameroun",
        badge3: "Service Axé sur le Client",
        videoAria: "Lire la vidéo",
        videoLabel: "Regarder la Vidéo",
        videoSub: "Découvrez comment LFIC transforme l'opportunité en investissement.",
        videoModalAria: "Lecteur vidéo",
        videoCloseAria: "Fermer la vidéo",
        teamEyebrow: "Notre Équipe",
        teamTitle: "L'équipe de direction derrière LFIC.",
        teamLead: "Direction, partenaires et spécialistes travaillant ensemble pour transformer l'opportunité en valeur durable.",
        teamRankLeadership: "Direction",
        teamRankPartners: "Partenaires",
        teamRankSpecialists: "Spécialistes & Conseillers",
        roleFounderCeo: "Fondateur & PDG",
        roleCofounder: "Cofondatrice & Responsable des Opérations Quotidiennes",
        rolePartner: "Partenaire",
        roleLegal: "Conseiller Juridique",
        roleComms: "Ingénieure Communication & Marketing",
        roleCivil: "Ingénieur Civil",
        roleSurveyor: "Géomètre",
        ctaTitle: "Bâtir des Opportunités, Livrer de la Valeur.",
        ctaLead: "Dites-nous ce que vous essayez de bâtir, d'acheter, de déplacer ou de développer , LFIC est prêt à vous aider.",
        ctaBtn: "Nous Contacter"
      },
      about: {
        statementEyebrow: "À Propos de LFIC",
        statementHeadline: "QUI SOMMES-NOUS",
        statementSub: "Une entreprise camerounaise d'investissement et d'affaires créant des opportunités économiques, des solutions innovantes et une valeur durable , pour les particuliers, les entreprises, les institutions et les communautés.",
        storyEyebrow: "Notre Histoire",
        storyTitle: "Une entreprise camerounaise bâtie pour une valeur durable.",
        storyLead: "Lion Force Investment Company Limited (L.F.I.C. Ltd) est une entreprise camerounaise d'investissement et d'affaires engagée à créer des opportunités économiques, à fournir des solutions innovantes et à générer une valeur durable pour les particuliers, les entreprises, les institutions, les investisseurs et les communautés.",
        storyPara2: "Basée à Clerks Quarters, Buea, Région du Sud-Ouest, Cameroun, LFIC a été créée avec la vision de promouvoir la croissance économique, de générer des opportunités d'emploi et de fournir des services axés sur la valeur dans plusieurs secteurs. L'entreprise opère dans l'immobilier et l'investissement, le commerce général, les contrats et fournitures, l'import-export, la transformation du bois et du métal, ainsi que le placement de main-d'œuvre.",
        storyPara3: "Nos activités immobilières et d'investissement comprennent l'acquisition foncière stratégique, la vente de propriétés, la vérification foncière, la gestion immobilière, le conseil immobilier et les services de conseil en investissement , aidant les clients à identifier et saisir des opportunités qui contribuent à la sécurité financière à long terme et à la création de richesse.",
        visionEyebrow: "Notre Vision",
        visionTitle: "Où nous allons",
        visionText: "Devenir l'une des principales entreprises d'investissement et d'affaires du Cameroun, reconnue pour l'innovation, le professionnalisme, l'intégrité et la création de valeur durable. Nous aspirons à bâtir une société financièrement autonome en connectant particuliers, entreprises et institutions à des opportunités d'investissement et d'affaires stratégiques qui contribuent à une croissance durable.",
        missionEyebrow: "Notre Mission",
        missionTitle: "Comment nous y parvenons",
        missionText: "Fournir des solutions d'investissement, immobilières et commerciales innovantes, fiables et durables qui créent des opportunités économiques, autonomisent nos clients, génèrent de l'emploi et apportent une valeur durable. Nous y parvenons en combinant expertise professionnelle, connaissance du marché, partenariats stratégiques, innovation et un engagement fort envers des pratiques commerciales éthiques.",
        valuesEyebrow: "Ce En Quoi Nous Croyons",
        valuesTitle: "Nos Valeurs Fondamentales",
        value1Title: "Intégrité",
        value1Desc: "Nous menons nos affaires avec honnêteté, éthique et responsabilité.",
        value2Title: "Professionnalisme",
        value2Desc: "Nous maintenons des normes élevées de compétence, de prestation de service et de responsabilité.",
        value3Title: "Transparence",
        value3Desc: "Nous favorisons une communication claire et des transactions responsables avec nos clients et partenaires.",
        value4Title: "Innovation",
        value4Desc: "Nous adoptons de nouvelles idées, technologies et approches qui créent de meilleures solutions.",
        value5Title: "Satisfaction Client",
        value5Desc: "Nous écoutons nos clients et travaillons à fournir des solutions qui répondent à leurs besoins et attentes.",
        value6Title: "Excellence",
        value6Desc: "Nous nous efforçons continuellement d'améliorer nos services et de fournir des résultats de qualité.",
        value7Title: "Création de Valeur Durable",
        value7Desc: "Nous nous concentrons sur les opportunités qui créent une valeur économique et sociale durable.",
        leadershipEyebrow: "Direction",
        leadershipTitle: "Fondée et dirigée avec vision.",
        founderRole: "Fondateur & Gérant",
        founderBio: "Un entrepreneur visionnaire, investisseur et chef d'entreprise avec plus de sept ans d'expérience. Bate Joel Enow a fondé Lion Force Investment Company Limited sur un engagement envers l'intégrité, la transparence, le professionnalisme, l'innovation et la satisfaction client , convaincu que l'investissement doit faire plus que générer des rendements. Il doit créer des opportunités, autonomiser les gens, générer de l'emploi et contribuer au développement économique durable.",
        commitmentEyebrow: "Notre Engagement",
        commitmentTitle: "Chaque investissement doit créer de la valeur.",
        commitmentText: "Chez Lion Force Investment Company Limited, nous nous engageons à créer de la valeur pour nos clients, investisseurs, partenaires et parties prenantes tout en contribuant significativement au développement socio-économique du Cameroun et au-delà. Nous croyons que chaque opportunité a le potentiel de devenir un investissement, et que chaque investissement doit créer de la valeur.",
        ctaTitle: "Envie de travailler avec LFIC ?",
        ctaLead: "Contactez-nous et parlons de ce que vous essayez de bâtir, d'acheter, de déplacer ou de développer."
      },
      services: {
        statementEyebrow: "Ce Que Nous Faisons",
        statementHeadline: "NOS SERVICES",
        statementSub: "Enregistrée. Professionnelle. Transparente. Fiable. Nous combinons des activités commerciales légitimes, une expertise professionnelle et un service axé sur le client pour donner confiance à nos clients dans chaque engagement.",
        svc1Eyebrow: "01 · Services Immobiliers & d'Investissement",
        svc1Title: "Foncier, immobilier et conseil pour une sécurité à long terme",
        svc1Desc: "Nos activités immobilières et d'investissement comprennent l'acquisition foncière stratégique, la vente de propriétés, la vérification foncière, la gestion immobilière, le conseil immobilier et les services de conseil en investissement , aidant les clients à identifier et saisir des opportunités qui contribuent à la sécurité financière à long terme et à la création de richesse.",
        svc2Eyebrow: "02 · Commerce Général",
        svc2Title: "Un négoce qui répond aux besoins réels du marché",
        svc2Desc: "Nous nous engageons dans l'achat, la vente et la distribution d'une gamme de biens et services, facilitant des transactions commerciales qui répondent aux besoins des marchés locaux et internationaux.",
        svc3Eyebrow: "03 · Contrats & Fournitures",
        svc3Title: "Une fourniture fiable pour les entreprises et institutions",
        svc3Desc: "Nous entreprenons des contrats des secteurs public et privé et fournissons des équipements, matériaux, consommables de bureau, matériaux de construction et autres biens essentiels requis par les entreprises et institutions.",
        svc4Eyebrow: "04 · Import & Export",
        svc4Title: "Un commerce transfrontalier rendu accessible",
        svc4Desc: "Nous participons au commerce international par l'importation et l'exportation de divers produits, créant des opportunités d'expansion commerciale et de commerce transfrontalier.",
        svc5Eyebrow: "05 · Transformation du Bois & Métallurgie",
        svc5Title: "Valeur ajoutée industrielle",
        svc5Desc: "Nous nous engageons dans la transformation, le traitement et la commercialisation de produits en bois et en métal, contribuant au développement industriel et à la valeur ajoutée.",
        svc6Eyebrow: "06 · Main-d'Œuvre & Ressources Humaines",
        svc6Title: "Connecter les organisations à des personnes qualifiées",
        svc6Desc: "Nous fournissons des services de recrutement de main-d'œuvre, de placement et de gestion des effectifs, reliant les organisations à des professionnels qualifiés et compétents.",
        svc7Eyebrow: "07 · Logistique & Transport",
        svc7Title: "Mouvement, stockage et livraison efficaces",
        svc7Desc: "Nous fournissons des solutions logistiques conçues pour faciliter le mouvement, le stockage et la distribution efficaces des marchandises tout en assurant une prestation de service ponctuelle et rentable.",
        ctaTitle: "Vous ne savez pas quel service vous convient ?",
        ctaLead: "Contactez-nous et décrivez vos besoins , nous vous orienterons vers la bonne équipe."
      },
      gallery: {
        statementEyebrow: "LFIC En Action",
        statementHeadline: "GALERIE",
        statementSub: "Un aperçu de nos projets, nos sites et notre équipe au travail , en photos et en vidéo.",
        photosEyebrow: "Photos",
        photosTitle: "Des moments sur le terrain.",
        photosLead: "Un regard sur le travail, les équipes et les projets de LFIC autour de Buea.",
        videosEyebrow: "Vidéos",
        videosTitle: "LFIC en mouvement.",
        videosLead: "Regardez les temps forts de nos projets et de nos activités quotidiennes.",
        videoWord: "Vidéo",
        videoSub: "Appuyez pour lire",
        videoAria: "Lire la vidéo",
        photoAlt: "Photo de la galerie Lion Force Investment Company",
        lightboxCloseAria: "Fermer la visionneuse photo",
        lightboxPrevAria: "Photo précédente",
        lightboxNextAria: "Photo suivante",
        moreOptionsAria: "Plus d'options",
        download: "Télécharger",
        share: "Partager",
        linkCopied: "Lien copié !",
        ctaTitle: "Envie d'en voir plus ?",
        ctaLead: "Suivez-nous sur les réseaux sociaux pour les dernières actualités, ou contactez-nous directement."
      },
      projects: {
        statementEyebrow: "Ce Que Nous Avons Bâti",
        statementHeadline: "NOS PROJETS",
        statementSub: "Propriétés existantes et réalisations achevées , découvrez chacune d'elles en vidéo.",
        propertiesEyebrow: "Propriétés Existantes",
        propertiesTitle: "Visitez nos propriétés.",
        propertiesLead: "Appuyez sur une propriété pour voir la visite complète, ou utilisez le menu de la carte pour la télécharger.",
        propertyWord: "Propriété",
        enquireBtn: "Contacter sur WhatsApp",
        enquireAria: "Se renseigner sur cette propriété via WhatsApp",
        enquireMessage: "Bonjour Lion Force Investment Company, j'ai vu la Propriété {item} sur votre site et j'aimerais en savoir plus , disponibilité, prix et emplacement. Merci.",
        ctaTitle: "Une propriété vous intéresse ?",
        ctaLead: "Contactez-nous et nous vous guiderons sur la disponibilité, les prix et les prochaines étapes."
      },
      partner: {
        eyebrow: "Devenir Partenaire",
        title: "Bâtissons quelque chose ensemble.",
        lead: "LFIC grandit grâce au partenariat , avec des investisseurs, des propriétaires fonciers, des fournisseurs et des professionnels qui partagent notre engagement à faire des affaires correctement. Si cela vous ressemble, écrivez-nous.",
        card1Title: "Investisseurs",
        card1Desc: "Investissez dans des opportunités immobilières et commerciales avec des conditions claires, des processus documentés et des rendements traçables.",
        card2Title: "Propriétaires Fonciers & Partenaires Immobiliers",
        card2Desc: "Vous avez un terrain ou un bien à développer, vendre ou gérer ? Nous prenons en charge la vérification, les documents et la mise en relation avec les bons acheteurs.",
        card3Title: "Fournisseurs & Prestataires",
        card3Desc: "Fournissez matériaux, équipements ou services professionnels pour nos contrats, nos chantiers et notre logistique dans le Sud-Ouest.",
        ctaLead: "Dites-nous ce qui vous correspond et nous prenons le relais.",
        waBtn: "Discuter sur WhatsApp",
        waAria: "Discuter d'un partenariat sur WhatsApp",
        waMessage: "Bonjour Lion Force Investment Company, j'aimerais discuter d'un partenariat avec vous. Voici ce que j'ai en tête :",
        emailBtn: "Envoyer un E-mail de Partenariat",
        emailSubject: "Demande de partenariat , depuis le site de LFIC"
      },
      contact: {
        statementEyebrow: "Discutons",
        statementHeadline: "CONTACTEZ-NOUS",
        statementSub: "Quel que soit votre projet , immobilier, commerce, fournitures ou logistique , lancez la conversation dès aujourd'hui.",
        formEyebrow: "Envoyer un Message",
        formTitle: "Dites-nous ce dont vous avez besoin.",
        formLead: "Remplissez le formulaire ci-dessous , nous ouvrirons votre application e-mail avec tout prêt à être envoyé. Nous répondons généralement sous un à deux jours ouvrables.",
        labelName: "Nom Complet",
        labelEmail: "Adresse E-mail",
        labelPhone: "Numéro de Téléphone",
        labelSubject: "Objet",
        labelMessage: "Message",
        placeholderSubject: "ex. Demande Immobilière",
        placeholderMessage: "Dites-nous ce que vous cherchez à bâtir, acheter, déplacer ou développer…",
        btnSend: "Envoyer le Message",
        mailtoDefaultSubject: "Demande depuis le site de LFIC",
        statusMailto: "Ouverture de votre application e-mail avec votre message prêt , il ne vous reste qu'à l'envoyer.",
        statusMailtoFallback: "Rien ne s'est ouvert ? Cliquez ici pour l'envoyer manuellement.",
        reachEyebrow: "Contactez-Nous Directement",
        reachTitle: "Vous préférez appeler ou écrire ?",
        cardOfficeTitle: "Siège Social",
        cardOfficeText: "Clerks Quarters, Buea<br>Région du Sud-Ouest, Cameroun",
        cardPhoneTitle: "Téléphone",
        cardEmailTitle: "E-mail",
        cardWhatsAppTitle: "WhatsApp",
        cardFacebookTitle: "Facebook",
        cardTikTokTitle: "TikTok",
        cardInstagramTitle: "Instagram",
        findEyebrow: "Nous Trouver",
        findTitle: "Clerks Quarters, Buea.",
        ctaTitle: "Bâtir des Opportunités, Livrer de la Valeur.",
        ctaLead: "Quel que soit votre projet , immobilier, commerce, fournitures ou logistique , lancez la conversation dès aujourd'hui.",
        ctaBtn: "Appelez-Nous Maintenant"
      }
    }
  };

  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    return saved === "fr" ? "fr" : "en";
  }

  function persistLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function lookup(dict, key) {
    var parts = key.split(".");
    var node = dict;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return null;
      node = node[parts[i]];
    }
    return node == null ? null : node;
  }

  function t(key, lang) {
    var value = lookup(translations[lang] || translations.en, key);
    if (value == null) value = lookup(translations.en, key);
    return value == null ? "" : value;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"), lang);
    });
    document.querySelectorAll("[data-i18n-typewriter]").forEach(function (el) {
      // Only update the source attribute , main.js owns rendering this text
      // (typed animation, or a direct mirror under reduced motion) and
      // watches this attribute for changes so it can restart with the new text.
      el.setAttribute("data-typewriter", t(el.getAttribute("data-i18n-typewriter"), lang));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label"), lang));
    });
    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      el.setAttribute("content", t(el.getAttribute("data-i18n-content"), lang));
    });
    /* WhatsApp deep links: the message is a translated template with a
       {item} placeholder (e.g. the property number), so the prefilled text
       follows the language the visitor picked, including after a switch. */
    /* mailto links whose subject line follows the chosen language */
    document.querySelectorAll("[data-i18n-mailto]").forEach(function (el) {
      var subject = t(el.getAttribute("data-i18n-mailto"), lang);
      el.setAttribute("href", "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject));
    });
    document.querySelectorAll("[data-i18n-wa]").forEach(function (el) {
      var message = t(el.getAttribute("data-i18n-wa"), lang)
        .replace("{item}", el.getAttribute("data-wa-item") || "");
      el.setAttribute("href", WHATSAPP_BASE + "?text=" + encodeURIComponent(message));
    });

    document.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.classList.toggle("is-active", opt.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll(".lang-current").forEach(function (el) {
      el.textContent = lang === "fr" ? "FR" : "EN";
    });
  }

  window.LFIC_I18N = {
    t: function (key) { return t(key, getLang()); },
    getLang: getLang,
    setLang: function (lang) {
      persistLang(lang);
      applyLang(lang);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());

    document.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.addEventListener("click", function (e) {
        e.preventDefault();
        var lang = opt.getAttribute("data-lang");
        window.LFIC_I18N.setLang(lang);

        var navLinks = document.getElementById("navLinks");
        var navToggle = document.getElementById("navToggle");
        if (navLinks) navLinks.classList.remove("is-open");
        if (navToggle) {
          navToggle.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
        var navLang = document.querySelector(".nav-lang");
        if (navLang) navLang.classList.remove("is-open");
      });
    });

    var langToggle = document.querySelector(".lang-toggle");
    var langItem = document.querySelector(".nav-lang");
    if (langToggle && langItem) {
      langToggle.addEventListener("click", function (e) {
        e.preventDefault();
        langItem.classList.toggle("is-open");
      });
      document.addEventListener("click", function (e) {
        if (!langItem.contains(e.target)) langItem.classList.remove("is-open");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") langItem.classList.remove("is-open");
      });
    }
  });
})();
