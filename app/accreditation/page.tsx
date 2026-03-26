import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CAPLogo } from "@/components/accreditation/cap-logo"
import {
  Shield,
  CheckCircle2,
  FileCheck,
  FlaskConical,
  BarChart3,
  Users,
  ClipboardCheck,
  Award,
  Building,
  Scale,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Accreditation & Quality",
  description: "CAP accreditation and quality program information for Legacy Labs clinical reference laboratory.",
}

const qualityPrograms = [
  {
    icon: FlaskConical,
    title: "Method Validation",
    description: "All testing methods undergo comprehensive validation prior to clinical use, including accuracy, precision, sensitivity, specificity, and reference range verification.",
  },
  {
    icon: BarChart3,
    title: "Quality Control",
    description: "Daily quality control procedures monitor analytical performance. QC data is reviewed and documented according to established protocols.",
  },
  {
    icon: ClipboardCheck,
    title: "Proficiency Testing",
    description: "Participation in external proficiency testing programs provides independent verification of testing accuracy through blinded sample analysis.",
  },
  {
    icon: Users,
    title: "Personnel Qualifications",
    description: "Laboratory staff meet educational and certification requirements appropriate to their roles and participate in ongoing competency assessment.",
  },
  {
    icon: FileCheck,
    title: "Document Control",
    description: "Standardized procedures, policies, and documentation practices ensure consistency and traceability across all laboratory operations.",
  },
  {
    icon: Shield,
    title: "Continuous Improvement",
    description: "Regular review of quality metrics, incident investigation, and corrective action processes support ongoing operational improvement.",
  },
]

const accreditations = [
  {
    name: "CAP Accreditation",
    organization: "College of American Pathologists",
    description: "The CAP Laboratory Accreditation Program is recognized as the leading peer-based assessment program, requiring laboratories to meet stringent quality standards through on-site inspections.",
    icon: Award,
  },
  {
    name: "CLIA Certification",
    organization: "Clinical Laboratory Improvement Amendments",
    description: "Federal certification required for clinical laboratories testing human specimens in the United States, establishing quality standards for accuracy, reliability, and timeliness.",
    icon: Building,
  },
  {
    name: "HIPAA Compliance",
    organization: "Health Insurance Portability and Accountability Act",
    description: "Full compliance with HIPAA privacy and security requirements for the protection of patient health information in all laboratory operations.",
    icon: Scale,
  },
]

export default function AccreditationPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#3E2723] via-[#B84500] to-[#D35400]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border-0">
              Quality Assurance
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Accreditation & Quality
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              Our commitment to quality is demonstrated through rigorous accreditation standards, 
              comprehensive quality management practices, and continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Accreditations */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {/* CAP Accreditation Highlight */}
            <Card className="mb-8 overflow-hidden border-2 border-primary/20">
              <div className="grid lg:grid-cols-5">
                <div className="flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-8 lg:col-span-2">
                  <CAPLogo className="scale-125" />
                </div>
                <div className="p-8 lg:col-span-3 lg:p-10">
                  <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                    Primary Accreditation
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    CAP Laboratory Accreditation
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Legacy Labs maintains accreditation through the College of American 
                    Pathologists (CAP) Laboratory Accreditation Program. CAP accreditation is 
                    recognized as the most rigorous peer-based laboratory assessment program.
                  </p>
                  <ul className="mt-6 space-y-2">
                    {[
                      "On-site inspections by trained peer assessors",
                      "Comprehensive evaluation against quality checklists",
                      "Regular re-inspection cycles for continued compliance",
                      "Standards exceeding regulatory minimums",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> CAP accreditation status 
                    reflects compliance with program requirements at the time of inspection. 
                    Accreditation does not constitute endorsement of any specific test or service.
                  </p>
                </div>
              </div>
            </Card>

            {/* Other Accreditations */}
            <div className="grid gap-6 md:grid-cols-2">
              {accreditations.slice(1).map((accred) => (
                <Card key={accred.name}>
                  <CardHeader>
                    <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                      <accred.icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{accred.name}</CardTitle>
                    <CardDescription className="text-xs">{accred.organization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{accred.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Management */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Quality Systems
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Quality Management Program
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our quality management system encompasses all aspects of laboratory operations, 
              from specimen collection through result reporting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {qualityPrograms.map((program) => (
              <Card key={program.title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <program.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="-mt-2">
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Method Validation Details */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                Technical Excellence
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Validation & Verification
              </h2>
              <p className="mt-4 text-muted-foreground">
                New tests and methods undergo comprehensive validation before clinical implementation.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FlaskConical className="size-5 text-primary" />
                    Analytical Validation
                  </CardTitle>
                  <CardDescription>Performance characteristics assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Accuracy and precision studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Analytical sensitivity and specificity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Linearity and reportable range</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Interference and recovery studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Reference range verification</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="size-5 text-primary" />
                    Ongoing Monitoring
                  </CardTitle>
                  <CardDescription>Continuous quality assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Daily quality control review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Proficiency testing participation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Instrument maintenance and calibration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Competency assessment programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>Method comparison when applicable</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Questions About Our Quality Program?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact us to learn more about our accreditation status and quality practices.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-[#B84500]">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/test-menu">View Test Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
