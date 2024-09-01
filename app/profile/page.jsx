"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/shared/contexts/SignupContext"

const EMOJI_OPTIONS = ["😊", "😎", "🤓", "🧐", "🤠", "👨‍💻", "👩‍💻", "🦄", "🐱", "🐶"]

export default function Component() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const {form, setForm} = useAuth();
  const emoji = form.currentEmoji;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Profile updated:", { name, email, password, emoji })
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 ">
      <div className="text-xl font-bold text-center mb-4">Edit Profile</div>
      <Link href='..'
      className="text-sm px-4 py-2 border rounded-full bg-zinc-100" >back</Link>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 py-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">{emoji}</div>
            <div className="flex flex-wrap justify-center gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setForm({...form, currentEmoji: e })}
                  className="text-2xl p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">Save Changes</button>
        </div>
      </form>
    </div>
  )
}
