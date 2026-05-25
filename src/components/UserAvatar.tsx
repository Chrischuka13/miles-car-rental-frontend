import { useAuth } from "@/hooks/useAuth"
import { useState } from "react";

export default function UserAvatar() {
  const {user, handleLogout} = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <div>
      <span className="text-xl border text-whit bg-amber-600 rounded-full p-1">
        {`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}
      </span>
                {isOpen && (
                  <div className=" bg-white text-[#0A0A0A] text-start md:h-full">
                    <div className="w-11/12 container mx-auto py-4">
                      <h6 className="mb-4">Discover</h6>
      
                      <div className="">
                        {user? (
                          <div className="flex justify-between">
                            <div className="bg-DarkBlue p-2 text-white rounded-lg max-w-30">{user.firstName}</div>
                            <button onClick={handleLogout} className="text-white rounded-lg max-w-30 p-2 bg-red-800">Sign Out</button>
                          </div>
                          
                        ):(
                          <div>
      

                          </div>
                        )}
      
                      </div>
      
                      {/* <div className="lg:hidden flex items-center mt-10 gap-4 hover:cursor-pointer"><img className="w-10 rounded-full " alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/><p>Bright Ekpan</p></div> */}
                    </div>
                  </div>
                )} 
      </div>
    </main>
  )
}
