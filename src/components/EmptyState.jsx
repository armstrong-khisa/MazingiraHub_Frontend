import { Inbox } from 'lucide-react'

export default function EmptyState({ title, message, action }) {
	return (
		<div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
			<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e1f3e8] text-xl text-[#23945c]">
				<Inbox className="h-6 w-6" aria-hidden="true" />
			</div>
			<h3 className="mt-4 text-lg font-semibold text-[#183b2b]">{title}</h3>
			{message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
			{action && <div className="mt-5">{action}</div>}
		</div>
	)
}
