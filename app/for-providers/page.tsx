import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ClipboardList,
  FileText,
  Server,
  Globe,
  Link2,
  MonitorCheck,
  Users,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "For Providers",
  description: "Provider onboarding, ordering workflows, and result delivery information for Legacy Labs partners.",
}

const onboardingSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "Discuss testing needs, volume expectations, integration requirements, and program-specific considerations.",
  },
  {
    step: "02",
    title: "Account Setup",
    description: "Complete provider enrollment documentation, establish billing arrangements, and configure account preferences.",
  },
  {
    step: "03",
    title: "Integration Configuration",
    description: "Set up result delivery method(s) based on your workflow requirements and technical capabilities.",
  },
  {
    step: "04",
    title: "Training & Supplies",
    description: "Receive collection materials, access portal credentials, and review ordering and result access procedures.",
  },
]

const integrationOptions = [
  {
    icon: Server,
    title: "HL7 v2 Interface",
    description: "Standard healthcare messaging protocol for bidirectional order and result exchange with your EHR/LIS.",
    details: ["Order transmission", "Result delivery", "ADT messaging support"],
  },
  {
    icon: Globe,
    title: "FHIR API",
    description: "Modern RESTful API for healthcare data exchange supporting current interoperability standards.",
    details: ["DiagnosticReport resources", "Observation results", "Patient matching"],
  },
  {
    icon: Link2,
    title: "SFTP Delivery",
    description: "Secure file transfer for batch result delivery in structured file formats.",
    details: ["Scheduled transfers", "Multiple file formats", "Archive access"],
  },
  {
    icon: MonitorCheck,
    title: "Provider Portal",
    description: "Web-based interface for order entry, result access, and account management.",
    details: ["Manual order entry", "Result viewing/printing", "Order history"],
  },
]

export default function ForProvidersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Partner Resources
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              For Providers
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Information for healthcare organizations, clinics, and institutional partners 
              interested in establishing a testing relationship with Legacy Labs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-[#B84500]">
                <Link href="/for-providers/new-client-onboarding">
                  Start Onboarding
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portal">Provider Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Process */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How to Onboard
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team will work with you to establish testing services tailored to your 
              program requirements.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-2">
              {onboardingSteps.map((step) => (
                <Card key={step.step} className="relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-5xl font-bold text-primary/10">
                    {step.step}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="-mt-2">
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Workflows */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Ordering Workflows
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Multiple ordering options are available based on your operational needs.
            </p>

            <div className="mt-12 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MonitorCheck className="size-5 text-primary" />
                    Portal-Based Ordering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The Provider Portal supports manual order entry for practices without 
                    electronic interface capabilities. Orders can be entered individually 
                    or in batches with patient demographics and test selections.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Server className="size-5 text-primary" />
                    Electronic Order Transmission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    For organizations with EHR/LIS integration capabilities, orders can be 
                    transmitted electronically via HL7 or FHIR interfaces. Integration 
                    setup requires coordination with your IT team and our interface specialists.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <FileText className="size-5 text-primary" />
                    Paper Requisition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Standard requisition forms are available for programs that require 
                    paper-based ordering. Completed requisitions accompany specimens 
                    and are processed upon receipt.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Result Delivery Options */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Result Delivery Options
            </h2>
            <p className="mt-4 text-muted-foreground">
              Results can be delivered through multiple channels based on your technical 
              capabilities and workflow requirements.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {integrationOptions.map((option) => (
              <Card key={option.title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <option.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Model */}
      <section className="border-t border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Support & Communication
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Our team is available to support your testing needs and address questions.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Users className="size-5 text-primary" />
                    Account Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Dedicated support for account setup, billing questions, and operational 
                    coordination. Response times vary based on inquiry type and complexity.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Phone className="size-5 text-primary" />
                    Technical Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Assistance with interface configuration, result interpretation questions, 
                    and specimen collection guidance. Available during standard business hours.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Support response times and 
                availability may vary. Critical result notifications follow established protocols 
                for your account configuration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our team to discuss your testing needs and begin the onboarding process.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-[#B84500]">
                <Link href="/for-providers/new-client-onboarding">
                  Start Onboarding
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/portal">Existing Partners: Provider Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
