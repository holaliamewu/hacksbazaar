'use client'

import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { AuthenticateAnonymously, SignupWithEmail } from "@/lib/util";
import { BadgeAlert } from "lucide-react";
import { useState } from "react"

export default function Login() {

  const [ authType, setAuthType ] = useState('login');
  const { setShowAuthModal, setLoggedIn } = useAuth()

  // function displayAnonMessage() {
  //   setShowAnonMessage(true);
  //   setTimeout(() => {
  //     setShowAnonMessage(false);
  //   }, 5000); 
  // }
  

  return (
    <div className="flex absolute top-0 left-0 items-center justify-center w-full min-h-screen backdrop-blur-sm">
      {
        authType === 'login' ? (
          <div
            className="rounded-lg border backdrop-blur-3xl bg-white/[.7] bg-card text-card-foreground shadow-sm w-[90%] max-w-md p-6 space-y-4"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex justify-between items-center">
                <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
                <h5 
                  onClick={() => setAuthType('signup')}
                  className="text-sm underline"
                >
                  Sign up instead
                </h5>
              </div>
              <p className="text-xs text-muted-foreground">Enter your credentials to access your account.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required
                  type="password"
                />
              </div>
              <span 
                className="block text-xs underline pt-2" 
              >
                Forgot password
              </span>
            </div>
            <div className="flex flex-col space-y-3 items-center p-6">
              <button className="inline-flex bg-blue-300 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Login
              </button>
              <button 
              onClick={ () => {
                setShowAuthModal(false);
                setLoggedIn(true)
              } }
              className="inline-flex items-center justify-center border whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Keep me anonymous 👽
              </button>
            </div>
          </div>
        ) : (
          <div
          className="rounded-lg border backdrop-blur-3xl bg-white/[.7] bg-card text-card-foreground shadow-sm w-full max-w-md p-6 space-y-4"
          data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex justify-between items-center">
                <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Sign Up</h3>
                <h5 
                onClick={ () => { setAuthType('login')}}
                className="text-sm underline" >log in instead</h5>
              </div>
              <p className="text-sm text-muted-foreground">Enter your details to get started.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="full-name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
              <span className="flex items-center justify-between" >
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <BadgeAlert size='18' strokeWidth='1.5' />
              </span>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required
                  type="password"
                />
              </div>
              </div>
              <span className="flex w-[90%] max-w-md mx-auto text-xs " >By signing up, I accept with hacksbazaar&#39;s terms and conditions.</span>
            <div className="flex items-center p-6">
              <button 
              onClick={ () => {
                SignupWithEmail(loggedIn, setLoggedIn, setForm)
              }}
              className="inline-flex items-center justify-center bg-blue-300 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Sign Up
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}
