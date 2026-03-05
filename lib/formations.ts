export type Formation = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  price: number // cents EUR
  priceDisplay: string
  level: 'debutant' | 'intermediaire' | 'avance'
  levelLabel: string
  duration: string
  modulesCount: number
  includes: {
    pdfs: { name: string; filename: string; videoFilename?: string }[]
    videos: { name: string; filename: string }[]
  }
  highlights: string[]
}

export const formations: Formation[] = [
  // {
  //   id: 'form-fondamentaux',
  //   slug: 'fondamentaux-extensions',
  //   title: 'Fondamentaux des Extensions',
  //   subtitle: 'Maîtrisez les bases essentielles',
  //   description:
  //     'Formation complète pour débuter dans les extensions de cils. Apprenez les techniques fondamentales, la sécurité et l\'hygiène pour des poses impeccables.',
  //   price: 29900,
  //   priceDisplay: '299€',
  //   level: 'debutant',
  //   levelLabel: 'Débutant',
  //   duration: '12h de contenu',
  //   modulesCount: 8,
  //   includes: {
  //     pdfs: [
  //       { name: 'Guide des Fondamentaux', filename: 'fondamentaux-guide.pdf' },
  //       { name: 'Fiches Techniques', filename: 'fondamentaux-fiches.pdf' },
  //       { name: 'Check-list Hygiène', filename: 'fondamentaux-hygiene.pdf' },
  //     ],
  //     videos: [
  //       { name: 'Module 1 — Introduction', filename: 'fondamentaux-mod1.mp4' },
  //       { name: 'Module 2 — Outils & Matériel', filename: 'fondamentaux-mod2.mp4' },
  //       { name: 'Module 3 — Techniques de Base', filename: 'fondamentaux-mod3.mp4' },
  //       { name: 'Module 4 — Pratique Guidée', filename: 'fondamentaux-mod4.mp4' },
  //     ],
  //   },
  //   highlights: [
  //     'Anatomie de l\'œil et types de cils',
  //     'Techniques de pose cil à cil',
  //     'Hygiène et sécurité',
  //     'Mapping et design du regard',
  //     'Gestion des allergies et contre-indications',
  //     'Exercices pratiques guidés',
  //   ],
  // },
  // {
  //   id: 'form-volume-russe',
  //   slug: 'volume-russe-expert',
  //   title: 'Volume Russe Expert',
  //   subtitle: 'Perfectionnez votre technique de volume',
  //   description:
  //     'Approfondissez vos compétences en volume russe. Techniques de bouquets, ventilateurs et poses avancées pour un rendu professionnel.',
  //   price: 39900,
  //   priceDisplay: '399€',
  //   level: 'intermediaire',
  //   levelLabel: 'Intermédiaire',
  //   duration: '16h de contenu',
  //   modulesCount: 10,
  //   includes: {
  //     pdfs: [
  //       { name: 'Guide Volume Russe', filename: 'volume-russe-guide.pdf' },
  //       { name: 'Atlas des Bouquets', filename: 'volume-russe-bouquets.pdf' },
  //       { name: 'Fiches de Mapping', filename: 'volume-russe-mapping.pdf' },
  //     ],
  //     videos: [
  //       { name: 'Module 1 — Théorie du Volume', filename: 'volume-russe-mod1.mp4' },
  //       { name: 'Module 2 — Création de Bouquets', filename: 'volume-russe-mod2.mp4' },
  //       { name: 'Module 3 — Techniques Avancées', filename: 'volume-russe-mod3.mp4' },
  //       { name: 'Module 4 — Cas Pratiques', filename: 'volume-russe-mod4.mp4' },
  //       { name: 'Module 5 — Perfection & Finitions', filename: 'volume-russe-mod5.mp4' },
  //     ],
  //   },
  //   highlights: [
  //     'Création de bouquets 2D à 6D',
  //     'Techniques de ventilateur',
  //     'Mapping avancé pour volume',
  //     'Gestion du poids et de la santé des cils',
  //     'Optimisation du temps de pose',
  //     'Corrections et retouches volume',
  //   ],
  // },
  // {
  //   id: 'form-mega-volume',
  //   slug: 'mega-volume-creatif',
  //   title: 'Mega Volume & Techniques Créatives',
  //   subtitle: 'Explorez les techniques artistiques',
  //   description:
  //     'Maîtrisez le mega volume et les styles créatifs : wet look, fox eye, wispy et plus. Démarquez-vous avec des poses artistiques uniques.',
  //   price: 44900,
  //   priceDisplay: '449€',
  //   level: 'intermediaire',
  //   levelLabel: 'Intermédiaire',
  //   duration: '20h de contenu',
  //   modulesCount: 12,
  //   includes: {
  //     pdfs: [
  //       { name: 'Guide Mega Volume', filename: 'mega-volume-guide.pdf' },
  //       { name: 'Catalogue Styles Créatifs', filename: 'mega-volume-styles.pdf' },
  //       { name: 'Fiches Techniques Avancées', filename: 'mega-volume-fiches.pdf' },
  //       { name: 'Guide Couleurs & Effets', filename: 'mega-volume-couleurs.pdf' },
  //     ],
  //     videos: [
  //       { name: 'Module 1 — Mega Volume Théorie', filename: 'mega-volume-mod1.mp4' },
  //       { name: 'Module 2 — Wet Look', filename: 'mega-volume-mod2.mp4' },
  //       { name: 'Module 3 — Fox Eye', filename: 'mega-volume-mod3.mp4' },
  //       { name: 'Module 4 — Wispy & Textures', filename: 'mega-volume-mod4.mp4' },
  //       { name: 'Module 5 — Couleurs & Mix', filename: 'mega-volume-mod5.mp4' },
  //       { name: 'Module 6 — Portfolio & Signature', filename: 'mega-volume-mod6.mp4' },
  //     ],
  //   },
  //   highlights: [
  //     'Techniques mega volume 8D à 16D',
  //     'Style Wet Look professionnel',
  //     'Fox Eye et regard félin',
  //     'Wispy et textures créatives',
  //     'Extensions colorées et effets spéciaux',
  //     'Développer votre style signature',
  //   ],
  // },
  // {
  //   id: 'form-business',
  //   slug: 'business-developpement',
  //   title: 'Business & Développement',
  //   subtitle: 'Lancez et développez votre activité',
  //   description:
  //     'Tout ce qu\'il faut pour lancer et développer votre activité de lash artist. Marketing, gestion clients, tarification et stratégie de croissance.',
  //   price: 34900,
  //   priceDisplay: '349€',
  //   level: 'intermediaire',
  //   levelLabel: 'Intermédiaire',
  //   duration: '10h de contenu',
  //   modulesCount: 8,
  //   includes: {
  //     pdfs: [
  //       { name: 'Business Plan Template', filename: 'business-plan.pdf' },
  //       { name: 'Guide Marketing Digital', filename: 'business-marketing.pdf' },
  //       { name: 'Modèles de Contrats', filename: 'business-contrats.pdf' },
  //       { name: 'Guide Tarification', filename: 'business-tarification.pdf' },
  //     ],
  //     videos: [
  //       { name: 'Module 1 — Créer son Activité', filename: 'business-mod1.mp4' },
  //       { name: 'Module 2 — Marketing & Réseaux', filename: 'business-mod2.mp4' },
  //       { name: 'Module 3 — Gestion Clientèle', filename: 'business-mod3.mp4' },
  //       { name: 'Module 4 — Croissance & Scaling', filename: 'business-mod4.mp4' },
  //     ],
  //   },
  //   highlights: [
  //     'Création d\'entreprise pas à pas',
  //     'Stratégie marketing Instagram & TikTok',
  //     'Fidélisation et gestion clientèle',
  //     'Tarification optimale et rentabilité',
  //     'Aménagement de votre espace de travail',
  //     'Obligations légales et assurances',
  //   ],
  // },
  {
    id: 'form-technique-niveau-2',
    slug: 'technique-niveau-2',
    title: 'FORMATION AVANCÉE POSE CLASSIQUE EN LIGNE',
    subtitle: 'Pose classique avancée & rétention ELITE',
    description:
      'La formation phare pour maîtriser la pose classique à un niveau expert. De la préparation à la technique signature, en passant par la gestion des cils afro et la dépose sécurisée.',
    price: 30000,
    priceDisplay: '300€',
    level: 'intermediaire',
    levelLabel: 'Intermédiaire',
    duration: '19 leçons',
    modulesCount: 2,
    includes: {
      pdfs: [
        { name: 'Module 0 — Matériel & espace de travail (support)', filename: 'Module 0 L1.pdf', videoFilename: 'Module 0 L1.mp4' },
        { name: 'Module 0 — Introduction (support)', filename: 'Module 0 L2.pdf', videoFilename: 'Module 0 L2.mp4' },
        { name: 'Leçon 1 — Les fondamentaux (support PDF)', filename: 'Module 1 Introduction.pdf', videoFilename: 'Module 1 Introduction.mp4' },
        { name: 'Leçon 2 — Contre-indications (support PDF)', filename: 'Module 1 L1.pdf', videoFilename: 'Module 1 L1.mp4' },
        { name: 'Leçon 3 — Cycle de croissance & rétention (support PDF)', filename: 'Module 1 L2.pdf', videoFilename: 'Module 1 L2.mp4' },
        { name: 'Leçon 4 — Préparation & produits (support PDF)', filename: 'Module 1 L3.pdf', videoFilename: 'Module 1 L3.mp4' },
        { name: 'Leçon 5 — Produits de préparation (support PDF)', filename: 'Module 1 L4.pdf', videoFilename: 'Module 1 L4.mp4' },
        { name: 'Leçon 6 — Maîtrise de la colle (support PDF)', filename: 'Module 1 L5.pdf', videoFilename: 'Module 1 L5.mp4' },
        { name: 'Leçon 7 — Choisir ses extensions (support PDF)', filename: 'Module 1 L6.pdf', videoFilename: 'Module 1 L6.mp4' },
        { name: 'Leçon 8 — Pose harmonieuse (support PDF)', filename: 'Module 1 L7.pdf', videoFilename: 'Module 1 L7.mp4' },
        { name: 'Leçon 9 — Pose sur mesure & mapping (support PDF)', filename: 'Module 1 L8.pdf', videoFilename: 'Module 1 L8.mp4' },
        { name: 'Leçon 10 — Effets & design du regard (support 1)', filename: 'Module 1 L10 1.pdf', videoFilename: 'Module 1 L10.mp4' },
        { name: 'Leçon 10 — Effets & design du regard (support 2)', filename: 'Module 1 L10 2.pdf', videoFilename: 'Module 1 L10.mp4' },
        { name: 'Leçon 11 — Posture & confort (support PDF)', filename: 'Module 1 L2.pdf', videoFilename: 'Module 1 L11.mp4' },
        { name: 'Leçon 12 — Matériel (support PDF)', filename: 'Module 1 L3.pdf', videoFilename: 'Module 1 L12.mp4' },
        { name: 'Leçon 13 — Préparation de la pose (support PDF)', filename: 'Module 1 L4.pdf', videoFilename: 'Module 1 L13.mp4' },
        { name: 'Leçon 14 — Étude de cas modèle (support PDF)', filename: 'Module 1 L5.pdf', videoFilename: 'Module 1 L14.mp4' },
        { name: 'Leçon 16 — Coins internes & externes (support PDF)', filename: 'Module 1 L6.pdf', videoFilename: 'Module 1 L16.mp4' },
        { name: 'Leçon 17 — Cils afro (support PDF)', filename: 'Module 1 L7.pdf', videoFilename: 'Module 1 L17.mp4' },
        { name: 'Leçon 18 — Dépose propre & sécurisée (support PDF)', filename: 'Module 1 L8.pdf', videoFilename: 'Module 1 L18.mp4' },
      ],
      videos: [
        { name: 'Introduction Générale', filename: 'Introduction Generale.mp4' },
        { name: 'MODULE 0 – Matériel & espace de travail ELITE', filename: 'Module 0 L1.mp4' },
        { name: '2.1 Introduction', filename: 'Module 0 L2.mp4' },
        { name: 'Leçon 1 – Les fondamentaux de la pose', filename: 'Module 1 Introduction.mp4' },
        { name: 'Leçon 2 – Les contre-indications', filename: 'Module 1 L1.mp4' },
        { name: 'Leçon 3 – Cycle de croissance & rétention', filename: 'Module 1 L2.mp4' },
        { name: 'Leçon 4 – Éviter les réactions allergiques', filename: 'Module 1 L3.mp4' },
        { name: 'Leçon 5 – Produits de préparation', filename: 'Module 1 L4.mp4' },
        { name: 'Leçon 6 – Maîtrise de la colle', filename: 'Module 1 L5.mp4' },
        { name: 'Leçon 7 – Choisir ses extensions', filename: 'Module 1 L6.mp4' },
        { name: 'Leçon 8 – Pose harmonieuse', filename: 'Module 1 L7.mp4' },
        { name: 'Leçon 9 – Pose sur mesure', filename: 'Module 1 L8.mp4' },
        { name: 'Leçon 10 – Choisir ses effets', filename: 'Module 1 L9.mp4' },
        { name: 'Leçon 11 – La bonne posture', filename: 'Module 1 L10.mp4' },
        { name: 'Leçon 12 – Rappel du matériel', filename: 'Module 1 L11.mp4' },
        { name: 'Leçon 13 – Préparation de la pose', filename: 'Module 1 L12.mp4' },
        { name: 'Leçon 14 – Étude de cas sur modèle', filename: 'Module 1 L13.mp4' },
        { name: 'Leçon 15 – Ma technique signature', filename: 'Module 1 L14.mp4' },
        { name: 'Leçon 16 – Coins internes & externes', filename: 'Module 1 L16.mp4' },
        { name: 'Leçon 17 – Travailler les cils afro', filename: 'Module 1 L17.mp4' },
        { name: 'Leçon 18 – Dépose propre & sécurisée', filename: 'Module 1 L18.mp4' },
        { name: 'Conclusion Générale', filename: 'Conclusion Generale.mp4' },
      ],
    },
    highlights: [
      'Maîtrise complète de la colle et rétention',
      'Technique signature exclusive',
      'Pose sur mesure et effets personnalisés',
      'Spécialisation cils afro',
      'Étude de cas sur modèle humain',
      'Dépose propre et sécurisée',
    ],
  },
]

export function getFormationById(id: string): Formation | undefined {
  return formations.find((f) => f.id === id)
}

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug)
}
