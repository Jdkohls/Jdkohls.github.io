import { getAllPostIds, getPostData } from '@/app/lib/posts'
import Markdown from 'react-markdown'

export async function generateStaticParams() {
  const posts = getAllPostIds('blog')

  console.log(posts)

  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const postData = await getPostData('blog', id)

  return (
    <article>
      <h1>{postData.metadata.title}</h1>
      <Markdown>{postData.data}</Markdown>
    </article>
  )
}