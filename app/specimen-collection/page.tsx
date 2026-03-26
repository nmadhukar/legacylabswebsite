"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileCheck,
  User,
  Package,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Info,
  Thermometer,
  Clock,
} from "lucide-react"

const clinicalSteps = [
  {
    icon: ClipboardList,
    title: "Order Placement",
    description: "Complete test requisition with patient demographics, ordering provider information, specimen type, and requested tests.",
  },
  {
    icon: Package,
    title: "Specimen Collection",
    description: "Collect specimens according to test-specific requirements. Use appropriate collection containers and follow labeling guidelines.",
  },
  {
    icon: Thermometer,
    title: "Storage & Handling",
    description: "Maintain proper storage conditions for specimen type. Review test-specific stability requirements prior to transport.",
  },
  {
    icon: Clock,
    title: "Transport",
    description: "Ship specimens promptly using appropriate packaging and temperature controls. Include completed requisition with shipment.",
  },
]

const cocSteps = [
  {
    icon: User,
    title: "Identity Verification",
    description: "Donor identity is verified using government-issued photo identification. Information is documented on the chain-of-custody form.",
  },
  {
    icon: Package,
    title: "Witnessed Collection",
    description: "Specimen collection is performed following COC protocols with appropriate observation requirements based on program specifications.",
  },
  {
    icon: FileCheck,
    title: "Tamper-Evident Sealing",
    description: "Specimens are sealed in tamper-evident containers in the donor's presence. Donor initials seal integrity on the COC form.",
  },
  {
    icon: ClipboardList,
    title: "Documentation & Handoff",
    description: "Each transfer of custody is documented with signatures, dates, and times. Chain-of-custody form accompanies specimen throughout.",
  },
]

export default function SpecimenCollectionPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Specimen Collection & Chain of Custody
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Proper specimen collection and handling are critical for accurate test results. 
              Chain-of-custody procedures are available for programs requiring documented 
              specimen integrity protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="clinical" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="clinical">Standard Clinical Collection</TabsTrigger>
              <TabsTrigger value="coc">Chain of Custody (COC)</TabsTrigger>
            </TabsList>

            {/* Clinical Collection Tab */}
            <TabsContent value="clinical" className="mt-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Standard Clinical Collection</h2>
                  <p className="mt-3 text-muted-foreground">
                    General specimen collection guidelines for routine clinical testing.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {clinicalSteps.map((step, index) => (
                    <Card key={step.title}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <step.icon className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Step {index + 1}</p>
                            <CardTitle className="text-base">{step.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="-mt-2">
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Info className="size-5 text-primary" />
                      Collection Supplies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Collection supplies and shipping materials are available to partnered providers. 
                      Contact us to establish supply arrangements and review test-specific collection 
                      requirements for your program.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Chain of Custody Tab */}
            <TabsContent value="coc" className="mt-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">Chain of Custody Procedures</h2>
                  <p className="mt-3 text-muted-foreground">
                    Documented specimen handling protocols for programs requiring verified integrity.
                  </p>
                </div>

                {/* COC Must Be Requested Notice */}
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="flex items-start gap-4 p-6">
                    <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Chain of Custody Must Be Requested</h3>
                      <p className="mt-1 text-sm text-amber-800">
                        COC procedures are not automatically applied to all specimens. Programs requiring 
                        documented chain of custody must specifically request COC services and use 
                        designated COC forms and procedures.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 sm:grid-cols-2">
                  {cocSteps.map((step, index) => (
                    <Card key={step.title}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-[#C0392B]/10">
                            <step.icon className="size-5 text-[#C0392B]" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Step {index + 1}</p>
                            <CardTitle className="text-base">{step.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="-mt-2">
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Exception Handling */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exception Handling</CardTitle>
                    <CardDescription>Documentation of integrity issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>All specimen integrity exceptions are documented and communicated to the ordering program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>Chain-of-custody breaks or documentation gaps are reported</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>Tamper-evident seal failures are documented and reported</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>Specimen validity testing results are provided when performed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* COC Programs */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileCheck className="size-5 text-primary" />
                      Establishing a COC Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Chain-of-custody services require advance coordination to establish collection 
                      protocols, documentation requirements, and reporting procedures specific to 
                      your program. Contact us to discuss COC requirements for courts, probation 
                      programs, treatment facilities, or other institutional needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Need Collection Supplies or COC Setup?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our team to discuss specimen collection requirements and program setup.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-primary hover:bg-[#B84500]">
                <Link href="/contact">
                  Provider Inquiry
                  <ArrowRight className="ml-2 size-4" />
                </Link>
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
