import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addNewPost } from '@/features/posts/postsSlice'
import { selectAllUsers } from '@/features/users/usersSlice'
import { selectCurrentUsername } from '@/features/auth/authSlice'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  // Get the `dispatch` method from the store
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>(
    'idle'
  )

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const userId = useAppSelector(selectCurrentUsername)!


  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    const form = e.currentTarget

    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user: userId })).unwrap()

      form.reset()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }

    // dispatch(postAdded(title, content, userId))

    e.currentTarget.reset()
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}