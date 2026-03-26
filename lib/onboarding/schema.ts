import { z } from "zod"

// Provider in the provider list
export const providerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Provider name is required"),
  npi: z.string().min(10, "NPI must be 10 digits").max(10, "NPI must be 10 digits").regex(/^\d{10}$/, "NPI must be exactly 10 digits"),
  credentials: z.string().min(1, "Credentials are required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
})

export type Provider = z.infer<typeof providerSchema>

// Business hours
export const businessHoursSchema = z.object({
  mondayStart: z.string().min(1, "Start time is required"),
  mondayEnd: z.string().min(1, "End time is required"),
  tuesdayStart: z.string().min(1, "Start time is required"),
  tuesdayEnd: z.string().min(1, "End time is required"),
  wednesdayStart: z.string().min(1, "Start time is required"),
  wednesdayEnd: z.string().min(1, "End time is required"),
  thursdayStart: z.string().min(1, "Start time is required"),
  thursdayEnd: z.string().min(1, "End time is required"),
  fridayStart: z.string().min(1, "Start time is required"),
  fridayEnd: z.string().min(1, "End time is required"),
})

export type BusinessHours = z.infer<typeof businessHoursSchema>

// Full onboarding form schema
export const onboardingFormSchema = z.object({
  // Account Information
  facilityLegalName: z.string().min(1, "Facility legal name is required"),
  dba: z.string().optional(),
  projectedStartDate: z.string().min(1, "Projected start date is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "ZIP code is required").max(10),

  // Primary Contact
  primaryContactName: z.string().min(1, "Primary contact name is required"),
  primaryContactRole: z.string().min(1, "Role is required"),
  primaryContactPhone: z.string().min(10, "Valid phone number is required"),
  primaryContactEmail: z.string().email("Valid email is required"),

  // Escalation Contact
  escalationContactName: z.string().min(1, "Escalation contact name is required"),
  escalationContactPhone: z.string().min(10, "After-hours phone is required"),
  escalationContactEmail: z.string().email().optional().or(z.literal("")),

  // Business Hours
  businessHours: businessHoursSchema,
  afterHoursCoverage: z.boolean(),

  // Shipping & Logistics
  shippingProvider: z.enum(["ups", "fedex", "other"]),
  shippingProviderOther: z.string().optional(),
  courierPickupNeeded: z.enum(["yes", "no", "unknown"]),
  courierPickupWindow: z.string().optional(),
  courierPickupStartDate: z.string().optional(),
  suppliesNeeded: z.boolean(),
  suppliesNotes: z.string().optional(),

  // Result Delivery & Integrations
  portalEnabled: z.boolean().default(true),
  hl7Enabled: z.boolean().default(false),
  fhirEnabled: z.boolean().default(false),
  sftpEnabled: z.boolean().default(false),
  faxEnabled: z.boolean().default(false),
  emailResultsEnabled: z.boolean().default(false),
  faxNumber: z.string().optional(),
  resultsEmail: z.string().email().optional().or(z.literal("")),
  alertsEmail: z.string().email().optional().or(z.literal("")),
  requestedEmr: z.string().optional(),

  // Services
  sampleTypeToxicology: z.boolean().default(false),
  sampleTypeBloodSerum: z.boolean().default(false),
  sampleTypeInfectiousDisease: z.boolean().default(false),
  sampleTypeClinicalChemistry: z.boolean().default(false),
  sampleTypeOther: z.boolean().default(false),
  sampleTypeOtherText: z.string().optional(),

  // Providers
  providers: z.array(providerSchema).min(1, "At least one provider is required"),

  // Provider Authorization & Acknowledgement
  providerAcknowledgement: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the provider authorization terms"
  }),

  // Electronic Signature Authorization
  electronicSignatureAuth: z.enum(["authorize", "do-not-authorize"]).optional(),

  // COC Rider
  cocTestingRequested: z.boolean().default(false),
  cocRiderAcknowledgement: z.boolean().optional(),

  // Final Authorization
  authorizedRepName: z.string().min(1, "Authorized representative name is required"),
  authorizedRepTitle: z.string().min(1, "Title is required"),
  signature: z.string().optional(), // For portal version
  signatureDate: z.string().optional(), // For portal version
}).refine(
  (data) => {
    if (data.faxEnabled && !data.faxNumber) {
      return false
    }
    return true
  },
  {
    message: "Fax number is required when fax delivery is enabled",
    path: ["faxNumber"],
  }
).refine(
  (data) => {
    if (data.emailResultsEnabled && !data.resultsEmail) {
      return false
    }
    return true
  },
  {
    message: "Results email is required when email delivery is enabled",
    path: ["resultsEmail"],
  }
).refine(
  (data) => {
    if (data.cocTestingRequested && !data.cocRiderAcknowledgement) {
      return false
    }
    return true
  },
  {
    message: "COC rider acknowledgement is required when COC testing is requested",
    path: ["cocRiderAcknowledgement"],
  }
)

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>

// Default values for the form
export const defaultOnboardingValues: Partial<OnboardingFormData> = {
  portalEnabled: true,
  hl7Enabled: false,
  fhirEnabled: false,
  sftpEnabled: false,
  faxEnabled: false,
  emailResultsEnabled: false,
  sampleTypeToxicology: false,
  sampleTypeBloodSerum: false,
  sampleTypeInfectiousDisease: false,
  sampleTypeClinicalChemistry: false,
  sampleTypeOther: false,
  cocTestingRequested: false,
  afterHoursCoverage: false,
  suppliesNeeded: false,
  shippingProvider: "ups",
  courierPickupNeeded: "unknown",
  providers: [],
  businessHours: {
    mondayStart: "08:00",
    mondayEnd: "17:00",
    tuesdayStart: "08:00",
    tuesdayEnd: "17:00",
    wednesdayStart: "08:00",
    wednesdayEnd: "17:00",
    thursdayStart: "08:00",
    thursdayEnd: "17:00",
    fridayStart: "08:00",
    fridayEnd: "17:00",
  },
}

// Form sections for the wizard
export const formSections = [
  { id: "account", title: "Account Information", step: 1 },
  { id: "contacts", title: "Contacts", step: 2 },
  { id: "shipping", title: "Shipping & Logistics", step: 3 },
  { id: "delivery", title: "Result Delivery", step: 4 },
  { id: "services", title: "Services", step: 5 },
  { id: "providers", title: "Providers", step: 6 },
  { id: "authorization", title: "Authorization", step: 7 },
  { id: "review", title: "Review & Submit", step: 8 },
] as const

export type FormSection = typeof formSections[number]

// Submission status types
export type SubmissionStatus = "pending" | "in-review" | "activated"

export interface OnboardingSubmission {
  id: string
  submittedAt: string
  facilityName: string
  status: SubmissionStatus
  data: OnboardingFormData
}
