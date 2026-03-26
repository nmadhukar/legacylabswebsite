"use client"

import { useState, useEffect } from "react"
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
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
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
  formSections,
  type OnboardingFormData,
  type Provider,
} from "@/lib/onboarding/schema"

const stepIcons = [Building2, Users, Truck, Monitor, TestTube, UserCheck, Shield, FileCheck]

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
]

export default function PortalOnboardingWizardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [providers, setProviders] = useState<Provider[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      ...defaultOnboardingValues,
      providers: [],
    },
    mode: "onChange",
  })

  const watchFaxEnabled = watch("faxEnabled")
  const watchEmailResultsEnabled = watch("emailResultsEnabled")
  const watchCocTestingRequested = watch("cocTestingRequested")
  const watchCourierPickupNeeded = watch("courierPickupNeeded")
  const watchSampleTypeOther = watch("sampleTypeOther")
  const watchShippingProvider = watch("shippingProvider")
  const allValues = watch()

  // Auto-save simulation
  const handleSaveProgress = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  // Update providers in form
  const handleProvidersChange = (newProviders: Provider[]) => {
    setProviders(newProviders)
    setValue("providers", newProviders)
  }

  // Validate current step fields before moving forward
  const validateStep = async (step: number): Promise<boolean> => {
    const stepFieldGroups: Record<number, (keyof OnboardingFormData)[]> = {
      1: ["facilityLegalName", "projectedStartDate", "addressLine1", "city", "state", "zip"],
      2: ["primaryContactName", "primaryContactRole", "primaryContactPhone", "primaryContactEmail", "escalationContactName", "escalationContactPhone"],
      3: ["shippingProvider"],
      4: [],
      5: [],
      6: ["providers"],
      7: ["providerAcknowledgement", "authorizedRepName", "authorizedRepTitle"],
      8: [],
    }

    const fields = stepFieldGroups[step]
    if (fields.length === 0) return true
    return await trigger(fields)
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 8) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newSubmissionId = `SV-${Date.now().toString(36).toUpperCase()}`
    setSubmissionId(newSubmissionId)
    
    console.log("[v0] Portal onboarding submission:", { ...data, providers })
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const progress = (currentStep / 8) * 100

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="pt-10 pb-10">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="size-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Onboarding Complete</h1>
              <p className="mt-2 text-muted-foreground">
                Submission ID: <span className="font-mono font-semibold text-foreground">{submissionId}</span>
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
                    <span>Your account will be configured based on your selected integration preferences.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>Collection supplies will be shipped to your facility address.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Do not email PHI. All patient information must be 
                  transmitted through secure, established channels only.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild>
                  <Link href="/portal">Go to Portal Dashboard</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground">New Client Onboarding</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of 8: {formSections[currentStep - 1]?.title}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastSaved && (
                <span className="text-xs text-muted-foreground">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSaveProgress}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="mr-2 size-4" />
                )}
                Save Progress
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Step Indicators */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto">
            {formSections.map((section, index) => {
              const Icon = stepIcons[index]
              const stepNumber = index + 1
              const isActive = currentStep === stepNumber
              const isCompleted = currentStep > stepNumber
              
              return (
                <button
                  key={section.id}
                  onClick={() => stepNumber < currentStep && setCurrentStep(stepNumber)}
                  disabled={stepNumber > currentStep}
                  className={`flex flex-col items-center gap-1 px-2 ${
                    stepNumber > currentStep ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="size-5" /> : <Icon className="size-5" />}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    {section.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {currentStep === 1 && (
          <div className="mb-6">
            <PHIWarningBanner />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Account Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building2 className="size-5 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription>Enter your facility and location details</CardDescription>
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
                    <Input type="date" {...register("projectedStartDate")} />
                    {errors.projectedStartDate && (
                      <p className="text-sm text-destructive">{errors.projectedStartDate.message}</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input {...register("addressLine1")} placeholder="123 Main Street" />
                    {errors.addressLine1 && (
                      <p className="text-sm text-destructive">{errors.addressLine1.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2 / Suite / Building</Label>
                    <Input {...register("addressLine2")} placeholder="Suite 100" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input {...register("city")} placeholder="Columbus" />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>State *</Label>
                      <Select onValueChange={(value) => setValue("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-sm text-destructive">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code *</Label>
                      <Input {...register("zip")} placeholder="43064" maxLength={10} />
                      {errors.zip && (
                        <p className="text-sm text-destructive">{errors.zip.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Contacts */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="size-5 text-primary" />
                  Contacts
                </CardTitle>
                <CardDescription>Primary and escalation contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-4 font-semibold text-foreground">Primary Contact</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Name *</Label>
                      <Input {...register("primaryContactName")} placeholder="Jane Smith" />
                      {errors.primaryContactName && (
                        <p className="text-sm text-destructive">{errors.primaryContactName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Role *</Label>
                      <Input {...register("primaryContactRole")} placeholder="Office Manager" />
                      {errors.primaryContactRole && (
                        <p className="text-sm text-destructive">{errors.primaryContactRole.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input type="tel" {...register("primaryContactPhone")} placeholder="(614) 555-1234" />
                      {errors.primaryContactPhone && (
                        <p className="text-sm text-destructive">{errors.primaryContactPhone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" {...register("primaryContactEmail")} placeholder="jane@facility.com" />
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
                      <Label>Name *</Label>
                      <Input {...register("escalationContactName")} placeholder="Dr. John Doe" />
                      {errors.escalationContactName && (
                        <p className="text-sm text-destructive">{errors.escalationContactName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>After-Hours Phone *</Label>
                      <Input type="tel" {...register("escalationContactPhone")} placeholder="(614) 555-5678" />
                      {errors.escalationContactPhone && (
                        <p className="text-sm text-destructive">{errors.escalationContactPhone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label>After-Hours Email (Optional)</Label>
                      <Input type="email" {...register("escalationContactEmail")} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 font-semibold text-foreground">Business Hours</h3>
                  <div className="space-y-4">
                    {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
                      <div key={day} className="flex items-center gap-4">
                        <span className="w-24 text-sm font-medium capitalize">{day}</span>
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
                    <Label htmlFor="afterHoursCoverage" className="font-normal">
                      After-hours coverage available
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Shipping & Logistics */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Truck className="size-5 text-primary" />
                  Shipping & Logistics
                </CardTitle>
                <CardDescription>Specimen transport and supply needs</CardDescription>
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
                    <Input {...register("shippingProviderOther")} placeholder="Specify provider" className="mt-2 max-w-sm" />
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
                    <div className="mt-4 grid gap-4 rounded-lg border bg-secondary/30 p-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Preferred Pickup Window</Label>
                        <Input {...register("courierPickupWindow")} placeholder="e.g., 3:00 PM - 5:00 PM" />
                      </div>
                      <div className="space-y-2">
                        <Label>Pickup Start Date</Label>
                        <Input type="date" {...register("courierPickupStartDate")} />
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
                    <Label htmlFor="suppliesNeeded" className="font-normal">Collection supplies needed</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Supply Notes (Optional)</Label>
                    <Textarea {...register("suppliesNotes")} placeholder="Describe supply needs..." rows={3} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Result Delivery */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Monitor className="size-5 text-primary" />
                  Result Delivery & Integrations
                </CardTitle>
                <CardDescription>How you would like to receive test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Result Delivery Methods</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="portalEnabled" defaultChecked onCheckedChange={(c) => setValue("portalEnabled", !!c)} />
                      <Label htmlFor="portalEnabled" className="font-normal">Provider Portal (included)</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="hl7Enabled" onCheckedChange={(c) => setValue("hl7Enabled", !!c)} />
                      <Label htmlFor="hl7Enabled" className="font-normal">HL7 v2 Interface</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="fhirEnabled" onCheckedChange={(c) => setValue("fhirEnabled", !!c)} />
                      <Label htmlFor="fhirEnabled" className="font-normal">FHIR API</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="sftpEnabled" onCheckedChange={(c) => setValue("sftpEnabled", !!c)} />
                      <Label htmlFor="sftpEnabled" className="font-normal">SFTP Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="faxEnabled" onCheckedChange={(c) => setValue("faxEnabled", !!c)} />
                      <Label htmlFor="faxEnabled" className="font-normal">Fax</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="emailResultsEnabled" onCheckedChange={(c) => setValue("emailResultsEnabled", !!c)} />
                      <Label htmlFor="emailResultsEnabled" className="font-normal">Email Results</Label>
                    </div>
                  </div>
                </div>

                {watchFaxEnabled && (
                  <div className="space-y-2">
                    <Label>Fax Number *</Label>
                    <Input {...register("faxNumber")} placeholder="(614) 555-9999" />
                    {errors.faxNumber && <p className="text-sm text-destructive">{errors.faxNumber.message}</p>}
                  </div>
                )}

                {watchEmailResultsEnabled && (
                  <div className="space-y-2">
                    <Label>Results Email *</Label>
                    <Input type="email" {...register("resultsEmail")} placeholder="results@facility.com" />
                    {errors.resultsEmail && <p className="text-sm text-destructive">{errors.resultsEmail.message}</p>}
                  </div>
                )}

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Alerts/Announcements Email (Optional)</Label>
                    <Input type="email" {...register("alertsEmail")} placeholder="admin@facility.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Requested EMR/EHR (Optional)</Label>
                    <Input {...register("requestedEmr")} placeholder="e.g., Epic, Cerner" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Services */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TestTube className="size-5 text-primary" />
                  Services
                </CardTitle>
                <CardDescription>Select the sample types you plan to submit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Sample Types Requested</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="toxicology" onCheckedChange={(c) => setValue("sampleTypeToxicology", !!c)} />
                      <Label htmlFor="toxicology" className="font-normal">Toxicology</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="bloodSerum" onCheckedChange={(c) => setValue("sampleTypeBloodSerum", !!c)} />
                      <Label htmlFor="bloodSerum" className="font-normal">Blood / Serum</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="infectious" onCheckedChange={(c) => setValue("sampleTypeInfectiousDisease", !!c)} />
                      <Label htmlFor="infectious" className="font-normal">Infectious Disease</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="chemistry" onCheckedChange={(c) => setValue("sampleTypeClinicalChemistry", !!c)} />
                      <Label htmlFor="chemistry" className="font-normal">Clinical Chemistry</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="other" onCheckedChange={(c) => setValue("sampleTypeOther", !!c)} />
                      <Label htmlFor="other" className="font-normal">Other</Label>
                    </div>
                  </div>
                  {watchSampleTypeOther && (
                    <div className="space-y-2">
                      <Label>Please specify other sample types</Label>
                      <Textarea {...register("sampleTypeOtherText")} rows={2} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 6: Providers */}
          {currentStep === 6 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <UserCheck className="size-5 text-primary" />
                  Providers
                </CardTitle>
                <CardDescription>Add all ordering providers for your facility</CardDescription>
              </CardHeader>
              <CardContent>
                <ProviderTable providers={providers} onChange={handleProvidersChange} />
                {errors.providers && <p className="mt-2 text-sm text-destructive">{errors.providers.message}</p>}
              </CardContent>
            </Card>
          )}

          {/* Step 7: Authorization */}
          {currentStep === 7 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="size-5 text-primary" />
                  Authorization & Acknowledgement
                </CardTitle>
                <CardDescription>Required acknowledgements and authorizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border bg-secondary/30 p-4">
                  <h3 className="mb-3 font-semibold">Provider Authorization & Acknowledgement</h3>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                    <li>Responsibility for determining medical necessity for all ordered tests</li>
                    <li>Understanding of applicable payer compliance requirements</li>
                    <li>Commitment to order only tests that are medically necessary</li>
                    <li>Responsibility to maintain supporting documentation</li>
                    <li>Patient consent has been or will be obtained</li>
                  </ul>
                  <div className="mt-4 flex items-start space-x-3">
                    <Checkbox id="ack" onCheckedChange={(c) => setValue("providerAcknowledgement", !!c)} />
                    <Label htmlFor="ack" className="text-sm font-medium">I acknowledge and agree to the above terms *</Label>
                  </div>
                  {errors.providerAcknowledgement && (
                    <p className="mt-2 text-sm text-destructive">{errors.providerAcknowledgement.message}</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-semibold">Electronic Signature Authorization (Optional)</h3>
                  <RadioGroup onValueChange={(v) => setValue("electronicSignatureAuth", v as "authorize" | "do-not-authorize")}>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="authorize" id="esig-yes" />
                      <Label htmlFor="esig-yes" className="font-normal">I authorize electronic signature application</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="do-not-authorize" id="esig-no" />
                      <Label htmlFor="esig-no" className="font-normal">I do not authorize electronic signature</Label>
                    </div>
                  </RadioGroup>
                  <p className="mt-2 text-xs text-muted-foreground">
                    You may withdraw this consent at any time by providing written notice.
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="coc" onCheckedChange={(c) => setValue("cocTestingRequested", !!c)} />
                    <Label htmlFor="coc" className="font-medium">COC testing requested when applicable</Label>
                  </div>
                  {watchCocTestingRequested && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <h4 className="mb-2 font-semibold text-amber-800">COC Rider Summary</h4>
                      <p className="mb-3 text-sm text-amber-700">
                        Chain of Custody procedures include documented specimen identity verification,
                        sealed transport containers, handoff logs, and evidence tracking.
                      </p>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="cocAck" onCheckedChange={(c) => setValue("cocRiderAcknowledgement", !!c)} />
                        <Label htmlFor="cocAck" className="text-sm font-medium text-amber-800">
                          I acknowledge the COC rider terms *
                        </Label>
                      </div>
                      {errors.cocRiderAcknowledgement && (
                        <p className="mt-2 text-sm text-destructive">{errors.cocRiderAcknowledgement.message}</p>
                      )}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Authorized Representative Name *</Label>
                    <Input {...register("authorizedRepName")} placeholder="Full legal name" />
                    {errors.authorizedRepName && (
                      <p className="text-sm text-destructive">{errors.authorizedRepName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input {...register("authorizedRepTitle")} placeholder="e.g., Medical Director" />
                    {errors.authorizedRepTitle && (
                      <p className="text-sm text-destructive">{errors.authorizedRepTitle.message}</p>
                    )}
                  </div>
                </div>

                {/* Signature capture for portal version */}
                <div className="space-y-2">
                  <Label>Digital Signature</Label>
                  <div className="rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      By typing your name below, you agree this constitutes your electronic signature.
                    </p>
                    <Input 
                      {...register("signature")} 
                      placeholder="Type your full legal name" 
                      className="mx-auto mt-4 max-w-sm text-center font-medium"
                    />
                    <Input 
                      type="hidden" 
                      {...register("signatureDate")} 
                      value={new Date().toISOString().split('T')[0]}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 8: Review & Submit */}
          {currentStep === 8 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileCheck className="size-5 text-primary" />
                  Review & Submit
                </CardTitle>
                <CardDescription>Review your information before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary sections */}
                <div className="space-y-4">
                  <div className="rounded-lg border bg-secondary/30 p-4">
                    <h3 className="mb-2 font-semibold">Account Information</h3>
                    <div className="grid gap-2 text-sm">
                      <div><span className="text-muted-foreground">Facility:</span> {allValues.facilityLegalName || "Not provided"}</div>
                      {allValues.dba && <div><span className="text-muted-foreground">DBA:</span> {allValues.dba}</div>}
                      <div><span className="text-muted-foreground">Address:</span> {allValues.addressLine1}, {allValues.city}, {allValues.state} {allValues.zip}</div>
                      <div><span className="text-muted-foreground">Start Date:</span> {allValues.projectedStartDate || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-secondary/30 p-4">
                    <h3 className="mb-2 font-semibold">Contacts</h3>
                    <div className="grid gap-2 text-sm">
                      <div><span className="text-muted-foreground">Primary:</span> {allValues.primaryContactName} ({allValues.primaryContactEmail})</div>
                      <div><span className="text-muted-foreground">Escalation:</span> {allValues.escalationContactName} ({allValues.escalationContactPhone})</div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-secondary/30 p-4">
                    <h3 className="mb-2 font-semibold">Providers</h3>
                    <div className="text-sm">
                      {providers.length > 0 ? (
                        <ul className="list-disc ml-4 space-y-1">
                          {providers.map(p => (
                            <li key={p.id}>{p.name} ({p.credentials}) - NPI: {p.npi}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted-foreground">No providers added</span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border bg-secondary/30 p-4">
                    <h3 className="mb-2 font-semibold">Result Delivery</h3>
                    <div className="flex flex-wrap gap-2">
                      {allValues.portalEnabled && <Badge variant="secondary">Portal</Badge>}
                      {allValues.hl7Enabled && <Badge variant="secondary">HL7 v2</Badge>}
                      {allValues.fhirEnabled && <Badge variant="secondary">FHIR</Badge>}
                      {allValues.sftpEnabled && <Badge variant="secondary">SFTP</Badge>}
                      {allValues.faxEnabled && <Badge variant="secondary">Fax</Badge>}
                      {allValues.emailResultsEnabled && <Badge variant="secondary">Email</Badge>}
                    </div>
                  </div>

                  <div className="rounded-lg border bg-secondary/30 p-4">
                    <h3 className="mb-2 font-semibold">Authorization</h3>
                    <div className="text-sm">
                      <div><span className="text-muted-foreground">Authorized By:</span> {allValues.authorizedRepName}, {allValues.authorizedRepTitle}</div>
                      {allValues.signature && <div><span className="text-muted-foreground">Signature:</span> {allValues.signature}</div>}
                      {allValues.cocTestingRequested && <div className="mt-1"><Badge>COC Testing Requested</Badge></div>}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Please review all information carefully.</strong> Once submitted, our team
                    will contact you within 2-3 business days to finalize your account setup.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-[#1489BE]"
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
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 size-4" />
              Previous
            </Button>

            {currentStep < 8 && (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 size-4" />
              </Button>
            )}
          </div>

          {currentStep === 1 && <OnboardingDisclaimers />}
        </form>
      </div>
    </div>
  )
}
