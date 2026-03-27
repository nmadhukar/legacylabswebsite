import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Legacy Labs privacy policy for website visitors and healthcare partners.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p className="mt-2">
            Legacy Laboratories ("Legacy Labs," "we," "us," or "our") is committed to protecting the privacy
            of our website visitors, healthcare partners, and their patients. This Privacy Policy describes how
            we collect, use, and safeguard information through our website at legacyclinicallabs.com.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
          <p className="mt-2">We may collect the following types of information:</p>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li><strong>Contact Information:</strong> Name, email, phone number, and organization details submitted through our forms.</li>
            <li><strong>Onboarding Data:</strong> Facility information, provider details (name, NPI, credentials), and account preferences submitted through the onboarding process.</li>
            <li><strong>Usage Data:</strong> Standard web analytics such as pages visited, browser type, and referring URL.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. How We Use Your Information</h2>
          <ul className="mt-2 ml-4 list-disc space-y-1">
            <li>To process provider onboarding and account setup requests.</li>
            <li>To respond to contact form inquiries.</li>
            <li>To communicate about our services and account updates.</li>
            <li>To improve our website and user experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Protected Health Information (PHI)</h2>
          <p className="mt-2">
            Our website forms are <strong>not</strong> intended for the submission of Protected Health Information (PHI).
            Do not include patient names, dates of birth, medical record numbers, or other PHI in any web form submission.
            All PHI is transmitted only through secure, HIPAA-compliant channels established during the provider onboarding process.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Data Security</h2>
          <p className="mt-2">
            We implement industry-standard security measures to protect information transmitted through our website,
            including SSL/TLS encryption for all data in transit. However, no method of electronic transmission is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Third-Party Services</h2>
          <p className="mt-2">
            We may use third-party services for analytics, email delivery, and hosting. These services may
            collect limited technical information in accordance with their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Your Rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your personal information by contacting us
            at <a href="mailto:info@legacyclinicallabs.com" className="text-primary hover:underline">info@legacyclinicallabs.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Contact Us</h2>
          <p className="mt-2">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            Legacy Laboratories<br />
            8628 Industrial Parkway, Unit E<br />
            Plain City, OH 43064<br />
            <a href="mailto:info@legacyclinicallabs.com" className="text-primary hover:underline">info@legacyclinicallabs.com</a>
          </p>
        </section>
      </div>
    </div>
  )
}
