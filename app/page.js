"use client" 
import { Analytics } from "@vercel/analytics/react";
import Hacks from "@/components/Hacks";
import NavBar from "@/components/NavBar";
import Login from "@/components/Auth";
import { useAuth } from "@/lib/shared/contexts/SignupContext";
import StartingAuthModal from "@/components/StartingAuthModal";

export default function App() {
  const { 
              user, setUser, 
              showAuthModal, showStartingAuthModal, 
              setShowStartingAuthModal 
            } = useAuth();

  return (
    <div className="w-[90%] md:w-[50%] mx-auto min-h-screen">
      <Analytics />
      <NavBar />
      <Hacks />
      {showStartingAuthModal && 
        <StartingAuthModal  />
      }
      {showAuthModal && <Login />}
    </div>
  );
}
