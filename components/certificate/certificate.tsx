import { Logo } from '@/components/logo'
import { formatCertificateDate, type Certificate as CertificateData } from '@/lib/certificates'
import { cn } from '@/lib/utils'

type CertificateProps = {
  certificate: CertificateData
  className?: string
}

function Corner({ className }: { className: string }) {
  return (
    <div className={cn('pointer-events-none absolute size-[18cqw]', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-[#161616] [clip-path:polygon(0_0,100%_0,0_100%)]" />
      <div className="absolute inset-0 bg-[#f6a01a] [clip-path:polygon(62%_0,80%_0,0_80%,0_62%)]" />
      <div className="absolute inset-0 bg-[#f6a01a] [clip-path:polygon(92%_0,100%_0,0_100%,0_92%)]" />
    </div>
  )
}

function Signature({ name, title }: { name: string; title: string }) {
  return (
    <div className="flex w-[22cqw] flex-col items-center">
      <span dir="ltr" className="font-script text-[3.2cqw] leading-none text-[#1d1d1d]" aria-hidden="true">
        {name}
      </span>
      <span className="mt-[0.6cqw] h-px w-full bg-[#1d1d1d]/40" />
      <span className="mt-[0.6cqw] text-center text-[1.3cqw] font-semibold leading-snug text-[#3a3a3a]">{title}</span>
    </div>
  )
}

export function Certificate({ certificate, className }: CertificateProps) {
  return (
    <div className={cn('@container w-full', className)}>
      <article
        aria-label={`شهادة ${certificate.name}`}
        className="relative aspect-[1.414/1] w-full overflow-hidden bg-[#fbf9f4] text-[#141414] [background-image:radial-gradient(circle_at_50%_40%,#ffffff_0%,#f6f2ea_75%)]"
      >
        <div className="pointer-events-none absolute inset-[2.2cqw] border border-[#f6a01a]/60" aria-hidden="true" />
        <Corner className="start-0 top-0 [transform:scaleX(-1)]" />
        <Corner className="end-0 top-0" />
        <Corner className="bottom-0 start-0 [transform:scale(-1,-1)]" />
        <Corner className="bottom-0 end-0 [transform:scaleY(-1)]" />

        <div className="relative flex h-full flex-col items-center px-[14cqw] pt-[4.5cqw] pb-[3.5cqw] text-center">
          <Logo tone="dark" className="text-[6cqw]" />
          <p className="mt-[1cqw] text-[1.8cqw] font-bold">دولاب أكاديمي</p>
          <h3 className="mt-[1.4cqw] text-[4.4cqw] font-black leading-tight">شهادة تدريبية معتمدة</h3>
          <p className="mt-[1.6cqw] text-[1.6cqw] text-[#3a3a3a]">تشهد إدارة دولاب أكاديمي بأن</p>
          <p className="mt-[0.8cqw] text-[3.2cqw] font-black leading-tight">{certificate.name}</p>
          <p className="mt-[0.8cqw] text-[1.5cqw] text-[#3a3a3a]">قد أتم بنجاح الدورة التدريبية بعنوان</p>
          <p className="mt-[0.6cqw] text-[2.3cqw] font-extrabold">{certificate.course}</p>
          <p className="mt-[0.8cqw] text-[1.5cqw] text-[#3a3a3a]">
            {'وذلك في الفترة من '}
            <span dir="ltr">{formatCertificateDate(certificate.startDate)}</span>
            {' إلى '}
            <span dir="ltr">{formatCertificateDate(certificate.endDate)}</span>
          </p>
          <p className="mt-[0.5cqw] text-[1.8cqw] font-extrabold">بإجمالي {certificate.hours} ساعة تدريبية</p>

          <div className="mt-auto flex w-full items-end justify-between">
            <Signature name="Dolab" title="المدير التنفيذي - دولاب أكاديمي" />
            <div
              className="flex size-[10cqw] items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#f6a01a,#ffcf6b,#e08a0a,#ffcf6b,#f6a01a)] p-[0.6cqw] shadow-md"
              aria-hidden="true"
            >
              <div className="flex size-full items-center justify-center rounded-full border-[0.3cqw] border-dashed border-[#f6a01a] bg-[#161616]">
                <Logo className="text-[3cqw]" />
              </div>
            </div>
            <Signature name="Instructor" title={`المحاضر - ${certificate.instructor}`} />
          </div>
          <p dir="ltr" className="mt-[1cqw] text-[1.1cqw] tracking-widest text-[#6b6b6b]">
            CERT NO. {certificate.code}
          </p>
        </div>
      </article>
    </div>
  )
}
