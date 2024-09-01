'use client' 

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ form, setForm ] = useState({
        fullName: "",
        email: "",
        newPassword: "",
        password: "",
        currentEmoji: "😎", 
        profilePhoto: "",
        role: "",
        seenFirstMsg: false,
    })
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ showAuthModal, setShowAuthModal ] = useState(false);
    const [ showStartingAuthModal, setShowStartingAuthModal ] = useState(true);
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