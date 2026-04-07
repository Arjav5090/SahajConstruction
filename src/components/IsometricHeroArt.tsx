/** Lightweight isometric-style SVG decoration (brand teal, no external assets). */
function IsometricHeroArt({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 120 L100 88 L160 120 L100 152 Z"
        fill="#0c8894"
        fillOpacity="0.2"
      />
      <path
        d="M100 88 L100 40 L160 72 L160 120 Z"
        fill="#2ea2a3"
        fillOpacity="0.35"
      />
      <path d="M100 88 L40 120 L40 72 L100 40 Z" fill="#0c8894" fillOpacity="0.45" />
      <path
        d="M70 100 L100 84 L130 100 L100 116 Z"
        fill="#ffffff"
        fillOpacity="0.9"
      />
      <circle cx="100" cy="68" r="6" fill="#2ea2a3" />
    </svg>
  )
}

export default IsometricHeroArt
