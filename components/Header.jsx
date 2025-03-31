"use client"
import { useAuth } from '@/lib/shared/contexts/SignupContext'
import { signOut } from 'firebase/auth';
import Link from 'next/link';

export default function Header() {
  const { loggedIn, setLoggedIn, setShowAuthModal } = useAuth()

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
        <nav className="flex justify-between items-center min-w-[540px] w-full mx-auto pt-8 " >
            <span className="relative font-semibold mx-auto  z-3 " >hacksbazaar.
                <h3 className="text-[8px] z-1  bg-blue-400 rounded-full italic px-1  absolute right-[63px] -top-1 " >
                  v0.4
                </h3>
              </span>
            { !loggedIn && <span onClick={ ()=> setShowAuthModal(true)} className="flex w-fit py-1 px-2 border border-stone-200 rounded-xl text-xs w-1/3 cursor-pointer">log in</span> }
        </nav>
  )
}
