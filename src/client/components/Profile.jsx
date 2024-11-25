import React, { useState, useEffect } from "react";
import { Button } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setEmail(userData.email);
    setUsername(userData.username);
  }, []);
  const go_to_message = async () => {
    navigate("/message");
  };
  const go_to_accept = async () => {
    navigate("/accept");
  };
  const go_to_restaurant = async () => {
    navigate("/restaurant");
  };
  const go_to_match = async () => {
    navigate("/match");
  };
  const go_to_profile = async () => {
    navigate("/profile");
  };
    const go_to_setting = async () => {
      navigate("/Setting-Profile");
    };
    const go_to_Edit_pro = async () => {
      navigate("/NewEdit_pro");
    };

    return (
    <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
        <div 
          className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]" 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
          <div className="flex flex-row items-center justify-center">
            <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
            <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
            <span className="text-[#E76F51] text-[45px] font-extrabold">PROFILE</span>
            <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
            <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
          </div>
          <div className="flex flex-col items-center mt-6">
            <img className="w-[200px] h-[200px] rounded-full border-[#E9C46A]" src="src/client/img/pure.png" alt="Profile" />
          </div>
          <div className="text-center mt-4 text-[30px] font-bold text-black">
            {username}
          </div>
          <div className="flex flex-row justify-center mt-6 space-x-4">
            <button 
            onClick={go_to_Edit_pro}
            className="bg-gray-300 w-[130px] h-[40px] text-[14px] text-black font-medium">
              Edit Profile
            </button>
            <button 
            onClick={go_to_setting}
            className="bg-gray-300 w-[130px] h-[40px] text-[14px] text-black font-medium">
              Setting
            </button>
          </div>
          <div className="bg-gray-200 w-[346px] h-[161px] mt-6 flex items-center justify-center text-[30px] text-black font-medium">
            พื้นที่โฆษณา
          </div>
        </div>
        <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/accept.png" alt="accept icon" onClick={go_to_accept} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/restaurant.png" alt="restaurant icon" onClick={go_to_restaurant} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/match.png" alt="match icon" onClick={go_to_match} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profilecolor.png" alt="profile icon" onClick={go_to_profile} />
        </div>
    </div>
    );
  }
  