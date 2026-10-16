import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { VerifySection } from '@/components/verify-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <VerifySection />
      <About />
    </>
  )
}
