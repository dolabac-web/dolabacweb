import { BookOpen, CalendarDays, Check, Clock, IdCard, Search, Star, User, UserRound } from 'lucide-react'
import { DownloadButton } from '@/components/certificate/download-button'
import type { Certificate } from '@/lib/certificates'

export function CertificateDetails({ certificate }: { certificate: Certificate }) {
  const rows = [
    { label: 'الاسم', value: certificate.name, Icon: User },
    { label: 'كود الطالب', value: certificate.code, Icon: IdCard, ltr: true },
    { label: 'اسم الدورة', value: certificate.course, Icon: BookOpen },
    { label: 'تاريخ التسجيل', value: certificate.registrationDate, Icon: CalendarDays, ltr: true },
    { label: 'عدد الساعات', value: certificate.hours ? `${certificate.hours} ساعة` : '', Icon: Clock },
    { label: 'المحاضر', value: certificate.instructor, Icon: UserRound },
    { label: 'الدرجة', value: certificate.grade, Icon: Star },
  ].filter((row) => row.value)

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="size-7" strokeWidth={3} aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-2xl font-black sm:text-3xl">تم العثور على الشهادة</h1>
        <p className="mt-2 text-sm text-muted-foreground">هكذا بيانات الطالب المسجلة لدينا</p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-2 sm:p-4">
        <table className="w-full text-sm">
          <caption className="sr-only">بيانات الشهادة</caption>
          <tbody>
            {rows.map(({ label, value, Icon, ltr }) => (
              <tr key={label} className="border-b border-border last:border-0">
                <th scope="row" className="w-[42%] py-3.5 ps-2 text-start font-medium text-muted-foreground">
                  <span className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {label}
                  </span>
                </th>
                <td className="py-3.5 pe-2 text-end font-bold text-foreground">
                  <span dir={ltr ? 'ltr' : undefined}>{value}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="#viewer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Search className="size-4" aria-hidden="true" />
          عرض الشهادة
        </a>
        <DownloadButton href={certificate.pdfDownloadUrl} />
      </div>
    </div>
  )
}
