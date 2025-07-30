import React from 'react'
import Navigation from './Navigation'
import SearchBox from './SearchBox'
import FollowUs from './FollowUs'
import HeaderSlider from './HeaderSlider'

export default function Header() {
  return (
    <header>
      <div className='container mx-auto'>
        <Navigation/>
        <SearchBox/>
        <FollowUs/>
        <HeaderSlider/>
      </div>
    </header>
  )
}
