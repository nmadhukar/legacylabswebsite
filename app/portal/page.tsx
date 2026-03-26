import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Provider Portal",
  description: "Secure provider portal access for Legacy Labs partners.",
}

export default function PortalPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10">
            <Lock className="size-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">Provider Portal</CardTitle>
          <CardDescription>
            Sign in to access your account, view results, and manage orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-[#B84500]">
              Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-4 border-t border-border pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Need help accessing your account?
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-1 size-4" />
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 max-w-md text-center text-xs text-muted-foreground">
        This portal is for authorized healthcare providers and institutional partners only. 
        Unauthorized access is prohibited.
      </p>
    </div>
  )
}
