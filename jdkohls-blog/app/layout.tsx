'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import {usePathname} from 'next/navigation'; 

const inter = Inter({ subsets: ['latin'] })

const Path = () => {
  const pathname = usePathname()
  return <p>{pathname}</p>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className= "absolute right-8 pt-7">
          
          <Path />
        </div>


        {children}
      
      
      </body>
    </html>
    
  )
}
