"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  ExternalLink,
  Loader2,
} from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [organizationType, setOrganizationType] = useState("")
  const [inquiryType, setInquiryType] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      organization: (form.elements.namedItem("organization") as HTMLInputElement).value,
      organizationType,
      inquiryType,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        setFormSubmitted(true)
      } else {
        alert("Submission failed. Please try again.")
      }
    } catch {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Have questions about our testing services or interested in establishing a
              provider relationship? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
              <p className="mt-3 text-muted-foreground">
                Contact our team for provider inquiries, account questions, or general information.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Plain City, Ohio
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      (XXX) XXX-XXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      info@legacyclinicallabs.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Hours</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Monday - Friday: 8:00 AM - 5:00 PM EST
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Weekend: Limited support available
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing Partners */}
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Existing Partners</CardTitle>
                  <CardDescription>
                    Already working with us? Access your account through the Provider Portal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/portal">
                      Provider Portal
                      <ExternalLink className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Provider Inquiry</CardTitle>
                  <CardDescription>
                    Complete this form for new provider inquiries. Our team will respond
                    within 1-2 business days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* PHI Warning */}
                  <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
                    <p className="text-sm text-amber-800">
                      <strong>Do not submit patient-identifying information or PHI through this form.</strong>
                      {" "}This form is for general inquiries only.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
                      <h3 className="font-semibold text-foreground">Thank You</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your inquiry has been submitted. Our team will review and respond
                        within 1-2 business days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" name="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" name="lastName" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name *</Label>
                        <Input id="organization" name="organization" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organizationType">Organization Type *</Label>
                        <Select required onValueChange={setOrganizationType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clinic">Clinic / Physician Practice</SelectItem>
                            <SelectItem value="hospital">Hospital / Health System</SelectItem>
                            <SelectItem value="behavioral">Behavioral Health / Treatment Facility</SelectItem>
                            <SelectItem value="occupational">Occupational Health</SelectItem>
                            <SelectItem value="legal">Court / Probation / Legal</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select required onValueChange={setInquiryType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new-account">New Provider Account</SelectItem>
                            <SelectItem value="testing-info">Testing Information</SelectItem>
                            <SelectItem value="pricing">Pricing / Billing</SelectItem>
                            <SelectItem value="integration">Integration / IT</SelectItem>
                            <SelectItem value="general">General Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Please describe your testing needs or questions..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-[#B84500]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
