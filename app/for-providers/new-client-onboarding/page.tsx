"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { 
  Building2, 
  Users, 
  Truck, 
  Monitor, 
  TestTube, 
  UserCheck, 
  Shield, 
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PHIWarningBanner } from "@/components/onboarding/phi-warning-banner"
import { ProviderTable } from "@/components/onboarding/provider-table"
import { OnboardingDisclaimers } from "@/components/onboarding/onboarding-disclaimers"
import { 
  onboardingFormSchema, 
  defaultOnboardingValues,
  type OnboardingFormData,
  type Provider,
} from "@/lib/onboarding/schema"

const sectionNav = [
  { id: "account", label: "Account", icon: Building2 },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "delivery", label: "Result Delivery", icon: Monitor },
  { id: "services", label: "Services", icon: TestTube },
  { id: "providers", label: "Providers", icon: UserCheck },
  { id: "authorization", label: "Authorization", icon: Shield },
  { id: "submit", label: "Submit", icon: FileCheck },
]

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
]

export default function NewClientOnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("account")
  const [providers, setProviders] = useState<Provider[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      ...defaultOnboardingValues,
      providers: [],
    },
  })

  const watchFaxEnabled = watch("faxEnabled")
  const watchEmailResultsEnabled = watch("emailResultsEnabled")
  const watchCocTestingRequested = watch("cocTestingRequested")
  const watchCourierPickupNeeded = watch("courierPickupNeeded")
  const watchSampleTypeOther = watch("sampleTypeOther")
  const watchShippingProvider = watch("shippingProvider")

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
    }
  }

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, providers }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmissionId(result.submissionId)
        setIsSubmitted(true)
      } else {
        console.error("Submission failed:", result.error)
        alert("Submission failed. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update providers in form when they change
  const handleProvidersChange = (newProviders: Provider[]) => {
    setProviders(newProviders)
    setValue("providers", newProviders)
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardContent className="pt-10 pb-10">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Onboarding Request Submitted</h1>
            <p className="mt-2 text-muted-foreground">
              Your submission ID is: <span className="font-mono font-semibold text-foreground">{submissionId}</span>
            </p>
            
            <div className="mx-auto mt-8 max-w-md text-left">
              <h2 className="font-semibold text-foreground">Next Steps:</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Our team will review your submission and contact you within 2-3 business days.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Provider signature requests will be sent to the email addresses provided.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>Integration setup will be coordinated based on your result delivery preferences.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Do not email patient health information (PHI) to our team. 
                All PHI must be transmitted through secure, established channels only.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/for-providers">Return to Provider Resources</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Go to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              New Client
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              New Client Onboarding
            </h1>
            <p className="mt-4 text-muted-foreground">
              Complete this form to begin the onboarding process with Legacy Labs. 
              All fields marked with * are required.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* PHI Warning */}
        <div className="mb-8">
          <PHIWarningBanner />
        </div>

        <div className="flex gap-8">
          {/* Sticky Side Navigation */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <nav className="sticky top-24 space-y-1">
              {sectionNav.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <section.icon className="size-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Form Content */}
          <div className="min-w-0 flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Section 1: Account Information */}
              <Card id="account">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Facility and location details</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="facilityLegalName">Facility Legal Name *</Label>
                      <Input
                        id="facilityLegalName"
                        {...register("facilityLegalName")}
                        placeholder="ABC Healthcare, LLC"
                      />
                      {errors.facilityLegalName && (
                        <p className="text-sm text-destructive">{errors.facilityLegalName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dba">DBA (Doing Business As)</Label>
                      <Input id="dba" {...register("dba")} placeholder="Optional" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectedStartDate">Projected Start Date *</Label>
                      <Input
                        id="projectedStartDate"
                        type="date"
                        {...register("projectedStartDate")}
                      />
                      {errors.projectedStartDate && (
                        <p className="text-sm text-destructive">{errors.projectedStartDate.message}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        {...register("addressLine1")}
                        placeholder="123 Main Street"
                      />
                      {errors.addressLine1 && (
                        <p className="text-sm text-destructive">{errors.addressLine1.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2 / Suite / Building</Label>
                      <Input
                        id="addressLine2"
                        {...register("addressLine2")}
                        placeholder="Suite 100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" {...register("city")} placeholder="Columbus" />
                      {errors.city && (
                        <p className="text-sm text-destructive">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select onValueChange={(value) => setValue("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="text-sm text-destructive">{errors.state.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input id="zip" {...register("zip")} placeholder="43064" maxLength={10} />
                        {errors.zip && (
                          <p className="text-sm text-destructive">{errors.zip.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Contacts */}
              <Card id="contacts">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Contacts</CardTitle>
                      <CardDescription>Primary and escalation contact information</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-4 font-semibold text-foreground">Primary Contact</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="primaryContactName">Name *</Label>
                        <Input
                          id="primaryContactName"
                          {...register("primaryContactName")}
                          placeholder="Jane Smith"
                        />
                        {errors.primaryContactName && (
                          <p className="text-sm text-destructive">{errors.primaryContactName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryContactRole">Role *</Label>
                        <Input
                          id="primaryContactRole"
                          {...register("primaryContactRole")}
                          placeholder="Office Manager"
                        />
                        {errors.primaryContactRole && (
                          <p className="text-sm text-destructive">{errors.primaryContactRole.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryContactPhone">Phone *</Label>
                        <Input
                          id="primaryContactPhone"
                          type="tel"
                          {...register("primaryContactPhone")}
                          placeholder="(614) 555-1234"
                        />
                        {errors.primaryContactPhone && (
                          <p className="text-sm text-destructive">{errors.primaryContactPhone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryContactEmail">Email *</Label>
                        <Input
                          id="primaryContactEmail"
                          type="email"
                          {...register("primaryContactEmail")}
                          placeholder="jane.smith@facility.com"
                        />
                        {errors.primaryContactEmail && (
                          <p className="text-sm text-destructive">{errors.primaryContactEmail.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 font-semibold text-foreground">Critical / Escalation Contact</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="escalationContactName">Name *</Label>
                        <Input
                          id="escalationContactName"
                          {...register("escalationContactName")}
                          placeholder="Dr. John Doe"
                        />
                        {errors.escalationContactName && (
                          <p className="text-sm text-destructive">{errors.escalationContactName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="escalationContactPhone">After-Hours Phone *</Label>
                        <Input
                          id="escalationContactPhone"
                          type="tel"
                          {...register("escalationContactPhone")}
                          placeholder="(614) 555-5678"
                        />
                        {errors.escalationContactPhone && (
                          <p className="text-sm text-destructive">{errors.escalationContactPhone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="escalationContactEmail">After-Hours Email (Optional)</Label>
                        <Input
                          id="escalationContactEmail"
                          type="email"
                          {...register("escalationContactEmail")}
                          placeholder="dr.doe@facility.com"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 font-semibold text-foreground">Business Hours</h3>
                    <div className="space-y-4">
                      {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
                        <div key={day} className="flex items-center gap-4">
                          <span className="w-24 text-sm font-medium capitalize text-foreground">{day}</span>
                          <Input
                            type="time"
                            {...register(`businessHours.${day}Start` as keyof OnboardingFormData)}
                            className="w-32"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="time"
                            {...register(`businessHours.${day}End` as keyof OnboardingFormData)}
                            className="w-32"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center space-x-3">
                      <Checkbox
                        id="afterHoursCoverage"
                        onCheckedChange={(checked) => setValue("afterHoursCoverage", !!checked)}
                      />
                      <Label htmlFor="afterHoursCoverage" className="text-sm font-normal">
                        After-hours coverage available
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Shipping & Logistics */}
              <Card id="shipping">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Truck className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Shipping & Logistics</CardTitle>
                      <CardDescription>Specimen transport and supply needs</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Shipping Provider *</Label>
                    <RadioGroup
                      defaultValue="ups"
                      onValueChange={(value) => setValue("shippingProvider", value as "ups" | "fedex" | "other")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="ups" id="ups" />
                        <Label htmlFor="ups" className="font-normal">UPS</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="fedex" id="fedex" />
                        <Label htmlFor="fedex" className="font-normal">FedEx</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="other" id="shipping-other" />
                        <Label htmlFor="shipping-other" className="font-normal">Other</Label>
                      </div>
                    </RadioGroup>
                    {watchShippingProvider === "other" && (
                      <Input
                        {...register("shippingProviderOther")}
                        placeholder="Specify shipping provider"
                        className="mt-2 max-w-sm"
                      />
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Courier Pickup Needed?</Label>
                    <RadioGroup
                      defaultValue="unknown"
                      onValueChange={(value) => setValue("courierPickupNeeded", value as "yes" | "no" | "unknown")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="yes" id="courier-yes" />
                        <Label htmlFor="courier-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="no" id="courier-no" />
                        <Label htmlFor="courier-no" className="font-normal">No</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="unknown" id="courier-unknown" />
                        <Label htmlFor="courier-unknown" className="font-normal">Not sure yet</Label>
                      </div>
                    </RadioGroup>

                    {watchCourierPickupNeeded === "yes" && (
                      <div className="mt-4 grid gap-4 rounded-lg border border-border bg-secondary/30 p-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="courierPickupWindow">Preferred Pickup Window</Label>
                          <Input
                            id="courierPickupWindow"
                            {...register("courierPickupWindow")}
                            placeholder="e.g., 3:00 PM - 5:00 PM"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="courierPickupStartDate">Pickup Start Date</Label>
                          <Input
                            id="courierPickupStartDate"
                            type="date"
                            {...register("courierPickupStartDate")}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="suppliesNeeded"
                        onCheckedChange={(checked) => setValue("suppliesNeeded", !!checked)}
                      />
                      <Label htmlFor="suppliesNeeded" className="font-normal">
                        Collection supplies needed
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="suppliesNotes">Supply Notes (Optional)</Label>
                      <Textarea
                        id="suppliesNotes"
                        {...register("suppliesNotes")}
                        placeholder="Describe any specific supply needs or preferences..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4: Result Delivery & Integrations */}
              <Card id="delivery">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Monitor className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Result Delivery & Integrations</CardTitle>
                      <CardDescription>How you would like to receive test results</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Result Delivery Methods</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="portalEnabled"
                          defaultChecked={true}
                          onCheckedChange={(checked) => setValue("portalEnabled", !!checked)}
                        />
                        <Label htmlFor="portalEnabled" className="font-normal">
                          Provider Portal (included)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="hl7Enabled"
                          onCheckedChange={(checked) => setValue("hl7Enabled", !!checked)}
                        />
                        <Label htmlFor="hl7Enabled" className="font-normal">
                          HL7 v2 Interface
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="fhirEnabled"
                          onCheckedChange={(checked) => setValue("fhirEnabled", !!checked)}
                        />
                        <Label htmlFor="fhirEnabled" className="font-normal">
                          FHIR API
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sftpEnabled"
                          onCheckedChange={(checked) => setValue("sftpEnabled", !!checked)}
                        />
                        <Label htmlFor="sftpEnabled" className="font-normal">
                          SFTP Delivery
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="faxEnabled"
                          onCheckedChange={(checked) => setValue("faxEnabled", !!checked)}
                        />
                        <Label htmlFor="faxEnabled" className="font-normal">
                          Fax
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="emailResultsEnabled"
                          onCheckedChange={(checked) => setValue("emailResultsEnabled", !!checked)}
                        />
                        <Label htmlFor="emailResultsEnabled" className="font-normal">
                          Email Results
                        </Label>
                      </div>
                    </div>
                  </div>

                  {watchFaxEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="faxNumber">Fax Number *</Label>
                      <Input
                        id="faxNumber"
                        {...register("faxNumber")}
                        placeholder="(614) 555-9999"
                      />
                      {errors.faxNumber && (
                        <p className="text-sm text-destructive">{errors.faxNumber.message}</p>
                      )}
                    </div>
                  )}

                  {watchEmailResultsEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="resultsEmail">Results Email *</Label>
                      <Input
                        id="resultsEmail"
                        type="email"
                        {...register("resultsEmail")}
                        placeholder="results@facility.com"
                      />
                      {errors.resultsEmail && (
                        <p className="text-sm text-destructive">{errors.resultsEmail.message}</p>
                      )}
                    </div>
                  )}

                  <Separator />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="alertsEmail">Alerts/Announcements Email (Optional)</Label>
                      <Input
                        id="alertsEmail"
                        type="email"
                        {...register("alertsEmail")}
                        placeholder="admin@facility.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requestedEmr">Requested EMR/EHR (Optional)</Label>
                      <Input
                        id="requestedEmr"
                        {...register("requestedEmr")}
                        placeholder="e.g., Epic, Cerner, eClinicalWorks"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5: Services */}
              <Card id="services">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <TestTube className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Services</CardTitle>
                      <CardDescription>Select the sample types you plan to submit</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Sample Types Requested</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sampleTypeToxicology"
                          onCheckedChange={(checked) => setValue("sampleTypeToxicology", !!checked)}
                        />
                        <Label htmlFor="sampleTypeToxicology" className="font-normal">
                          Toxicology
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sampleTypeBloodSerum"
                          onCheckedChange={(checked) => setValue("sampleTypeBloodSerum", !!checked)}
                        />
                        <Label htmlFor="sampleTypeBloodSerum" className="font-normal">
                          Blood / Serum
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sampleTypeInfectiousDisease"
                          onCheckedChange={(checked) => setValue("sampleTypeInfectiousDisease", !!checked)}
                        />
                        <Label htmlFor="sampleTypeInfectiousDisease" className="font-normal">
                          Infectious Disease
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sampleTypeClinicalChemistry"
                          onCheckedChange={(checked) => setValue("sampleTypeClinicalChemistry", !!checked)}
                        />
                        <Label htmlFor="sampleTypeClinicalChemistry" className="font-normal">
                          Clinical Chemistry
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="sampleTypeOther"
                          onCheckedChange={(checked) => setValue("sampleTypeOther", !!checked)}
                        />
                        <Label htmlFor="sampleTypeOther" className="font-normal">
                          Other
                        </Label>
                      </div>
                    </div>
                    {watchSampleTypeOther && (
                      <div className="space-y-2">
                        <Label htmlFor="sampleTypeOtherText">Please specify other sample types</Label>
                        <Textarea
                          id="sampleTypeOtherText"
                          {...register("sampleTypeOtherText")}
                          placeholder="Describe other sample types..."
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Section 6: Providers */}
              <Card id="providers">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <UserCheck className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Providers</CardTitle>
                      <CardDescription>
                        Add all ordering providers. Each provider will be sent a signature request after submission.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ProviderTable
                    providers={providers}
                    onChange={handleProvidersChange}
                    showSignature={true}
                  />
                  {errors.providers && (
                    <p className="mt-2 text-sm text-destructive">{errors.providers.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Section 7: Authorization */}
              <Card id="authorization">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Authorization & Acknowledgement</CardTitle>
                      <CardDescription>Required acknowledgements and authorizations</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Provider Authorization */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">Provider Authorization & Acknowledgement</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>By checking the box below, the authorized representative acknowledges:</p>
                      <ul className="ml-4 list-disc space-y-1">
                        <li>Responsibility for determining medical necessity for all ordered tests</li>
                        <li>Understanding of applicable payer compliance requirements</li>
                        <li>Commitment to order only tests that are medically necessary</li>
                        <li>Responsibility to maintain supporting documentation for ordered tests</li>
                        <li>Patient consent has been or will be obtained for specimen collection, testing, and release of results to the ordering facility</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-start space-x-3">
                      <Checkbox
                        id="providerAcknowledgement"
                        onCheckedChange={(checked) => setValue("providerAcknowledgement", !!checked)}
                      />
                      <Label htmlFor="providerAcknowledgement" className="text-sm font-medium leading-relaxed">
                        I acknowledge and agree to the above terms *
                      </Label>
                    </div>
                    {errors.providerAcknowledgement && (
                      <p className="mt-2 text-sm text-destructive">{errors.providerAcknowledgement.message}</p>
                    )}
                  </div>

                  <Separator />

                  {/* Electronic Signature Authorization */}
                  <div>
                    <h3 className="mb-3 font-semibold text-foreground">Electronic Signature Authorization (Optional)</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      You may authorize Legacy Labs to apply an electronic signature to applicable 
                      laboratory documentation for ordered tests.
                    </p>
                    <RadioGroup
                      onValueChange={(value) => setValue("electronicSignatureAuth", value as "authorize" | "do-not-authorize")}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="authorize" id="esig-authorize" />
                        <Label htmlFor="esig-authorize" className="font-normal">
                          I authorize electronic signature application
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="do-not-authorize" id="esig-do-not-authorize" />
                        <Label htmlFor="esig-do-not-authorize" className="font-normal">
                          I do not authorize electronic signature application
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="mt-3 text-xs text-muted-foreground">
                      You may withdraw this consent at any time by providing written notice to Legacy Labs.
                    </p>
                  </div>

                  <Separator />

                  {/* COC Rider */}
                  <div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="cocTestingRequested"
                        onCheckedChange={(checked) => setValue("cocTestingRequested", !!checked)}
                      />
                      <Label htmlFor="cocTestingRequested" className="font-medium">
                        Chain of Custody (COC) testing requested when applicable
                      </Label>
                    </div>

                    {watchCocTestingRequested && (
                      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <h4 className="mb-2 font-semibold text-amber-800">COC Rider Summary</h4>
                        <p className="mb-3 text-sm text-amber-700">
                          Chain of Custody procedures include documented specimen identity verification, 
                          sealed transport containers, handoff logs, and evidence tracking suitable for 
                          legal or regulatory proceedings. Additional fees may apply for COC collections.
                        </p>
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="cocRiderAcknowledgement"
                            onCheckedChange={(checked) => setValue("cocRiderAcknowledgement", !!checked)}
                          />
                          <Label htmlFor="cocRiderAcknowledgement" className="text-sm font-medium text-amber-800">
                            I acknowledge the COC rider terms *
                          </Label>
                        </div>
                        {errors.cocRiderAcknowledgement && (
                          <p className="mt-2 text-sm text-destructive">{errors.cocRiderAcknowledgement.message}</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Section 8: Submit */}
              <Card id="submit">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileCheck className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Authorized Representative</CardTitle>
                      <CardDescription>Final authorization from facility representative</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="authorizedRepName">Authorized Representative Name *</Label>
                      <Input
                        id="authorizedRepName"
                        {...register("authorizedRepName")}
                        placeholder="Full legal name"
                      />
                      {errors.authorizedRepName && (
                        <p className="text-sm text-destructive">{errors.authorizedRepName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="authorizedRepTitle">Title *</Label>
                      <Input
                        id="authorizedRepTitle"
                        {...register("authorizedRepTitle")}
                        placeholder="e.g., Medical Director, Office Manager"
                      />
                      {errors.authorizedRepTitle && (
                        <p className="text-sm text-destructive">{errors.authorizedRepTitle.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Note:</strong> For the public submission form, 
                      electronic signatures will be requested via email after submission. Portal users 
                      may complete signatures during the wizard process.
                    </p>
                  </div>

                  <Separator />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-[#B84500]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Onboarding Request
                        <ArrowRight className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <OnboardingDisclaimers />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
