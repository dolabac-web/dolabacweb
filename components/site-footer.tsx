import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'
import { navLinks } from '@/lib/nav'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M14 8.5V6.8c0-.8.5-1.3 1.3-1.3H17V2.3h-2.6C11.6 2.3 10 4 10 6.6v1.9H7.5v3.3H10V22h4V11.8h2.7l.4-3.3H14Z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.6 3.1-5.6 3.1Z" />
    </svg>
  )
}

const socials = [
  { label: 'إنستجرام', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'فيسبوك', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'يوتيوب', href: 'https://youtube.com', Icon: YoutubeIcon },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto border-t border-border bg-card print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Logo className="text-[30px]" />
          <div className="flex flex-col">
            <span className="text-lg font-bold">دولاب أكاديمي</span>
            <span dir="ltr" className="text-xs text-muted-foreground">
              you can do it
            </span>
          </div>
        </div>

        <nav aria-label="روابط التذييل">
          <ul className="flex flex-wrap items-center justify-center gap-y-2 text-sm text-foreground/80">
            {navLinks.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 && <span className="mx-4 h-4 w-px bg-border" aria-hidden="true" />}
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  <Icon />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-1.5 text-sm text-foreground/80">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            جليم - الإسكندرية
          </p>
        </div>
      </div>
      <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        {'© 2026 دولاب أكاديمي. جميع الحقوق محفوظة.'}
      </p>
    </footer>
  )
}
