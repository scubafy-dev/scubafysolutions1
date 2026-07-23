"use client"

import { useEffect } from "react"

export function HomeHashScroll() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.substring(1)
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
