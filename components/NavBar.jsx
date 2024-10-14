import React from 'react';
import Link from 'next/link';
import { Home, Heart, UserRound } from 'lucide-react';
import ComingSoonTag from '@/components/ComingSoonTag'

export default function Navbar() {

    const navsData = [
        {
            title: "Home",
            link: "/",
            icon: "Home",
            released: true,
        },
        {
            title: "Favourites",
            link: "/favourites",
            icon: "Heart",
            released: false,
        },
        {
            title: "Profile",
            link: "/profile",
            icon: "UserRound",
            released: true,
        },
    ]
    return(
        <span className="absolute left-0 bottom-[5svw] flex items-center justify-center w-screen" >
            <nav className="flex justify-between space-x-8 bg-zinc-200 shadow px-8 py-2 rounded-full " >
                {navsData.map((nav) => (
                    <Link href={nav.released ? nav.link : '/'} 
                        className='flex flex-col items-center justify-center relative gap-1'>
                        {nav.icon === 'Home' ? <Home size='22' stroke-width='1.5' /> : nav.icon === 'Heart' ? <Heart size='22' stroke-width='1.5' /> : nav.icon === 'UserRound' ? <UserRound size='22' stroke-width='1.5' /> : null}
                        <span className="text-[12px] ">{nav.title}</span>
                        {!nav.released &&  <ComingSoonTag />}
                    </Link>
                    ))}
            </nav>
        </span>
    )
}