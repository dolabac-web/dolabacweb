import Image from 'next/image'
import { Clock, ShieldCheck, Zap } from 'lucide-react'

const features = [
  { label: 'توثيق معتمد', Icon: ShieldCheck },
  { label: 'سريع وسهل', Icon: Zap },
  { label: 'متاح دائماً', Icon: Clock },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pt-6 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
        <div className="relative z-10 order-2 flex flex-col gap-6 pb-4 lg:order-1">
          <h1 className="text-balance text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">شهادتك</span>
            <span className="block">
              <span className="text-white">من </span>
              <span className="text-primary">دولاب أكاديمي</span>
            </span>
          </h1>
          <p className="max-w-md text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
            تحقق من شهادتك التدريبية واحصل عليها بسهولة وبخطوة واحدة.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#verify"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              تحقق من شهادتك الآن
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              تعرّف على الأكاديمية
            </a>
          </div>
          <ul className="mt-2 hidden items-center gap-0 sm:flex">
            {features.map(({ label, Icon }, index) => (
              <li key={label} className="flex items-center">
                {index > 0 && <span className="mx-6 h-8 w-px bg-border" aria-hidden="true" />}
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl sm:aspect-[4/4] lg:aspect-[4/5] lg:max-w-none">
            <Image
              src="/images/hero-student.png"
              alt="طالب من دولاب أكاديمي يحمل دفتره بثقة"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" aria-hidden="true" />
          </div>
          <p
            dir="ltr"
            className="absolute end-auto start-4 top-6 -rotate-12 font-script text-2xl font-bold leading-tight text-primary sm:text-3xl lg:start-auto lg:-end-2"
            aria-hidden="true"
          >
            Real Skills
            <br />
            Better Future
          </p>
        </div>
      </div>
    </section>
  )
}
