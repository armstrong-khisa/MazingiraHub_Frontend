import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#28a66a]">
          404 Error
        </p>

        <h1 className="mt-6 text-5xl font-bold text-[#172033]">
          Page not found
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-[#183b2b] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#24543e]"
        >
          Go back home
        </Link>
      </div>
    </main>
  )
}
