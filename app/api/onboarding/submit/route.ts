import { NextResponse } from "next/server"
import { onboardingFormSchema } from "@/lib/onboarding/schema"
import { generateOnboardingPdf } from "@/lib/onboarding/pdf-generator"

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

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate
    const validationResult = onboardingFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const data = validationResult.data
    const submissionId = `LL-${Date.now().toString(36).toUpperCase()}`

    // Generate PDF
    const pdfBuffer = await generateOnboardingPdf(data as unknown as Record<string, any>, submissionId)
    const pdfBase64 = pdfBuffer.toString("base64")

    // Send email via Mailtrap API
    const emailResponse = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.MAILTRAP_API_KEY || "e60cacbc037b62ecdd89467d4d6c4d17",
      },
      body: JSON.stringify({
        from: {
          email: "noreply@dsigsoftware.com",
          name: "Legacy Labs Onboarding",
        },
        to: [
          {
            email: "maddy@talbothealthservices.com",
            name: "Madhukar Narahari",
          },
        ],
        subject: `New Client Onboarding: ${data.facilityLegalName} [${submissionId}]`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #D35400; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 1px;">LEGACY LABORATORIES</h1>
              <p style="color: #FDEBD0; margin: 4px 0 0 0; font-size: 12px;">New Client Onboarding Submission</p>
            </div>
            <div style="padding: 24px; background: #FFFBF5; border: 1px solid #E5E7EB;">
              <h2 style="color: #2B2F33; font-size: 16px; margin-top: 0;">New Onboarding Request Received</h2>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #4B5563; font-weight: bold; width: 140px; vertical-align: top;">Submission ID:</td><td style="padding: 8px 0; font-family: monospace;">${submissionId}</td></tr>
                <tr style="background: #FDF2E9;"><td style="padding: 8px; color: #4B5563; font-weight: bold; vertical-align: top;">Facility:</td><td style="padding: 8px;">${data.facilityLegalName}${data.dba ? ` (DBA: ${data.dba})` : ""}</td></tr>
                <tr><td style="padding: 8px 0; color: #4B5563; font-weight: bold; vertical-align: top;">Contact:</td><td style="padding: 8px 0;">${data.primaryContactName} — ${data.primaryContactRole}</td></tr>
                <tr style="background: #FDF2E9;"><td style="padding: 8px; color: #4B5563; font-weight: bold; vertical-align: top;">Email:</td><td style="padding: 8px;">${data.primaryContactEmail}</td></tr>
                <tr><td style="padding: 8px 0; color: #4B5563; font-weight: bold; vertical-align: top;">Phone:</td><td style="padding: 8px 0;">${data.primaryContactPhone}</td></tr>
                <tr style="background: #FDF2E9;"><td style="padding: 8px; color: #4B5563; font-weight: bold; vertical-align: top;">Location:</td><td style="padding: 8px;">${data.addressLine1}${data.addressLine2 ? ", " + data.addressLine2 : ""}<br/>${data.city}, ${data.state} ${data.zip}</td></tr>
                <tr><td style="padding: 8px 0; color: #4B5563; font-weight: bold; vertical-align: top;">Providers:</td><td style="padding: 8px 0;">${data.providers.length} provider(s) listed</td></tr>
                <tr style="background: #FDF2E9;"><td style="padding: 8px; color: #4B5563; font-weight: bold; vertical-align: top;">Start Date:</td><td style="padding: 8px;">${formatDate(data.projectedStartDate)}</td></tr>
                <tr><td style="padding: 8px 0; color: #4B5563; font-weight: bold; vertical-align: top;">Auth Rep:</td><td style="padding: 8px 0;">${data.authorizedRepName} — ${data.authorizedRepTitle}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 12px; background: #FDF2E9; border-left: 3px solid #D35400; font-size: 13px; color: #4B5563;">
                The complete onboarding form with all sections is attached as a PDF.
              </div>
            </div>
            <div style="padding: 16px; text-align: center; font-size: 11px; color: #4B5563; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0;">Legacy Laboratories &bull; legacyclinicallabs.com</p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `Legacy-Labs-Onboarding-${submissionId}.pdf`,
            content: pdfBase64,
            type: "application/pdf",
            disposition: "attachment",
          },
        ],
      }),
    })

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text()
      console.error("[Legacy Labs] Mailtrap error:", emailResponse.status, errorBody)
      return NextResponse.json({
        success: true,
        submissionId,
        emailSent: false,
        message: "Onboarding request submitted. Email delivery encountered an issue — our team has been notified.",
      })
    }

    console.log(`[Legacy Labs] Onboarding submitted: ${submissionId}, PDF emailed to maddy@talbothealthservices.com`)

    return NextResponse.json({
      success: true,
      submissionId,
      emailSent: true,
      message: "Onboarding request submitted successfully. A PDF copy has been emailed to our team.",
    })
  } catch (error) {
    console.error("[Legacy Labs] Onboarding submission error:", error)
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
