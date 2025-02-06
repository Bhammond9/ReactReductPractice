// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { postUpdated } from '@/features/posts/postsSlice'

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use
import type { Post } from '@/features/posts/postsSlice'
import type { User } from '@/features/users/usersSlice'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    tagTypes: ['Post'],
    endpoints: builder => ({
      getPosts: builder.query<Post[], void>({
        query: () => '/posts',
          providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id }) as const),

        getUsers: builder.query<User[], void>({
          query: () => '/users'
        })
    
      ]

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
      }),
      editPost: builder.mutation<Post, PostUpdated>({
        query: post => ({
          url: `posts/${post.id}`,
          method: 'PATCH',
          body: post
        })
      })
    })
  })

// Export the auto-generated hook for the `getPosts` query endpoint

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useGetUsersQuery,
    useAddNewPostMutation,
    useEditPostMutation

  } = apiSlice