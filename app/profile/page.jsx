"use client";

import { useState, useEffect } from 'react';
import { Avatar, Button, Card, Divider, Text, Spacer, Image, Grid, Link } from '@geist-ui/core';
import { MessageCircle, Repeat, Heart, Share, Briefcase } from '@geist-ui/icons';
import { useAuth } from '@/lib/shared/contexts/SignupContext';
import EditProfile from '@/components/EditProfile';
import { AtSign } from 'lucide-react';
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from '@/lib/shared/firebase'

export default function ProfilePage() {
  const { form, setForm } = useAuth(); // Assuming `setForm` is available to update the form state
  const [hacks, setHacks] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    const db = getDatabase();

    const fetchUserData = (userId) => {
      const userRef = ref(db, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Update the form with the data from Firebase
          setForm(data);
        }
      });
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, fetch the user's data
        fetchUserData(user.uid);
      } else {
        console.log("No user is signed in");
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [setForm]);

  const user = {
    name: form.fullName ?? '',
    userName: form.userName ?? '',
    bio: form.bio ?? '',
    userEmoji: form.currentEmoji,
    stats: {
      posts: 2,
    },
  };

  const { userEmoji, name, userName, bio, stats } = user;

  return (
    <div className="max-w-2xl text-black mx-auto p-4">
      <div className="relative">
        <span className=" border rounded p-1 transform translate-y-2/3 text-2xl">{userEmoji}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline space-x-1">
            <Text h1 className="text-lg font-bold">{name}</Text>
            <div className='flex'>
              <AtSign color="gray" size={12} inline w={.35} />
              <Text type="secondary" className="text-gray-500 text-xs">{userName}</Text>
            </div>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className='flex items-center justify-center text-xs p-2 rounded-full border'
          >
            Edit profile
          </button>
        </div>
        <Text className="mt-2 text-sm">{bio}</Text>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span>{stats.posts} hacks</span>
        </div>
      </div>
      <Spacer y={2} />
      <Divider />
      <Text h2 className="text-sm font-semibold mb-4">Your Hacks</Text>
      <div className="flex flex-col mx-auto space-y-6 border-t pt-10 w-[90%] md:w-[540px]">
        {hacks.length > 0 ? (
          hacks.slice().reverse().map(hack => (
            <div
              key={hack.id}
              className="flex flex-col mx-auto min-w-[90%] md:min-w-[540px] space-y-3 border rounded-md p-3 md:w-md"
            >
              <span className="flex justify-between">
                <span className="flex gap-3 items-center">
                  <span>{userEmoji}</span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{hack.username}</span>
                    <span className="text-xs text-zinc-700">{hack.job}</span>
                  </span>
                </span>
                <span className="text-[10px]">{getTimeAgo(hack.postedAt)}</span>
              </span>
              <span className="text-sm ml-7">{hack.hackmessage}</span>
              <span className="flex items-center space-x-4 ml-7">
                <span className="flex text-xs gap-1">
                  <ThumbsUp
                    onClick={() => handleUpvote(hack.id, hack.upvotes, hack.votedUsers)}
                    className="cursor-pointer"
                    size='16'
                    strokeWidth='1.5'
                  />
                </span>
                <span className="text-sm">{hack.upvotes > 0 ? hack.upvotes : ''}</span>
                <span className="flex text-xs gap-1">
                  <ThumbsDown
                    onClick={() => handleDownvote(hack.id, hack.upvotes, hack.votedUsers)}
                    className="cursor-pointer"
                    size='16'
                    strokeWidth='1.5'
                  />
                </span>
                <span className="flex justify-end text-[12px] w-full">
                  <Heart className='' size='16' strokeWidth='1.5' />
                </span>
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-4 text-center text-gray-500"></div>
        )}
      </div>
      {showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} />}
    </div>
  );
}
