import React, { useRef, useState } from "react";
// import togglePage  from "./Register"

const OTPform = ({ togglePage, email }) => {
    const inputsRef = useRef([]);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < 4) {
            inputsRef.current[index + 1]?.focus();
        } else if (value.length === 0 && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const data = e.clipboardData.getData("text").slice(0, 5);
        data.split("").forEach((char, index) => {
            if (inputsRef.current[index]) {
                inputsRef.current[index].value = char;
                if (index < 4) inputsRef.current[index + 1]?.focus();
            }
        });
        e.preventDefault();
    };

    // const email = "inputemail@gmail.com"

    return (
        <div className="flex flex-col justify-center items-center h-full mt-28  ">
            <div className="flex flex-col items-center w-full max-w-80 text-center text-sm" >
                <h3 className="text-white font-upper text-2xl " >Email Verification</h3>
                <h6 className="text-gray-300 font-para  " >Enter the 5-digit verification code that was sent to your <span className="text-white underline " >{email}</span> Account.</h6>
            </div>
            <div className="flex gap-2 mt-4 ">
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center border border-[#ffffff70] backdrop-blur-lg rounded-md   bg-opacity-10 bg-white focus:scale-105 transition-all duration-300 text-white caret-transparent font-upper text-3xl focus:outline-none pt-2 "
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                        />
                    ))}
            </div>
            <div className="flex justify-between w-fit space-x-2 mt-4 items-center " >
                <button onClick={togglePage} className="bg-white text-black transition-all duration-300 cursor-pointer  font-para focus:outline-none hover:scale-105  focus:scale-90 rounded-lg shadow-lg  px-6 p-2 text-sm " >Edit Email</button>
                <button className="bg-[#6EACDA] text-white  transition-all duration-300 cursor-pointer font-para focus:outline-none hover:scale-105  focus:scale-90 rounded-lg shadow-lg  px-6 p-2 text-sm " >Verify</button>
            </div>
        </div>
    );
};

export default OTPform;
