export default function StoryCard({ story }) {
  const title = story.title || 'A community making progress'
  const body = story.excerpt || story.content || story.description || story.story || ''
  const author = story.author?.name || story.authorName || story.organisation?.name || story.organisationName || 'MazingiraHub community'
  const image = story.image || story.imageUrl || story.coverImage
  return <article className="story-card">{image && <img src={image} alt="" />}<div className="card-body"><p className="location-pill">{story.category || story.focusArea || 'Forest Restoration'}</p><p className="story-date">{story.date || 'August 2026'}</p><h3>{title}</h3><p>{body}</p><p className="story-author">— {author}</p></div></article>
}
