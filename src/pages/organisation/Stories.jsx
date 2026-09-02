import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import EmptyState from '../../components/EmptyState'
import {
  getOrganizationStories,
  createStory,
  updateStory,
  deleteStory,
  publishStory,
  unpublishStory,
} from '../../services/storyApi'

const DEFAULT_PAGE_SIZE = 10

const EMPTY_FORM = {
  title: '',
  content: '',
}

export default function OrganizationStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  /*
   * Normalize the API response so the component has
   * one consistent story shape.
   *
   * API example:
   * {
   *   id: 1,
   *   title: "...",
   *   content: "...",
   *   published: true,
   *   created_at: "..."
   * }
   */
  const normalizeStory = (story) => ({
    ...story,
    id: story.id ?? story._id,
    createdAt: story.createdAt ?? story.created_at,
    published: Boolean(story.published),
  })

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getOrganizationStories({
        page,
        limit: DEFAULT_PAGE_SIZE,
      })

      const rawStories = Array.isArray(data)
        ? data
        : data?.stories || []

      const normalizedStories = rawStories.map(normalizeStory)

      setStories(normalizedStories)

      /*
       * Supports both:
       *
       * {
       *   pagination: {
       *     total_pages: 1
       *   }
       * }
       *
       * and an older:
       *
       * {
       *   totalPages: 1
       * }
       */
      const pages =
        data?.pagination?.total_pages ??
        data?.pagination?.totalPages ??
        data?.totalPages ??
        1

      setTotalPages(Number(pages) || 1)
    } catch (err) {
      setError(err?.message || 'Failed to load stories.')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    async function loadStories() {
      await fetchStories()
    }

    void loadStories()
  }, [fetchStories])

  const resetForm = () => {
    setFormData(EMPTY_FORM)
    setEditingId(null)
  }

  const closeForm = () => {
    setShowForm(false)
    resetForm()
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNewStory = () => {
    setError('')
    setSuccess('')
    resetForm()
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      setError('')
      setSuccess('')

      const payload = {
        title: formData.title.trim(),
        content: formData.content.trim(),
      }

      if (!payload.title || !payload.content) {
        setError('Please provide both a title and story content.')
        return
      }

      if (editingId) {
        await updateStory(editingId, payload)
        setSuccess('Story updated successfully!')
      } else {
        await createStory(payload)
        setSuccess('Story created successfully!')
      }

      closeForm()

      /*
       * Refresh the current page so the new/updated
       * story appears immediately.
       */
      await fetchStories()

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      setError(err?.message || 'Failed to save story.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (story) => {
    setError('')
    setSuccess('')

    setFormData({
      title: story.title || '',
      content: story.content || '',
    })

    setEditingId(story.id)
    setShowForm(true)
  }

  const handlePublish = async (id) => {
    try {
      setActionLoading(id)
      setError('')
      setSuccess('')

      await publishStory(id)

      setSuccess('Story published successfully!')

      await fetchStories()

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      setError(err?.message || 'Failed to publish story.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnpublish = async (id) => {
    try {
      setActionLoading(id)
      setError('')
      setSuccess('')

      await unpublishStory(id)

      setSuccess('Story unpublished successfully!')

      await fetchStories()

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      setError(err?.message || 'Failed to unpublish story.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this story?'
    )

    if (!confirmed) return

    try {
      setActionLoading(id)
      setError('')
      setSuccess('')

      await deleteStory(id)

      setSuccess('Story deleted successfully!')

      /*
       * If the last item on a page is deleted, move
       * back one page when necessary.
       */
      if (stories.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1)
      } else {
        await fetchStories()
      }

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      setError(err?.message || 'Failed to delete story.')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#172033]">
              Stories
            </h1>

            <p className="mt-2 text-gray-600">
              Share your impact stories with your supporters
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={handleNewStory}
              className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e]"
            >
              New Story
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* Story Form */}
        {showForm && (
          <Card className="mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#172033]">
                {editingId ? 'Edit Story' : 'Create New Story'}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId
                  ? 'Update your impact story.'
                  : 'Create a story to share with your supporters.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Story Title
                </label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="Enter your story title"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none focus:ring-1 focus:ring-[#183b2b]"
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Story Content
                </label>

                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Tell your supporters about the impact you are making..."
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#183b2b] focus:outline-none focus:ring-1 focus:ring-[#183b2b]"
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? 'Saving...'
                    : editingId
                      ? 'Update Story'
                      : 'Create Story'}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="rounded-full border border-gray-300 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
            {stories.map((story) => {
              const storyId = story.id
              const isPublished = story.published
              const isActionLoading = actionLoading === storyId

              return (
                <Card key={storyId} hover>
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                    {/* Story Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-[#183b2b]">
                          {story.title}
                        </h3>

                        {/* Status Badge */}
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            isPublished
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {isPublished ? 'Published' : 'Draft'}
                        </span>

                        {story.featured && (
                          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-2 line-clamp-3 text-gray-600">
                        {story.content}
                      </p>

                      {/* Organization */}
                      {story.organization?.name && (
                        <p className="mt-3 text-xs text-gray-500">
                          Organization:{' '}
                          <span className="font-medium text-gray-600">
                            {story.organization.name}
                          </span>
                        </p>
                      )}

                      {/* Created Date */}
                      {story.createdAt && (
                        <p className="mt-1 text-xs text-gray-500">
                          Created{' '}
                          {new Date(
                            story.createdAt
                          ).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <div className="flex flex-wrap gap-3">
                        {isPublished ? (
                          <button
                            type="button"
                            onClick={() => handleUnpublish(storyId)}
                            disabled={isActionLoading}
                            className="text-sm font-medium text-yellow-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isActionLoading
                              ? 'Unpublishing...'
                              : 'Unpublish'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handlePublish(storyId)}
                            disabled={isActionLoading}
                            className="text-sm font-medium text-green-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isActionLoading
                              ? 'Publishing...'
                              : 'Publish'}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleEdit(story)}
                          disabled={isActionLoading}
                          className="text-sm font-medium text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(storyId)}
                          disabled={isActionLoading}
                          className="text-sm font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        ) : (
          !showForm && (
            <EmptyState
              title="No stories yet"
              message="Create your first story to share your impact"
            />
          )
        )}
      </div>
    </main>
  )
}
