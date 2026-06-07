import { getPostData } from '@/app/lib/posts'

import Markdown from 'react-markdown'
import {createRoot} from 'react-dom/client'

type data = {
    id: string
}

type Props = {
    params: data
}

type Post = {
    data: string
    metadata: Post_metadata
}

type Post_metadata = {
    date: string
    title: string
  }




export default async function Post({ params }: Props) {
    const postData: Post = await getPostData('cyber', params.id)
    return(
        createRoot(document.body).render(<Markdown>{postData.data}</Markdown>)
    )
}

  /*
createRoot(document.body).render(<Markdown>{postData.data}</Markdown>)
export default async function Post({ params }: Props) {
    const postData: Post = await getPostData('cyber', params.id)
    return(
        <main className="flex min-h-screen flex-col items-center p-24">
            <title>{postData.metadata.title}</title>
            <h1> {postData.metadata.title} </h1>
            {}
        </main>
    )
}
*/