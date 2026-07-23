/** Parse stored content image JSON into a clean URL list. */
export function parseContentImages(value: string | null | undefined): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean)
  } catch {
    return []
  }
}

export function serializeContentImages(urls: string[]): string {
  return JSON.stringify(urls.map((url) => url.trim()).filter(Boolean))
}
