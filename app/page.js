
export default function App() {
  return(
        <div className="w-[90%] md:w-[50%] mx-auto min-h-screen " >
            <nav className="flex justify-between items-center pt-8" >
                <h4 className=" font-bold " >hacksbazaar</h4>
                <ul className="" >
                    <li className="text-sm" >signup/logout</li>
                </ul>
            </nav>
           
            <div className="flex justify-center gap-2 my-10 w-[600px] mx-auto" >
              <span className="border flex items-center justify-center rounded-sm aspect-square h-[36px] text-2xl " >🤵🏼</span>
              
              <span className="min-w-[90%] md:w-md">
                  <textarea
                  placeholder="got that hack? pour it here." 
                  className="h-32 w- bg-gray-50 w-full rounded-md p-2 border   resize-none" 
                  />
                  <button className="mr-auto bg-blue-300 text-white text-sm font-semibold shadow-xl shadow-gray-200 rounded-md w-[80px] h-[40px] " >post!</button>
              </span>
            </div>

            <div className="flex flex-col space-y-6 border-t pt-10 " >
            
            <div className="flex flex-col space-y-3 border rounded-md p-3 w-[90%] max-w-[500px] mx-auto" >
                    <span className="flex justify-between" >
                    <span className="flex gap-3 items-center" >
                        <span className="" >🤵🏼</span>
                        <span className="text-sm" >duncan</span>
                    </span>
                        <span className="text-sm" >4d</span>
                    </span>
                    <span className="ml-7" >take this from me: never push on fridays.</span>
                    <span className="ml-7" >❤</span>
                </div>
              </div>
        </div>
  )
}
                    // <ul className="flex justify-center space-x-3" >
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >for you</li>
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >tech</li>
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >react.js</li>
                    //     <li className="border px-3 py-1 rounded-full text-sm text-zinc-500" >filming</li>
                    // </ul>