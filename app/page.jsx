"use client";
import { Analytics } from "@vercel/analytics/react";
import Hacks from "@/components/Hacks";
import NavBar from "@/components/NavBar";
import AuthForm from "@/components/Auth";
import { useAuth } from "@/lib/shared/contexts/SignupContext";
import StartingAuthModal from "@/components/StartingAuthModal";
import { GeistProvider } from '@geist-ui/core';

export default function App() {
  const { 
    user, showAuthModal, 
    showStartingAuthModal, loggedIn,
    form,
  } = useAuth();

  return (
    <div className="w-[90%] md:w-[50%] mx-auto min-h-screen">
    <GeistProvider>
        <Analytics />
        <NavBar />
        <Hacks />
        {showStartingAuthModal && <StartingAuthModal />}
        {showAuthModal && <AuthForm />}
        </GeistProvider>
      </div>
  );
}
