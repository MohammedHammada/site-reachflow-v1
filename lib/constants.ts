import { Megaphone, Camera, Code, Search, Target, Rocket, TrendingUp, Shield, BarChart3, Eye, Zap, Globe } from "lucide-react";

export const siteConfig = {
  name: "Reachflow",
  tagline: "Votre croissance. Notre obsession.",
  description: "Agence de croissance digitale Full-Cycle. Media Buying, Production de Contenu, Développement Web.",
  url: "https://reachflow.ma",
  email: "contact@reachflow.ma",
  phone: "+212663291741",
  location: "Maroc",
  whatsapp: "https://wa.me/212663291741",
  socials: {
    instagram: "https://www.instagram.com/reachflow.ma?igsh=OW5qaHJjM2YxYno=",
    facebook: "https://www.facebook.com/profile.php?id=61571066158000",
    linkedin: "https://www.linkedin.com/in/reachflow-agency-4952953b3/",
  },
};

export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Expertise", href: "/services" },
  { label: "R\u00e9alisations", href: "/travaux" },
  { label: "Notre ADN", href: "/a-propos" },
  { label: "Parlons-en", href: "/contact" },
];

export const services = [
  {
    icon: Megaphone,
    title: "Media Buying",
    shortDescription: "Acquisition et branding sur Meta, Google, TikTok, YouTube. Des campagnes qui convertissent, pas qui d\u00e9corent.",
    description: "Strat\u00e9gies d\u2019acquisition et de branding agressives qui transforment chaque dirham investi en r\u00e9sultats mesurables.",
    platforms: ["Meta Ads", "Google Ads", "TikTok Ads", "YouTube Ads"],
    campaignTypes: ["Acquisition", "Branding", "Retargeting", "Scaling"],
    includes: ["Strat\u00e9gie & Audit", "Cr\u00e9ation des campagnes", "Gestion quotidienne", "Optimisation continue", "Reporting transparent"],
  },
  {
    icon: Camera,
    title: "Production de Contenu",
    shortDescription: "Shootings studio, vid\u00e9os publicitaires, Reels, interviews. Du contenu qui arr\u00eate le scroll.",
    description: "Le diff\u00e9renciateur. Une esth\u00e9tique \u00e9ditoriale haute-couture appliqu\u00e9e \u00e0 chaque industrie. On bannit les pubs moches.",
    formats: ["Photo \u00e9ditoriale", "Vid\u00e9o publicitaire", "Reels & TikToks", "Interviews & T\u00e9moignages", "Carrousels"],
    process: ["Script & Direction artistique", "Casting & Pr\u00e9paration", "Tournage studio & ext\u00e9rieur", "Montage & Post-production"],
    includes: ["Direction artistique", "Shooting studio", "Tournage ext\u00e9rieur", "Montage professionnel", "Formats multi-plateformes"],
  },
  {
    icon: Code,
    title: "D\u00e9veloppement Web",
    shortDescription: "Sites vitrine, e-commerce, landing pages. La destination o\u00f9 vos clients convertissent.",
    description: "Construction de la destination. Des sites qui ne sont pas juste beaux \u2014 ils convertissent, traquent, et performent.",
    types: ["Landing Pages", "Sites Vitrine", "E-Commerce", "Syst\u00e8mes de R\u00e9servation"],
    platforms: ["Shopify", "WordPress", "Sur mesure"],
    includes: ["Design UI/UX", "D\u00e9veloppement", "Tracking & Pixel", "Optimisation conversion", "Formation client"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Diagnostic",
    description: "Audit complet de votre pr\u00e9sence digitale et identification des opportunit\u00e9s de croissance.",
  },
  {
    number: "02",
    title: "Strat\u00e9gie",
    description: "Plan d\u2019action sur mesure avec objectifs clairs, KPIs, et timeline de d\u00e9ploiement.",
  },
  {
    number: "03",
    title: "Production",
    description: "Ex\u00e9cution des livrables : contenu, site web, campagnes. Chaque pixel a un objectif.",
  },
  {
    number: "04",
    title: "Lancement & Optimisation",
    description: "D\u00e9ploiement, monitoring en temps r\u00e9el, et optimisation continue bas\u00e9e sur les data.",
  },
];

export const usps = [
  {
    icon: Eye,
    title: "Autorit\u00e9 Visuelle",
    description: "Esth\u00e9tique haute-couture pour chaque industrie. On bannit les pubs moches.",
  },
  {
    icon: Zap,
    title: "\u00c9cosyst\u00e8me Sans Friction",
    description: "On parle Dev ET Marketing. Le pixel marche parce qu\u2019on a construit le site.",
  },
  {
    icon: BarChart3,
    title: "ROI Mesurable",
    description: "Qualit\u00e9 haute, tarifs justes. Chaque dirham investi est trac\u00e9 et optimis\u00e9.",
  },
];

export const heroStats = [
  { value: 30, suffix: "+", label: "Projets Livrés" },
  { value: 1, suffix: "M", label: "MAD en Dépenses Gérées" },
  { value: 3, suffix: "x", label: "ROAS Moyen" },
];

export const toolLogos = [
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "Shopify",
  "WordPress",
  "Figma",
  "Premiere Pro",
];

export const values = [
  {
    icon: Shield,
    title: "Qualit\u00e9 Sans Compromis",
    quote: "Si \u00e7a fait cheap, on ne livre pas.",
    description: "Chaque livrable passe par un contr\u00f4le qualit\u00e9 rigoureux. Notre r\u00e9putation est notre actif le plus pr\u00e9cieux.",
  },
  {
    icon: BarChart3,
    title: "V\u00e9rit\u00e9 Data-Driven",
    quote: "Les sentiments ne comptent pas ; les chiffres oui.",
    description: "On ne devine pas, on mesure. Chaque d\u00e9cision est appuy\u00e9e par des donn\u00e9es concr\u00e8tes et v\u00e9rifiables.",
  },
  {
    icon: Eye,
    title: "Transparence Radicale",
    quote: "On partage les victoires et les \u00e9checs.",
    description: "Pas de jargon pour masquer l\u2019absence de r\u00e9sultats. Vous avez acc\u00e8s \u00e0 tout, en temps r\u00e9el.",
  },
];

export const enemies = [
  {
    icon: Globe,
    title: "La Mer de M\u00e9diocrit\u00e9",
    description: "Le contenu copi\u00e9-coll\u00e9 et g\u00e9n\u00e9rique qui noie votre marque dans la masse.",
  },
  {
    icon: TrendingUp,
    title: "Le Panier Perc\u00e9",
    description: "Des milliers de dirhams en pubs envoy\u00e9s vers des sites cass\u00e9s qui ne convertissent pas.",
  },
  {
    icon: Search,
    title: "La Bo\u00eete Noire",
    description: "Les agences qui noient les clients dans le jargon pour masquer l\u2019absence de r\u00e9sultats.",
  },
];

export const conceptStudies = [
  {
    id: "media-buying",
    category: "Media Buying",
    title: "G\u00e9n\u00e9ration de Leads pour une Agence Immobili\u00e8re de Luxe",
    industry: "Immobilier de Luxe",
    problem: "L\u2019agence d\u00e9pense en publicit\u00e9 mais les leads g\u00e9n\u00e9r\u00e9s ne sont pas qualifi\u00e9s. Le co\u00fbt par lead qualifi\u00e9 est 3x au-dessus du benchmark.",
    approach: [
      "Audit complet des campagnes existantes et identification des fuites",
      "Restructuration des audiences avec segmentation par pouvoir d\u2019achat",
      "Cr\u00e9ation de vid\u00e9os testimoniales premium pour la preuve sociale",
      "Funnel de qualification multi-\u00e9tapes pour filtrer les leads en amont",
    ],
    deliverables: [
      "Strat\u00e9gie d\u2019acquisition compl\u00e8te",
      "4 vid\u00e9os testimoniales",
      "Landing page de qualification",
      "Tableau de bord de suivi en temps r\u00e9el",
    ],
    objectives: [
      "R\u00e9duction du CPL de 40%",
      "Taux de qualification des leads \u00e0 60%+",
      "ROAS cible de 4x sous 90 jours",
    ],
  },
  {
    id: "content-production",
    category: "Production de Contenu",
    title: "Refonte Visuelle pour un Centre de Formation Premium",
    industry: "Formation & \u00c9ducation",
    problem: "Le centre poss\u00e8de une excellente offre p\u00e9dagogique mais son image de marque est amateur. Le taux d\u2019engagement sur les r\u00e9seaux est inf\u00e9rieur \u00e0 1%.",
    approach: [
      "D\u00e9finition d\u2019une direction artistique \u00e9ditoriale align\u00e9e avec le positionnement premium",
      "Shooting studio professionnel de l\u2019\u00e9quipe et des locaux",
      "Cr\u00e9ation de 12 assets visuels pour les r\u00e9seaux sociaux",
      "Production de 4 Reels dynamiques mettant en avant l\u2019exp\u00e9rience \u00e9tudiant",
    ],
    deliverables: [
      "Charte visuelle compl\u00e8te",
      "12 visuels haute qualit\u00e9",
      "4 Reels/vid\u00e9os courtes",
      "Guide de publication",
    ],
    objectives: [
      "Augmentation du taux d\u2019engagement de 3x",
      "Coh\u00e9rence visuelle sur tous les canaux",
      "Positionnement per\u00e7u comme premium en 30 jours",
    ],
  },
  {
    id: "web-development",
    category: "D\u00e9veloppement Web",
    title: "\u00c9cosyst\u00e8me Digital pour une Clinique Esth\u00e9tique",
    industry: "Sant\u00e9 & Esth\u00e9tique",
    problem: "Aucun site web, leads uniquement via Instagram DMs, z\u00e9ro tracking. Impossible de mesurer le ROI des campagnes ou d\u2019optimiser le parcours client.",
    approach: [
      "Conception d\u2019une landing page conversion-optimized avec preuve sociale",
      "Int\u00e9gration d\u2019un syst\u00e8me de r\u00e9servation en ligne",
      "Installation du pixel tracking et configuration des \u00e9v\u00e9nements de conversion",
      "Connexion avec les campagnes Meta pour un funnel end-to-end",
    ],
    deliverables: [
      "Landing page responsive",
      "Syst\u00e8me de r\u00e9servation int\u00e9gr\u00e9",
      "Pixel tracking complet",
      "Dashboard analytics",
    ],
    objectives: [
      "Passage de 0% \u00e0 100% de tra\u00e7abilit\u00e9 des leads",
      "R\u00e9duction du cycle de conversion de 7 jours \u00e0 48h",
      "Augmentation du taux de conversion de 25%+",
    ],
  },
];
