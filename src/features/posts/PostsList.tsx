import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Link } from 'react-router-dom'
import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostsStatus } from '@/features/posts/postsSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { useEffect } from 'react'
import { Spinner } from '@/components/Spinner'
import { TimeAgo } from '@/components/TimeAgo'
import PostExcerpt from '@/features/posts/PostExcerpt'



export const PostsList = () => {
  // Select the `state.posts` value from the store into the component

  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)


  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else {
    content = <div>{postsError}</div>
  }


  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}