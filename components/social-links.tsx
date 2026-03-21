import { cn } from "@/lib/utils"

export const companySocialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@scubafysolutions" },
  { label: "Instagram", href: "https://www.instagram.com/scubafysolutions" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61586037613316" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/scubafysolutions" },
] as const

type SocialLinksProps = {
  className?: string
  linkClassName?: string
  listClassName?: string
  /** When true, wraps links in a nav landmark (use once per page, e.g. footer). */
  landmark?: boolean
}

export function SocialLinks({ className, linkClassName, listClassName, landmark = false }: SocialLinksProps) {
  const list = (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-2", listClassName)}>
      {companySocialLinks.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200",
              linkClassName,
            )}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  )

  if (landmark) {
    return (
      <nav aria-label="Social media" className={className}>
        {list}
      </nav>
    )
  }

  return <div className={className}>{list}</div>
}
