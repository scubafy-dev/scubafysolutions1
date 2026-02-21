"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface ScrambleTextProps {
  text: string
  className?: string
  /** Delay in milliseconds before animation starts */
  delayMs?: number
  /** Duration of the scramble animation in seconds */
  duration?: number
}

interface ScrambleTextOnHoverProps {
  text: string
  className?: string
  /** Duration of the scramble animation in seconds */
  duration?: number
  /** Element type to render */
  as?: "span" | "button" | "div"
  /** onClick handler for buttons */
  onClick?: () => void
}

const GLYPHS = "!@#$%^&*()_+-=<>?/[]{}Xx"

/**
 * Run the scramble animation on text
 */
function runScrambleAnimation(
  text: string,
  duration: number,
  setDisplayText: (text: string) => void,
  onComplete?: () => void,
) {
  const lockedIndices = new Set<number>()
  const finalChars = text.split("")
  const totalChars = finalChars.length
  const startTime = Date.now()
  let animationFrameId: number | null = null

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / (duration * 1000), 1)

    const numLocked = Math.floor(progress * totalChars)

    for (let i = 0; i < numLocked; i++) {
      lockedIndices.add(i)
    }

    const newDisplay = finalChars
      .map((char, i) => {
        if (lockedIndices.has(i)) return char
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      })
      .join("")

    setDisplayText(newDisplay)

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      setDisplayText(text)
      onComplete?.()
    }
  }

  animationFrameId = requestAnimationFrame(animate)

  return () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}

/**
 * Scramble text animation component - animates on mount.
 */
export function ScrambleText({ text, className, delayMs = 0, duration = 0.9 }: ScrambleTextProps) {
  // Initialize with text to avoid flash of empty content
  const [displayText, setDisplayText] = useState(text)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const cancelRef = useRef<(() => void) | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Run animation only once on initial mount
  useEffect(() => {
    if (hasAnimated || !text) return

    // Start with scrambled text
    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("")
    setDisplayText(scrambledStart)

    timeoutRef.current = setTimeout(() => {
      cancelRef.current = runScrambleAnimation(text, duration, setDisplayText, () => {
        setHasAnimated(true)
      })
    }, delayMs)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (cancelRef.current) cancelRef.current()
    }
  }, []) // Empty deps - only run on mount

  // Handle text prop changes after initial animation
  useEffect(() => {
    if (hasAnimated && displayText !== text) {
      setDisplayText(text)
    }
  }, [text, hasAnimated, displayText])

  return (
    <span ref={containerRef} className={className}>
      {displayText || text}
    </span>
  )
}

/**
 * Scramble text animation component - animates on hover.
 */
export function ScrambleTextOnHover({
  text,
  className,
  duration = 0.4,
  as: Component = "span",
  onClick,
}: ScrambleTextOnHoverProps) {
  const [displayText, setDisplayText] = useState(text)
  const isAnimating = useRef(false)
  const cancelRef = useRef<(() => void) | null>(null)

  const handleMouseEnter = useCallback(() => {
    // Only trigger on devices that support hover (not touch devices)
    if (window.matchMedia && !window.matchMedia("(hover: hover)").matches) {
      return
    }
    
    if (isAnimating.current) return
    isAnimating.current = true

    // Kill any existing animation
    if (cancelRef.current) {
      cancelRef.current()
    }

    // Start with scrambled
    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("")
    setDisplayText(scrambledStart)

    cancelRef.current = runScrambleAnimation(text, duration, setDisplayText, () => {
      isAnimating.current = false
    })
  }, [text, duration])

  // Update display text if text prop changes
  useEffect(() => {
    if (!isAnimating.current) {
      setDisplayText(text)
    }
  }, [text])

  return (
    <Component className={className} onMouseEnter={handleMouseEnter} onClick={onClick}>
      {displayText}
    </Component>
  )
}
