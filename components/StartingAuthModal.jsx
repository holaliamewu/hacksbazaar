'use client';

import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { signInAnonymously } from "firebase/auth";
import { firebaseAuth } from "@/lib/shared/firebase";
import { useState } from "react";

export default function StartingAuthModal() {
  const { setShowStartingAuthModal, form, setForm, setShowAuthModal, setLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false); // Loading state for authentication
  const [error, setError] = useState(null); // Error state for authentication

  // Anonymous Authentication
  function AuthenticateAnonymously() {
    setLoading(true);
    signInAnonymously(firebaseAuth)
      .then(() => {
        setLoggedIn(true);
        setShowAuthModal(false);
      })
      .catch((error) => {
        console.error("Anonymous authentication failed:", error);
        setError("Failed to sign in anonymously. Please try again.");
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div 
      onClick={ (e) => {
        e.stopPropagation();
        setShowStartingAuthModal(false);
      }}
      className="flex absolute top-0 left-0 items-center justify-center w-full min-h-screen backdrop-blur-sm"
    >
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className="flex flex-col space-y-6 rounded-lg border backdrop-blur-3xl bg-white/[.7] bg-card text-card-foreground shadow-sm w-[90%] max-w-sm p-6"
      >
        <h1 className="text-2xl font-bold">
          Hey, thanks for hopping on <span className="border-b-4 border-teal-700">hacksbazaar!🎉</span>
        </h1>
        <p className="text-sm text-zinc-600">
          It&#39;s good to have you here. Let&#39;s get you started.
        </p>

        {/* Display error message if authentication fails */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-col space-y-2">
          <button
            onClick={() => {
              setShowStartingAuthModal(false);
              setShowAuthModal(true);
              setForm({ ...form, seenFirstMsg: true });
            }}
            className="inline-flex bg-teal-700 text-white items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Get Started
          </button>

          <button
            onClick={() => {
              AuthenticateAnonymously();
              setShowStartingAuthModal(false);
              setForm({ ...form, seenFirstMsg: true });
            }}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-primary/90 h-10 px-4 py-2 w-full ${loading ? 'opacity-50' : ''}`}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Signing in...' : 'Continue Anonymously'}
          </button>

          <button
            onClick={() => {
              setShowStartingAuthModal(false);
              setForm({ ...form, seenFirstMsg: true });
            }}
            className="text-xs text-zinc-600 underline"
          >
            Stay signed out.
          </button>
        </div>
      </div>
    </div>
  );
}
