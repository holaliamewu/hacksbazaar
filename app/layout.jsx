'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Heart, UserRound } from 'lucide-react';
import ComingSoonTag from '@/components/ComingSoonTag';
import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/shared/contexts/SignupContext";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  const navsData = [
    {
      title: "home",
      link: "/",
      icon: "Home",
    },
    {
      title: "favourites",
      link: "/favourites",
      icon: "Heart",
    },
    {
      title: "profile",
      link: "/profile",
      icon: "UserRound",
    },
  ];

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/hacksbazaar-logo-short.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={manrope.className}>
        <AuthProvider>
          <span className="fixed left-0 bottom-[5svw] flex items-center justify-center w-screen">
            <nav className="flex justify-between space-x-8 bg-zinc-200 shadow px-8 md:px-12 py-2 rounded-full">
              {navsData.map((nav) => (
                <Link 
                  key={nav.title}
                  href={nav.link}
                  className="flex flex-col items-center justify-center relative gap-1"
                >
                  {nav.icon === 'Home' ? <Newspaper size='16' strokeWidth='1.4' /> : 
                   nav.icon === 'Heart' ? <Heart size='18' strokeWidth='1.5' /> : 
                   nav.icon === 'UserRound' ? <UserRound size='16' strokeWidth='1.5' /> : null}
                  <span 
                    className={`text-[11px] ${pathname === nav.link ? 'border-b-2 border-b-black' : ''}`}
                  >
                    {nav.title}
                  </span>
                </Link>
              ))}
            </nav>
          </span>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
