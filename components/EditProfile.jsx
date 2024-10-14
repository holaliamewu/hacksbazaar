"use client"

import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, X } from "lucide-react";
import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { getDatabase, ref, update } from "firebase/database";

const EMOJI_OPTIONS = ["😊", "😎", "🤓", "🧐", "🤠", "👨‍💻", "👩‍💻", "🦄", "🐱", "🐶"];

export default function EditProfile({ setShowEditProfile }) {
  const { form, setForm } = useAuth(); // Access the form and update methods from context
  const [initialData, setInitialData] = useState({ ...form }); // To compare changes
  const db = getDatabase();

  // Store field values locally
  const [name, setName] = useState(form.fullName);
  const [email, setEmail] = useState(form.email);
  const [bio, setBio] = useState(form.bio || ""); // assuming bio field exists in Firebase
  const [emoji, setEmoji] = useState(form.currentEmoji);

  useEffect(() => {
    // Set initial values when component mounts
    setInitialData({
      fullName: name,
      email: email,
      bio: bio,
      currentEmoji: emoji,
    });
  }, [name, email, bio, emoji]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updates = {};
    const userId = form.userId;

    // Only update fields that have changed
    if (name !== initialData.fullName) {
      updates[`/users/${userId}/fullName`] = name;
    }
    if (email !== initialData.email) {
      updates[`/users/${userId}/email`] = email;
    }
    if (bio !== initialData.bio) {
      updates[`/users/${userId}/bio`] = bio;
    }
    if (emoji !== initialData.currentEmoji) {
      updates[`/users/${userId}/currentEmoji`] = emoji;
    }

    // If any updates are pending, update them in Firebase
    if (Object.keys(updates).length > 0) {
      try {
        await update(ref(db), updates);
        console.log("Profile successfully updated in Firebase!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("No changes detected.");
    }

    setShowEditProfile(false); // Close the profile editing modal
  };

  return (
    <div className="flex flex-col items-center justify-center absolute top-0 left-0 bg-white/30 backdrop-blur-sm w-full h-[100vh]">
      <div className="w-[80%] max-w-[500px] bg-white mx-auto p-4 text-black">
        <div className="text-xl font-bold text-center mb-4">Edit Profile</div>
        <X onClick={() => setShowEditProfile(false)} className="cursor-pointer" />
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-8">
            {/* Emoji Picker */}
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl">{emoji}</div>
              <div className="flex flex-wrap justify-center gap-2">
                {EMOJI_OPTIONS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className="text-2xl p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Name Input */}
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

            {/* Email Input */}
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

            {/* Bio Input */}
            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Your expertise"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 bg-teal-700 text-white rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
