'use client';

import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { useEffect, useState } from "react";
import { 
  signInAnonymously, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth } from "@/lib/shared/firebase";
import { getDatabase, ref, set } from "firebase/database";

export default function AuthForm() {

  const [authType, setAuthType] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for feedback
  const { form, setForm, setShowAuthModal, setLoggedIn, setShowStartingAuthModal } = useAuth();
  const db = getDatabase();

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false); // Set loading to false once the state is known

      if (user) {
        const uid = user.uid;
        setLoggedIn(true);
        setShowStartingAuthModal(false);
        setForm((prevForm) => ({ ...prevForm, userId: uid }));
      } else {
        setLoggedIn(false);
        setShowStartingAuthModal(true);
      }
    });

    return () => unsubscribe();
  }, [setForm, setLoggedIn, setShowStartingAuthModal]);

  function storeDataToDB(userId) {
    const { fullName, email, currentEmoji, role } = form;
    set(ref(db, 'users/' + userId), {
      fullName,
      email,
      currentEmoji,
      userId,
      jobRole: role,
      createdAt: new Date().toISOString(),
    })
    .then(() => {
      console.log('Data successfully stored to DB!');
    })
    .catch((error) => {
      console.log('Error saving data to DB:', error);
    });
  }

  // Email Sign-Up
  function SignupWithEmail() {
    if (form.password !== form.newPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(firebaseAuth, form.email, form.newPassword)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        storeDataToDB(userId);
        setLoggedIn(true);
        setShowAuthModal(false);
        console.log('Signup successful!');
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError('Signup failed. Please try again.');
        setLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }

  // Email Sign-In
  function LoginWithPassword() {
    setLoading(true);
    signInWithEmailAndPassword(firebaseAuth, form.email, form.password)
      .then((userCredential) => {
        setLoggedIn(true);
        const userId = userCredential.user.uid;
        console.log('Login successful!');
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError('Login failed. Please check your credentials.');
        setLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <div
      onClick={ (e) => {
        e.stopPropagation();
        setShowAuthModal(false);
      }}
      className="flex absolute top-0 left-0 items-center justify-center w-full min-h-screen backdrop-blur-sm"
    >
      {authType === 'login' ? (
        <form
          className="rounded-lg border backdrop-blur-3x mg:bg-white bg-white/[.7] bg-card text-card-foreground shadow-sm w-[90%] max-w-md p-6 space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <
