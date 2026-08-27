import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import {
  getOrganizationStories,
  createStory,
  updateStory,
  deleteStory,
  publishStory,
  unpublishStory,
} from '../../services/storyApi'

const DEFAULT_PAGE_SIZE = 10

export default function OrganizationStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
  })
  const [submitting, setSubmitting] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getOrganizationStories({
        page,
        limit: DEFAULT_PAGE_SIZE,
      })

      const list = Array.isArray(data) ? data : data.stories || []
      setStories(list)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    void Promise.resolve().then(fetchStories)
  }, [fetchStories])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      setError('')
      setSuccess('')

      if (editingId) {
        await updateStory(editingId, formData)
        setSuccess('Story updated successfully!')
      } else {
        await createStory(formData)
        setSuccess('Story created successfully!')
      }

      setFormData({ title: '', content: '', status: 'draft' })
      setEditingId(null)
      setShowForm(false)
      await fetchStories()

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (story) => {
    setFormData(story)
    setEditingId(story._id || story.id)
    setShowForm(true)
  }

  const handlePublish = async (id) => {
    try {
      setActionLoading(id)
      setError('')
      await publishStory(id)
      setSuccess('Story published!')
      await fetchStories()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnpublish = async (id) => {
    try {
      setActionLoading(id)
      setError('')
      await unpublishStory(id)
      setSuccess('Story unpublished!')
      await fetchStories()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this story?')) return

    try {
      setError('')
      await deleteStory(id)
      setSuccess('Story deleted successfully!')
      await fetchStories()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#172033]">Stories</h1>
            <p className="mt-2 text-gray-600">
              Share your impact stories with your supporters
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true)
                setEditingId(null)
                setFormData({ title: '', content: '', status: 'draft' })
              }}
              className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e]"
            >
              New Story
            </button>
          )}
        </div>

        {/* Messages */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Story Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Story Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ title: '', content: '', status: 'draft' })
                  }}
                  className="rounded-full border border-gray-300 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Stories List */}
        {stories.length > 0 ? (
          <div className="space-y-4">
            {stories.map((story) => (
              <Card key={story._id || story.id} hover>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#183b2b]">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {story.content}
                    </p>
                    <p className="mt-3 text-xs text-gray-500">
                      {new Date(story.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        story.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {story.status}
                    </span>

                    <div className="flex flex-col gap-1 sm:flex-row">
                      {story.status === 'draft' ? (
                        <button
                          onClick={() => handlePublish(story._id || story.id)}
                          disabled={actionLoading === (story._id || story.id)}
                          className="text-sm text-green-600 hover:underline disabled:opacity-50"
                        >
                          {actionLoading === (story._id || story.id)
                            ? 'Publishing...'
                            : 'Publish'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnpublish(story._id || story.id)}
                          disabled={actionLoading === (story._id || story.id)}
                          className="text-sm text-yellow-600 hover:underline disabled:opacity-50"
                        >
                          {actionLoading === (story._id || story.id)
                            ? 'Unpublishing...'
                            : 'Unpublish'}
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(story)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(story._id || story.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) =>
                    page <= 3 ? i + 1 : page - 2 + i
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-10 w-10 rounded-full font-semibold transition ${
                        page === p
                          ? 'bg-[#183b2b] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          !showForm && (
            <Card>
              <div className="text-center py-12">
                <p className="text-lg font-medium text-gray-600">
                  No stories yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Create your first story to share your impact
                </p>
              </div>
            </Card>
          )
        )}
      </div>
    </main>
  )
}
