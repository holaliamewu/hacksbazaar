"use client";

import { useState, useEffect } from "react";
import { Divider, Text, Spacer } from "@geist-ui/core";
import { Heart } from "@geist-ui/icons";
import { useAuth } from "@/lib/shared/contexts/SignupContext";
import EditProfile from "@/components/EditProfile";
import { AtSign, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/shared/firebase";

export default function ProfilePage() {
  const { form, setForm } = useAuth();
  const [hacks, setHacks] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const fetchUserData = (userId) => {
      const userRef = ref(db, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setForm(data);
        }
      });
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe();
  }, [setForm]);

  useEffect(() => {
    const hacksRef = ref(db, "hacks");
    onValue(hacksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedHacks = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          votes: { upvotes: 0, users: {}, ...data[key].votes },
        }));
        setHacks(fetchedHacks);

        setMyPosts(fetchedHacks.filter((hack) => hack.userId === form.userId));
      } else {
        setHacks([]);
        setMyPosts([]);
      }
    });
  }, [form.userId]);

  const user = {
    name: form.fullName ?? "",
    userName: form.userName ?? "",
    bio: form.bio ?? "",
    userEmoji: form.currentEmoji,
  };

  return (
    <div className="max-w-2xl text-black mx-auto p-4">
      <div className="relative flex justify-between -mb-2">
        <span className="border rounded p-1 text-2xl">{user.userEmoji}</span>
        <button
          onClick={() => setShowEditProfile(true)}
          className="flex items-center justify-center text-xs px-2 py-1 rounded-full border"
        >
          Edit profile
        </button>
      </div>
      <div className="mt-4">
        <div className="flex flex-col">
          <Text h1 className="text-lg font-bold">{user.name}</Text>
          <div className="flex">
            <AtSign color="gray" size={12} />
            <Text type="secondary" className="text-gray-500 text-xs ml-1">
              {user.userName}
            </Text>
          </div>
        </div>
        <Text className="mt-2 text-sm">{user.bio}</Text>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Send size="12" strokeWidth={1.5} />
            {myPosts.length} {myPosts.length === 1 ? "hack" : "hacks"}
          </span>
        </div>
      </div>
      <Spacer y={2} />
      <Divider />
      <Text h2 className="text-sm font-semibold mb-4">Your hacks</Text>
      <div className="flex flex-col mx-auto space-y-6 border-t pt-10 w-[90%] md:w-[540px]">
        {hacks.length > 0 ? (
          hacks
            .slice()
            .reverse()
            .map((hack) => (
              <div
                key={hack.id}
                className="flex flex-col mx-auto min-w-[90%] md:min-w-[540px] space-y-3 border rounded-md p-3 md:w-md"
              >
                <span className="flex justify-between">
                  <span className="flex gap-3 items-center">
                    <span>{user.userEmoji}</span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold">{hack.username}</span>
                      <span className="text-xs text-zinc-700">{hack.job}</span>
                    </span>
                  </span>
                  <span className="text-[10px]">{hack.postedAt}</span>
                </span>
                <span className="text-sm ml-7">{hack.hackmessage}</span>
                <span className="flex items-center space-x-4 ml-7">
                  <span className="flex text-xs gap-1">
                    <ThumbsUp
                      className="cursor-pointer"
                      size="16"
                      strokeWidth="1.5"
                    />
                  </span>
                  <span className="text-sm">{hack.votes.upvotes || ""}</span>
                  <span className="flex text-xs gap-1">
                    <ThumbsDown
                      className="cursor-pointer"
                      size="16"
                      strokeWidth="1.5"
                    />
                  </span>
                  <span className="flex justify-end text-[12px] w-full">
                    <Heart className="" size="16" strokeWidth="1.5" />
                  </span>
                </span>
              </div>
            ))
        ) : (
          <div className="flex flex-col items-center gap-4 text-center text-gray-500">
            No hacks found
          </div>
        )}
      </div>
      {showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} />}
    </div>
  );
}
