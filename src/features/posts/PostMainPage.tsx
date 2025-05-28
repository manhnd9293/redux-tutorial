import { AddPostForm } from '@/features/posts/AddPostForm'
import { PostsList } from '@/features/posts/PostsList'

export function PostsMainPage() {
  return (
    <>
      <AddPostForm />
      <PostsList />
    </>
  )
}
