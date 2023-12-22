import React from 'react'
import {useRouter} from 'next/router'; 
  
export default function getRoute() { 
    // Calling useRouter() hook 
    const router = useRouter() 
    return ( 
        <div> 
            <h2>pathname:- {router.pathname}</h2> 
            <h2>query:- {router.query}</h2> 
            <h2>asPath:- {router.asPath}</h2> 
        </div> 
    ) 
} 
