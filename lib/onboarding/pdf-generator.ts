import { jsPDF } from "jspdf"

function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A"
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateStr
  }
}

export async function generateOnboardingPdf(
  data: Record<string, any>,
  submissionId: string
): Promise<Buffer> {
  const doc = new jsPDF({ unit: "pt", format: "letter" })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 50
  const contentW = pageW - margin * 2
  let y = 0

  function checkPage(needed: number) {
    if (y + needed > pageH - 60) {
      doc.addPage()
      // continuation header
      doc.setFontSize(7).setTextColor(100)
      doc.text(`Legacy Laboratories — Onboarding ${submissionId}`, margin, 30)
      doc.setDrawColor(220).setLineWidth(0.5).line(margin, 38, pageW - margin, 38)
      y = 50
    }
  }

  function sectionTitle(title: string) {
    checkPage(35)
    y += 14
    doc.setFillColor(253, 242, 233)
    doc.rect(margin, y - 12, contentW, 20, "F")
    doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(211, 84, 0)
    doc.text(title.toUpperCase(), margin + 8, y + 2)
    y += 18
  }

  function fieldRow(label: string, value: string | undefined | null) {
    checkPage(16)
    doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(75, 85, 99)
    doc.text(label, margin + 4, y)
    doc.setFont("helvetica", "normal").setTextColor(43, 47, 51)
    const val = value || "N/A"
    const lines = doc.splitTextToSize(val, contentW - 195)
    doc.text(lines, margin + 190, y)
    y += Math.max(14, lines.length * 12)
  }

  function badgeRow(label: string, items: string[]) {
    checkPage(16)
    doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(75, 85, 99)
    doc.text(label, margin + 4, y)
    doc.setFont("helvetica", "normal").setTextColor(43, 47, 51)
    doc.text(items.length > 0 ? items.join("  |  ") : "None selected", margin + 190, y)
    y += 14
  }

  function thinLine() {
    checkPage(10)
    y += 4
    doc.setDrawColor(229, 231, 235).setLineWidth(0.5).line(margin, y, pageW - margin, y)
    y += 8
  }

  // ===== HEADER =====
  doc.setFillColor(211, 84, 0).rect(0, 0, pageW, 6, "F")

  doc.setFontSize(22).setFont("helvetica", "bold").setTextColor(62, 39, 35)
  doc.text("LEGACY", margin, 35)
  doc.setTextColor(211, 84, 0)
  doc.text("LABORATORIES", margin + 95, 35)

  doc.setFontSize(13).setFont("helvetica", "bold").setTextColor(43, 47, 51)
  doc.text("New Client Onboarding Form", margin, 55)

  doc.setFontSize(8).setFont("helvetica", "normal").setTextColor(100)
  doc.text(
    `Submission ID: ${submissionId}  |  Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
    margin, 70
  )

  doc.setDrawColor(211, 84, 0).setLineWidth(2).line(margin, 80, pageW - margin, 80)
  y = 95

  // ===== 1. ACCOUNT =====
  sectionTitle("1. Account Information")
  fieldRow("Facility Legal Name:", data.facilityLegalName)
  if (data.dba) fieldRow("DBA:", data.dba)
  fieldRow("Projected Start Date:", formatDate(data.projectedStartDate))
  thinLine()
  fieldRow("Address Line 1:", data.addressLine1)
  if (data.addressLine2) fieldRow("Address Line 2:", data.addressLine2)
  fieldRow("City:", data.city)
  fieldRow("State:", data.state)
  fieldRow("ZIP Code:", data.zip)

  // ===== 2. CONTACTS =====
  sectionTitle("2. Primary Contact")
  fieldRow("Name:", data.primaryContactName)
  fieldRow("Role:", data.primaryContactRole)
  fieldRow("Phone:", data.primaryContactPhone)
  fieldRow("Email:", data.primaryContactEmail)
  thinLine()

  checkPage(16)
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(43, 47, 51)
  doc.text("Escalation / Critical Contact", margin + 4, y)
  y += 14
  fieldRow("Name:", data.escalationContactName)
  fieldRow("After-Hours Phone:", data.escalationContactPhone)
  if (data.escalationContactEmail) fieldRow("Email:", data.escalationContactEmail)

  // ===== 3. BUSINESS HOURS =====
  sectionTitle("3. Business Hours")
  const bh = data.businessHours || {}
  const days = [
    { day: "Monday", s: bh.mondayStart, e: bh.mondayEnd },
    { day: "Tuesday", s: bh.tuesdayStart, e: bh.tuesdayEnd },
    { day: "Wednesday", s: bh.wednesdayStart, e: bh.wednesdayEnd },
    { day: "Thursday", s: bh.thursdayStart, e: bh.thursdayEnd },
    { day: "Friday", s: bh.fridayStart, e: bh.fridayEnd },
  ]

  checkPage(20 + days.length * 15)
  // Table header
  doc.setFillColor(253, 242, 233)
  doc.rect(margin, y - 10, contentW, 15, "F")
  doc.setFontSize(7).setFont("helvetica", "bold").setTextColor(211, 84, 0)
  doc.text("DAY", margin + 8, y)
  doc.text("START", margin + 140, y)
  doc.text("END", margin + 280, y)
  y += 12

  doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(43, 47, 51)
  days.forEach((d) => {
    doc.text(d.day, margin + 8, y)
    doc.text(d.s || "N/A", margin + 140, y)
    doc.text(d.e || "N/A", margin + 280, y)
    y += 14
  })
  y += 2
  fieldRow("After-Hours Coverage:", data.afterHoursCoverage ? "Yes" : "No")

  // ===== 4. SHIPPING =====
  sectionTitle("4. Shipping & Logistics")
  const shipLabel = data.shippingProvider === "other"
    ? (data.shippingProviderOther || "Other")
    : (data.shippingProvider || "N/A").toUpperCase()
  fieldRow("Shipping Provider:", shipLabel)

  const courierLabel = data.courierPickupNeeded === "yes" ? "Yes"
    : data.courierPickupNeeded === "no" ? "No" : "Not sure yet"
  fieldRow("Courier Pickup Needed:", courierLabel)
  if (data.courierPickupNeeded === "yes") {
    fieldRow("Pickup Window:", data.courierPickupWindow)
    fieldRow("Pickup Start Date:", formatDate(data.courierPickupStartDate))
  }
  fieldRow("Collection Supplies Needed:", data.suppliesNeeded ? "Yes" : "No")
  if (data.suppliesNotes) fieldRow("Supply Notes:", data.suppliesNotes)

  // ===== 5. RESULT DELIVERY =====
  sectionTitle("5. Result Delivery & Integrations")
  const methods: string[] = []
  if (data.portalEnabled) methods.push("Secure Portal")
  if (data.hl7Enabled) methods.push("HL7 v2")
  if (data.fhirEnabled) methods.push("FHIR API")
  if (data.sftpEnabled) methods.push("SFTP")
  if (data.faxEnabled) methods.push("Fax")
  if (data.emailResultsEnabled) methods.push("Email")
  badgeRow("Delivery Methods:", methods)
  if (data.faxEnabled && data.faxNumber) fieldRow("Fax Number:", data.faxNumber)
  if (data.emailResultsEnabled && data.resultsEmail) fieldRow("Results Email:", data.resultsEmail)
  if (data.alertsEmail) fieldRow("Alerts Email:", data.alertsEmail)
  if (data.requestedEmr) fieldRow("Requested EMR/EHR:", data.requestedEmr)

  // ===== 6. SERVICES =====
  sectionTitle("6. Requested Services")
  const services: string[] = []
  if (data.sampleTypeToxicology) services.push("Toxicology")
  if (data.sampleTypeBloodSerum) services.push("Blood / Serum")
  if (data.sampleTypeInfectiousDisease) services.push("Infectious Disease")
  if (data.sampleTypeClinicalChemistry) services.push("Clinical Chemistry")
  if (data.sampleTypeOther) services.push("Other")
  badgeRow("Sample Types:", services)
  if (data.sampleTypeOther && data.sampleTypeOtherText) fieldRow("Other Details:", data.sampleTypeOtherText)

  // ===== 7. PROVIDERS =====
  sectionTitle("7. Ordering Providers")
  const providers = (data.providers || []) as Array<{
    name: string; npi: string; credentials: string; email: string; phone?: string
  }>

  if (providers.length === 0) {
    doc.setFontSize(9).setFont("helvetica", "normal").setTextColor(100)
    doc.text("No providers listed", margin + 4, y)
    y += 14
  } else {
    checkPage(20 + providers.length * 16)
    // header
    doc.setFillColor(253, 242, 233)
    doc.rect(margin, y - 10, contentW, 15, "F")
    doc.setFontSize(7).setFont("helvetica", "bold").setTextColor(211, 84, 0)
    doc.text("NAME", margin + 4, y)
    doc.text("NPI", margin + 130, y)
    doc.text("CRED", margin + 215, y)
    doc.text("EMAIL", margin + 270, y)
    doc.text("PHONE", margin + 420, y)
    y += 14

    doc.setFontSize(8).setFont("helvetica", "normal").setTextColor(43, 47, 51)
    providers.forEach((p) => {
      checkPage(16)
      doc.text(p.name || "", margin + 4, y)
      doc.text(p.npi || "", margin + 130, y)
      doc.text(p.credentials || "", margin + 215, y)
      doc.text(p.email || "", margin + 270, y)
      doc.text(p.phone || "—", margin + 420, y)
      y += 15
    })
    y += 2
  }
  fieldRow("Total Providers:", String(providers.length))

  // ===== 8. AUTHORIZATION =====
  sectionTitle("8. Authorization & Acknowledgement")
  fieldRow("Provider Acknowledgement:", data.providerAcknowledgement ? "Accepted" : "Not accepted")

  const esig = data.electronicSignatureAuth === "authorize" ? "Authorized"
    : data.electronicSignatureAuth === "do-not-authorize" ? "Not Authorized" : "Not specified"
  fieldRow("Electronic Signature Auth:", esig)
  fieldRow("COC Testing Requested:", data.cocTestingRequested ? "Yes" : "No")
  if (data.cocTestingRequested) {
    fieldRow("COC Rider Acknowledged:", data.cocRiderAcknowledgement ? "Accepted" : "Not accepted")
  }
  thinLine()

  // Signature block
  checkPage(80)
  doc.setDrawColor(229, 231, 235).setLineWidth(1)
  doc.rect(margin, y, contentW, 70)
  y += 16
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(43, 47, 51)
  doc.text("Authorized Representative", margin + 10, y)
  y += 16
  fieldRow("Name:", data.authorizedRepName)
  fieldRow("Title:", data.authorizedRepTitle)

  y += 10
  doc.setDrawColor(43, 47, 51).setLineWidth(0.5)
  doc.line(margin + 10, y, margin + 230, y)
  doc.line(margin + 280, y, pageW - margin - 10, y)
  y += 10
  doc.setFontSize(7).setFont("helvetica", "normal").setTextColor(100)
  doc.text("Signature", margin + 10, y)
  doc.text("Date", margin + 280, y)

  // Footer
  y += 25
  checkPage(30)
  doc.setDrawColor(211, 84, 0).setLineWidth(1).line(margin, y, pageW - margin, y)
  y += 12
  doc.setFontSize(7).setFont("helvetica", "normal").setTextColor(100)
  doc.text("Legacy Laboratories  •  CAP-Accredited Clinical Reference Laboratory  •  legacyclinicallabs.com", pageW / 2, y, { align: "center" })
  y += 10
  doc.text(`This document was generated automatically upon form submission. Submission ID: ${submissionId}`, pageW / 2, y, { align: "center" })

  // Return as Buffer
  const arrayBuffer = doc.output("arraybuffer")
  return Buffer.from(arrayBuffer)
}
