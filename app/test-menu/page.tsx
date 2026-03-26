"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FlaskConical,
  Microscope,
  Droplets,
  Activity,
  Download,
  Search,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

const categories = [
  { id: "all", label: "All Tests", icon: Filter },
  { id: "toxicology", label: "Toxicology", icon: FlaskConical },
  { id: "infectious", label: "Infectious Disease", icon: Microscope },
  { id: "blood", label: "Blood / Serum", icon: Droplets },
  { id: "chemistry", label: "Chemistry", icon: Activity },
]

const tests = [
  // Toxicology
  { name: "Comprehensive Drug Screen, Urine", category: "toxicology", specimen: "Urine", tat: "1-2 days", notes: "Immunoassay screening" },
  { name: "Drug Confirmation Panel", category: "toxicology", specimen: "Urine", tat: "2-4 days", notes: "LC-MS/MS confirmation" },
  { name: "Opioid Panel", category: "toxicology", specimen: "Urine", tat: "1-3 days", notes: "Includes synthetic opioids" },
  { name: "Benzodiazepine Panel", category: "toxicology", specimen: "Urine", tat: "1-3 days", notes: "Expanded panel available" },
  { name: "Amphetamine Panel", category: "toxicology", specimen: "Urine", tat: "1-3 days", notes: "Includes designer stimulants" },
  { name: "Cannabinoid Screen", category: "toxicology", specimen: "Urine", tat: "1-2 days", notes: "THC metabolite detection" },
  { name: "Fentanyl & Analogs", category: "toxicology", specimen: "Urine/Blood", tat: "2-4 days", notes: "Confirmation testing" },
  { name: "Ethyl Glucuronide (EtG)", category: "toxicology", specimen: "Urine", tat: "1-3 days", notes: "Alcohol biomarker" },
  { name: "Therapeutic Drug Monitoring", category: "toxicology", specimen: "Blood", tat: "2-4 days", notes: "Select medications" },
  { name: "Pain Management Panel", category: "toxicology", specimen: "Urine", tat: "2-4 days", notes: "Comprehensive" },
  
  // Infectious Disease
  { name: "COVID-19 PCR", category: "infectious", specimen: "Nasopharyngeal", tat: "1-2 days", notes: "SARS-CoV-2 detection" },
  { name: "Respiratory Pathogen Panel", category: "infectious", specimen: "Nasopharyngeal", tat: "1-3 days", notes: "Multiple targets" },
  { name: "Influenza A/B", category: "infectious", specimen: "Nasopharyngeal", tat: "1-2 days", notes: "PCR-based" },
  { name: "Strep A Screen", category: "infectious", specimen: "Throat swab", tat: "Same day", notes: "Rapid antigen" },
  { name: "UTI Panel", category: "infectious", specimen: "Urine", tat: "2-3 days", notes: "Culture & sensitivity" },
  { name: "STI Panel", category: "infectious", specimen: "Variable", tat: "2-4 days", notes: "Multiple specimen types" },
  { name: "Hepatitis Panel", category: "infectious", specimen: "Blood", tat: "2-4 days", notes: "A, B, C markers" },
  { name: "HIV 1/2 Antibody/Antigen", category: "infectious", specimen: "Blood", tat: "1-3 days", notes: "4th generation" },
  
  // Blood / Serum
  { name: "Complete Blood Count (CBC)", category: "blood", specimen: "Whole blood", tat: "Same day", notes: "With differential" },
  { name: "Comprehensive Metabolic Panel", category: "blood", specimen: "Serum", tat: "Same day", notes: "14 analytes" },
  { name: "Basic Metabolic Panel", category: "blood", specimen: "Serum", tat: "Same day", notes: "8 analytes" },
  { name: "Lipid Panel", category: "blood", specimen: "Serum", tat: "Same day", notes: "Fasting preferred" },
  { name: "Thyroid Panel", category: "blood", specimen: "Serum", tat: "1-2 days", notes: "TSH, T3, T4" },
  { name: "Hemoglobin A1c", category: "blood", specimen: "Whole blood", tat: "Same day", notes: "Diabetes monitoring" },
  { name: "Coagulation Panel", category: "blood", specimen: "Plasma", tat: "Same day", notes: "PT, PTT, INR" },
  { name: "Vitamin D, 25-Hydroxy", category: "blood", specimen: "Serum", tat: "2-4 days", notes: "" },
  { name: "Iron Studies", category: "blood", specimen: "Serum", tat: "1-2 days", notes: "Iron, TIBC, Ferritin" },
  
  // Chemistry
  { name: "Liver Function Panel", category: "chemistry", specimen: "Serum", tat: "Same day", notes: "ALT, AST, ALP, Bilirubin" },
  { name: "Renal Panel", category: "chemistry", specimen: "Serum", tat: "Same day", notes: "BUN, Creatinine, GFR" },
  { name: "Electrolyte Panel", category: "chemistry", specimen: "Serum", tat: "Same day", notes: "Na, K, Cl, CO2" },
  { name: "Glucose, Fasting", category: "chemistry", specimen: "Serum/Plasma", tat: "Same day", notes: "" },
  { name: "Urinalysis", category: "chemistry", specimen: "Urine", tat: "Same day", notes: "Chemical & microscopic" },
  { name: "Uric Acid", category: "chemistry", specimen: "Serum", tat: "Same day", notes: "" },
  { name: "Ammonia", category: "chemistry", specimen: "Plasma", tat: "Same day", notes: "Special handling required" },
  { name: "Magnesium", category: "chemistry", specimen: "Serum", tat: "Same day", notes: "" },
]

export default function TestMenuPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()

  const filteredTests = tests.filter((test) => {
    const matchesCategory = activeCategory === "all" || test.category === activeCategory
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.specimen.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Test Menu
                </h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Browse our comprehensive testing catalog. Typical turnaround times are provided 
                  as estimates and may vary based on specimen condition, confirmatory testing 
                  requirements, and chain-of-custody procedures.
                </p>
              </div>
              <Button variant="outline" className="shrink-0 bg-transparent">
                <Download className="mr-2 size-4" />
                Download Test Menu PDF
              </Button>
            </div>
          </div>
        </section>

        {/* Filters and Table */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={activeCategory === category.id ? "bg-primary hover:bg-[#B84500]" : ""}
                  >
                    <category.icon className="mr-1.5 size-4" />
                    {category.label}
                  </Button>
                ))}
              </div>
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTests.length} {filteredTests.length === 1 ? "test" : "tests"}
                {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
              </p>
            </div>

            {/* Test Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-semibold">Test Name</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Specimen</TableHead>
                      <TableHead className="font-semibold">Typical TAT</TableHead>
                      <TableHead className="font-semibold">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.map((test, index) => (
                      <TableRow key={`${test.name}-${index}`}>
                        <TableCell className="font-medium">{test.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {test.category === "infectious" ? "Infectious Disease" : 
                             test.category === "blood" ? "Blood / Serum" : 
                             test.category.charAt(0).toUpperCase() + test.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{test.specimen}</TableCell>
                        <TableCell className="text-muted-foreground">{test.tat}</TableCell>
                        <TableCell className="text-muted-foreground">{test.notes || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Turnaround times are typical estimates 
                and may vary based on specimen condition, confirmatory testing requirements, chain-of-custody 
                procedures, and testing volume. Contact us for specific testing questions or custom panel requests.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-card py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Need a Custom Panel or Have Questions?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our team can help with specialized testing requirements and custom panel configurations.
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
    </Suspense>
  )
}
