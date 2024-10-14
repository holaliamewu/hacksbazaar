"use client";
import { Analytics } from "@vercel/analytics/react";
import Hacks from "@/components/Hacks";
import Header from "@/components/Header";
import AuthForm from "@/components/Auth";
import { useAuth } from "@/lib/shared/contexts/SignupContext";
import StartingAuthModal from "@/components/StartingAuthModal";
import { GeistProvider } from '@geist-ui/core';

export default function App() {
  const { 
    showAuthModal, 
    showStartingAuthModal, loggedIn,
    form,
  } = useAuth();


  return (
    <div className="w-[90%] text-black md:w-[50%] mx-auto min-h-screen">
    <GeistProvider>
        <Analytics />
        <Header />
        <Hacks />
        {showStartingAuthModal && <StartingAuthModal />}
        {showAuthModal && <AuthForm />}
        </GeistProvider>
      </div>
  );
}
