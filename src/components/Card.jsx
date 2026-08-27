export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 ${
        hover ? 'transition hover:border-gray-300 hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
