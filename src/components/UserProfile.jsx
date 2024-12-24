import React, { useState } from 'react'
import axios from 'axios';
import Skull from './../assets/images/skullemoji.jpg'


const UserProfile = ({ currentUser }) => {

    const [userProfile, setUserProfile] = useState(false);

    function showProfile() {
        setUserProfile(!userProfile);
    }

    const UserDetails = ({ currentUser }) => {
        return(
            <div>
                <div className='bg-white transition-opacity duration-300 p-2 px-3 rounded-lg text-sm font-para text-white backdrop-blur-lg bg-opacity-10 absolute right-0 ' >
                    <div>
                        {currentUser.name}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div>
        <div className={`absolute top-4   right-4 z-50 w-40 flex flex-col  transition-all duration-300 rounded-2xl   ${userProfile ? "bg-white p-4  top-4 -translate-x-10 translate-y-4 items-center  shadow-md "  : "bg-transparent items-end" }`} >
            {
                currentUser ? (
                    <div key={currentUser._id}  className={`  flex flex-col items-center  ` } >
                        <h1 onClick={showProfile} className={`mb-2 bg-white hover:bg-opacity-20 w-10 h-10 cursor-pointer flex justify-center items-center transition-all duration-500   rounded-full bg-opacity-10 backdrop-blur-lg ${userProfile ? "  scale-125 bg-purple-600 bg-opacity-100 shadow-md hover:saturate-150 hover:bg-opacity-100 " : "translate-x-0" } `} >
                            <div className={`text-2xl text-white font-upper leading-none pt-1 `} >{currentUser.name.charAt(0).toUpperCase()}</div>
                        </h1>
                        { userProfile && 
                            <div>
                                <div>
                                    <h1 className='w-full font-sftitle text-xl text-black ' >{currentUser.name}</h1>
                                    <p className='font-aileron text-sm text-center text-gray-700 opacity-80 ' >{currentUser.email}</p>
                                </div>
                            </div>
                        }
                    </div>
                ) : (<h1 className='text-white'></h1>)
            }
        </div>
    </div>
  )
}

export default UserProfile