import { api } from '@/services/apiInstance'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@store/reducers'
// ...

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)

    return middleware
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
