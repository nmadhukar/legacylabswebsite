import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Legacy Labs terms of service for website usage and laboratory services.",
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using the Legacy Laboratories website (legacyclinicallabs.com), you agree to be bound
            by these Terms of Service. If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Services</h2>
          <p className="mt-2">
            Legacy Laboratories is a CAP-accredited clinical reference laboratory. Our website provides information
            about our testing services, provider onboarding, and account management. Laboratory testing services
            are available exclusively to licensed healthcare providers and authorized healthcare organizations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Not Medical Advice</h2>
          <p className="mt-2">
            Information provided on this website does not constitute medical advice. All test results require
            interpretation by qualified healthcare providers. Clinical decisions remain the sole responsibility
            of the ordering healthcare provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Protected Health Information</h2>
          <p className="mt-2">
            <strong>Do not submit Protected Health Information (PHI) through any public web form on this website.</strong>{" "}
            This includes patient names, dates of birth, Social Security numbers, medical record numbers, or any
            other individually identifiable health information. PHI must only be transmitted through secure channels
            established during the provider onboarding process.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Account Submissions</h2>
          <p className="mt-2">
            Information submitted through our onboarding and contact forms is used solely for the purpose of
            establishing and managing provider accounts. By submitting information, you represent that you are
            authorized to do so on behalf of your organization.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Accuracy of Information</h2>
          <p className="mt-2">
            While we strive to keep website content accurate and current, we do not warrant that all information
            is complete, accurate, or up-to-date. Test menus, turnaround times, and service availability are
            subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Intellectual Property</h2>
          <p className="mt-2">
            All content on this website, including text, graphics, logos, and images, is the property of
            Legacy Laboratories or its licensors and is protected by applicable intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Limitation of Liability</h2>
          <p className="mt-2">
            Legacy Laboratories shall not be liable for any indirect, incidental, special, or consequential
            damages arising from the use of this website or our services, to the maximum extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Governing Law</h2>
          <p className="mt-2">
            These Terms shall be governed by and construed in accordance with the laws of the State of Ohio,
            without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Contact</h2>
          <p className="mt-2">
            For questions about these Terms of Service, please contact:
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
