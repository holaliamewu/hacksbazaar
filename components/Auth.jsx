'use client';

import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { firebaseAuth } from "@/lib/shared/firebase";
import { getDatabase, ref, set } from "firebase/database";
import { Button } from '@geist-ui/core';
import { AlertTriangle } from "lucide-react";

export default function AuthForm() {
  const [authType, setAuthType] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { form, setForm, setShowAuthModal, setLoggedIn, setShowStartingAuthModal } = useAuth();
  const db = getDatabase();

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setLoading(false); 

      if (user) {
        setLoggedIn(true);
        setForm((prevForm) => ({
          ...prevForm,
          email: user.email,   // Set email from the user object
          userId: user.uid     // Capture the userId from the authenticated user
        }));
        setShowStartingAuthModal(false);
      } else {
        setLoggedIn(false);
        setShowStartingAuthModal(true);
      }
    });

    return () => unsubscribe();
  }, [setForm, setLoggedIn, setShowStartingAuthModal]);

  // Store data to database
  function storeDataToDB(userId) {
    const { fullName, userName, email, currentEmoji, profilePhoto } = form;
    set(ref(db, 'users/' + userId), {
      fullName,
      userName,
      email,
      currentEmoji,
      profilePhoto,
      userId,
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
        const userId = userCredential.user.uid; // Get the userId from Firebase after sign-up

        // Update the form data with the new user's id
        setForm((prevForm) => ({
          ...prevForm,
          userId
        }));

        // Store user data to the database
        storeDataToDB(userId);
        setLoggedIn(true);
        setShowAuthModal(false);
        console.log('Signup successful!');
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError(error.code);
        setErrorMessage(
          error.code === 'auth/email-already-in-use'
            ? "Account with this email exists already."
            : error.code === "auth/invalid-email"
            ? "Email format is wrong."
            : error.code === "auth/weak-password"
            ? "Create a stronger password. A two-year old can guess this. lol."
            : error.code === "auth/too-many-requests"
            ? "Our systems are under pressure. Try again after some time."
            : null
        );
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
        const userId = userCredential.user.uid; // Get the userId from Firebase after sign-in

        // Update the form data with the logged-in user's id
        setForm((prevForm) => ({
          ...prevForm,
          userId,
          email: userCredential.user.email
        }));

        setLoggedIn(true);
        console.log('Login successful!');
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError(error.code);
        setErrorMessage(
          error.code === "auth/user-not-found"
            ? "There's no account associated with this credentials."
            : error.code === "auth/wrong-password"
            ? "Password is wrong."
            : error.code === "auth/invalid-email"
            ? "Email format is wrong"
            : null
        );
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
        onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            LoginWithPassword();
          }}
          className="rounded-lg border bg-white bg-card text-card-foreground shadow-sm w-[90%] max-w-md p-6 space-y-4"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-center">
              <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
              <h5 
                onClick={(e) =>{
                  e.stopPropagation();
                  setAuthType('signup');
                }}
                className="text-xs cursor-pointer underline"
              >
                Sign up instead
              </h5>
            </div>
            <p className="text-xs text-muted-foreground">Enter your credentials to access your account.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">
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
              {error && <p className=""><AlertTriangle /> {errorMessage}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">
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
              {error && <p className=""><AlertTriangle /> {errorMessage}</p>}
            </div>
            <span className="block text-xs underline pt-2">
              Forgot password
            </span>
          </div>
          <div className="flex flex-col space-y-3 items-center p-6">
            {loading ? (
              <Button loading type="success">Log in</Button>
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
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            SignupWithEmail();
          }}
          className="rounded-lg border bg-white bg-card text-card-foreground shadow-sm w-full max-w-md p-6 space-y-4"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-center">
              <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Sign Up</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setAuthType('login');
                }}
                className="text-xs cursor-pointer underline"
              >
                Log in instead
              </button>
            </div>
            <p className="text-sm text-muted-foreground">Enter your details to create an account.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="userName">
                Username
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">
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
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
              />
              {error && <p className=""><AlertTriangle /> {errorMessage}</p>}
            </div>
          </div>
          <div className="flex flex-col space-y-3 items-center p-6">
            {loading ? (
              <Button loading type="success">Sign Up</Button>
            ) : (
              <button 
                type="submit"
                className="inline-flex bg-teal-700 text-white font-bold items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Sign Up
              </button>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </form>
      )}
    </div>
  );
}
