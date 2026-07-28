interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`relative block h-11 w-36 overflow-hidden rounded-lg ${className}`}
      aria-label="NovaStore"
    >
      <img
        src="/logo.png"
        alt="NovaStore"
        className="absolute -left-10 -top-[53px] h-[158px] max-w-none"
      />
    </span>
  )
}
