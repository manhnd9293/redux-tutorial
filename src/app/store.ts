import { configureStore } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'

import postsReducer from '@/features/posts/postsSlice'
import userReducer from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'


export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    posts: postsReducer,
    users: userReducer,
    auth: authReducer
  },
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>