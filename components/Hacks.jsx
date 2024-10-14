import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { Heart, ThumbsDown, ThumbsUp, Ellipsis } from "lucide-react";
import { useState, useEffect } from "react";
import { ref, set, push, onValue, serverTimestamp, update, runTransaction } from "firebase/database";
import { database } from '@/lib/shared/firebase';
import { getTimeAgo } from '@/lib/util';
import { Spinner } from '@geist-ui/core';

export default function Hacks() {
    const [hacks, setHacks] = useState([]);
    const [newHackMessage, setNewHackMessage] = useState('');
    const { setShowAuthModal, loggedIn, form } = useAuth();
    const username = form?.userName || "Anonymous"; // Fallback for username
    const name = form?.fullName || "Unknown";          // Fallback for name
    const userEmoji = form?.currentEmoji;
    const db = database; 
    let actionInProgress = false;

    // Fetch hacks from Firebase on component mount
    useEffect(() => {
        const hacksRef = ref(db, 'hacks');
        onValue(hacksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedHacks = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    votes: { upvotes: 0, users: {}, ...data[key].votes } // Ensure upvotes are initialized to 0 if undefined
                }));
                setHacks(fetchedHacks);
            } else {
                setHacks([]); 
            }
        });
    }, [db]);

    const storeHackToDB = () => {
        if (newHackMessage.length > 0 && loggedIn) {
            let newHack = {
                username: username, 
                name: name,
                image: "",
                postedAt: serverTimestamp(),
                hackmessage: newHackMessage,
                votes: { upvotes: 0, users: {} } // Initialize votes with upvotes set to 0
            };
            
            const newHackRef = push(ref(database, 'hacks'));
            set(newHackRef, newHack)
                .then(() => {
                    console.log("Hack saved to Firebase!", newHackRef.key);
                })
                .catch((error) => {
                    console.error("Error saving hack to Firebase:", error);
                });
        } else if (newHackMessage.length > 0 && !loggedIn) {
            setShowAuthModal(true);
        }
        setNewHackMessage("");
    };

    // Function to handle favouriting (liking) without counting total likes
    const handleFavorite = (hackId, votes) => {
        if (actionInProgress || !username) return;
        actionInProgress = true;

        const userFavorited = votes?.users?.[username]?.favorited ?? false;

        // Optimistic UI update for favoriting
        setHacks(hacks.map(h => 
            h.id === hackId ? { ...h, votes: { ...h.votes, users: { ...h.votes.users, [username]: { favorited: !userFavorited } } } } : h
        ));

        const hackRef = ref(db, `hacks/${hackId}/votes/users/${username}`);
        update(hackRef, { favorited: !userFavorited })
            .then(() => {
                console.log("Favourite updated!");
            })
            .catch((error) => {
                console.error("Error updating favourite:", error);
                // Revert optimistic update if error occurs
                setHacks(hacks.map(h => 
                    h.id === hackId ? { ...h, votes: { ...h.votes, users: { ...h.votes.users, [username]: { favorited: userFavorited } } } } : h
                ));
            })
            .finally(() => actionInProgress = false);
    };

    const handleUpvote = (hackId, votes) => {
        if (actionInProgress || !username || votes?.users?.[username]?.upvoted) return;
        actionInProgress = true;

        // Optimistic UI update for upvoting
        setHacks(hacks.map(h => 
            h.id === hackId ? { ...h, votes: { ...h.votes, upvotes: votes.upvotes + 1, users: { ...h.votes.users, [username]: { upvoted: true } } } } : h
        ));

        const hackRef = ref(db, `hacks/${hackId}/votes`);
        runTransaction(hackRef, (currentData) => {
            if (currentData) {
                currentData.upvotes += 1;
                if (!currentData.users) currentData.users = {};
                currentData.users[username] = { upvoted: true, favorited: currentData.users[username]?.favorited ?? false };
            }
            return currentData;
        })
        .then(() => {
            console.log("Upvote updated in Firebase!");
        })
        .catch((error) => {
            console.error("Error updating upvote:", error);
            // Revert optimistic update
            setHacks(hacks.map(h => 
                h.id === hackId ? { ...h.votes, upvotes: votes.upvotes, users: { ...h.votes.users, [username]: { upvoted: false } } } : h
            ));
        })
        .finally(() => actionInProgress = false);
    };

    const handleDownvote = (hackId, votes) => {
        if (actionInProgress || !username || votes?.users?.[username]?.upvoted === false) return;
        actionInProgress = true;

        // Optimistic UI update for downvoting
        setHacks(hacks.map(h => 
            h.id === hackId ? { ...h, votes: { ...h.votes, upvotes: votes.upvotes - 1, users: { ...h.votes.users, [username]: { upvoted: false } } } } : h
        ));

        const hackRef = ref(db, `hacks/${hackId}/votes`);
        runTransaction(hackRef, (currentData) => {
            if (currentData) {
                currentData.upvotes -= 1;
                if (!currentData.users) currentData.users = {};
                currentData.users[username] = { upvoted: false, favorited: currentData.users[username]?.favorited ?? false };
            }
            return currentData;
        })
        .then(() => {
            console.log("Downvote updated in Firebase!");
        })
        .catch((error) => {
            console.error("Error updating downvote:", error);
            // Revert optimistic update
            setHacks(hacks.map(h => 
                h.id === hackId ? { ...h.votes, upvotes: votes.upvotes, users: { ...h.votes.users, [username]: { upvoted: true } } } : h
            ));
        })
        .finally(() => actionInProgress = false);
    };

    return (
        <>
            <div className="flex justify-center relative w-[90%] md:w-[540px] gap-2 my-10 w-[600px] mx-auto min-h-32 bg-gray-50 w-full rounded-md p-2 border">
                <span className="border flex items-center justify-center rounded-sm aspect-square h-[36px] text-2xl">{userEmoji}</span>
                
                <span className="flex flex-col w-[90%] md:w-md">
                    <textarea
                        value={newHackMessage}
                        onChange={(e) => setNewHackMessage(e.target.value)}
                        placeholder="got that hack? pour it here." 
                        className="h-32 bg-gray-50 resize-none outline-none px-4" 
                    />
                    <button 
                        onClick={storeHackToDB}
                        className="absolute bottom-2 right-2 ml-auto bg-teal-700 text-white text-xs font-medium shadow-xl shadow-gray-200 rounded-full px-4 py-2">
                        post!
                    </button>
                </span>
            </div>
            <div className="flex flex-col mx-auto space-y-6 border-t pt-10 w-[90%] md:w-[540px] ">
                {hacks.length > 0 ? (
                    hacks.slice().reverse().map(hack => (
                        <div 
                            key={hack.id}
                            className="flex flex-col mx-auto min-w-[90%] md:min-w-[540px] space-y-3 border rounded-md p-3 md:w-md">
                            <span className="flex justify-between">
                                <span className="flex gap-3 items-center">
                                    <span>{userEmoji}</span>
                                    <span className="flex flex-col">
                                        <span className="text-sm font-semibold">{hack.name}</span>
                                        <span className="text-[10px]">{getTimeAgo(hack.postedAt)}</span>
                                    </span>
                                </span>
                                <Ellipsis size='16' strokeWidth='1.5' />
                            </span>
                            <span className="text-sm ml-7">
                                {hack.hackmessage}
                            </span>
                            <span className="flex gap-4 text-gray-600">
                                <span className="flex text-xs gap-1">
                                    <ThumbsUp 
                                        size='16' 
                                        strokeWidth='1.5' 
                                        className={`${hack.votes.users[username]?.upvoted ? "fill-teal-700" : ""}`}
                                        onClick={() => handleUpvote(hack.id, hack.votes)} 
                                    />
                                </span>
                                    <span className="text-sm">{hack.votes.upvotes}</span>
                                <span className="flex text-xs gap-1">
                                    <ThumbsDown
                                        size='16' 
                                        strokeWidth='1.5' 
                                        className={`${hack.votes.users[username]?.upvoted === false ? "fill-red-700" : ""}`}
                                        onClick={() => handleDownvote(hack.id, hack.votes)} 
                                    />
                                </span>
                                <span className="flex justify-end text-xs gap-1 w-full">
                                    <Heart 
                                        size='16' 
                                        strokeWidth='1.5' 
                                        className={`${hack.votes.users[username]?.favorited ? "fill-red-700" : ""}`}
                                        onClick={() => handleFavorite(hack.id, hack.votes)}
                                    />
                                </span>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex justify-center">
                        <Spinner size="large" />
                    </div>
                )}
            </div>
        </>
    );
}
