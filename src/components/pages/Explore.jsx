import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Explore() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')


  return (
    <div className='pt-52 text-white'>Explore
    <span>search query: {query} </span>
    </div>
  )
}
