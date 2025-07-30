import React from 'react'
import Navigation from './Navigation'
import SearchBox from './SearchBox'
import FollowUs from './FollowUs'

export default function Header() {
  return (
    <header>
        <Navigation/>
        <SearchBox/>
        <FollowUs/>
    </header>
  )
}
