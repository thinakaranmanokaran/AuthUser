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
        <div className='absolute top-4 right-4 z-50' >
            {
                currentUser ? (
                    <div key={currentUser._id}  className=' ' >
                        <h1 onClick={showProfile} className='  mb-2 bg-white hover:bg-opacity-20 w-10 h-10 cursor-pointer flex justify-center items-center transition-all duration-300   rounded-full bg-opacity-10 backdrop-blur-lg ' >
                            {/* <img src={Skull} className='w-12 h-12 rounded-full bg-black p-2' alt="" srcset="" /> */}
                            <div className='text-2xl text-white font-upper leading-none pt-1   ' >{currentUser.name.charAt(0).toUpperCase()}</div>
                        </h1>
                        { userProfile && <UserDetails currentUser={currentUser} /> }
                    </div>
                ) : (<h1 className='text-white'></h1>)
            }
        </div>
    </div>
  )
}

export default UserProfile