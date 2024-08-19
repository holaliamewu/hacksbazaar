'use client'

import { useAuth } from "@/lib/shared/contexts/SignupContext";

export default function StartingAuthModal() {
 
  const { setShowStartingAuthModal } = useAuth();


  return (
    <div className="flex absolute top-0 left-0 items-center justify-center w-full min-h-screen backdrop-blur-sm">
          <div
            className="flex flex-col space-y-6 rounded-lg border backdrop-blur-3xl bg-white/[.7] bg-card text-card-foreground shadow-sm w-full max-w-md p-6 space-y-4"
            data-v0-t="card"
          >
          <h1 className="text-2xl font-bold" >Hey, thanks for hopping on <span className="border-b border-b-teal-300 border-b-4" >hacksbazaar!</span></h1>
          <p className="text-sm text-zinc-600" >It's good to have you here. Let's get you started.</p>
          <span className="flex flex-col space-y-2" >
          <button className="inline-flex bg-teal-300 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Get Started
              </button>
          <button 
          onClick={ () => setShowStartingAuthModal(false) }
          className="inline-flex items-center justify-center border whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Keep me anonymous 👽
          </button>
          
            <button className="text-xs text-zinc-600 underline" >Stay signed out.</button>
          </span>
            </div>
    </div>
  );
}
