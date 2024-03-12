'use client'

import { Inter } from 'next/font/google'
import '@/app/ui/globals.css'
import { inter } from '@/app/ui/fonts';
import Link from 'next/link';


import {usePathname} from 'next/navigation'; 

let Path = () => {
  const pathname = usePathname()
  if (pathname == "/"){
    return(<div className= "absolute left-8 pt-7">
            <p>{pathname}</p>
          </div>)
  }
  let back_one = pathname.substring(0, pathname.lastIndexOf('/'));
  if (!back_one) {
    back_one = '/'
  }
  return(<div className= "absolute left-8 pt-7">
          <p> 
          Jackson Kohls 
          <br />
          <Link href={back_one}>
            {pathname}
          </Link>
          </p>
        </div>)
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">  
      <body>
      <header className={`${inter.className} antialiased`}>
        <Path/>
      </header>
          
        {children}
        
      </body>
    </html>
    
  )
}
