import React, {PropsWithChildren, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToStop({children}: PropsWithChildren) {
  const location = useLocation() // thay đổi url
  useEffect(() =>{
    document.documentElement.scrollTo({ //scroll to top
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [location]) // thay đổi url

  return <>{children}</>
    
  
}

export default ScrollToStop
