"use client"

import { useState } from "react"
import Link from "next/link";
import { useAuth } from "@/lib/shared/contexts/SignupContext"


export default function Component() {

  const { form } = useAuth()
  const currentEmoji = form.currentEmoji
  return (
    <div className="w-full max-w-md mx-auto p-4 text-black ">
      <div className="text-xl font-bold text-center mb-4">Favourites</div>
      <span className="flex items-center justify-between" >
      </span>
      <section className="pt-8" >
        <p className="text-center italic" >coming soon🙂...</p>
        {/* <p className="text-sm text-center" >Not a single thing here.<br/> Like a hack to see them here.</p> */}
      </section>
    </div>
  )
}
