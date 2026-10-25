import Image from "next/image"

export const certifications = [
  {
    name: "Shopify Partner",
    logo: "/certifications/shopify.svg",
    alt: "Shopify logo",
  },
  {
    name: "AWS Partner",
    logo: "/certifications/aws.svg",
    alt: "Amazon Web Services logo",
  },
  {
    name: "Google Ads Certification",
    logo: "/certifications/google-ads.svg",
    alt: "Google Ads logo",
  },
] as const

type CertificationsListProps = {
  size?: "sm" | "md"
  className?: string
}

export function CertificationsList({ size = "md", className = "" }: CertificationsListProps) {
  const logoSize = size === "sm" ? 20 : 28

  return (
    <ul className={`space-y-3 ${className}`.trim()}>
      {certifications.map((cert) => (
        <li key={cert.name} className="flex items-center gap-3">
          <Image
            src={cert.logo}
            alt={cert.alt}
            width={logoSize}
            height={logoSize}
            className="shrink-0 object-contain"
          />
          <span className="font-mono text-xs text-foreground/80">{cert.name}</span>
        </li>
      ))}
    </ul>
  )
}
