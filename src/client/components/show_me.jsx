import { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export default function Show_me() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [username, setUsername] = useState('');

    // Navigate to the settings page
    const go_to_setting = () => {
        navigate("/Setting-Profile");
    };

    // Handle category selection
    const handleClick = async (category) => {
        setSelectedCategory(category);
        console.log(`Category selected: ${category}`);

        // Retrieve username from localStorage
        const LoginToken = localStorage.getItem("LoginToken");
        if (!LoginToken) {
            console.error("Login token not found.");
            return;
        }
        const userData = JSON.parse(LoginToken);
        const { username } = userData;
        setUsername(username);

        // Construct API URL with username
        const url = `/api/profile/set-gender/${username}`;

        try {
            // Send PUT request to backend
            const response = await axios.put(url, { gender: category });
            console.log("API Response:", response.data);

            // Show success message
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Preference updated successfully!',
                });
            }
        } catch (error) {
            console.error("Error updating preference:", error.response?.data || error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update preference. Please try again.',
            });
        }
    };

    return (
        <div className="fixed overflow-hidden flex bg-white items-center justify-center"
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="w-[375px] h-[812px] text-[45px] font-extrabold text-[#E76F51] flex flex-col p-3 pt-[8px]">
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px] mt-14 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[45px] font-extrabold">SHOW ME</span>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[18%]" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
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
                    <div className="flex justify-between text-[20px] items-center h-[65px]">
                        <button
                            onClick={() => handleClick('Men')}
                            className={"text-black p-12 hover:text-[#E9C46A]"}>
                            Men
                        </button>
                    </div>
                    <div className="flex justify-between text-[20px] items-center h-[65px]">
                        <button
                            onClick={() => handleClick('Women')}
                            className={"text-black p-12 hover:text-[#E9C46A]"}>
                            Women
                        </button>
                    </div>
                    <div className="flex justify-between text-[20px] items-center h-[65px]">
                        <button
                            onClick={() => handleClick('Everyone')}
                            className={"text-black p-12 hover:text-[#E9C46A]"}>
                            Everyone
                        </button>
                    </div>
                    <div className="flex justify-between text-[10px] items-center h-[65px]">
                        <p className="text-[#D9D9D9] p-12">You will only see your selected in discovery.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
