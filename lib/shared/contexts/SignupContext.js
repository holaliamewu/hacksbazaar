'use client'

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        newPassword: "",
        password: "",
        currentEmoji: "😎", 
        profilePhoto: "",
        role: "",
    });
    const [loggedIn, setLoggedIn] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showStartingAuthModal, setShowStartingAuthModal] = useState(false);

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
            user, setUser,
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
