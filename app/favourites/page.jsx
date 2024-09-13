"use client"

import { useState } from "react"
import Link from "next/link";
import { useAuth } from "@/lib/shared/contexts/SignupContext"


export default function Component() {

  const { form } = useAuth()
  const currentEmoji = form.currentEmoji
  return (
    <div className="w-full max-w-md mx-auto p-4 ">
      <div className="text-xl font-bold text-center mb-4">Favourites❤</div>
      <span className="flex items-center justify-between" >
      <Link href='..' className="text-xs border rounded px-2 py-1 " >Back</Link>
      <Link href='/profile' className="text-lg border rounded px-2 py-1 " >{currentEmoji}</Link>
      </span>
      <section className="pt-8" >
        <p className="text-sm text-center" >No favourite here.<br/> Like a hack to see them here.</p>
      </section>
    </div>
  )
}
