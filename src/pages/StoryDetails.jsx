import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getStoryById } from '../services/storyApi'

function StoryDetails() {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function fetchStory() {
      try {
        setLoading(true)
        setError('')
        const data = await getStoryById(id)
        if (active) setStory(data)
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    void fetchStory()
    return () => {
      active = false
    }
  }, [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  if (!story) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#f7f8f3] px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#172033]">Story not found</h1>
          <p className="mt-4 text-gray-500">The story you are looking for does not exist.</p>
          <Link
            to="/stories"
            className="mt-8 inline-flex rounded-full bg-[#183b2b] px-7 py-4 text-sm font-bold text-white"
          >
            Back to Stories
          </Link>
        </div>
      </section>
    )
  }

  const title = story.title || 'A community making progress'
  const content = story.content || story.description || story.story || story.excerpt || ''
  const category = story.category || story.focusArea || 'Environmental action'
  const date = story.date || story.publishedAt || story.createdAt
  const author = story.author?.name || story.authorName || story.organisation?.name || story.organisationName || 'MazingiraHub community'
  const image = story.image || story.imageUrl || story.coverImage

  return (
    <main className="bg-[#f7f8f3]">
      {image && (
        <div className="h-[300px] overflow-hidden sm:h-[420px]">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <article className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
        <Link to="/stories" className="text-sm font-semibold text-[#23945c]">
          <ArrowLeft className="mr-1 inline-block h-4 w-4" aria-hidden="true" /> Back to Stories
        </Link>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#23945c]">{category}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-6xl">{title}</h1>
        <p className="mt-5 text-sm text-gray-500">
          {date && `${date} · `}By {author}
        </p>
        <div className="mt-10 whitespace-pre-line text-lg leading-8 text-gray-600">{content}</div>
      </article>
    </main>
  )
}

export default StoryDetails