import { Link } from 'react-router-dom'

export default function StoryCard({ story, featured = false }) {
  const id = story._id || story.id
  const title = story.title || 'A community making progress'
  const body = story.excerpt || story.content || story.description || story.story || ''
  const category = story.category || story.focusArea || 'Environmental action'
  const date = story.date || story.publishedAt || story.createdAt
  const author = story.author?.name || story.authorName || story.organisation?.name || story.organisationName || 'MazingiraHub community'
  const image = story.image || story.imageUrl || story.coverImage
  const readTime = story.readTime || story.readingTime

  return (
    <article className={featured ? 'story-card story-card-featured' : 'story-card'}>
      {image && <img src={image} alt={title} />}
      <div className="card-body">
        <p className="location-pill">{category}</p>
        {date && <p className="story-date">{date}</p>}
        <h3>{title}</h3>
        <p>{body}</p>
        <p className="story-author">— {author}</p>
        {!featured && (
          <div className="story-card-footer">
            {readTime && <span className="story-date">{readTime}</span>}
            {id && <Link to={`/stories/${id}`}>Read story →</Link>}
          </div>
        )}
        {featured && id && (
          <Link className="button story-card-link" to={`/stories/${id}`}>
            Read Story →
          </Link>
        )}
      </div>
    </article>
  )
}
