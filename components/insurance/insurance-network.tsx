"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"

interface InsurancePlan {
  name: string
  shortName?: string
}

const ohioMedicaidPlans: InsurancePlan[] = [
  { name: "Anthem Blue Cross Blue Shield", shortName: "Anthem BCBS" },
  { name: "CareSource", shortName: "CareSource" },
  { name: "AmeriHealth Caritas Ohio", shortName: "AmeriHealth" },
  { name: "Buckeye Health Plan", shortName: "Buckeye" },
  { name: "Molina Healthcare", shortName: "Molina" },
  { name: "United Healthcare Community Plan", shortName: "UHC" },
]

const kentuckyMedicaidPlans: InsurancePlan[] = [
  { name: "Aetna Better Health of Kentucky", shortName: "Aetna" },
  { name: "Humana Healthy Horizons", shortName: "Humana" },
  { name: "Passport by Molina Healthcare", shortName: "Passport" },
  { name: "United Healthcare Community Plan", shortName: "UHC" },
  { name: "WellCare of Kentucky", shortName: "WellCare" },
]

const indianaMedicaidPlans: InsurancePlan[] = [
  { name: "Anthem Blue Cross Blue Shield", shortName: "Anthem BCBS" },
  { name: "CareSource", shortName: "CareSource" },
  { name: "Managed Health Services (MHS)", shortName: "MHS" },
]

const commercialInsurance: InsurancePlan[] = [
  { name: "Aetna", shortName: "Aetna" },
  { name: "Anthem BCBS", shortName: "Anthem" },
  { name: "Cigna", shortName: "Cigna" },
  { name: "Humana", shortName: "Humana" },
  { name: "United Healthcare", shortName: "UHC" },
  { name: "Medicare", shortName: "Medicare" },
]

function InsuranceCard({ plan }: { plan: InsurancePlan }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
      <CheckCircle2 className="size-5 shrink-0 text-primary" />
      <span className="text-sm font-medium text-foreground">{plan.name}</span>
    </div>
  )
}

function PlanGrid({ plans }: { plans: InsurancePlan[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <InsuranceCard key={plan.name} plan={plan} />
      ))}
    </div>
  )
}

export function InsuranceNetwork() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            In-Network Provider
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Insurance & Medicaid Coverage
          </h2>
          <p className="mt-4 text-muted-foreground">
            Legacy Labs is an in-network provider for major commercial insurers and 
            Managed Medicaid plans across Ohio, Kentucky, and Indiana.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <Tabs defaultValue="ohio" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-4">
              <TabsTrigger value="ohio" className="text-sm">Ohio</TabsTrigger>
              <TabsTrigger value="kentucky" className="text-sm">Kentucky</TabsTrigger>
              <TabsTrigger value="indiana" className="text-sm">Indiana</TabsTrigger>
              <TabsTrigger value="commercial" className="text-sm">Commercial</TabsTrigger>
            </TabsList>

            <TabsContent value="ohio">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      OH
                    </span>
                    Ohio Managed Medicaid Plans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PlanGrid plans={ohioMedicaidPlans} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kentucky">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      KY
                    </span>
                    Kentucky Managed Medicaid Plans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PlanGrid plans={kentuckyMedicaidPlans} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="indiana">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      IN
                    </span>
                    Indiana Managed Medicaid Plans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PlanGrid plans={indianaMedicaidPlans} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commercial">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commercial Insurance & Medicare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-sm text-muted-foreground">
                    We accept most major commercial insurance plans. Contact us to verify coverage 
                    for your specific plan.
                  </p>
                  <PlanGrid plans={commercialInsurance} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Insurance network participation is subject to contractual agreements and may vary. 
            Please contact us or your insurance provider to verify coverage before services.
          </p>
        </div>
      </div>
    </section>
  )
}
