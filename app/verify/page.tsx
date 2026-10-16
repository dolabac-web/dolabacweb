import type { Metadata } from 'next'
import { VerifySection } from '@/components/verify-section'

export const metadata: Metadata = {
  title: 'التحقق من الشهادة | دولاب أكاديمي',
  description: 'أدخل اسمك الرباعي وكود الطالب للتحقق من شهادتك التدريبية.',
}

export default function VerifyPage() {
  return <VerifySection headingLevel="h1" />
}
