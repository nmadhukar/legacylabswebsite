import { AlertTriangle } from "lucide-react"

export function PHIWarningBanner() {
  return (
    <div className="rounded-lg border-2 border-amber-500 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="size-5 shrink-0 text-amber-600" />
        <div>
          <h3 className="font-semibold text-amber-800">
            Do Not Submit Patient-Identifying Information (PHI)
          </h3>
          <p className="mt-1 text-sm text-amber-700">
            This form is for provider and facility information only. Do not include any patient 
            names, dates of birth, medical record numbers, or other protected health information.
          </p>
        </div>
      </div>
    </div>
  )
}
