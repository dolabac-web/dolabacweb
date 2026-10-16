import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  tone?: 'light' | 'dark'
}

export function Logo({ className, tone = 'light' }: LogoProps) {
  return (
    <span
      className={cn('inline-flex select-none flex-col items-center font-black leading-[0.95]', className)}
      aria-label="دولاب أكاديمي"
      role="img"
    >
      <span className="text-primary">دو</span>
      <span className={cn('-mt-[0.3em]', tone === 'light' ? 'text-white' : 'text-[#141414]')}>لاب</span>
      <span
        dir="ltr"
        className={cn(
          'mt-[0.18em] whitespace-nowrap text-[0.2em] font-bold leading-none',
          tone === 'light' ? 'text-white' : 'text-[#141414]',
        )}
      >
        you can{' '}
        <span className="rounded-[0.15em] bg-primary px-[0.2em] text-[#141414]">do</span> it
      </span>
    </span>
  )
}
