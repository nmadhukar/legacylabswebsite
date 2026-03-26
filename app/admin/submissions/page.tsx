"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  Building2,
  Calendar,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SubmissionStatus } from "@/lib/onboarding/schema"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

// Mock data for demonstration
const mockSubmissions = [
  {
    id: "SV-M1A2B3C4",
    facilityName: "Columbus Family Practice",
    submittedAt: "2026-01-19T14:30:00Z",
    status: "pending" as SubmissionStatus,
    primaryContact: "Jane Smith",
    email: "jane@columbusfp.com",
    state: "OH",
    source: "public",
  },
  {
    id: "SV-N5O6P7Q8",
    facilityName: "Central Ohio Behavioral Health",
    submittedAt: "2026-01-18T09:15:00Z",
    status: "in-review" as SubmissionStatus,
    primaryContact: "Dr. Michael Johnson",
    email: "mjohnson@cobh.org",
    state: "OH",
    source: "portal",
  },
  {
    id: "SV-R9S0T1U2",
    facilityName: "Louisville Medical Group",
    submittedAt: "2026-01-17T16:45:00Z",
    status: "activated" as SubmissionStatus,
    primaryContact: "Sarah Williams",
    email: "swilliams@lmg.com",
    state: "KY",
    source: "public",
  },
  {
    id: "SV-V3W4X5Y6",
    facilityName: "Indianapolis Urgent Care",
    submittedAt: "2026-01-16T11:00:00Z",
    status: "pending" as SubmissionStatus,
    primaryContact: "Robert Chen",
    email: "rchen@indyuc.com",
    state: "IN",
    source: "portal",
  },
  {
    id: "SV-Z7A8B9C0",
    facilityName: "Dayton Recovery Center",
    submittedAt: "2026-01-15T08:30:00Z",
    status: "in-review" as SubmissionStatus,
    primaryContact: "Lisa Anderson",
    email: "landerson@daytonrc.org",
    state: "OH",
    source: "public",
  },
]

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary" as const,
    color: "text-amber-600",
  },
  "in-review": {
    label: "In Review",
    icon: AlertCircle,
    variant: "outline" as const,
    color: "text-blue-600",
  },
  activated: {
    label: "Activated",
    icon: CheckCircle2,
    variant: "default" as const,
    color: "text-green-600",
  },
}

export default function AdminSubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [submissions] = useState(mockSubmissions)
  const searchParams = useSearchParams()

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.primaryContact.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    pending: submissions.filter(s => s.status === "pending").length,
    "in-review": submissions.filter(s => s.status === "in-review").length,
    activated: submissions.filter(s => s.status === "activated").length,
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Onboarding Submissions</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage new client onboarding requests
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-amber-600 border-amber-200">
                  Admin View
                </Badge>
                <Button asChild variant="outline">
                  <Link href="/portal">Exit Admin</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-amber-100">
                  <Clock className="size-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-blue-100">
                  <AlertCircle className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts["in-review"]}</p>
                  <p className="text-sm text-muted-foreground">In Review</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="size-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.activated}</p>
                  <p className="text-sm text-muted-foreground">Activated</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by facility name, ID, or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="activated">Activated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Submissions</CardTitle>
              <CardDescription>
                {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8">
                        Submission ID
                        <ArrowUpDown className="ml-2 size-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Primary Contact</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8">
                        Submitted
                        <ArrowUpDown className="ml-2 size-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                        No submissions found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((submission) => {
                      const status = statusConfig[submission.status]
                      const StatusIcon = status.icon
                      
                      return (
                        <TableRow key={submission.id}>
                          <TableCell className="font-mono text-sm font-medium">
                            {submission.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="size-4 text-muted-foreground" />
                              <span className="font-medium">{submission.facilityName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{submission.primaryContact}</div>
                              <div className="text-xs text-muted-foreground">{submission.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{submission.state}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {submission.source}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="size-4" />
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant} className={status.color}>
                              <StatusIcon className="mr-1 size-3" />
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 size-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Mark as In Review
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Mark as Activated
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Reject Submission
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Admin Note */}
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Admin Note:</strong> This is a demonstration interface. In production, this page 
              would be protected by authentication and connected to a database for real submission data.
              Actions would trigger workflows, notifications, and audit logging.
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
