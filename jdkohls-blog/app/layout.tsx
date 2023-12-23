'use client'

import { Inter } from 'next/font/google'
import '@/app/ui/globals.css'
import { inter } from '@/app/ui/fonts';
import { Link } from 'next/link';


import {usePathname} from 'next/navigation'; 


const Path = () => {
  const pathname = usePathname()
  if (pathname == "/"){
  return(<div className= "absolute right-8 pt-7">
          <p>{pathname}</p>
        </div>)
  }
  return(<div className= "absolute right-8 pt-7">
          <p> 
          Jackson Kohls 
          <br /> {pathname}
          </p>
        </div>) //make a link, make it left justified
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
          <Path />


        {children}
      
      
      </body>
    </html>
    
  )
}
