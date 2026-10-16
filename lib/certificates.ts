export type Certificate = {
  code: string
  name: string
  course: string
  registrationDate: string
  startDate: string
  endDate: string
  hours: string
  instructor: string
  grade: string
  pdfLink: string
  pdfViewUrl: string | null
  pdfDownloadUrl: string | null
}

export type CertificateLookup =
  | { status: 'ok'; certificates: Certificate[] }
  | { status: 'not-configured' }
  | { status: 'error' }

type SheetRow = Record<string, unknown>

const normalizeKey = (key: string) => key.toLowerCase().replace(/[\s_\-]+/g, '')

function pickField(row: SheetRow, ...candidates: string[]) {
  const wanted = candidates.map(normalizeKey)
  for (const [key, value] of Object.entries(row)) {
    if (wanted.includes(normalizeKey(key)) && value != null && String(value).trim() !== '') {
      return String(value).trim()
    }
  }
  return ''
}

const normalizeCode = (code: string) => code.trim().toUpperCase()

function extractDriveFileId(link: string) {
  const match =
    link.match(/\/file\/d\/([\w-]+)/) ?? link.match(/[?&]id=([\w-]+)/) ?? link.match(/\/d\/([\w-]+)/)
  return match?.[1] ?? null
}

export function toDrivePreviewUrl(link: string) {
  const id = extractDriveFileId(link)
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : null
}

function toDriveDownloadUrl(link: string) {
  const id = extractDriveFileId(link)
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : null
}

function toCertificate(row: SheetRow): Certificate {
  const pdfLink = pickField(row, 'PDF-Link', 'PDF Link', 'PDF', 'Link', 'رابط الشهادة')
  const startDate = pickField(row, 'Date Start', 'Start Date', 'From', 'تاريخ البداية', 'من')
  return {
    code: pickField(row, 'Code', 'كود الطالب', 'الكود'),
    name: pickField(row, 'Name', 'Student Name', 'Full Name', 'الاسم', 'اسم الطالب'),
    course: pickField(row, 'Course', 'Course Name', 'اسم الدورة', 'الدورة', 'الكورس'),
    registrationDate: pickField(row, 'Registration Date', 'Date', 'تاريخ التسجيل', 'التاريخ') || startDate,
    startDate,
    endDate: pickField(row, 'Date End', 'End Date', 'To', 'تاريخ النهاية', 'إلى'),
    hours: pickField(row, 'Hours', 'عدد الساعات', 'الساعات'),
    instructor: pickField(row, 'Instructor', 'Trainer', 'المحاضر', 'المدرب'),
    grade: pickField(row, 'Grade', 'Rating', 'الدرجة', 'التقدير'),
    pdfLink,
    pdfViewUrl: toDrivePreviewUrl(pdfLink),
    pdfDownloadUrl: toDriveDownloadUrl(pdfLink),
  }
}

export async function findCertificatesByCode(code: string): Promise<CertificateLookup> {
  const apiUrl = process.env.SHEETDB_API_URL?.trim().replace(/\/+$/, '')
  if (!apiUrl) return { status: 'not-configured' }

  const wantedCode = normalizeCode(code)
  if (!wantedCode) return { status: 'ok', certificates: [] }

  try {
    const searchUrl = new URL(`${apiUrl}/search`)
    searchUrl.searchParams.set('Code', code.trim())
    searchUrl.searchParams.set('casesensitive', 'false')

    const response = await fetch(searchUrl, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    })
    if (!response.ok) {
      console.error('[sheetdb] request failed', response.status)
      return { status: 'error' }
    }

    const rows: unknown = await response.json()
    if (!Array.isArray(rows)) return { status: 'error' }

    const certificates = rows
      .map((row) => toCertificate(row as SheetRow))
      .filter((certificate) => normalizeCode(certificate.code) === wantedCode)

    return { status: 'ok', certificates }
  } catch (error) {
    console.error('[sheetdb] request error', error)
    return { status: 'error' }
  }
}

export function formatCertificateDate(value: string) {
  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  return iso ? `${iso[3]}-${iso[2]}-${iso[1]}` : value
}
