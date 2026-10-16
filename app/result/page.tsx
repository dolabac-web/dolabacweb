import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchX, TriangleAlert } from 'lucide-react'
import { Certificate } from '@/components/certificate/certificate'
import { CertificateDetails } from '@/components/result/certificate-details'
import { CourseTabs } from '@/components/result/course-tabs'
import { PdfViewer } from '@/components/result/pdf-viewer'
import { VerifySection } from '@/components/verify-section'
import { findCertificatesByCode } from '@/lib/certificates'

export const metadata: Metadata = {
  title: 'نتيجة التحقق | دولاب أكاديمي',
  description: 'نتيجة التحقق من الشهادة التدريبية في دولاب أكاديمي.',
  robots: { index: false },
}

type ResultPageProps = {
  searchParams: Promise<{ name?: string | string[]; code?: string | string[]; course?: string | string[] }>
}

const firstValue = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value) ?? ''

function Notice({ title, description, tone }: { title: string; description: string; tone: 'error' | 'warning' }) {
  const Icon = tone === 'error' ? SearchX : TriangleAlert
  return (
    <section className="mx-auto max-w-xl px-4 pt-16 text-center">
      <span
        className={
          tone === 'error'
            ? 'mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/15 text-destructive'
            : 'mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary'
        }
      >
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-black sm:text-3xl">{title}</h1>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{description}</p>
      <Link href="/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
        العودة إلى الرئيسية
      </Link>
    </section>
  )
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams
  const name = firstValue(params.name).slice(0, 120)
  const code = firstValue(params.code).slice(0, 20)
  const lookup = await findCertificatesByCode(code)

  if (lookup.status !== 'ok' || lookup.certificates.length === 0) {
    const notice =
      lookup.status === 'not-configured'
        ? { title: 'خدمة التحقق غير مهيأة', description: 'لم يتم ربط قاعدة بيانات الشهادات بعد. يرجى المحاولة لاحقاً.', tone: 'warning' as const }
        : lookup.status === 'error'
          ? { title: 'تعذر الاتصال بقاعدة البيانات', description: 'حدث خطأ أثناء جلب بيانات الشهادة. يرجى المحاولة مرة أخرى بعد قليل.', tone: 'warning' as const }
          : { title: 'لم يتم العثور على الشهادة', description: 'تأكد من كتابة كود الطالب بشكل صحيح كما هو مسجل في الأكاديمية، ثم حاول مرة أخرى.', tone: 'error' as const }

    return (
      <>
        <Notice {...notice} />
        <VerifySection defaultName={name} defaultCode={code} />
      </>
    )
  }

  const { certificates } = lookup
  const requestedIndex = Number.parseInt(firstValue(params.course), 10)
  const activeIndex = requestedIndex >= 0 && requestedIndex < certificates.length ? requestedIndex : 0
  const certificate = certificates[activeIndex]
  const fileName = `${certificate.code}.pdf`

  return (
    <>
      <div className="print:hidden">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {certificates.length > 1 && (
            <CourseTabs certificates={certificates} activeIndex={activeIndex} code={code} name={name} />
          )}
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
            <CertificateDetails certificate={certificate} />
            <div className="rounded-2xl border border-border bg-card p-3 sm:p-6 lg:sticky lg:top-28">
              {certificate.pdfViewUrl ? (
                <iframe
                  key={certificate.pdfViewUrl}
                  src={certificate.pdfViewUrl}
                  title={`شهادة ${certificate.name}`}
                  className="block aspect-[1.414/1] w-full rounded-lg border-0 bg-white shadow-2xl shadow-black/50"
                  loading="lazy"
                />
              ) : (
                <Certificate certificate={certificate} className="shadow-2xl shadow-black/50" />
              )}
            </div>
          </div>
        </section>

        <section id="viewer" aria-labelledby="viewer-heading" className="mx-auto max-w-5xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
          <h2 id="viewer-heading" className="mb-4 text-xl font-black">
            معاينة الشهادة
          </h2>
          <PdfViewer
            key={activeIndex}
            fileName={fileName}
            pdfSrc={certificate.pdfViewUrl}
            downloadUrl={certificate.pdfDownloadUrl}
          >
            <Certificate certificate={certificate} />
          </PdfViewer>
        </section>
      </div>

      <div className="hidden print:block">
        <Certificate certificate={certificate} />
      </div>
    </>
  )
}
