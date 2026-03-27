"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, Phone, Mail, ChevronDown, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const servicesItems = [
  { label: "Clinical Toxicology", href: "/toxicology", description: "Comprehensive drug screening and confirmation testing" },
  { label: "Test Menu", href: "/test-menu", description: "Browse our full catalog of available tests" },
]

const resourcesItems = [
  { label: "Accreditation & Quality", href: "/accreditation", description: "CAP accreditation and quality standards" },
  { label: "Specimen Collection", href: "/specimen-collection", description: "Collection guides and chain of custody" },
]

const providerItems = [
  { label: "Provider Resources", href: "/for-providers", description: "Information and tools for healthcare providers" },
  { label: "New Client Onboarding", href: "/for-providers/new-client-onboarding", description: "Start the account setup process" },
  { label: "Provider Portal", href: "/portal", description: "Access results and manage your account" },
]

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "Toxicology", href: "/toxicology" },
  { label: "Test Menu", href: "/test-menu" },
  { label: "Accreditation & Quality", href: "/accreditation" },
  { label: "Specimen Collection", href: "/specimen-collection" },
  { label: "For Providers", href: "/for-providers" },
  { label: "New Client Onboarding", href: "/for-providers/new-client-onboarding" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[#3E2723] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-sm sm:px-6 lg:px-8">
          <div className="hidden items-center gap-6 md:flex">
            <a href="tel:+19374218867" className="flex items-center gap-2 transition-colors hover:text-[#F39C12]">
              <Phone className="size-3.5" />
              <span>(937) 421-8867</span>
            </a>
            <a href="mailto:info@legacyclinicallabs.com" className="flex items-center gap-2 transition-colors hover:text-[#F39C12]">
              <Mail className="size-3.5" />
              <span>info@legacyclinicallabs.com</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2 sm:flex">
              <Clock className="size-3.5" />
              <span>Mon-Fri: 8AM-6PM EST</span>
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <MapPin className="size-3.5" />
              <span>Plain City, OH</span>
            </div>
            <span className="rounded bg-[#D35400] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
              CAP Accredited
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/legacy-labs-logo.png"
              alt="Legacy Labs"
              width={72}
              height={72}
              className="h-[72px] w-[72px]"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold tracking-tight text-[#2B2F33]">LEGACY</span>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D35400]">LABORATORIES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400]"
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-10 items-center justify-center gap-1 rounded-md px-4 py-2 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400] focus:outline-none">
                Services <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[320px]">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="cursor-pointer p-0">
                    <Link href={item.href} className="block w-full px-3 py-2.5">
                      <div className="text-sm font-medium text-[#2B2F33]">{item.label}</div>
                      <p className="mt-0.5 text-xs text-[#4B5563]">{item.description}</p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-10 items-center justify-center gap-1 rounded-md px-4 py-2 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400] focus:outline-none">
                Resources <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[320px]">
                {resourcesItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="cursor-pointer p-0">
                    <Link href={item.href} className="block w-full px-3 py-2.5">
                      <div className="text-sm font-medium text-[#2B2F33]">{item.label}</div>
                      <p className="mt-0.5 text-xs text-[#4B5563]">{item.description}</p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-10 items-center justify-center gap-1 rounded-md px-4 py-2 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400] focus:outline-none">
                For Providers <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[340px]">
                {providerItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="cursor-pointer p-0">
                    <Link href={item.href} className="block w-full px-3 py-2.5">
                      <div className="text-sm font-medium text-[#2B2F33]">{item.label}</div>
                      <p className="mt-0.5 text-xs text-[#4B5563]">{item.description}</p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400]"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="outline"
              asChild
              className="border-[#D35400] bg-transparent text-[#D35400] hover:bg-[#D35400] hover:text-white"
            >
              <Link href="/for-providers/new-client-onboarding">Start Onboarding</Link>
            </Button>
            <Button asChild className="bg-[#D35400] text-white hover:bg-[#B84500]">
              <a href="https://revdx.atcemr.com/login" target="_blank" rel="noopener noreferrer">Provider Portal</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-[#2B2F33]">
                <Menu className="size-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-white">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/legacy-labs-logo.png"
                      alt="Legacy Labs"
                      width={48}
                      height={48}
                      className="h-12 w-12"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-lg font-bold tracking-tight text-[#2B2F33]">LEGACY</span>
                      <span className="text-[9px] font-semibold tracking-[0.25em] text-[#D35400]">LABORATORIES</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-[#2B2F33] transition-colors hover:bg-[#FDF2E9] hover:text-[#D35400]"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-[#D35400] bg-transparent text-[#D35400] hover:bg-[#D35400] hover:text-white"
                  >
                    <Link href="/for-providers/new-client-onboarding" onClick={() => setMobileMenuOpen(false)}>
                      Start Onboarding
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-[#D35400] text-white hover:bg-[#B84500]">
                    <Link href="/portal" onClick={() => setMobileMenuOpen(false)}>
                      Provider Portal
                    </Link>
                  </Button>
                </div>
                {/* Mobile Contact Info */}
                <div className="mt-6 border-t border-border pt-6 text-sm text-[#4B5563]">
                  <a href="tel:+19374218867" className="mb-2 flex items-center gap-2">
                    <Phone className="size-4 text-[#D35400]" />
                    (937) 421-8867
                  </a>
                  <a href="mailto:info@legacyclinicallabs.com" className="flex items-center gap-2">
                    <Mail className="size-4 text-[#D35400]" />
                    info@legacyclinicallabs.com
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
