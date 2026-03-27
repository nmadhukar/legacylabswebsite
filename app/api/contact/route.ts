import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, organization, organizationType, inquiryType, message } = body

    if (!firstName || !lastName || !email || !organization || !organizationType || !inquiryType || !message) {
      return NextResponse.json({ success: false, error: "All required fields must be filled" }, { status: 400 })
    }

    const orgTypeLabels: Record<string, string> = {
      clinic: "Clinic / Physician Practice",
      hospital: "Hospital / Health System",
      behavioral: "Behavioral Health / Treatment Facility",
      occupational: "Occupational Health",
      legal: "Court / Probation / Legal",
      other: "Other",
    }

    const inquiryTypeLabels: Record<string, string> = {
      "new-account": "New Provider Account",
      "testing-info": "Testing Information",
      pricing: "Pricing / Billing",
      integration: "Integration / IT",
      general: "General Question",
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", timeZoneName: "short",
    })

    await sendEmail({
      to: "maddy@talbothealthservices.com",
      subject: `Contact Inquiry: ${firstName} ${lastName} — ${inquiryTypeLabels[inquiryType] || inquiryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #D35400; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 1px;">LEGACY LABORATORIES</h1>
            <p style="color: #FDEBD0; margin: 4px 0 0 0; font-size: 12px;">New Contact Form Inquiry</p>
          </div>
          <div style="padding: 24px; background: #FFFBF5; border: 1px solid #E5E7EB;">
            <h2 style="color: #2B2F33; font-size: 16px; margin-top: 0;">Provider Inquiry Received</h2>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr style="background: #FDF2E9;"><td style="padding: 10px; color: #4B5563; font-weight: bold; width: 150px;">Name:</td><td style="padding: 10px;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 10px; color: #4B5563; font-weight: bold;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}" style="color: #D35400;">${email}</a></td></tr>
              <tr style="background: #FDF2E9;"><td style="padding: 10px; color: #4B5563; font-weight: bold;">Phone:</td><td style="padding: 10px;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding: 10px; color: #4B5563; font-weight: bold;">Organization:</td><td style="padding: 10px;">${organization}</td></tr>
              <tr style="background: #FDF2E9;"><td style="padding: 10px; color: #4B5563; font-weight: bold;">Org Type:</td><td style="padding: 10px;">${orgTypeLabels[organizationType] || organizationType}</td></tr>
              <tr><td style="padding: 10px; color: #4B5563; font-weight: bold;">Inquiry Type:</td><td style="padding: 10px;"><span style="background: #D35400; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px;">${inquiryTypeLabels[inquiryType] || inquiryType}</span></td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: white; border: 1px solid #E5E7EB; border-radius: 6px;">
              <p style="color: #4B5563; font-weight: bold; font-size: 13px; margin: 0 0 8px 0;">Message:</p>
              <p style="color: #2B2F33; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 16px; font-size: 12px; color: #4B5563;">Submitted: ${submittedAt}</p>
          </div>
          <div style="padding: 16px; text-align: center; font-size: 11px; color: #4B5563; border-top: 1px solid #E5E7EB;">
            <p style="margin: 0;">Legacy Laboratories &bull; legacyclinicallabs.com</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, emailSent: true, message: "Your inquiry has been submitted." })
  } catch (error: any) {
    console.error("[Legacy Labs] Contact form error:", error?.message)
    return NextResponse.json({ success: false, error: error?.message || "An unexpected error occurred" }, { status: 500 })
  }
}
