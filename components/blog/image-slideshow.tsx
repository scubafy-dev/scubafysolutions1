"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  images: string[]
  title?: string
  className?: string
  autoplayMs?: number
}

export function BlogImageSlideshow({
  images,
  title = "Gallery",
  className,
  autoplayMs = 4500,
}: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = images.length
  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (count <= 1 || paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, autoplayMs)
    return () => window.clearInterval(timer)
  }, [autoplayMs, count, paused])

  if (count === 0) return null

  const current = images[index]
  const showControls = count > 1

  return (
    <div
      className={cn("relative mx-auto w-full max-w-4xl", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden border border-border/30 bg-muted/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={`${title} — image ${index + 1} of ${count}`}
          className="h-full w-full object-cover"
        />
      </div>

      {showControls ? (
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="flex h-11 w-11 items-center justify-center border border-border/60 bg-background hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <p className="min-w-[4.5rem] text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="flex h-11 w-11 items-center justify-center border border-border/60 bg-background hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {images.map((url, i) => (
              <button
                key={`${url}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  "h-2 w-8 transition-colors",
                  i === index ? "bg-accent" : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
