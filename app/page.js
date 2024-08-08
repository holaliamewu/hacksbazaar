import Hacks from "@/components/Hacks"
import NavBar from "@/components/NavBar"

export default function App() {

  return(
        <div className="w-[90%] md:w-[50%] mx-auto min-h-screen " >
           <NavBar />
            <Hacks />
        </div>
  )
}
                    // <ul className="flex justify-center space-x-3" >
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >for you</li>
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >tech</li>
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >react.js</li>
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >filming</li>
                    // </ul>