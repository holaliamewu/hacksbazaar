'use client' 

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ form, setForm ] = useState({
        name: "",
        email: "",
        password: "",
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
            form, setForm
}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}