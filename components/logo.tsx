'use client'

interface LogoProps {
  color?: string
  className?: string
}

export function Logo({ color = '#0a0a0a', className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Emmy Cils"
    >
      {/* "Emmy" — bold high-contrast serif */}
      <text
        x="10"
        y="68"
        fontFamily="'Playfair Display', serif"
        fontWeight="800"
        fontSize="72"
        fill={color}
        letterSpacing="-2"
      >
        Emmy
      </text>

      {/* "Cils" — elegant script */}
      <text
        x="90"
        y="108"
        fontFamily="'Playfair Display', serif"
        fontWeight="400"
        fontStyle="italic"
        fontSize="42"
        fill={color}
        letterSpacing="1"
      >
        Cils
      </text>

      {/* Eyelash detail — cluster of curved lashes near the 's' */}
      <g transform="translate(210, 78)" fill={color}>
        {/* Individual lash strokes */}
        <path d="M0,28 Q8,-2 6,-14" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M3,28 Q12,-4 12,-16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M6,27 Q16,-2 18,-18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M9,26 Q20,0 24,-16" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M11,25 Q22,4 29,-12" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M13,24 Q24,6 33,-8" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M15,23 Q26,8 36,-4" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M16,22 Q27,10 38,0" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M17,22 Q28,12 39,4" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Lash band / base curve */}
        <path d="M-2,30 Q10,24 20,24 Q30,24 40,28" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
