import { useAuth } from '@/lib/shared/contexts/SignupContext'
import React from 'react'

export default function NavBar() {
  const [ user, setUser,loggedIn, setShowAuthModal ] = useAuth()

  return (
        <nav className="flex justify-between items-center pt-8" >
            <h4 className=" font-bold " >hacksbazaar</h4>
            <ul className="" >
            { !loggedIn && ( <li 
            onClick={ () => { setShowAuthModal(true)}}
            className='text-xs cursor-pointer border-transparent hover:bg-zinc-200 active:border-[1px] active:border-zinc-300 py-1 px-2 rounded-full'>log in</li>
  )}
            </ul>
        </nav>
  )
}
