"use client" 
import { Analytics } from "@vercel/analytics/react";
import Hacks from "@/components/Hacks";
import NavBar from "@/components/NavBar";
import Login from "@/components/Auth";
import { useAuth } from "@/lib/shared/contexts/SignupContext";
import StartingAuthModal from "@/components/StartingAuthModal";

export default function App() {
  const { 
              user, showAuthModal, 
              showStartingAuthModal,loggedIn,
              form,
            } = useAuth();
  const seenFirstMsg = form.seenFirstMsg
  return (
    <div className="w-[90%] md:w-[50%] mx-auto min-h-screen">
      <Analytics />
      <NavBar />
      <Hacks />
      {showStartingAuthModal && !seenFirstMsg &&
        <StartingAuthModal  />
      }
      {showAuthModal && <Login />}
    </div>
  );
}
//just added this new line just to add a fix.