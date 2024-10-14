'use client'

import { createContext, useState, useContext, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from '@/lib/shared/firebase'

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [form, setForm] = useState({
        fullName: null,
        userName: null,
        email: null,
        bio: null,
        newPassword: null,
        password: null,
        currentEmoji: "😎", 
        profilePhoto: null,
        userId: null
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showStartingAuthModal, setShowStartingAuthModal] = useState(false);

    useEffect(() => {
        const db = getDatabase();
    
        const fetchUserData = (userId) => {
          const userRef = ref(db, `users/${userId}`);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              // Update the form with the data from Firebase
              setForm(data);
            }
          });
        };
    
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
          if (user) {
            // User is signed in, fetch the user's data
            setLoggedIn(true)
            fetchUserData(user.uid);
          } else {
            console.log("No user is signed in");
          }
        });
    
        // Clean up the subscription
        return () => unsubscribe();
      }, [setForm]);

    useEffect(()=> {
        const startingModalLocalStorage = localStorage.getItem('startingAuthModal')
        
        if(startingModalLocalStorage){
            setShowStartingAuthModal(false)
        }else{
            setShowStartingAuthModal(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            loggedIn, setLoggedIn,
            showAuthModal, setShowAuthModal,
            showStartingAuthModal, setShowStartingAuthModal,
            form, setForm,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
