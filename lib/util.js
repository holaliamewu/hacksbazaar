import { signInAnonymously, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut  } from "firebase/auth";
import { firebaseAuth } from "./shared/firebase";


function displayAnonMessage(  ) {
  
  
  setShowAnonMessage(true);
  setTimeout(() => {
        setShowAnonMessage(false);
      }, 5000); 
    }
    
    export function AuthenticateAnonymously( loggedIn, setLoggedIn ){
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const uid = user.uid;
          setLoggedIn(true)
          // ...
        } else {
          // User is signed out
          setLoggedIn(false)
        }
  });

    signInAnonymously(firebaseAuth, setLoggedIn )

     .then(() => {
    // Signed in..
    setLoggedIn(true)
    displayAnonMessage();
     })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
}

//Password Authentication

export function SignupWithEmail(loggedIn, setLoggedIn) {

  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      setLoggedIn(true)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      setLoggedIn(false)
      // ..
    });
    
}


// SignIn with Email

export function LoginWithPassword(setLoggedIn) {

  signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed in 
      setLoggedIn(true)
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoggedIn(false)
    });
}

export function Logout(setLoggedIn ) {

signOut(firebaseAuth).then(() => {
  // Sign-out successful.
  setLoggedIn(false)
}).catch((error) => {
  // An error happened.
  setLoggedIn(true)
});
}