import { Link, useParams } from 'react-router-dom'
import { Spinner } from '@/components/Spinner'
import { useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { Content } from 'react-tiny-toast'

import { selectCurrentUsername } from '@/features/auth/authSlice'

import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'

import { useGetPostQuery } from '@/features/api/apiSlice'


export const SinglePostPage = () => {
  const { postId } = useParams()

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!)
  const currentUsername = useAppSelector(selectCurrentUsername)!

  let content: React.ReactNode

  const canEdit = currentUsername === post?.user

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    )
  }

  return <section>{content}</section>
}
