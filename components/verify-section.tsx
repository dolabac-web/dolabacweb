import { Clock, IdCard, Search, ShieldCheck, User, Zap } from 'lucide-react'

type VerifySectionProps = {
  defaultName?: string
  defaultCode?: string
  headingLevel?: 'h1' | 'h2'
}

const features = [
  { label: 'توثيق معتمد', Icon: ShieldCheck },
  { label: 'سريع وسهل', Icon: Zap },
  { label: 'متاح دائماً', Icon: Clock },
]

export function VerifySection({ defaultName, defaultCode, headingLevel = 'h2' }: VerifySectionProps) {
  const Heading = headingLevel

  return (
    <section id="verify" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <div
        className="pointer-events-none absolute -end-10 top-10 hidden h-80 w-32 bg-primary [clip-path:polygon(60%_0,100%_0,40%_100%,0_100%)] md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-2 top-60 hidden h-56 w-16 bg-primary/80 [clip-path:polygon(70%_0,100%_0,30%_100%,0_100%)] md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -start-16 top-0 hidden h-full w-64 bg-white/[0.03] [clip-path:polygon(0_0,40%_0,100%_50%,40%_100%,0_100%)] md:block"
        aria-hidden="true"
      />
      <p
        dir="ltr"
        className="pointer-events-none absolute bottom-10 start-8 hidden -rotate-12 font-script text-3xl font-bold leading-tight text-primary lg:block"
        aria-hidden="true"
      >
        Your
        <br />
        Skills
        <br />
        Matter
      </p>

      <div className="relative mx-auto max-w-xl px-4">
        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-10">
          <div className="text-center">
            <Heading className="text-3xl font-black sm:text-4xl">التحقق من الشهادة</Heading>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              أدخل اسمك الرباعي كما هو مسجل في الأكاديمية مع كود الطالب الخاص بك
            </p>
          </div>

          <form action="/result" method="get" className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="student-name" className="sr-only">
                الاسم الرباعي
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="student-name"
                  name="name"
                  type="text"
                  required
                  minLength={3}
                  autoComplete="name"
                  defaultValue={defaultName}
                  placeholder="الاسم الرباعي كما هو مسجل في الأكاديمية"
                  className="h-14 w-full rounded-xl border border-input bg-background/60 ps-12 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div>
              <label htmlFor="student-code" className="sr-only">
                كود الطالب
              </label>
              <div className="relative">
                <IdCard className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="student-code"
                  name="code"
                  type="text"
                  required
                  autoComplete="off"
                  defaultValue={defaultCode}
                  placeholder="كود الطالب"
                  className="h-14 w-full rounded-xl border border-input bg-background/60 ps-12 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <Search className="size-5" aria-hidden="true" />
              عرض الشهادة
            </button>
          </form>

          <ul className="mt-8 grid grid-cols-3 border-t border-border pt-6 sm:hidden">
            {features.map(({ label, Icon }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-xs font-semibold">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
