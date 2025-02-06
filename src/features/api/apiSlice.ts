// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
import type { Post } from '@/features/posts/postsSlice'
export type { Post }

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    tagTypes: ['Post'],
    endpoints: builder => ({
      getPosts: builder.query<Post[], void>({
        query: () => '/posts',
        providesTags: ['Post']

      }),
      getPost: builder.query<Post, string>({
        query: postId => `/posts/${postId}`
      }),
      addNewPost: builder.mutation<Post, NewPost>({
        query: initialPost => ({
          // The HTTP URL will be '/fakeApi/posts'
          url: '/posts',
          // This is an HTTP POST request, sending an update
          method: 'POST',
          // Include the entire post object as the body of the request
          body: initialPost
        }),
        invalidatesTags: ['Post']
      })
    })
  })

// Export the auto-generated hook for the `getPosts` query endpoint

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation
  } = apiSlice