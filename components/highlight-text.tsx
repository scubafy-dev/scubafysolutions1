"use client"

import type React from "react"

import { useRef, useEffect, type ReactNode } from "react"

interface HighlightTextProps {
  children: ReactNode
  className?: string
  parallaxSpeed?: number
}

export function HighlightText({ children, className = "", parallaxSpeed = 0.3 }: HighlightTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current || !highlightRef.current || !textRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation
          highlightRef.current?.style.setProperty("--scale-x", "1")
          textRef.current?.style.setProperty("--text-color", "#000000")
        } else {
          // Reset animation
          highlightRef.current?.style.setProperty("--scale-x", "0")
          textRef.current?.style.setProperty("--text-color", "rgb(250, 250, 250)")
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -20% 0px",
      },
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={
        {
          "--scale-x": "0",
          "--text-color": "rgb(250, 250, 250)",
        } as React.CSSProperties & { [key: string]: string }
      }
    >
      <style>{`
        [style*="--scale-x"] > span:first-child {
          animation: scaleInHighlight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        [style*="--scale-x"] > span:last-child {
          animation: colorChange 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }
        @keyframes scaleInHighlight {
          from {
            transform: scaleX(0);
            transform-origin: left center;
          }
          to {
            transform: scaleX(1);
            transform-origin: left center;
          }
        }
        @keyframes colorChange {
          from {
            color: rgb(250, 250, 250);
          }
          to {
            color: #000000;
          }
        }
      `}</style>
      <span
        ref={highlightRef}
        className="absolute inset-0 bg-accent"
        style={{
          left: "-0.1em",
          right: "-0.1em",
          top: "0.15em",
          bottom: "0.1em",
          transformOrigin: "left center",
        }}
      />
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
    </span>
  )
}
