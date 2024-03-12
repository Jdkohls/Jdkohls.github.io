import { getPostData } from '@/app/lib/posts'

type data = {
    id: string
}

type Props = {
    params: data
}

type post = {
    data: string
    metadata: Post_metadata
}

type Post_metadata = {
    date: string
    title: string
  }

export default async function Post({ params }: Props) {
    const postData: post = getPostData('cyber', params.id)
    return(
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
                    {postData.metadata.title}
                <div>
                        <p> {postData.data} </p>
                </div>
        </section>
    )
}