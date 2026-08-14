import Link from 'next/link'

import { getSortedPostsData } from '@/app/lib/posts'

type AllPostsData = {
  date: string
  title: string
  id: string
}[]


export default function Home() {
  const allPostsData: AllPostsData = getSortedPostsData('finance')

  return (
    <main className = "flex min-h-screen flex-col items-center justify-between p-24">
    
      <section className={''}> {/* simply not a good idea
                                needs to be redone to make things pretty~ */}
        <h2 className={''}>Blog</h2>
        <ul className={''}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={''} key={id}>
              <div className='font-medium mb-1 mt-5'>
                <Link href={`/finance/${id}`}>{title}</Link>
              </div>
              {/* <br /> */}
              <small className='text-gray-500 font-medium'>
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section> </main>
  )
}

