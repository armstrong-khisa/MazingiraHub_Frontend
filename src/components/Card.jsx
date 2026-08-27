export default function Card({ children, footer, className = '', hover = false }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 ${
        hover ? 'transition hover:border-gray-300 hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
      {footer && <div className="mt-6 border-t border-gray-100 pt-4">{footer}</div>}
    </div>
  )
}
