import StoryCard from '../components/StoryCard'

const stories = [
  { id: 'coast', category: 'Coastal restoration', title: 'A cleaner coast, led by the community', excerpt: 'Local volunteers are restoring shorelines and protecting marine habitats.', authorName: 'MazingiraHub community' },
  { id: 'forest', category: 'Forest restoration', title: 'Growing a greener future together', excerpt: 'Community tree-planting efforts are restoring vital watersheds.', authorName: 'MazingiraHub community' },
]

export default function Stories() {
  return <><section className="page-hero stories-hero"><div className="shell narrow"><p className="eyebrow">From the field</p><h1>The people and places your giving reaches.</h1><p>Read how committed communities are turning environmental support into visible, lasting progress.</p></div></section><main className="stories-body shell"><div className="wire-stories">{stories.map((story) => <StoryCard key={story.id} story={story} />)}</div></main></>
}
