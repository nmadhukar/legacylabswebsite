import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.com",
  port: 465,
  secure: true, // SSL/TLS
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
})

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType?: string
  }>
}

export async function sendEmail({ to, subject, html, attachments }: SendEmailOptions) {
  const mailOptions: nodemailer.SendMailOptions = {
    from: '"Legacy Labs" <coolify@dsiginc.com>',
    to,
    cc: "tommyivany@gmail.com",
    subject,
    html,
    attachments: attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType || "application/pdf",
    })),
  }

  const info = await transporter.sendMail(mailOptions)
  console.log(`[Legacy Labs] Email sent: ${info.messageId} to ${to}`)
  return info
}
