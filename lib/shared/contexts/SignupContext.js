'use client' 

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ form, setForm ] = useState({
        fullName: "",
        email: "",
        password: "",
    })
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ showAuthModal, setShowAuthModal ] = useState(false);
    const [ showStartingAuthModal, setShowStartingAuthModal ] = useState(false);
    const [ favFeatureOut, setFavFeatureOut ] = useState(false)
    return (
        <AuthContext.Provider value={{
            user, setUser,
            loggedIn, setLoggedIn,
            showAuthModal, setShowAuthModal,
            showStartingAuthModal, setShowStartingAuthModal,
            form, setForm,
            favFeatureOut, setFavFeatureOut
}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}