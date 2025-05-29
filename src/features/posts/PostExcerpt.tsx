import { Link } from 'react-router-dom'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { Post } from '@/features/posts/postsSlice'
import { memo } from 'react'

interface PostExcerptProps {
  post: Post
}


let PostExcerptMemo = ({ post }: PostExcerptProps) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

const PostExcerpt = memo(PostExcerptMemo)
export default PostExcerpt