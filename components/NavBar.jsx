"use client"
import { useAuth } from '@/lib/shared/contexts/SignupContext'
import { Heart, LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function NavBar() {
  const { user, setUser,loggedIn, setLoggedIn, setShowAuthModal, favFeatureOut } = useAuth()

  // Sign-Out
   function Logout(setLoggedIn) {
    signOut(firebaseAuth)
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setLoggedIn(true);
      });
  }
  


  return (
        <nav className="flex justify-between items-center pt-8 " >
            <h4 className=" font-bold " >hacksbazaar</h4>
            <ul className="flex " >
           { favFeatureOut && <li 
            onClick={ () => { 
            }}
            className='text-xs cursor-pointer border-transparent hover:bg-zinc-200 active:border-[1px] active:border-zinc-300 py-1 px-2 rounded-full'
            ><Heart /> favs</li>}
            <Link 
            href='/'
            className=' flex gap-2 text-xs cursor-pointer transition-all  border-transparent hover:bg-zinc-200  active:border-zinc-300 py-1 px-2 rounded-full'
            ><UserRound size={15} /> <h5 className=' ' >profile</h5></Link>
            <li 
            onClick={ () => { 
            }}
            className='group flex gap-2 text-xs cursor-pointer border-transparent hover:bg-zinc-200 active:border-[1px] active:border-zinc-300 py-1 px-2 rounded-full'>{ loggedIn && <LogOut size={15} />} <h5 className='hidden group-hover:block' >{ loggedIn ? 'log out' : 'log in'}</h5></li>
            </ul>
        </nav>
  )
}

            // Logout;
            // setShowAuthModal(true);