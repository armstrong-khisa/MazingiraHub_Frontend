export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const firstPage = Math.max(1, Math.min(page - 2, totalPages - 4))
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => firstPage + index)

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {pages.map((currentPage) => (
          <button
            type="button"
            key={currentPage}
            onClick={() => onPageChange(currentPage)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`h-10 w-10 rounded-full font-semibold transition ${page === currentPage ? 'bg-[#183b2b] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            {currentPage}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  )
}
