import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate} from "react-router-dom"
import { assets } from "../assets/assets"
import { useAppContext } from "../context/useAppContext"
import toast from 'react-hot-toast' // FIX: You need to import toast here to use it.

const Navbar =() => {
    const [open, setOpen] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false); // Add this state
    // FIX: Change 'User' to 'user' to correctly destructure the state from context
    const {user, setUser, setShowUserLogin, searchQuery, setSearchQuery, getCartCount, axios} = useAppContext();
    const navigate = useNavigate();

    const logout = async ()=>{
        try{
            const{ data } = await axios.get('/api/user/logout')
            if(data.success){
                toast.success(data.message)
                setUser(null);
                navigate('/')
                setShowProfileMenu(false); // Hide menu after logout
            } else{
                toast.error(data.message)
            }
        } catch(error){ // FIX: Correctly placed and using toast.error
            console.error("Logout error:", error);
            toast.error(error.message);
        }
    }
    

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate("/AllProducts")
        }
    }, [searchQuery, navigate])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to ='/'>
               <img className="h-9" src={assets.logo} alt="logo"/>
            </NavLink>
                
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to ='/'>Home</NavLink>
                <NavLink to ='/AllProducts'>AllProducts</NavLink>
                <NavLink to ='/'>Contact</NavLink>
                
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e)=> setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                        value={searchQuery}
                    />
                    <img src = {assets.search_icon} alt='search' className='w-4 h-4'/>
                </div>

                <div onClick={()=> navigate("/cart")}className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-orange-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                {!user? (
                    <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-orange-300 hover:bg-orange-500 transition text-white rounded-full">
                    Login
                </button>
                ) : (
                  <div className='relative'>
                    <img 
                      src={assets.profile_icon} 
                      className='w-8 h-8 rounded-full cursor-pointer'
                      alt="" 
                      onClick={() => setShowProfileMenu(!showProfileMenu)} // Toggle state on click
                    />
                    {/* Conditionally render the menu based on state */}
                    {showProfileMenu && (
                        <ul className='absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-auto h-auto rounded-md text-sm z-40'>
                          <li onClick={()=> {navigate("/myorders"); setShowProfileMenu(false);}} className="p-1.5 pl-3 hover:bg-orange-100 cursor-pointer">MyOrders</li>
                          <li onClick={logout} className="p-1.5 pl-3 hover:bg-orange-100 cursor-pointer">Logout</li>
                        </ul>
                    )}
                  </div>
                )}
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={()=> navigate("/cart")}className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-orange-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
            </div>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="">
                <img src={assets.menu_icon} alt='menu' />
            </button>
            
            {open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/"onClick={()=>setOpen(false)}>Home</NavLink>
                <NavLink to="/AllProducts"onClick={()=>setOpen(false)}>All Product</NavLink>
                {/* FIX: Change 'User' to 'user' in the mobile menu */}
                {user &&
                <NavLink to="/"onClick={()=>setOpen(false)}>My Orders</NavLink>
                  }
              <NavLink to="/"onClick={()=>setOpen(false)}>Contact</NavLink>
                
              {!user? (
                    <button onClick={()=>{
                        setOpen(false);
                         setShowUserLogin(true);
                    }} className="cursor-pointer px-8 py-2 bg-orange-300 hover:bg-orange-500 transition text-black rounded-full">
                    Login
                </button>
                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-orange-300 hover:bg-orange-500 transition text-white rounded-full text-sm">
                    Logout
                </button>
                )}
                </div>
)}
</nav>
 )
}
export default Navbar;