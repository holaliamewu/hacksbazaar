import { useAuth } from "@/lib/shared/contexts/SignupContext";
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { ref, set, push, onValue, serverTimestamp, update } from "firebase/database";
import { database } from '@/lib/shared/firebase';
import { Spinner } from 'geist-ui/icons';

export default function Hacks() {
    const [hacks, setHacks] = useState([]);
    const [newHackMessage, setNewHackMessage] = useState('');
    const { setShowAuthModal, loggedIn, form } = useAuth();
    const username = form.fullName;
    const userEmoji = form.currentEmoji;
    const userId = form.userId; // Assuming you have a userId in the form
    const db = database; 

    // Fetch hacks from Firebase on component mount
    useEffect(() => {
        const hacksRef = ref(db, 'hacks');
        onValue(hacksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedHacks = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
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
                job: 'designer',
                image: "",
                postedAt: serverTimestamp(),
                hackmessage: newHackMessage,
                upvotes: 0,
                votedUsers: {}
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
        setNewHackMessage("")
    };

    const handleUpvote = (hackId, currentUpvotes, votedUsers) => {
        if (!userId || votedUsers[userId]) return; // User has already voted or userId is invalid

        const hackRef = ref(db, `hacks/${hackId}`);
        update(hackRef, {
            upvotes: currentUpvotes + 1,
            [`votedUsers/${userId}`]: 'upvoted'
        })
        .then(() => {
            console.log("Upvote updated in Firebase!");
        })
        .catch((error) => {
            console.error("Error updating upvote:", error);
        });

        setHacks(hacks.map(h => 
            h.id === hackId ? { ...h, upvotes: currentUpvotes + 1, votedUsers: { ...h.votedUsers, [userId]: 'upvoted' } } : h
        ));
    };

    const handleDownvote = (hackId, currentUpvotes, votedUsers) => {
        if (!userId || votedUsers[userId]) return; // User has already voted or userId is invalid

        const hackRef = ref(db, `hacks/${hackId}`);
        update(hackRef, {
            upvotes: currentUpvotes - 1,
            [`votedUsers/${userId}`]: 'downvoted'
        })
        .then(() => {
            console.log("Downvote updated in Firebase!");
        })
        .catch((error) => {
            console.error("Error updating downvote:", error);
        });

        setHacks(hacks.map(h => 
            h.id === hackId ? { ...h, upvotes: currentUpvotes - 1, votedUsers: { ...h.votedUsers, [userId]: 'downvoted' } } : h
        ));
    };

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const postedDate = new Date(timestamp);
        const secondsAgo = Math.floor((now - postedDate) / 1000);

        if (secondsAgo < 60) {
            return `${secondsAgo} sec${secondsAgo !== 1 ? 's' : ''} ago`;
        }

        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) {
            return `${minutesAgo} min${minutesAgo !== 1 ? 's' : ''} ago`;
        }

        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
            return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
        }

        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo < 30) {
            return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
        }

        const monthsAgo = Math.floor(daysAgo / 30);
        if (monthsAgo < 12) {
            return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
        }

        const yearsAgo = Math.floor(monthsAgo / 12);
        return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
    };

    return (
        <>
            <div className="flex justify-center relative w-[90%] md:w-md gap-2 my-10 w-[600px] mx-auto min-h-32 bg-gray-50 w-full rounded-md p-2 border">
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
                        className="absolute bottom-2 right-2 ml-auto bg-teal-700 text-white text-sm font-semibold shadow-xl shadow-gray-200 rounded-md w-[80px] h-[40px]">
                        post!
                    </button>
                </span>
            </div>
            <div className="flex flex-col space-y-6 border-t pt-10 ">
                {hacks.length > 0 ? (
                    hacks.slice().reverse().map(hack => (
                        <div 
                            key={hack.id}
                            className="flex flex-col space-y-3 border rounded-md p-3 md:w-md">
                            <span className="flex justify-between">
                                <span className="flex gap-3 items-center">
                                    <span>{userEmoji}</span>
                                    <span className="flex flex-col " >
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
                                    <span className="text-sm" >{hack.upvotes > 0 ? hack.upvotes : ''}</span>
                                <span className="flex text-xs gap-1">
                                    <ThumbsDown 
                                        onClick={() => handleDownvote(hack.id, hack.upvotes, hack.votedUsers)}
                                        className="cursor-pointer"
                                        size='16' 
                                        strokeWidth='1.5' 
                                    />
                                </span>
                                <span className="text-[12px]"><Heart size='16' strokeWidth='1.5' /></span>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center gap-4 text-center text-gray-500">
                        <Spinner />
                    </div>
                )}
            </div>
        </>
    );
}
