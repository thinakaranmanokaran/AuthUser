import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';
import './../App.css'
import MonkeyFace from './../assets/images/monkey.gif'
import MonkeyPass from './../assets/images/monkey_pwd.gif'
import MonkeyLeft from './../assets/images/left_hands(1)(1).png'
import MonkeyRight from './../assets/images/right_hand(1)(1).png'

import axios from 'axios';
import OTPform from './OTPform';

function Register({ addUser, togglePage }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const API_URL = "https://authback-jxx5.onrender.com";


    const [emailExists, setEmailExists] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState("");

    // Email validation regex
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const checkEmailExists = async (email) => {
        if (!isValidEmail(email)) {
            setRegisterError('Invalid email format');
            return;
        }

        try {
            const response = await axios.get(
                `https://authback-jxx5.onrender.com/api/users/check-email?email=${email}`
            );
            if (response.data.exists) {
                setRegisterError("User already exists");
            } else {
                setRegisterError('Valid Email'); // Clear error if email doesn't exist
            }
        } catch (error) {
            console.error("Error checking email:", error);
            setRegisterError("Error checking email. Try again.");
        }
    };



    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'email') {
            checkEmailExists(value); // Check email real-time
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_URL}/api/users/register`, formData);
            // localStorage.setItem('authToken', data.token);
            // setFormData({ name: '', email: '', password: '' });
            // alert(`Welcome, ${data.user}! Registration successful.`);
            setShowOTP(true);
        } catch (error) {
            setRegisterError(error.response?.data?.message || "Registration failed");
            console.log(error);
            
        }
    };
    
    
    // const toggleOTPPage = () => setShowOTP(!showOTP);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // alert('You are already authenticated!');
        }
    }, []);
    

    const [showOTP, setShowOTP ] = useState(false);
    
    function togglePage() {
        setShowOTP(!showOTP);
    }
    

    const [isFocused, setIsFocused] = useState(false);

    const Monkey = ({ className }) => {
        return (
            <div className={`flex flex-col items-center mt-4 h-40   overflow-hidden ${className}`} >
                <img src={MonkeyFace} className={`md:w-40 w-32 transition-all duration-300 ${isFocused ? " hidden " : "block"} `} alt="" srcset="" />
                <img src={MonkeyPass} className={`md:w-40 w-32 transition-all duration-300 ${isFocused ? " block " : "hidden"} `} alt="" srcset="" />
                <div className={`flex hands transition-all duration-300 ${isFocused ? "focused" : ""}`} >
                    <img src={MonkeyLeft} className='md:w-20 w-16 left transition-all duration-300 ' alt="" srcset="" />
                    <img src={MonkeyRight} className={`md:w-20 w-16 right transition-all duration-300 ${showPassword ? "translate-y-10 transition-all duration-300" : ""}  `} alt="" srcset="" />
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className='bg-[#ffffff10] border-[#ffffff20] backdrop-blur-xl border-2 overflow-y-hidden flex flex-col w-full  items-center h-[70vh] p-6  rounded-[40px] '  >
            <h1 className='font-upper w-full text-lg md:text-2xl text-white ' >Register</h1>
            <div className={`md:flex w-full  justify-between transition-all duration-500 ${showOTP ? "-mt-[70vh]" : "ml-0" } `} >
                <Monkey className={`block md:hidden`} />
                <div className='flex -translate-y-16 md:translate-y-0 flex-col space-y-4 mt-10 w-full max-w-2/4 font-sftext text-sm pl-4 h-full' >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        onFocus={() => setIsFocused(false)}
                        className=' border-b-[1px]  bg-transparent text-white  focus:border-[#D8D8D8]  focus:outline-none placeholder:text-white border-[#B2B8A3] w-full h-8  pl-3   '
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        onFocus={() => setIsFocused(false)}
                        className=' border-b-[1px]  bg-transparent text-white  focus:border-[#D8D8D8]  focus:outline-none placeholder:text-white border-[#B2B8A3] w-full h-8  pl-3   '
                    />

                    {registerError && (
                        <div className='relative w-full flex justify-end'>
                            <div className={`-top-2 text-white p-0.5 px-2 rounded-md ${ registerError === "Valid Email" ? "bg-green-400" : "bg-red-500" }  text-end text-xs -mb-2 absolute`}>
                                {registerError}
                            </div>
                        </div>
                    )}

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        onFocus={() => setIsFocused(true)}
                        className=' border-b-[1px] password  bg-transparent text-white  focus:border-[#D8D8D8]  focus:outline-none placeholder:text-white border-[#B2B8A3] w-full h-8  pl-3   '
                    />
                    <label className="flex items-center justify-end text-white text-sm cursor-pointer select-none ">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-1 peer cursor-pointer hidden "
                        />
                        <div className="w-8 bg-[#ffffff40] transition-all duration-300 peer-checked:bg-white h-5 mr-1.5  rounded-full " ></div>
                        <div className='w-4 h-4 bg-white transition-all duration-300 shadow-md peer-checked:bg-[#6EACDA]  rounded-full absolute -translate-x-[129px]   peer-checked:-translate-x-[117px]  ' ></div>
                        Show Password
                    </label>
                    <button type="submit" className={`bg-[#6EACDA] text-white shadow-md translate-y-3 h-10 rounded-xl scale-100 hover:scale-95 transition-all duration-300 disabled:cursor-not-allowed   `} disabled={registerError !== "Valid Email"}  >Submit</button>

                </div>
                <div>
                    <div className='w-full hidden md:block max-w-2/4 px-7 pt-4' >
                        <h1 className='text-white font-upper text-2xl ' >Unlock Creativity</h1>
                        <p className='text-white font-para text-md opacity-80 ' >Welcome back, trailblazer! Every login is a step toward unlocking your creative journey. Let’s build something remarkable together.</p>
                        <Monkey />
                    </div>
                </div>
                <div className=" top-1/2 -translate-y-1/2 bg-white bg-opacity-10 p-1 h-fit rounded-full space-y-1 absolute right-2 " >
                    <div className={`bg-white w-2 transition-all duration-300 cursor-pointer ${showOTP ? "h-2 bg-opacity-60" : "h-4 bg-opacity-100"}  rounded-full`} onClick={togglePage} ></div>
                    <div className={`bg-white w-2 transition-all duration-300 cursor-pointer ${showOTP ? "h-4 bg-opacity-100" : "h-2 bg-opacity-60"}  rounded-full`} onClick={togglePage} ></div>
                </div>
            </div>
            <div>
                <OTPform togglePage={togglePage} email={formData.email} />
            </div>
        </form>
    );
}

export default Register;
