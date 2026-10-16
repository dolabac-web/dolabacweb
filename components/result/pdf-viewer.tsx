'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Maximize,
  Minimize,
  Minus,
  Plus,
  Printer,
  RotateCw,
  Scan,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PdfViewerProps = {
  fileName: string
  pdfSrc?: string | null
  downloadUrl?: string | null
  children: ReactNode
}

const MIN_ZOOM = 50
const MAX_ZOOM = 200
const ZOOM_STEP = 10

function ToolbarButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  )
}

export function PdfViewer({ fileName, pdfSrc, downloadUrl, children }: PdfViewerProps) {
  const download = () => {
    if (downloadUrl) window.open(downloadUrl, '_blank', 'noopener,noreferrer')
    else window.print()
  }
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const changeZoom = (delta: number) =>
    setZoom((value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value + delta)))

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen?.()
    }
  }

  const isSideways = rotation % 180 !== 0

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-border bg-[#1a1a1e] shadow-2xl shadow-black/40',
        isFullscreen && 'rounded-none',
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-[#141417] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span dir="ltr" className="truncate text-sm font-semibold">
            {fileName}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <ToolbarButton label="تدوير" onClick={() => setRotation((value) => (value + 90) % 360)}>
            <RotateCw className="size-4" />
          </ToolbarButton>
          <ToolbarButton label="طباعة" onClick={() => window.print()}>
            <Printer className="size-4" />
          </ToolbarButton>
          <ToolbarButton label="تحميل" onClick={download}>
            <Download className="size-4" />
          </ToolbarButton>
          <ToolbarButton label={isFullscreen ? 'إنهاء ملء الشاشة' : 'ملء الشاشة'} onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </ToolbarButton>
        </div>
      </div>

      <div
        className={cn(
          'overflow-auto bg-[#2a2a2f] p-4 sm:p-8',
          isFullscreen ? 'flex-1' : 'max-h-[75vh] min-h-[280px]',
        )}
      >
        <div className="mx-auto transition-[width] duration-200" style={{ width: `${zoom}%` }}>
          <div
            className="shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-transform duration-300"
            style={{
              transform: `rotate(${rotation}deg) scale(${isSideways ? 0.7 : 1})`,
            }}
          >
            {pdfSrc ? (
              <iframe
                src={pdfSrc}
                title={`معاينة ${fileName}`}
                className={cn('block w-full border-0 bg-white', isFullscreen ? 'h-[85vh]' : 'aspect-[1.414/1] min-h-[320px]')}
                allow="fullscreen"
                loading="lazy"
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border bg-[#141417] px-3 py-2 text-sm">
        <ToolbarButton label="تحميل" onClick={download}>
          <Download className="size-4" />
        </ToolbarButton>

        <div className="flex items-center gap-1">
          <ToolbarButton label="الصفحة السابقة" disabled>
            <ChevronRight className="size-4" />
          </ToolbarButton>
          <span dir="ltr" className="min-w-12 text-center tabular-nums text-foreground/80">
            1 / 1
          </span>
          <ToolbarButton label="الصفحة التالية" disabled>
            <ChevronLeft className="size-4" />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1">
          <ToolbarButton label="تكبير" onClick={() => changeZoom(ZOOM_STEP)} disabled={zoom >= MAX_ZOOM}>
            <Plus className="size-4" />
          </ToolbarButton>
          <span dir="ltr" className="min-w-12 text-center tabular-nums text-foreground/80" aria-live="polite">
            {zoom}%
          </span>
          <ToolbarButton label="تصغير" onClick={() => changeZoom(-ZOOM_STEP)} disabled={zoom <= MIN_ZOOM}>
            <Minus className="size-4" />
          </ToolbarButton>
          <ToolbarButton
            label="ملاءمة الصفحة"
            onClick={() => {
              setZoom(100)
              setRotation(0)
            }}
          >
            <Scan className="size-4" />
          </ToolbarButton>
        </div>
      </div>
    </div>
  )
}
