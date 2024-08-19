import { signInAnonymously, onAuthStateChanged  } from "firebase/auth";
import { firebaseAuth } from "./shared/firebase";

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
  }
});

// function displayAnonMessage(  ) {

    
//       setShowAnonMessage(true);
//       setTimeout(() => {
//         setShowAnonMessage(false);
//       }, 5000); 
//     }
  
export function AuthenticateAnonymously( ){

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