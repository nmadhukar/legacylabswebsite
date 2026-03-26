import PDFDocument from "pdfkit"

// Brand colors
const ORANGE = "#D35400"
const DARK_BROWN = "#3E2723"
const CHARCOAL = "#2B2F33"
const SLATE = "#4B5563"
const LIGHT_BG = "#FDF2E9"
const BORDER = "#E5E7EB"
const GREEN = "#27ae60"

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
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      info: {
        Title: `Legacy Labs Onboarding - ${data.facilityLegalName}`,
        Author: "Legacy Laboratories",
        Subject: `Onboarding Form ${submissionId}`,
      },
    })

    doc.on("data", (chunk: Buffer) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    const pageWidth = doc.page.width - 100 // margins
    const leftCol = 50
    const rightCol = pageWidth + 50

    // ---- Helper functions ----
    function drawHeader() {
      // Orange top bar
      doc.rect(0, 0, doc.page.width, 8).fill(ORANGE)

      // Title
      doc.fontSize(24).font("Helvetica-Bold").fillColor(DARK_BROWN)
        .text("LEGACY", leftCol, 30, { continued: true })
      doc.fontSize(24).fillColor(ORANGE).text(" LABORATORIES")

      doc.fontSize(14).font("Helvetica-Bold").fillColor(CHARCOAL)
        .text("New Client Onboarding Form", leftCol, 60)

      doc.fontSize(9).font("Helvetica").fillColor(SLATE)
        .text(`Submission ID: ${submissionId}  |  Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, leftCol, 78)

      // Divider
      doc.moveTo(leftCol, 95).lineTo(rightCol, 95).strokeColor(ORANGE).lineWidth(2).stroke()
      doc.y = 105
    }

    function sectionTitle(title: string) {
      checkPageBreak(40)
      const y = doc.y + 10
      doc.rect(leftCol, y, pageWidth, 22).fill(LIGHT_BG)
      doc.fontSize(11).font("Helvetica-Bold").fillColor(ORANGE)
        .text(title.toUpperCase(), leftCol + 8, y + 5)
      doc.y = y + 30
    }

    function fieldRow(label: string, value: string | undefined | null, opts?: { indent?: number }) {
      checkPageBreak(18)
      const indent = opts?.indent || 0
      const y = doc.y
      doc.fontSize(9).font("Helvetica-Bold").fillColor(SLATE)
        .text(label, leftCol + indent, y, { width: 180 })
      doc.fontSize(9).font("Helvetica").fillColor(CHARCOAL)
        .text(value || "N/A", leftCol + 190 + indent, y, { width: pageWidth - 190 - indent })
      doc.y = Math.max(doc.y, y + 16)
    }

    function badgeRow(label: string, badges: string[]) {
      checkPageBreak(18)
      const y = doc.y
      doc.fontSize(9).font("Helvetica-Bold").fillColor(SLATE)
        .text(label, leftCol, y, { width: 180 })
      doc.fontSize(9).font("Helvetica").fillColor(CHARCOAL)
        .text(badges.length > 0 ? badges.join("  •  ") : "None selected", leftCol + 190, y, { width: pageWidth - 190 })
      doc.y = Math.max(doc.y, y + 16)
    }

    function checkPageBreak(needed: number) {
      if (doc.y + needed > doc.page.height - 60) {
        doc.addPage()
        // Small header on continuation pages
        doc.fontSize(8).font("Helvetica").fillColor(SLATE)
          .text(`Legacy Laboratories — Onboarding ${submissionId}`, leftCol, 30)
        doc.moveTo(leftCol, 42).lineTo(rightCol, 42).strokeColor(BORDER).lineWidth(0.5).stroke()
        doc.y = 50
      }
    }

    function thinDivider() {
      checkPageBreak(12)
      const y = doc.y + 4
      doc.moveTo(leftCol, y).lineTo(rightCol, y).strokeColor(BORDER).lineWidth(0.5).stroke()
      doc.y = y + 8
    }

    // ---- BUILD PDF ----
    drawHeader()

    // ===== SECTION 1: ACCOUNT INFORMATION =====
    sectionTitle("1. Account Information")
    fieldRow("Facility Legal Name:", data.facilityLegalName)
    if (data.dba) fieldRow("DBA:", data.dba)
    fieldRow("Projected Start Date:", formatDate(data.projectedStartDate))
    thinDivider()
    fieldRow("Address Line 1:", data.addressLine1)
    if (data.addressLine2) fieldRow("Address Line 2:", data.addressLine2)
    fieldRow("City:", data.city)
    fieldRow("State:", data.state)
    fieldRow("ZIP Code:", data.zip)

    // ===== SECTION 2: CONTACTS =====
    sectionTitle("2. Primary Contact")
    fieldRow("Name:", data.primaryContactName)
    fieldRow("Role:", data.primaryContactRole)
    fieldRow("Phone:", data.primaryContactPhone)
    fieldRow("Email:", data.primaryContactEmail)

    thinDivider()
    checkPageBreak(20)
    doc.fontSize(10).font("Helvetica-Bold").fillColor(CHARCOAL)
      .text("Escalation / Critical Contact", leftCol, doc.y)
    doc.y += 6
    fieldRow("Name:", data.escalationContactName)
    fieldRow("After-Hours Phone:", data.escalationContactPhone)
    if (data.escalationContactEmail) fieldRow("Email:", data.escalationContactEmail)

    // ===== SECTION 3: BUSINESS HOURS =====
    sectionTitle("3. Business Hours")
    const bh = data.businessHours || {}
    const days = [
      { day: "Monday", start: bh.mondayStart, end: bh.mondayEnd },
      { day: "Tuesday", start: bh.tuesdayStart, end: bh.tuesdayEnd },
      { day: "Wednesday", start: bh.wednesdayStart, end: bh.wednesdayEnd },
      { day: "Thursday", start: bh.thursdayStart, end: bh.thursdayEnd },
      { day: "Friday", start: bh.fridayStart, end: bh.fridayEnd },
    ]

    // Table header
    checkPageBreak(20 + days.length * 16)
    let ty = doc.y
    doc.rect(leftCol, ty, pageWidth, 16).fill(LIGHT_BG)
    doc.fontSize(8).font("Helvetica-Bold").fillColor(ORANGE)
    doc.text("DAY", leftCol + 8, ty + 4, { width: 120 })
    doc.text("START", leftCol + 140, ty + 4, { width: 100 })
    doc.text("END", leftCol + 280, ty + 4, { width: 100 })
    ty += 18

    days.forEach((d) => {
      doc.fontSize(9).font("Helvetica").fillColor(CHARCOAL)
      doc.text(d.day, leftCol + 8, ty, { width: 120 })
      doc.text(d.start || "N/A", leftCol + 140, ty, { width: 100 })
      doc.text(d.end || "N/A", leftCol + 280, ty, { width: 100 })
      ty += 16
    })
    doc.y = ty + 4
    fieldRow("After-Hours Coverage:", data.afterHoursCoverage ? "Yes" : "No")

    // ===== SECTION 4: SHIPPING & LOGISTICS =====
    sectionTitle("4. Shipping & Logistics")
    const shippingLabel = data.shippingProvider === "other"
      ? (data.shippingProviderOther || "Other")
      : (data.shippingProvider || "N/A").toUpperCase()
    fieldRow("Shipping Provider:", shippingLabel)

    const courierLabel = data.courierPickupNeeded === "yes" ? "Yes"
      : data.courierPickupNeeded === "no" ? "No" : "Not sure yet"
    fieldRow("Courier Pickup Needed:", courierLabel)

    if (data.courierPickupNeeded === "yes") {
      fieldRow("Pickup Window:", data.courierPickupWindow, { indent: 10 })
      fieldRow("Pickup Start Date:", formatDate(data.courierPickupStartDate), { indent: 10 })
    }

    fieldRow("Collection Supplies Needed:", data.suppliesNeeded ? "Yes" : "No")
    if (data.suppliesNotes) fieldRow("Supply Notes:", data.suppliesNotes)

    // ===== SECTION 5: RESULT DELIVERY =====
    sectionTitle("5. Result Delivery & Integrations")
    const deliveryMethods: string[] = []
    if (data.portalEnabled) deliveryMethods.push("Secure Portal")
    if (data.hl7Enabled) deliveryMethods.push("HL7 v2")
    if (data.fhirEnabled) deliveryMethods.push("FHIR API")
    if (data.sftpEnabled) deliveryMethods.push("SFTP")
    if (data.faxEnabled) deliveryMethods.push("Fax")
    if (data.emailResultsEnabled) deliveryMethods.push("Email")
    badgeRow("Delivery Methods:", deliveryMethods)

    if (data.faxEnabled && data.faxNumber) fieldRow("Fax Number:", data.faxNumber)
    if (data.emailResultsEnabled && data.resultsEmail) fieldRow("Results Email:", data.resultsEmail)
    if (data.alertsEmail) fieldRow("Alerts Email:", data.alertsEmail)
    if (data.requestedEmr) fieldRow("Requested EMR/EHR:", data.requestedEmr)

    // ===== SECTION 6: SERVICES =====
    sectionTitle("6. Requested Services")
    const services: string[] = []
    if (data.sampleTypeToxicology) services.push("Toxicology")
    if (data.sampleTypeBloodSerum) services.push("Blood / Serum")
    if (data.sampleTypeInfectiousDisease) services.push("Infectious Disease")
    if (data.sampleTypeClinicalChemistry) services.push("Clinical Chemistry")
    if (data.sampleTypeOther) services.push("Other")
    badgeRow("Sample Types:", services)
    if (data.sampleTypeOther && data.sampleTypeOtherText) {
      fieldRow("Other Details:", data.sampleTypeOtherText)
    }

    // ===== SECTION 7: PROVIDERS =====
    sectionTitle("7. Ordering Providers")
    const providers = (data.providers || []) as Array<{
      name: string; npi: string; credentials: string; email: string; phone?: string
    }>

    if (providers.length === 0) {
      doc.fontSize(9).font("Helvetica").fillColor(SLATE)
        .text("No providers listed", leftCol, doc.y)
      doc.y += 16
    } else {
      // Table
      checkPageBreak(20 + providers.length * 18)
      let py = doc.y
      doc.rect(leftCol, py, pageWidth, 16).fill(LIGHT_BG)
      doc.fontSize(7).font("Helvetica-Bold").fillColor(ORANGE)
      doc.text("NAME", leftCol + 4, py + 4, { width: 120 })
      doc.text("NPI", leftCol + 130, py + 4, { width: 80 })
      doc.text("CREDENTIALS", leftCol + 215, py + 4, { width: 70 })
      doc.text("EMAIL", leftCol + 290, py + 4, { width: 130 })
      doc.text("PHONE", leftCol + 425, py + 4, { width: 80 })
      py += 18

      providers.forEach((p, i) => {
        checkPageBreak(18)
        if (i % 2 === 1) {
          doc.rect(leftCol, py - 1, pageWidth, 16).fill("#FAFAFA")
        }
        doc.fontSize(8).font("Helvetica").fillColor(CHARCOAL)
        doc.text(p.name || "", leftCol + 4, py, { width: 120 })
        doc.text(p.npi || "", leftCol + 130, py, { width: 80 })
        doc.text(p.credentials || "", leftCol + 215, py, { width: 70 })
        doc.text(p.email || "", leftCol + 290, py, { width: 130 })
        doc.text(p.phone || "—", leftCol + 425, py, { width: 80 })
        py += 18
      })
      doc.y = py + 4
    }
    fieldRow("Total Providers:", String(providers.length))

    // ===== SECTION 8: AUTHORIZATION =====
    sectionTitle("8. Authorization & Acknowledgement")
    fieldRow("Provider Acknowledgement:", data.providerAcknowledgement ? "Accepted" : "Not accepted")

    const esigLabel = data.electronicSignatureAuth === "authorize" ? "Authorized"
      : data.electronicSignatureAuth === "do-not-authorize" ? "Not Authorized"
      : "Not specified"
    fieldRow("Electronic Signature Auth:", esigLabel)

    fieldRow("COC Testing Requested:", data.cocTestingRequested ? "Yes" : "No")
    if (data.cocTestingRequested) {
      fieldRow("COC Rider Acknowledged:", data.cocRiderAcknowledgement ? "Accepted" : "Not accepted", { indent: 10 })
    }

    thinDivider()

    // Signature block
    checkPageBreak(90)
    doc.rect(leftCol, doc.y, pageWidth, 80).lineWidth(1).strokeColor(BORDER).stroke()
    const sigY = doc.y + 8
    doc.fontSize(10).font("Helvetica-Bold").fillColor(CHARCOAL)
      .text("Authorized Representative", leftCol + 10, sigY)
    doc.y = sigY + 18
    fieldRow("Name:", data.authorizedRepName)
    fieldRow("Title:", data.authorizedRepTitle)

    // Signature lines
    const lineY = doc.y + 20
    doc.moveTo(leftCol + 10, lineY).lineTo(leftCol + 240, lineY).strokeColor(CHARCOAL).lineWidth(0.5).stroke()
    doc.fontSize(7).font("Helvetica").fillColor(SLATE).text("Signature", leftCol + 10, lineY + 3)

    doc.moveTo(leftCol + 280, lineY).lineTo(rightCol - 10, lineY).strokeColor(CHARCOAL).lineWidth(0.5).stroke()
    doc.text("Date", leftCol + 280, lineY + 3)

    doc.y = lineY + 20

    // ---- FOOTER ----
    checkPageBreak(40)
    doc.y += 10
    doc.moveTo(leftCol, doc.y).lineTo(rightCol, doc.y).strokeColor(ORANGE).lineWidth(1).stroke()
    doc.y += 8
    doc.fontSize(7).font("Helvetica").fillColor(SLATE)
      .text("Legacy Laboratories  •  CAP-Accredited Clinical Reference Laboratory  •  legacyclinicallabs.com", leftCol, doc.y, { align: "center", width: pageWidth })
    doc.y += 10
    doc.text(`This document was generated automatically upon form submission. Submission ID: ${submissionId}`, leftCol, doc.y, { align: "center", width: pageWidth })

    doc.end()
  })
}
