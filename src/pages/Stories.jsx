import { useCallback, useEffect, useState } from 'react'
import { getStories } from '../../services/storyApi'

function Stories() {
	const [stories, setStories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [editingStory, setEditingStory] = useState(null)

	const [formData, setFormData] = useState({
		title: '',
		content: '',
	})

	const fetchStories = useCallback(async () => {
		try {
			setLoading(true)
			setError('')

			const data = await getStories()

			setStories(
				Array.isArray(data?.stories)
					? data.stories
					: Array.isArray(data)
						? data
						: [],
			)
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load stories.',
			)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		let active = true

		async function loadStories() {
			try {
				setLoading(true)
				setError('')

				const data = await getStories()

				if (active) {
					setStories(
						Array.isArray(data?.stories)
							? data.stories
							: Array.isArray(data)
								? data
								: [],
					)
				}
			} catch (err) {
				if (active) {
					setError(
						err instanceof Error
							? err.message
							: 'Failed to load stories.',
					)
				}
			} finally {
				if (active) {
					setLoading(false)
				}
			}
		}

		void loadStories()

		return () => {
			active = false
		}
	}, [])

	const resetForm = () => {
		setFormData({
			title: '',
			content: '',
		})
		setEditingStory(null)
	}

	// Keep the rest of your existing handlers and JSX below this point.
}

export default Stories
