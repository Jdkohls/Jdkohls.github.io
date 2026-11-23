'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from "react";
import '@/app/ui/globals.css';
import { inter } from '@/app/ui/fonts';
import Link from 'next/link';


import {usePathname} from 'next/navigation'; 

const Path = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Wait for mount & handle root "/" or "/project" (no link needed)
  if (!mounted || !pathname || pathname === "/" || pathname === "/project") {
    return (
      <div className="absolute left-8 pt-7">
        <p>{pathname || "/"}</p>
      </div>
    );
  }

  // 2. Determine where the link should go back to
  let back_one;

  if (pathname.startsWith("/project/")) {
    // Any subpage under /project (e.g., /project/app or /project/app/details)
    // goes one level up, but never higher than /project
    const parent = pathname.substring(0, pathname.lastIndexOf("/"));
    back_one = parent.startsWith("/project") ? parent : "/project";
  } else {
    // Default behavior for the rest of the site
    back_one = pathname.substring(0, pathname.lastIndexOf("/")) || "/";
  }

  return (
    <div className="absolute left-8 pt-7">
      <p>
        <Link href={back_one}>{pathname}</Link>
      </p>
    </div>
  );
};

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
