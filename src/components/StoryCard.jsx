import { Link } from 'react-router-dom'
import { ArrowRight, Leaf } from 'lucide-react'

export default function StoryCard({ story = {}, featured = false }) {
  const id = story._id || story.id

  const title =
    story.title ||
    'A community making progress'

  const body =
    story.excerpt ||
    story.content ||
    story.description ||
    story.story ||
    'Discover how communities are creating positive environmental change.'

  const category =
    story.category ||
    story.focusArea ||
    'Environmental Action'

  const date =
    story.date ||
    story.publishedAt ||
    story.createdAt

  const author =
    story.author?.name ||
    story.authorName ||
    story.organisation?.name ||
    story.organization?.name ||
    story.organisationName ||
    story.organizationName ||
    'MazingiraHub Community'

  const image =
    story.image ||
    story.imageUrl ||
    story.coverImage

  const readTime =
    story.readTime ||
    story.readingTime

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article
      className={
        featured
          ? 'story-card story-card-featured'
          : 'story-card'
      }
    >
      {/* Image */}
      {image ? (
        <div className="story-card-image">
          <img
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="story-card-image story-card-image-placeholder"
          aria-hidden="true"
        >
          <Leaf className="h-10 w-10" aria-hidden="true" />
        </div>
      )}

      {/* Content */}
      <div className="card-body">
        <div className="story-card-meta">
          <span className="location-pill">
            {category}
          </span>

          {formattedDate && (
            <span className="story-date">
              {formattedDate}
            </span>
          )}
        </div>

        <h3>{title}</h3>

        <p className="story-excerpt">
          {body}
        </p>

        <p className="story-author">
          — {author}
        </p>

        {/* Regular card */}
        {!featured && (
          <div className="story-card-footer">
            {readTime ? (
              <span className="story-date">
                {readTime}
              </span>
            ) : (
              <span />
            )}

            {id && (
              <Link
                className="story-card-link"
                to={`/stories/${id}`}
              >
                Read story
                <ArrowRight
                  className="ml-1 inline-block h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        )}

        {/* Featured card */}
        {featured && id && (
          <Link
            className="button story-card-link"
            to={`/stories/${id}`}
          >
            Read Story
            <ArrowRight
              className="ml-1 inline-block h-4 w-4"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </article>
  )
}
