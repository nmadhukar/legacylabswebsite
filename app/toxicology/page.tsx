import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FlaskConical,
  Search,
  CheckCircle2,
  Droplets,
  TestTube,
  ArrowRight,
  AlertCircle,
  Info,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Toxicology Testing",
  description: "Clinical toxicology testing services including drug screening, confirmation testing, and therapeutic drug monitoring.",
}

const specimenTypes = [
  { type: "Urine", description: "Primary specimen for drug screening and confirmation" },
  { type: "Blood / Serum", description: "Therapeutic monitoring and specific analyte detection" },
  { type: "Oral Fluid", description: "Available for select testing panels" },
]

const useCases = [
  "Medication adherence monitoring",
  "Substance use detection in clinical settings",
  "Therapeutic drug monitoring",
  "Pain management support",
  "Behavioral health program support",
  "Occupational health screening",
]

export default function ToxicologyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Primary Focus
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Clinical Toxicology
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Comprehensive toxicology testing built on validated analytical methods. Our laboratory 
              provides both screening and confirmation services to support clinical decision-making 
              and program requirements.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-[#B84500]">
                <Link href="/test-menu">
                  View Test Menu
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Provider Inquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Screening vs Confirmation */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Screening & Confirmation Testing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our toxicology program utilizes a two-tier testing approach: initial immunoassay 
              screening followed by confirmation testing when indicated.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
            {/* Screening Card */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="size-6 text-primary" />
                </div>
                <CardTitle>Initial Screening</CardTitle>
                <CardDescription>Immunoassay-based detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Presumptive screening tests use immunoassay technology to detect drug classes 
                  above established cutoff thresholds. Screening results require confirmation 
                  for definitive identification.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>Rapid turnaround for presumptive results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>Broad drug class detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>Cost-effective initial assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Confirmation Card */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#C0392B]" />
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-[#C0392B]/10">
                  <FlaskConical className="size-6 text-[#C0392B]" />
                </div>
                <CardTitle>Confirmation Testing</CardTitle>
                <CardDescription>LC-MS/MS methodology</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Confirmation testing utilizes liquid chromatography-tandem mass spectrometry 
                  (LC-MS/MS) for definitive compound identification and quantitation.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#C0392B]" />
                    <span>Specific compound identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#C0392B]" />
                    <span>Quantitative results when applicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#C0392B]" />
                    <span>High sensitivity and specificity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specimen Types */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Specimen Types
            </h2>
            <p className="mt-4 text-muted-foreground">
              We accept multiple specimen types depending on the testing requirements and 
              clinical context.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            {specimenTypes.map((specimen) => (
              <Card key={specimen.type} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-lg bg-secondary">
                    {specimen.type === "Urine" && <Droplets className="size-6 text-primary" />}
                    {specimen.type === "Blood / Serum" && <TestTube className="size-6 text-primary" />}
                    {specimen.type === "Oral Fluid" && <FlaskConical className="size-6 text-primary" />}
                  </div>
                  <CardTitle className="text-base">{specimen.type}</CardTitle>
                </CardHeader>
                <CardContent className="-mt-2">
                  <p className="text-sm text-muted-foreground">{specimen.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
              Clinical Applications
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Our toxicology services support a variety of clinical and programmatic needs.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {useCases.map((useCase) => (
                <div key={useCase} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimers */}
      <section className="border-t border-border bg-secondary/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-6">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Results Require Qualified Interpretation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Toxicology test results should be interpreted by qualified healthcare providers 
                  in the context of clinical history, specimen collection timing, and patient 
                  circumstances. Results alone do not constitute a diagnosis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Factors Affecting Results</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drug detection depends on multiple factors including timing of specimen 
                  collection relative to exposure, individual metabolism, specimen integrity, 
                  and specific compound pharmacokinetics. Collection context and patient 
                  history are essential for accurate interpretation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Questions About Toxicology Testing?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our team to discuss testing options and program requirements.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-[#B84500]">
                <Link href="/contact">Provider Inquiry</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/test-menu">View Full Test Menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
