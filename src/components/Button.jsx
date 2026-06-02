

const Button = ({ children, onClick }) => {
  return (
    <button
      data-cursor="link"
      onClick={onClick}
      className="
        group relative overflow-hidden
        rounded-full px-8 py-4
        font-semibold text-white
        backdrop-blur-md
        border border-white/20
        bg-white/10
        shadow-[0_0_25px_rgba(64,144,192,0.25)]
        transition-all duration-300
        hover:scale-105
        hover:border-white/40
        hover:shadow-[0_0_40px_rgba(64,144,192,0.45)]
        active:scale-95
      "
    >
      {/* Glow */}
      <span
        className="
          absolute inset-0
          bg-gradient-to-r
          from-brand/20
          via-white/10
          to-brand-yellow/20
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Shine */}
      <span
        className="
          absolute -left-20 top-0 h-full w-12
          rotate-12 bg-white/20
          transition-all duration-700
          group-hover:left-[120%]
        "
      />

      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default Button