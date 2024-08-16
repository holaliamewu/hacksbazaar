import { signInAnonymously, onAuthStateChanged  } from "firebase/auth";
import { firebaseAuth } from "./shared/firebase";
import { useState } from "react";
import { useAuth } from "./shared/contexts/SignupContext";


onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
  }
});

function displayAnonMessage() {

    const [ showAnonMessage, setShowAnonMessage ] = useState(false)
    
      setShowAnonMessage(true);
      setTimeout(() => {
        setShowAnonMessage(false);
      }, 5000); 
    }
  
export function AuthenticateAnonymously() {
  const [ loggedIn, setLoggedIn, setShowAuthModal ] = useAuth();
    
  setLoggedIn(true)
  setShowAuthModal(false)
    // signInAnonymously(firebaseAuth)

    //   .then(() => {
    //     // Signed in..
    //     displayAnonMessage();
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
}