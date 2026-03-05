'use client'

const testimonials = [
  {
    author: 'Clara M.',
    text:
      "Je vois vraiment mes progrès et mon aisance. La pose a duré pour la première fois 2h15 je n'ai pas vu le temps passer. Lors du remplissage, je lui ouvre la porte et je vois qu'elle a encore un super beau regard ! Vraiment je chéris ces types de récompense, c'est la sève de notre métier, ça me nourrit tellement. Je recommande vivement la formation d'Emmanuella.",
  },
  {
    author: 'Bilan mois 2',
    text:
      '24 poses effectuées, 1 165€ de chiffre d’affaires. Les chiffres parlent d’eux-mêmes !',
  },
  {
    author: 'Bilan mois 3',
    text:
      '40 prestations réalisées sur 19 jours travaillés, un chiffre d’affaires de plus de 2 000€. Temps de prestation réduit de 2h30 à 2h en moyenne.',
  },
  {
    author: 'Participation au programme',
    text:
      "Depuis que je suis rentrée dans le programme, j'ai débloqué quelque chose. Avant, mes poses étaient dures, j'étais lente, mes gestes maladroits. Maintenant tout est plus naturel, je me sens plus efficace et plus douée qu'avant.",
  },
  {
    author: 'Évolution sur l’année',
    text:
      "Merci infiniment pour tout ce que tu m'as apporté cette année, je suis tellement reconnaissante de t'avoir eue sur mon chemin. Tu m'as vraiment permise de me révéler et je suis certaine que ce n'est que le début.",
  },
  {
    author: 'Résultats financiers',
    text:
      'Je viens de passer la barre des 3 500€ de chiffre d’affaires, encore un record battu alors que le mois n’est pas fini. Je suis extrêmement fière de mon évolution.',
  },
  {
    author: 'Objectifs atteints',
    text:
      "J’ai battu tous mes records et atteint l’objectif de 2 000€ de CA que je n’osais même pas me fixer. Je me sens enfin comme une vraie entrepreneuse avec un projet viable.",
  },
  {
    author: 'Confiance & posture',
    text:
      'Emmanuella veut nous faire gagner du temps, nous faire progresser rapidement : ça a été totalement le cas pour moi. Même ma façon de me comporter avec mes clientes a évolué, je suis plus affirmée et plus sereine.',
  },
]

export function FormationTestimonials() {
  return (
    <section className="space-y-6 bg-[#0a0a0a] rounded-3xl px-6 sm:px-8 py-8 sm:py-10 text-white">
      <div className="space-y-2">
        <h3 className="font-playfair text-2xl sm:text-3xl">
          Témoignages de participantes
        </h3>
        <p className="text-sm text-white/70 max-w-2xl">
          Quelques retours de celles qui ont suivi la formation avancée pose classique en ligne.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {testimonials.map((t) => (
          <div
            key={t.author + t.text.slice(0, 20)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <p className="text-xs text-gold/80 uppercase tracking-[0.16em] mb-2">
              {t.author}
            </p>
            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
              “{t.text}”
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

