import { getAllPostIds, getPostData } from '@/app/lib/posts';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css'; 

export async function generateStaticParams() {
  const posts = getAllPostIds('finance')

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
  const postData = await getPostData('finance', id)

  return (
    <div className="p-6 max-w-3xl mx-auto">
    <article className="prose lg:prose-xl dark:prose-invert mt-[5rem]">
      <h1>{postData.metadata.title}</h1>
        <Markdown
          remarkPlugins={[remarkMath]} 
          rehypePlugins={[rehypeKatex]}
        >
            {postData.data}
        </Markdown>
    </article></div>
  )
}