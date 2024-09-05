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
import { Button } from 'geist-ui/core';

export default function AuthForm() {
  const [authType, setAuthType] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for handling authentication errors
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
      console.error('Error saving data to DB:', error);
    });
  }

  // Email Sign-Up
  function SignupWithEmail() {
    setLoading(true);
    setError(null); // Reset error state before starting the signup process

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
        setError('Signup failed: ' + error.message);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Email Sign-In
  function LoginWithPassword() {
    setLoading(true);
    setError(null); // Reset error state before starting the login process

    signInWithEmailAndPassword(firebaseAuth, form.email, form.password)
      .then((userCredential) => {
        setLoggedIn(true);
        const userId = userCredential.user.uid;
        console.log('Login successful!');
        // Fetch user data or perform additional actions here if needed
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError('Login failed: ' + error.message);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
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
      onClick={(e) => {
        e.stopPropagation();
        setShowAuthModal(false);
      }}
      className="flex absolute top-0 left-0 items-center justify-center w-full min-h-screen backdrop-blur-sm"
    >
      {authType === 'login' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            LoginWithPassword();
          }}
          className="rounded-lg border backdrop-blur-3xl bg-white/[.7] bg-card text-card-foreground shadow-sm w-[90%] max-w-md p-6 space-y-4"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-center">
              <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
              <h5 
                onClick={(e) =>{
                  e.stopPropagation()
                  setAuthType('signup')
                } 
              }
                className="text-xs cursor-pointer underline"
              >
                Sign up instead
              </h5>
            </div>
            <p className="text-xs text-muted-foreground">Enter your credentials to access your account.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="m@example.com"
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <span className="block text-xs underline pt-2">
              Forgot password
            </span>
          </div>
          <div className="flex flex-col space-y-3 items-center p-6">
            {loading ? (
              <Button loading type="success" >Sign up</Button>
            ) : (
              <button 
                type="submit"
                className="inline-flex bg-teal-700 text-white font-bold items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Login
              </button>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SignupWithEmail();
          }}
          className="rounded-lg border backdrop-blur-3xl bg-white/[.7] bg-card text-card-foreground shadow-sm w-full max-w-md p-6 space-y-4"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-center">
              <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Sign Up</h3>
              <button 
                onClick={() => setAuthType('login')}
                className="text-xs cursor-pointer underline"
              >
                Log in instead
              </button>
            </div>
            <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="m@example.com"
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="newPassword"
              >
                Confirm Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3 items-center p-6">
            {loading ? (
              <Button loading type="success" >Sign up</Button>
            ) : (
              <button 
                type="submit"
                className="inline-flex bg-teal-700 text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Sign up
              </button>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </form>
      )}
    </div>
  );
}
