import { configureStore } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts/postsSlice'


// // An example slice reducer function that shows how a Redux reducer works inside.
// // We'll replace this soon with real app logic.
// function counterReducer(state: CounterState = { value: 0 }, action: Action) {
//   switch (action.type) {
//     // Handle actions here
//     default: {
//       return state
//     }
//   }
// }

export const store = configureStore({
    reducer: {
        posts: postsReducer
      }
    })

    // Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>

