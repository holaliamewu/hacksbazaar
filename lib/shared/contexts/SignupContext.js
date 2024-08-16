'use client' 

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ showAuthModal, setShowAuthModal ] = useState(false);
    const [ showStartingAuthModal, setShowStartingAuthModal ] = useState(false);

    return (
        <AuthContext.Provider value={[ 
            user, setUser,
            loggedIn, setLoggedIn,
            showAuthModal, setShowAuthModal,
            showStartingAuthModal, setShowStartingAuthModal
        ]}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}