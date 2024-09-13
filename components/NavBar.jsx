"use client"
import { useAuth } from '@/lib/shared/contexts/SignupContext'
import { signOut } from 'firebase/auth';
import { Heart, LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@geist-ui/core'

export default function NavBar() {
  const { user, setUser,loggedIn, setLoggedIn, setShowAuthModal } = useAuth()

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
            <h4 className="flex items-start  font-bold " >
            <Image 
              src="/hacksbazaar-logo-short.png"              
              alt="logo.hacksbazaar"
              width="30"
              height="50"
            />
            <span className='text-[7px] font-medium bg-black text-white px-[4px] py-[2px] -ml-3 -mt-3 rounded-md '>beta v0.1</span></h4>
            <ul className="flex space-x-2 " >
           { loggedIn && 
           <Link 
              href='/favourites'
            onClick={ () => { 
            }}
            className=' flex gap-2 text-xs cursor-pointer transition-all px-2 py-1 border rounded-full bg-zinc-100  border-transparent hover:bg-zinc-200  active:border-zinc-300 py-1 px-2 rounded-full'
            ><Heart size={15} /></Link>}
           { loggedIn && <Link 
            href='/profile'
            className=' flex gap-2 text-xs cursor-pointer transition-all px-2 py-1 border rounded-full bg-zinc-100  border-transparent hover:bg-zinc-200  active:border-zinc-300 py-1 px-2 rounded-full'
            ><UserRound size={15} /></Link>}
            { !loggedIn && <li
            
            onClick={ (e) => { 
              e.stopPropagation();
              setShowAuthModal(true)
            }}
            className='group flex gap-2 text-xs cursor-pointer border-transparent active:border-[1px] active:border-zinc-300 py-1 px-2 rounded-full'
            >log in</li>
          }
            </ul>
        </nav>
  )
}

// Logout;
// setShowAuthModal(true);
// { loggedIn && <li 
// onClick={ () => { 
//   signOut
//             }}
// className='group flex gap-2 text-xs cursor-pointer border-transparent active:border-[1px] active:border-zinc-300 py-1 px-2 rounded-full'
// >log out</li>
// }