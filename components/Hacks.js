'use client'; 

import { Heart, ThumbsDown, ThumbsUp } from "lucide-react"
import { useState } from "react";


export default function Hacks() {

    const hacksData = [
        {
            username: "bro code",
            image: "",
            postedAt: "3m",
            hackmessage: "biggest hack in programming: if it works, don't touch it!",
            upvotes: 21, 
            downvotes: 5
        }
    ]

    const [ hacks, setHacks ] = useState(hacksData);
    const [ newHackMessage, setNewHackMessage ] = useState('')

    function storeHackToDB() {
        setHacks([
            {
                username: "bro code",
                image: "",
                postedAt: "1s",
                hackmessage: newHackMessage,
                upvotes: 0, 
                downvotes: 0
            },
            ...hacks
        ])

        setNewHackMessage('')
    }

    function handleChange(e) {
        setNewHackMessage(e.target.value)
    }

    return(
        <>
        <div className="flex justify-center gap-2 my-10 w-[600px] mx-auto" >
              <span className="border flex items-center justify-center rounded-sm aspect-square h-[36px] text-2xl " >🤵🏼</span>
              
              <span className="min-w-[90%] md:w-md">
                  <textarea
                  value={newHackMessage}
                  onChange={handleChange}
                  placeholder="got that hack? pour it here." 
                  className="h-32 w- bg-gray-50 w-full rounded-md p-2 border   resize-none" 
                  />
                  <button 
                  onClick={storeHackToDB}
                  className="mr-auto bg-blue-300 text-white text-sm font-semibold shadow-xl shadow-gray-200 rounded-md w-[80px] h-[40px] " >post!</button>
              </span>
            </div>
        <div className="flex flex-col space-y-6 border-t pt-10 " >
            
          { hacks.map(hack => (
                <div className="flex flex-col space-y-3 border rounded-md p-3 w-[90%] max-w-[500px] mx-auto" >
                    <span className="flex justify-between" >
                    <span className="flex gap-3 items-center" >
                        <span className="" >🤵🏼</span>
                        <span className="text-xs" >{hack.username}</span>
                    </span>
                        <span className="text-xs" >{hack.postedAt}</span>
                    </span>
                    <span className="text-sm ml-7" >{hack.hackmessage}</span>
                    <span className="flex items-center space-x-4 ml-7" >
                        <span className="flex text-[12px] gap-1" ><ThumbsUp size='16' strokeWidth='1.5' />{hack.upvotes > 0 ? hack.upvotes : ''}</span>
                        <span className="flex text-[12px] gap-1" ><ThumbsDown size='16' strokeWidth='1.5' />{hack.downvotes > 0 ? hack.downvotes : '' }</span>
                        <span className="text-[12px]" ><Heart size='16' strokeWidth='1.5' /></span>
                    </span>
                </div>
                
                )) 
                }
                </div>
                </>
    )
}