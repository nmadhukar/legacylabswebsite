"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type Provider } from "@/lib/onboarding/schema"

interface ProviderTableProps {
  providers: Provider[]
  onChange: (providers: Provider[]) => void
  showSignature?: boolean
}

export function ProviderTable({ providers, onChange, showSignature = false }: ProviderTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Provider>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateProvider = (data: Partial<Provider>): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!data.name?.trim()) newErrors.name = "Name is required"
    if (!data.npi?.trim()) {
      newErrors.npi = "NPI is required"
    } else if (!/^\d{10}$/.test(data.npi)) {
      newErrors.npi = "NPI must be exactly 10 digits"
    }
    if (!data.credentials?.trim()) newErrors.credentials = "Credentials are required"
    if (!data.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddProvider = () => {
    if (!validateProvider(formData)) return

    const newProvider: Provider = {
      id: crypto.randomUUID(),
      name: formData.name!,
      npi: formData.npi!,
      credentials: formData.credentials!,
      email: formData.email!,
      phone: formData.phone || undefined,
    }

    onChange([...providers, newProvider])
    setFormData({})
    setIsAddDialogOpen(false)
  }

  const handleEditProvider = (provider: Provider) => {
    setEditingId(provider.id)
    setFormData(provider)
  }

  const handleSaveEdit = () => {
    if (!editingId || !validateProvider(formData)) return

    const updated = providers.map((p) =>
      p.id === editingId
        ? {
            ...p,
            name: formData.name!,
            npi: formData.npi!,
            credentials: formData.credentials!,
            email: formData.email!,
            phone: formData.phone || undefined,
          }
        : p
    )

    onChange(updated)
    setEditingId(null)
    setFormData({})
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({})
    setErrors({})
  }

  const handleDeleteProvider = (id: string) => {
    onChange(providers.filter((p) => p.id !== id))
  }

  const renderFormFields = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="providerName">Provider Name *</Label>
        <Input
          id="providerName"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Dr. Jane Smith"
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="npi">NPI *</Label>
        <Input
          id="npi"
          value={formData.npi || ""}
          onChange={(e) => setFormData({ ...formData, npi: e.target.value.replace(/\D/g, "").slice(0, 10) })}
          placeholder="1234567890"
          maxLength={10}
        />
        {errors.npi && <p className="text-sm text-destructive">{errors.npi}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="credentials">Credentials *</Label>
        <Input
          id="credentials"
          value={formData.credentials || ""}
          onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
          placeholder="MD, DO, NP, PA, etc."
        />
        {errors.credentials && <p className="text-sm text-destructive">{errors.credentials}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="providerEmail">Email *</Label>
        <Input
          id="providerEmail"
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="provider@facility.com"
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="providerPhone">Phone (Optional)</Label>
        <Input
          id="providerPhone"
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="(614) 555-1234"
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider Name</TableHead>
              <TableHead>NPI</TableHead>
              <TableHead>Credentials</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              {showSignature && <TableHead>Signature Status</TableHead>}
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showSignature ? 7 : 6} className="py-8 text-center text-muted-foreground">
                  No providers added yet. Click "Add Provider" to begin.
                </TableCell>
              </TableRow>
            ) : (
              providers.map((provider) => (
                <TableRow key={provider.id}>
                  {editingId === provider.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={formData.name || ""}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={formData.npi || ""}
                          onChange={(e) => setFormData({ ...formData, npi: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          className="h-8"
                          maxLength={10}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={formData.credentials || ""}
                          onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={formData.email || ""}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={formData.phone || ""}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-8"
                        />
                      </TableCell>
                      {showSignature && <TableCell>-</TableCell>}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="icon" variant="ghost" className="size-8" onClick={handleSaveEdit}>
                            <Check className="size-4 text-green-600" />
                          </Button>
                          <Button size="icon" variant="ghost" className="size-8" onClick={handleCancelEdit}>
                            <X className="size-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell className="font-mono text-sm">{provider.npi}</TableCell>
                      <TableCell>{provider.credentials}</TableCell>
                      <TableCell>{provider.email}</TableCell>
                      <TableCell>{provider.phone || "-"}</TableCell>
                      {showSignature && (
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                            Pending Signature
                          </span>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-8"
                            onClick={() => handleEditProvider(provider)}
                          >
                            <Edit2 className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProvider(provider.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => { setFormData({}); setErrors({}) }}>
            <Plus className="mr-2 size-4" />
            Add Provider
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Provider</DialogTitle>
            <DialogDescription>
              Enter the provider information. All providers will be required to sign authorization documents.
            </DialogDescription>
          </DialogHeader>
          {renderFormFields()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProvider}>Add Provider</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
