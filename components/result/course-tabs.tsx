import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import type { Certificate } from '@/lib/certificates'
import { cn } from '@/lib/utils'

type CourseTabsProps = {
  certificates: Certificate[]
  activeIndex: number
  code: string
  name: string
}

export function CourseTabs({ certificates, activeIndex, code, name }: CourseTabsProps) {
  return (
    <nav aria-label="اختر الدورة" className="mb-8">
      <p className="mb-3 text-sm font-semibold text-muted-foreground">
        {`لديك ${certificates.length} شهادات مسجلة بهذا الكود — اختر الدورة:`}
      </p>
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {certificates.map((certificate, index) => {
          const isActive = index === activeIndex
          const params = new URLSearchParams({ code, course: String(index) })
          if (name) params.set('name', name)
          return (
            <li key={`${certificate.course}-${index}`} className="shrink-0">
              <Link
                href={`/result?${params.toString()}`}
                scroll={false}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary/60',
                )}
              >
                <BookOpen className="size-4" aria-hidden="true" />
                {certificate.course || `الدورة ${index + 1}`}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
