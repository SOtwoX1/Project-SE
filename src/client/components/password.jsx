import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, userRoutesURL } from "../../apiConfig";

export default function Password() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const go_to_setting = () => {
        navigate("/Setting-Profile");
    };

    const resetPassword = async () => {
        const LoginToken = localStorage.getItem("LoginToken");
    
        if (!LoginToken) {
            Swal.fire({
                icon: "error",
                title: "Invalid Request",
                text: "No email token found. Please start the password reset process again.",
            });
            return;
        }
    
        const userData = JSON.parse(LoginToken);
        const { email } = userData;
    
        if (!email || !password || !newPassword) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "All fields are required.",
            });
            return;
        }
    
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords Do Not Match",
                text: "Please make sure both passwords are the same.",
            });
            return;
        }
    
        setIsSubmitting(true); // Disable the button during submission
    
        try {
            const response = await axios.put(`${BASE_URL}${userRoutesURL.base}${userRoutesURL.resetPasswordAPI}`, {
                email,
                password,
                newpassword: newPassword,
            });
    
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Successfully",
                    text: "You can now log in with your new password.",
                });
                navigate("/Password-Change");
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Reset Failed",
                text: error.response?.data?.message || "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false); // Enable the button again
        }
    };

    return (
        <div
            className="flex bg-white items-center justify-center"
            style={{ fontFamily: "Abhaya Libre, sans-serif" }}>
            <div className="w-[375px] h-[812px] text-[45px] font-extrabold flex flex-col p-3 pt-[8px]">
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[55px] h-[55px] absolute left-[1%] mr-4" src="src/client/img/French Fries.png" alt="French Fries"/>
                    <img className="w-[22px] h-[27px] mt-12 absolute left-[15%]" src="src/client/img/heart.png" alt="Heart"/>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[15%]" src="src/client/img/heart2.png" alt="Heart"/>
                    <img className="w-[55px] h-[55px] mr-[-300px]" src="src/client/img/pizza.png" alt="Pizza"/>
                    <span className="absolute text-[#E76F51] text-[45px] font-extrabold">PASSWORD</span>
                </div>
                <div className="divide-y divide-gray-300">
                    <div className="flex items-center h-[65px]">
                        <button onClick={go_to_setting} className="ml-2">
                            <svg className="w-[42px] h-[42px] text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7" />
                            </svg>
                        </button>
                        <p className="text-[20px] text-black">SETTINGS</p>
                    </div>
                    <div></div>
                </div>
                <div className="flex flex-col p-5 mt-[-10px]">
                    <h2 className="text-[18px] text-black font-bold mb-1">Set a New Password</h2>
                    <p className="text-[12px] text-[#989898] mb-4">
                        Create a new password. Ensure it differs from previous ones for security.
                    </p>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent form refresh
                            resetPassword(); // Call reset password on submit
                        }}
                    >
                        <p className="text-[16px] text-black">Current Password</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-[3px] border border-gray-300 border-[2px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E1E1E1]"
                            required
                        />
                        <p className="text-[16px] text-black">New Password</p>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-[3px] border border-gray-300 border-[2px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E1E1E1]"
                            required
                        />
                        <p className="text-[16px] text-black">Confirm Password</p>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-[3px] border border-gray-300 border-[2px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E1E1E1]"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full p-[5px] mt-6 text-white rounded-xl text-[16px] font-bold focus:outline-none focus:ring-2 ${
                                isSubmitting ? "bg-gray-400" : "bg-[#E9C46A]"
                            }`}
                        >
                            {isSubmitting ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
