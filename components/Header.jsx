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
        <nav className="flex justify-between items-center pt-8 " >
          { !loggedIn && <span className="w-1/3" ></span>}
            <span className="relative font-semibold mx-auto z-3" >hacksbazaar.
                <h3 className="text-[8px] z-1  bg-blue-400 rounded-full italic px-1  absolute right-[73px] -top-2 " >
                  v0.1
                </h3>
              </span>
            { !loggedIn && <span className="text-xs w-1/3">log in</span> }
            <Link href='/feedback' className="fixed top-9 right-5 text-xs ml-2 underline">feedback⭐</Link> 
        </nav>
  )
}
