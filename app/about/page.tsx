import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Target,
  Shield,
  Users,
  MapPin,
  FlaskConical,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "About Legacy Labs - CAP-accredited clinical reference laboratory based in Plain City, OH.",
}

const values = [
  {
    icon: Target,
    title: "Accuracy",
    description: "Validated testing methods, rigorous quality control, and continuous monitoring ensure reliable results for clinical decision-making.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Ethical operations, transparent communication, and adherence to regulatory requirements guide all aspects of our work.",
  },
  {
    icon: Users,
    title: "Provider-First Operations",
    description: "Services designed around the needs of healthcare providers and institutional partners, with responsive support and flexible integration options.",
  },
]

const capabilities = [
  "CAP-accredited laboratory operations",
  "Comprehensive toxicology testing with LC-MS/MS confirmation",
  "Infectious disease and clinical chemistry testing",
  "Multiple specimen types and testing methodologies",
  "Electronic result delivery via HL7, FHIR, SFTP",
  "Chain-of-custody procedures for applicable programs",
  "Dedicated provider support and account management",
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Legacy Labs
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A CAP-accredited clinical reference laboratory providing toxicology-first testing 
              and comprehensive diagnostics for institutional healthcare partners.
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="flex items-center bg-primary/5 p-8 lg:p-10">
                  <div>
                    <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/10">
                      <MapPin className="size-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Plain City, OH</h2>
                    <p className="mt-3 text-muted-foreground">
                      Our laboratory is based in Plain City, OH, serving healthcare providers 
                      and institutional partners across the region.
                    </p>
                  </div>
                </div>
                <CardContent className="flex items-center p-8 lg:p-10">
                  <div>
                    <h3 className="font-semibold text-foreground">Serving Institutional Partners</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        Clinics and physician practices
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        Hospitals and health systems
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        Behavioral health and treatment facilities
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        Occupational health programs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        Courts, probation, and legal programs
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide our laboratory operations and partner relationships.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="size-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="-mt-2">
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
                  <FlaskConical className="size-7 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Laboratory Capabilities
              </h2>
              <p className="mt-4 text-muted-foreground">
                Comprehensive testing services built on validated methodologies and quality-focused operations.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Partner With Us
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our team to learn more about how Legacy Labs can support 
              your testing requirements.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-[#B84500]">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/for-providers">Provider Information</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
