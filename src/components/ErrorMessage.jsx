export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
      <span className="flex-shrink-0 text-lg">⚠️</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-lg text-red-400 hover:text-red-600"
        >
          ×
        </button>
      )}
    </div>
  )
}
