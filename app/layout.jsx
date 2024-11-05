import React from 'react';
import Link from 'next/link';
import { Newspaper, Heart, UserRound } from 'lucide-react';
import ComingSoonTag from '@/components/ComingSoonTag'
import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/shared/contexts/SignupContext";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const navsData = [
      {
          title: "home",
          link: "/",
          icon: "Home",
          released: true,
      },
      {
          title: "favourites",
          link: "/favourites",
          icon: "Heart",
          released: false,
      },
      {
          title: "profile",
          link: "/profile",
          icon: "UserRound",
          released: true,
      },
  ]

  return (
    <html lang="en">
        <body className={manrope.className}>
            <AuthProvider >
                        <span className="fixed left-0 bottom-[5svw] flex items-center justify-center w-screen" >
                            <nav className="flex justify-between space-x-8 bg-zinc-200 shadow px-8 md:px-12 py-2 rounded-full " >
                                {navsData.map((nav) => (
                                    <Link 
                                        key={nav.title}
                                        href={nav.released ? nav.link : '/'} 
                                        className='flex flex-col items-center justify-center relative gap-1'>
                                        {nav.icon === 'Home' ? <Newspaper size='16' stroke-width='1.4' /> : nav.icon === 'Heart' ? <Heart size='18' stroke-width='1.5' /> : nav.icon === 'UserRound' ? <UserRound size='16' stroke-width='1.5' /> : null}
                                        <span className="text-[11px] ">{nav.title}</span>
                                        {!nav.released &&  <ComingSoonTag />}
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
