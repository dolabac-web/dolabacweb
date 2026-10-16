import { Award, GraduationCap, Users } from 'lucide-react'

const stats = [
  { value: '+5000', label: 'طالب وطالبة', Icon: Users },
  { value: '+120', label: 'دورة تدريبية', Icon: GraduationCap },
  { value: '+4800', label: 'شهادة معتمدة', Icon: Award },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-card/40 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold text-primary">عن الأكاديمية</p>
          <h2 className="mt-2 text-balance text-3xl font-black sm:text-4xl">
            مهارات حقيقية لمستقبل أفضل
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-loose text-foreground/80">
            دولاب أكاديمي مركز تدريبي في الإسكندرية يقدّم دورات عملية في البرمجة والتصميم وتحليل البيانات،
            بإشراف نخبة من المحاضرين. كل شهادة تصدر من الأكاديمية تحمل كوداً فريداً يمكن التحقق منه في أي وقت.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(({ value, label, Icon }) => (
            <li key={label} className="rounded-2xl border border-border bg-card p-6 text-center">
              <Icon className="mx-auto size-7 text-primary" aria-hidden="true" />
              <p dir="ltr" className="mt-3 text-3xl font-black">
                {value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
