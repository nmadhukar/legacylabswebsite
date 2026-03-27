import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CAPLogo } from "@/components/accreditation/cap-logo"
import { InsuranceNetwork } from "@/components/insurance/insurance-network"
import {
  Shield,
  FlaskConical,
  Microscope,
  Droplets,
  TestTube,
  Activity,
  FileCheck,
  Lock,
  Link2,
  Server,
  Globe,
  MonitorCheck,
  ArrowRight,
  CheckCircle2,
  Award,
  Clock,
  Building2,
  Phone,
} from "lucide-react"

const services = [
  {
    icon: FlaskConical,
    title: "Toxicology",
    description: "Comprehensive drug screening and confirmation testing with LC-MS/MS technology for clinical and forensic applications.",
    href: "/toxicology",
    featured: true,
  },
  {
    icon: Microscope,
    title: "Infectious Disease",
    description: "Diagnostic testing for infectious agents including respiratory panels and STI screening.",
    href: "/test-menu",
  },
  {
    icon: Droplets,
    title: "Blood / Serum",
    description: "Hematology, chemistry panels, and specialized blood-based assays.",
    href: "/test-menu",
  },
  {
    icon: Activity,
    title: "Clinical Chemistry",
    description: "Metabolic panels, liver function, renal panels, and therapeutic monitoring.",
    href: "/test-menu",
  },
  {
    icon: TestTube,
    title: "Specialized Diagnostics",
    description: "Advanced testing capabilities for complex clinical requirements.",
    href: "/test-menu",
  },
]

const integrations = [
  {
    icon: Server,
    title: "HL7 v2",
    description: "Standard healthcare messaging protocol integration.",
  },
  {
    icon: Globe,
    title: "FHIR",
    description: "Modern API-based health data exchange.",
  },
  {
    icon: Link2,
    title: "SFTP",
    description: "Secure file transfer for batch result delivery.",
  },
  {
    icon: MonitorCheck,
    title: "Secure Portal",
    description: "Web-based result access and order management.",
  },
]

const stats = [
  { value: "24-48hr", label: "Typical Turnaround", icon: Clock },
  { value: "CAP", label: "Accredited", icon: Award },
  { value: "3 States", label: "Medicaid Coverage", icon: Building2 },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#3E2723] via-[#B84500] to-[#D35400]">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit bg-white/20 text-white hover:bg-white/30 border-0">
                Plain City, OH
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                CAP-Accredited Clinical Reference Laboratory
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
                Toxicology-focused testing plus comprehensive diagnostics for institutional healthcare partners. 
                Serving clinics, hospitals, behavioral health facilities, and occupational health programs.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-[#3E2723] hover:bg-white/90">
                  <Link href="/for-providers/new-client-onboarding">
                    Start Onboarding
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                  <Link href="/test-menu">View Test Menu</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/portal"
                  className="text-sm font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  Provider Portal Login
                </Link>
                <span className="text-white/40">|</span>
                <a
                  href="tel:+19374218867"
                  className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
                >
                  <Phone className="size-4" />
                  (937) 421-8867
                </a>
              </div>
            </div>

            {/* Stats and Accreditation Card */}
            <div className="flex flex-col justify-center gap-6">
              <Card className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="grid grid-cols-3 gap-4 p-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon className="mx-auto mb-2 size-6 text-white/80" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* CAP Accreditation highlight */}
              <Card className="border-0 bg-white shadow-xl">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="shrink-0">
                    <CAPLogo />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">CAP Laboratory Accreditation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Inspected and accredited by the College of American Pathologists, meeting rigorous quality standards.
                    </p>
                    <Link
                      href="/accreditation"
                      className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Compliance Strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              { icon: Shield, label: "CAP Accredited" },
              { icon: CheckCircle2, label: "CLIA Certified" },
              { icon: Lock, label: "HIPAA Compliant" },
              { icon: FileCheck, label: "Chain of Custody Available" },
              { icon: FlaskConical, label: "LC-MS/MS Technology" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon className="size-4 text-primary" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Testing Services
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comprehensive Laboratory Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              Full-service laboratory capabilities built on validated methodologies and quality-focused operations.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card 
                key={service.title} 
                className={`group relative transition-all hover:shadow-lg ${
                  service.featured ? "border-primary/30 bg-primary/[0.02]" : ""
                }`}
              >
                {service.featured && (
                  <Badge className="absolute -top-2.5 right-4 bg-primary">Featured</Badge>
                )}
                <CardHeader>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Network Section */}
      <div className="border-y border-border bg-muted/30">
        <InsuranceNetwork />
      </div>

      {/* Results Integration */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              For Providers
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Results Integration
            </h2>
            <p className="mt-4 text-muted-foreground">
              Multiple delivery methods available to align with your existing EHR and practice management systems.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration) => (
              <Card key={integration.title} className="text-center transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-secondary">
                    <integration.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{integration.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/for-providers">
                View Provider Resources
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* COC / Court Support */}
      <section className="border-y border-border bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                Compliance Ready
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Chain of Custody Procedures
              </h2>
              <p className="mt-4 text-muted-foreground">
                Chain-of-custody procedures available upon request for programs requiring documented 
                specimen handling and identity verification protocols.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Identity verification protocols",
                  "Sealed transport containers",
                  "Documented handoff logs",
                  "Exception reporting",
                  "Litigation support packages",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/specimen-collection">Learn About COC Procedures</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-sm border-2 border-dashed border-primary/20 bg-primary/[0.02]">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <FileCheck className="size-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Documentation Standards</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Comprehensive documentation meets requirements for regulatory compliance and legal proceedings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-gradient-to-br from-[#3E2723] to-[#B84500]">
            <CardContent className="p-8 sm:p-12 lg:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Partner With Us
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Provider onboarding and integrations available. Contact our team to discuss 
                  how we can support your laboratory testing needs.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-white text-[#3E2723] hover:bg-white/90">
                    <Link href="/for-providers/new-client-onboarding">
                      Start Onboarding
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                    <Link href="/portal">Provider Portal</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
