'use client'

import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const baseClass =
  'inline-flex h-12 items-center whitespace-nowrap justify-center gap-2 rounded-xl border border-primary px-5 text-sm font-bold text-foreground transition-colors hover:bg-primary/10'

export function DownloadButton({ className, href }: { className?: string; href?: string | null }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseClass, className)}>
        <Download className="size-4" aria-hidden="true" />
        تحميل الشهادة PDF
      </a>
    )
  }

  return (
    <button type="button" onClick={() => window.print()} className={cn(baseClass, className)}>
      <Download className="size-4" aria-hidden="true" />
      تحميل الشهادة PDF
    </button>
  )
}
