import React, { useRef, useState } from "react";
import axios from "axios";

const OTPform = ({ togglePage, email }) => {
    const inputsRef = useRef([]);
    const [otpError, setOtpError] = useState("");
    const API_URL = "https://authback-jxx5.onrender.com";

    // console.log(email);
    

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

    const handleVerify = async () => {
        const otp = inputsRef.current.map((input) => input.value).join("");
        if (otp.length !== 5) {
            setOtpError("Please enter a valid 5-digit OTP.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/auth/verify-otp`, {
                email,
                otp,
            });

            if (response.data.success) {
                alert("Verification successful! Your account is now active.");
                setOtpError("");
                togglePage(); // Navigate to another page or update the UI
            } else {
                setOtpError(response.data.message || "Invalid OTP. Try again.");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setOtpError(
                error.response?.data?.message || "Error verifying OTP. Please try again."
            );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full mt-28">
            <div className="flex flex-col items-center w-full max-w-80 text-center text-sm">
                <h3 className="text-white font-upper text-2xl">Email Verification</h3>
                <h6 className="text-gray-300 font-para">
                    Enter the 5-digit verification code that was sent to your{" "}
                    <span className="text-white underline">{email}</span> Account.
                </h6>
            </div>
            <div className="flex gap-2 mt-4">
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center border border-[#ffffff70] backdrop-blur-lg rounded-md bg-opacity-10 bg-white focus:scale-105 transition-all duration-300 text-white caret-transparent font-upper text-3xl focus:outline-none pt-2"
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                        />
                    ))}
            </div>
            {/* {otpError && <div className="text-red-500 text-sm mt-2">{otpError}</div>} */}
            <div className="flex justify-between w-fit space-x-2 mt-4 items-center">
                <button
                    onClick={togglePage}
                    className="bg-white text-black transition-all duration-300 cursor-pointer font-para focus:outline-none hover:scale-105 focus:scale-90 rounded-lg shadow-lg px-6 p-2 text-sm"
                >
                    Edit Email
                </button>
                <button
                    onClick={handleVerify}
                    className="bg-[#6EACDA] text-white transition-all duration-300 cursor-pointer font-para focus:outline-none hover:scale-105 focus:scale-90 rounded-lg shadow-lg px-6 p-2 text-sm"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OTPform;
