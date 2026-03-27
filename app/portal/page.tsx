import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Provider Portal",
  description: "Secure provider portal access for Legacy Labs partners.",
}

export default function PortalPage() {
  redirect("https://revdx.atcemr.com/login")
}
