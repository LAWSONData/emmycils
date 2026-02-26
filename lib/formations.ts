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
    pdfs: { name: string; filename: string }[]
    videos: { name: string; filename: string }[]
  }
  highlights: string[]
}

export const formations: Formation[] = [
  {
    id: 'form-fondamentaux',
    slug: 'fondamentaux-extensions',
    title: 'Fondamentaux des Extensions',
    subtitle: 'Maîtrisez les bases essentielles',
    description:
      'Formation complète pour débuter dans les extensions de cils. Apprenez les techniques fondamentales, la sécurité et l\'hygiène pour des poses impeccables.',
    price: 29900,
    priceDisplay: '299€',
    level: 'debutant',
    levelLabel: 'Débutant',
    duration: '12h de contenu',
    modulesCount: 8,
    includes: {
      pdfs: [
        { name: 'Guide des Fondamentaux', filename: 'fondamentaux-guide.pdf' },
        { name: 'Fiches Techniques', filename: 'fondamentaux-fiches.pdf' },
        { name: 'Check-list Hygiène', filename: 'fondamentaux-hygiene.pdf' },
      ],
      videos: [
        { name: 'Module 1 — Introduction', filename: 'fondamentaux-mod1.mp4' },
        { name: 'Module 2 — Outils & Matériel', filename: 'fondamentaux-mod2.mp4' },
        { name: 'Module 3 — Techniques de Base', filename: 'fondamentaux-mod3.mp4' },
        { name: 'Module 4 — Pratique Guidée', filename: 'fondamentaux-mod4.mp4' },
      ],
    },
    highlights: [
      'Anatomie de l\'œil et types de cils',
      'Techniques de pose cil à cil',
      'Hygiène et sécurité',
      'Mapping et design du regard',
      'Gestion des allergies et contre-indications',
      'Exercices pratiques guidés',
    ],
  },
  {
    id: 'form-volume-russe',
    slug: 'volume-russe-expert',
    title: 'Volume Russe Expert',
    subtitle: 'Perfectionnez votre technique de volume',
    description:
      'Approfondissez vos compétences en volume russe. Techniques de bouquets, ventilateurs et poses avancées pour un rendu professionnel.',
    price: 39900,
    priceDisplay: '399€',
    level: 'intermediaire',
    levelLabel: 'Intermédiaire',
    duration: '16h de contenu',
    modulesCount: 10,
    includes: {
      pdfs: [
        { name: 'Guide Volume Russe', filename: 'volume-russe-guide.pdf' },
        { name: 'Atlas des Bouquets', filename: 'volume-russe-bouquets.pdf' },
        { name: 'Fiches de Mapping', filename: 'volume-russe-mapping.pdf' },
      ],
      videos: [
        { name: 'Module 1 — Théorie du Volume', filename: 'volume-russe-mod1.mp4' },
        { name: 'Module 2 — Création de Bouquets', filename: 'volume-russe-mod2.mp4' },
        { name: 'Module 3 — Techniques Avancées', filename: 'volume-russe-mod3.mp4' },
        { name: 'Module 4 — Cas Pratiques', filename: 'volume-russe-mod4.mp4' },
        { name: 'Module 5 — Perfection & Finitions', filename: 'volume-russe-mod5.mp4' },
      ],
    },
    highlights: [
      'Création de bouquets 2D à 6D',
      'Techniques de ventilateur',
      'Mapping avancé pour volume',
      'Gestion du poids et de la santé des cils',
      'Optimisation du temps de pose',
      'Corrections et retouches volume',
    ],
  },
  {
    id: 'form-mega-volume',
    slug: 'mega-volume-creatif',
    title: 'Mega Volume & Techniques Créatives',
    subtitle: 'Explorez les techniques artistiques',
    description:
      'Maîtrisez le mega volume et les styles créatifs : wet look, fox eye, wispy et plus. Démarquez-vous avec des poses artistiques uniques.',
    price: 44900,
    priceDisplay: '449€',
    level: 'intermediaire',
    levelLabel: 'Intermédiaire',
    duration: '20h de contenu',
    modulesCount: 12,
    includes: {
      pdfs: [
        { name: 'Guide Mega Volume', filename: 'mega-volume-guide.pdf' },
        { name: 'Catalogue Styles Créatifs', filename: 'mega-volume-styles.pdf' },
        { name: 'Fiches Techniques Avancées', filename: 'mega-volume-fiches.pdf' },
        { name: 'Guide Couleurs & Effets', filename: 'mega-volume-couleurs.pdf' },
      ],
      videos: [
        { name: 'Module 1 — Mega Volume Théorie', filename: 'mega-volume-mod1.mp4' },
        { name: 'Module 2 — Wet Look', filename: 'mega-volume-mod2.mp4' },
        { name: 'Module 3 — Fox Eye', filename: 'mega-volume-mod3.mp4' },
        { name: 'Module 4 — Wispy & Textures', filename: 'mega-volume-mod4.mp4' },
        { name: 'Module 5 — Couleurs & Mix', filename: 'mega-volume-mod5.mp4' },
        { name: 'Module 6 — Portfolio & Signature', filename: 'mega-volume-mod6.mp4' },
      ],
    },
    highlights: [
      'Techniques mega volume 8D à 16D',
      'Style Wet Look professionnel',
      'Fox Eye et regard félin',
      'Wispy et textures créatives',
      'Extensions colorées et effets spéciaux',
      'Développer votre style signature',
    ],
  },
  {
    id: 'form-business',
    slug: 'business-developpement',
    title: 'Business & Développement',
    subtitle: 'Lancez et développez votre activité',
    description:
      'Tout ce qu\'il faut pour lancer et développer votre activité de lash artist. Marketing, gestion clients, tarification et stratégie de croissance.',
    price: 34900,
    priceDisplay: '349€',
    level: 'intermediaire',
    levelLabel: 'Intermédiaire',
    duration: '10h de contenu',
    modulesCount: 8,
    includes: {
      pdfs: [
        { name: 'Business Plan Template', filename: 'business-plan.pdf' },
        { name: 'Guide Marketing Digital', filename: 'business-marketing.pdf' },
        { name: 'Modèles de Contrats', filename: 'business-contrats.pdf' },
        { name: 'Guide Tarification', filename: 'business-tarification.pdf' },
      ],
      videos: [
        { name: 'Module 1 — Créer son Activité', filename: 'business-mod1.mp4' },
        { name: 'Module 2 — Marketing & Réseaux', filename: 'business-mod2.mp4' },
        { name: 'Module 3 — Gestion Clientèle', filename: 'business-mod3.mp4' },
        { name: 'Module 4 — Croissance & Scaling', filename: 'business-mod4.mp4' },
      ],
    },
    highlights: [
      'Création d\'entreprise pas à pas',
      'Stratégie marketing Instagram & TikTok',
      'Fidélisation et gestion clientèle',
      'Tarification optimale et rentabilité',
      'Aménagement de votre espace de travail',
      'Obligations légales et assurances',
    ],
  },
  {
    id: 'form-certification',
    slug: 'certification-pro-complete',
    title: 'Certification Pro Complète',
    subtitle: 'Le parcours complet pour devenir experte',
    description:
      'La formation la plus complète : toutes les techniques, du cil à cil au mega volume, plus le business. Devenez une lash artist certifiée Emmy Cils.',
    price: 79900,
    priceDisplay: '799€',
    level: 'avance',
    levelLabel: 'Avancé',
    duration: '40h de contenu',
    modulesCount: 24,
    includes: {
      pdfs: [
        { name: 'Guide Complet Certification', filename: 'certification-guide.pdf' },
        { name: 'Toutes les Fiches Techniques', filename: 'certification-fiches.pdf' },
        { name: 'Kit Business Complet', filename: 'certification-business.pdf' },
        { name: 'Manuel d\'Examen', filename: 'certification-examen.pdf' },
        { name: 'Certificat Emmy Cils', filename: 'certification-diplome.pdf' },
      ],
      videos: [
        { name: 'Module 1-8 — Fondamentaux', filename: 'certification-fondamentaux.mp4' },
        { name: 'Module 9-14 — Volume Russe', filename: 'certification-volume.mp4' },
        { name: 'Module 15-20 — Créatif & Mega', filename: 'certification-creatif.mp4' },
        { name: 'Module 21-24 — Business & Exam', filename: 'certification-business.mp4' },
      ],
    },
    highlights: [
      'Accès à TOUTES les formations',
      'Cil à cil, volume, mega volume, créatif',
      'Module business et marketing complet',
      'Certificat professionnel Emmy Cils',
      'Support personnalisé pendant 3 mois',
      'Mises à jour gratuites à vie',
    ],
  },
]

export function getFormationById(id: string): Formation | undefined {
  return formations.find((f) => f.id === id)
}

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug)
}
