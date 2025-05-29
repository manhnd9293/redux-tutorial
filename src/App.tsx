import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsList } from '@/features/posts/PostsList'
import { AddPostForm } from '@/features/posts/AddPostForm'
import { PostsMainPage } from '@/features/posts/PostMainPage'
import { SinglePostPage } from '@/features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { LoginPage } from '@/features/auth/LoginPage'
import { UsersList } from '@/features/users/UserList'
import { UserPage } from '@/features/users/UserPage'
import { NotificationsList } from '@/features/notifications/NotificationsList'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                  <Route path="/notifications" element={<NotificationsList />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
