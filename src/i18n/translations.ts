import type { Lang } from "../types";

export const translations = {
  fr: {
    nav_about: "À propos",
    nav_expertise: "Expertise",
    nav_projects: "Projets",
    nav_contact: "Me contacter",

    contact_modal_title: "Me contacter",
    contact_modal_desc: "Une question, une opportunité ? Remplis le formulaire, ça ouvrira ton client mail avec tout pré-rempli.",
    contact_name: "Nom",
    contact_email: "E-mail",
    contact_subject: "Sujet",
    contact_message: "Message",
    contact_submit: "Envoyer le message",
    contact_close: "Fermer",

    hero_title_1: "Software Engineer",
    hero_title_2: "Backend & Data.",
    hero_desc:
      "Je conçois des architectures distribuées robustes, explore les systèmes interactifs et intègre des agents IA. L'alliance de la rigueur algorithmique et de l'innovation.",
    hero_cta_projects: "Voir mes réalisations",
    hero_cta_github: "GitHub",

    about_eyebrow: "À propos de moi",
    about_title: "Transformer des concepts complexes en systèmes scalables.",
    about_p1_pre: "Étudiant en Master spécialisé en ",
    about_p1_strong: "Génie Logiciel et Bases de Données",
    about_p1_post:
      ". Je construis des architectures logicielles axées sur le Backend, la Data et l'IA, avec un souci constant pour le \"clean design\" et la maintenabilité.",
    about_p2:
      "En dehors du développement d'entreprise traditionnel, j'explore le Game Dev, les simulations physiques et les systèmes interactifs. Mon objectif actuel est l'approfondissement des Systèmes Distribués et des Agents IA autonomes.",
    about_approach_title: "Mon approche",
    about_approach_desc: "Une itération constante pour des architectures parfaites.",

    expertise_title: "Domaines d'expertise",
    exp_backend_title: "Systèmes Backend",
    exp_backend_desc:
      "Architectures d'applications, APIs et micro-services. Focus sur la maintenabilité, la scalabilité et les principes de clean design.",
    exp_data_title: "Data & Bases de Données",
    exp_data_desc:
      "Modélisation complexe, analyse, conception de Data Warehouse et architectures orientées flux de données.",
    exp_ai_title: "Intelligence Artificielle",
    exp_ai_desc:
      "Développement d'Agents IA autonomes, automatisation de processus et intégration de systèmes logiciels intelligents.",
    exp_gamedev_title: "Game Dev & Physique",
    exp_gamedev_desc:
      "Création de mécaniques de jeu, implémentation de simulations physiques et conception de technologies interactives.",

    tech_eyebrow: "Ma Stack",
    tech_title: "Technologies Maîtrisées",
    tech_cat_languages: "Langages",
    tech_cat_backend: "Backend & Data",
    tech_cat_gamedev: "Game Dev & Systèmes",
    level_expert: "Fondation / Expert",
    level_advanced: "Avancé",
    level_intermediate: "Intermédiaire",
    level_progress: "En cours",

    projects_title: "Projets phares",
    proj_robia_title: "ROBIA System & Copilot",
    proj_robia_desc:
      "Conception et développement de l'architecture backend d'un système intelligent. Conception des flux de données et intégration sécurisée d'outils analytiques. Le projet est sous clause de confidentialité, l'accent est donc mis sur la scalabilité, la sécurité des accès et la maintenabilité du code côté serveur.",
    proj_robia_private: "Code source confidentiel",
    proj_ocean_title: "Ocean Data Story",
    proj_ocean_desc:
      "Visualisation interactive (scrollytelling) explorant la désoxygénation globale des océans et l'expansion des \"zones mortes\" marines. Développé en utilisant des données NetCDF 3D dans le cadre du Copernicus Marine Dataviz Challenge 2026.",
    proj_ocean_cta: "Voir sur GitHub",
    proj_dtb_title: "Don't Turn Back",
    proj_dtb_desc:
      "Création d'un prototype de jeu jouable dans le cadre de la Game Jam+ 2025-2026. Travail sur les mécaniques de base en C# et implémentation d'effets visuels personnalisés via ShaderLab.",
    proj_dtb_cta: "Voir le prototype",

    footer_title: "Prêt à collaborer ?",
    footer_desc:
      "Si vous cherchez un profil technique capable de concevoir des architectures robustes et de résoudre des problèmes complexes, discutons-en.",
    footer_credit: "© 2026 Nirina Fifaliana Andriniaina. Built with logic & creativity.",
  },
  en: {
    nav_about: "About",
    nav_expertise: "Expertise",
    nav_projects: "Projects",
    nav_contact: "Contact Me",

    contact_modal_title: "Get in touch",
    contact_modal_desc: "A question, an opportunity? Fill in the form — it will open your mail client with everything pre-filled.",
    contact_name: "Name",
    contact_email: "Email",
    contact_subject: "Subject",
    contact_message: "Message",
    contact_submit: "Send message",
    contact_close: "Close",

    hero_title_1: "Software Engineer",
    hero_title_2: "Backend & Data.",
    hero_desc:
      "I design robust distributed architectures, explore interactive systems, and integrate AI agents. Combining algorithmic rigor with innovation.",
    hero_cta_projects: "View my work",
    hero_cta_github: "GitHub",

    about_eyebrow: "About me",
    about_title: "Turning complex concepts into scalable systems.",
    about_p1_pre: "Master's student specialized in ",
    about_p1_strong: "Software Engineering and Databases",
    about_p1_post:
      ". I build software architectures focused on Backend, Data, and AI, with a constant care for clean design and maintainability.",
    about_p2:
      "Beyond traditional enterprise development, I explore Game Dev, physics simulations, and interactive systems. My current focus is deepening my knowledge of Distributed Systems and autonomous AI Agents.",
    about_approach_title: "My approach",
    about_approach_desc: "Constant iteration towards flawless architectures.",

    expertise_title: "Areas of expertise",
    exp_backend_title: "Backend Systems",
    exp_backend_desc:
      "Application architectures, APIs, and micro-services. Focus on maintainability, scalability, and clean design principles.",
    exp_data_title: "Data & Databases",
    exp_data_desc:
      "Complex modeling, analysis, Data Warehouse design, and data-flow-oriented architectures.",
    exp_ai_title: "Artificial Intelligence",
    exp_ai_desc:
      "Building autonomous AI Agents, process automation, and intelligent software system integration.",
    exp_gamedev_title: "Game Dev & Physics",
    exp_gamedev_desc:
      "Building game mechanics, implementing physics simulations, and designing interactive technologies.",

    tech_eyebrow: "My Stack",
    tech_title: "Technologies I Use",
    tech_cat_languages: "Languages",
    tech_cat_backend: "Backend & Data",
    tech_cat_gamedev: "Game Dev & Systems",
    level_expert: "Foundation / Expert",
    level_advanced: "Advanced",
    level_intermediate: "Intermediate",
    level_progress: "Learning",

    projects_title: "Featured projects",
    proj_robia_title: "ROBIA System & Copilot",
    proj_robia_desc:
      "Design and development of the backend architecture for an intelligent system. Designed data flows and secure integration of analytics tools. The project is under an NDA, so the focus here is on scalability, access security, and server-side maintainability.",
    proj_robia_private: "Confidential source code",
    proj_ocean_title: "Ocean Data Story",
    proj_ocean_desc:
      "Interactive scrollytelling visualization exploring global ocean deoxygenation and the expansion of marine \"dead zones\". Built using 3D NetCDF data for the Copernicus Marine Dataviz Challenge 2026.",
    proj_ocean_cta: "View on GitHub",
    proj_dtb_title: "Don't Turn Back",
    proj_dtb_desc:
      "Playable game prototype built for the Game Jam+ 2025-2026. Worked on core mechanics in C# and implemented custom visual effects via ShaderLab.",
    proj_dtb_cta: "View the prototype",

    footer_title: "Ready to collaborate?",
    footer_desc:
      "If you're looking for a technical profile capable of designing robust architectures and solving complex problems, let's talk.",
    footer_credit: "© 2026 Nirina Fifaliana Andriniaina. Built with logic & creativity.",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof (typeof translations)["fr"];

export function getTranslation(lang: Lang, key: TranslationKey): string {
  const dictionary: Record<TranslationKey, string> = lang === "fr" ? translations.fr : translations.en;
  return dictionary[key];
}