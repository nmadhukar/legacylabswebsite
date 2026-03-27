import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Toxicology", href: "/toxicology" },
    { label: "Test Menu", href: "/test-menu" },
    { label: "Specimen Collection", href: "/specimen-collection" },
  ],
  resources: [
    { label: "For Providers", href: "/for-providers" },
    { label: "Accreditation & Quality", href: "/accreditation" },
    { label: "Provider Portal", href: "/portal" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/legacy-labs-logo.png"
                alt="Legacy Labs"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight text-foreground">LEGACY</span>
                <span className="text-[9px] font-semibold tracking-[0.25em] text-primary">LABORATORIES</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              CAP-Accredited Clinical Reference Laboratory
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>8628 Industrial Parkway, Unit E, Plain City, OH 43064</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>(614) 505-3748</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>info@legacyclinicallabs.com</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accreditation and Disclaimers */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">CAP Accredited</span>
            <span className="text-border">|</span>
            <span>CLIA Certified</span>
          </div>

          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p>Legacy Labs does not provide medical advice. Test results require interpretation by qualified healthcare providers.</p>
            <p>Services are intended for authorized providers and partner organizations.</p>
            <p className="font-medium text-foreground">Do not submit PHI through public web forms.</p>
            <p>In emergencies, call 911.</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Legacy Labs. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
