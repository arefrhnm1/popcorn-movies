import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { LogOut, LogOutIcon } from 'lucide-react';

export default function TopBar() {
    const {user} = useContext(UserContext)
    const avatar = `https://image.tmdb.org/t/p/w185${user?.avatar?.tmdb.avatar_path}`

console.log(user);



  return (
    <div className='flex fixed z-40 top-0 right-0 left-0 bg-zinc-800/60 backdrop-blur-xs border border-white/30 text-white justify-between p-4 items-center rounded-b-4xl'>
        <h1 className='text-2xl text-yellow-500'>Popcorn <span className='text-xl text-white'>Movies</span></h1>
        <div className='flex gap-2 items-center'>
            <button className='text-white flex gap-2 bg-neutral-500/30 p-2 rounded-full text-xs'>
                <LogOut size={16}/>
                
            </button>
            <img className='w-13 h-13 object-cover rounded-full' src={`${user.length !== 0 ? avatar : '/default_profile.jpg'}`} alt="" />

        </div>
    </div>
  )
}
