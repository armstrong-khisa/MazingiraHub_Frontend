import { AlertTriangle, X } from 'lucide-react'

export default function ErrorMessage({ message, title = 'Something went wrong', onDismiss }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
      <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-lg text-red-400 hover:text-red-600"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
