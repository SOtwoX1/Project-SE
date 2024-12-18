import Swal from 'sweetalert2';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL, userRoutesURL } from "../../apiConfig";

export default function Setting_pro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const LoginToken = localStorage.getItem("LoginToken");
        const userData = JSON.parse(LoginToken);
        setEmail(userData.email);
        setUsername(userData.username);
    }, []);
    const go_to_profile = () => {
        navigate("/profile");
    }
    const go_to_show_me = () => {
        navigate("/Show-Me");
    }
    const go_to_Password = () => {
        navigate("/Password");
    }
    const go_to_MPA = () => {
        navigate("/Manage-Payment-Account");
    }
    const go_to_package = () => {
        navigate("/Mypackage");
    }
    const go_to_login = () => {
        navigate("/home-login-register");
        localStorage.removeItem("LoginToken");
    }
    const Delete_Account = async () => {
        Swal.fire({
            title: "Delete My Account ",
            text: "All data within the account will be deleted.",
            showCancelButton: true,
            confirmButtonColor: "#E76F51",
            cancelButtonColor: "#F4A261",
            confirmButtonText: "Delete My Account",
            cancelButtonText: "Don’t Delete My Account",
            customClass: {
                popup: "w-[350px] h-[250px] bg-[#E9C46A] text-white text-[15px] rounded-lg space-y-px", // ใช้ Tailwind CSS
                title: "text-white text-xl font-bold underline",
                confirmButton: "text-white text-sm text-center rounded-lg w-[192px] h-10 border border-gray-800 m-auto",
                cancelButton: "text-white text-sm text-center rounded-lg w-[192px] h-10 border border-gray-800",
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Delete Account
                let response;
                if (result.isConfirmed) {
                    try {
                        const response = await axios.delete(`${BASE_URL}${userRoutesURL.base}${userRoutesURL.deleteAccountAPI}`, {
                            data: {
                                username: username,
                            },
                        });
                        // wait for delete account to complete
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Account deleted successfully!",
                            timer: 5000,
                        })
                        localStorage.removeItem("LoginToken");
                        navigate("/Login");
                    } catch (error) {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Your account could not be deleted. Please try again later. You must have profile to delete account.",
                            timer: 7000,
                        })
                    }
                }
            }
        });
    }
    return (

        <div
            className="fixed overflow-hidden w-[375px] h-[812px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col p-3 pt-[8px] "
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="flex flex-row items-center justify-center">
                <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                <span className="text-[#E76F51] text-[45px] font-extrabold">SETTINGS</span>
                <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
            </div>
            <div className="flex flex-col  divide-y divide-blue">
                <div className="flex items-center h-[65px]">
                    <button onClick={go_to_profile} className="ml-2" >
                        <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    <p className="text-xl text-black ">PROFILE</p>
                    {/* <p className="pl-44 text-xl text-[#D9D9D9] ">{username}</p> */}
                </div>
                <div className="flex justify-between text-xl  items-center h-[65px]">
                    <p className="text-black p-12">Email</p>
                    <p className="text-[#D9D9D9]">{email}</p>
                </div>
                <div className="flex justify-between text-xl  items-center h-[65px]">
                    <p className="text-black p-12">Show Me</p>
                    <button onClick={go_to_show_me}>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-xl  items-center h-[65px]">
                    <p className="text-black p-12">Password</p>
                    <button onClick={go_to_Password}>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-xl  items-center h-[65px]">
                    <p className="text-black p-12">Manage Payment Account</p>
                    <button onClick={go_to_MPA}>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-xl  items-center h-[65px]">
                    <p className="text-black p-12">My Package</p>
                    <button onClick={go_to_package}>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="text-center pt-[25px]">
                    <button
                        onClick={go_to_login}
                        className="w-[331px] h-[39px] rounded-lg bg-red text-xl text-white">
                        Logout
                    </button>
                </div>

            </div>

            <div className="flex flex-col space-y-[15px] mt-[15px]">
                <div className="text-center text-black text-3xl">
                    <p>Contact Us</p>
                </div>

                <div className="flex flex-row items-center gap-[25px] w-[266px] h-[77px] m-auto">
                    <a href="https://line.me" target="_blank" rel="noopener noreferrer">
                        <img className="w-[77px] h-[77px]" src="src\client\img\LINE.png" alt="Line" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img className="w-[62px] h-[62px]" src="src\client\img\Facebook.png" alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img className="w-[77px] h-[77px]" src="src\client\img\TwitterX.png" alt="X" />
                    </a>
                </div>


                <div className="text-center">
                    <button
                        onClick={Delete_Account}
                        className="w-[331px] h-[39px] rounded-lg bg-red text-xl text-white">
                        Delete Account
                    </button>
                </div>



            </div>

        </div>
    );
}