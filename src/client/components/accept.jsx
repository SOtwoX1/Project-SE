import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-scroll";
import Swal from 'sweetalert2';

export default function Accept() {
  //const [email, setEmail] = useState("");
  //const [username, setUsername] = useState("");
  /*
  useEffect(() => {
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setEmail(userData.email);
    setUsername(userData.username);
  }, []);
  */
    const go_to_message = async () => {
      window.location.href = "http://localhost:3000/message";
    };
    const go_to_accept = async () => {
      window.location.href = "http://localhost:3000/accept";
    };
    const go_to_restaurant = async () => {
      window.location.href = "http://localhost:3000/restaurant";
    };
    const go_to_match = async () => {
      window.location.href = "http://localhost:3000/match";
    };
    const go_to_profile = async () => {
      window.location.href = "http://localhost:3000/profile";
    };
    const go_to_setting = async () => {
      window.location.href = "/Setting-Profile";
    };
    const go_to_Edit_pro = async () => {
      window.location.href = "/NewEdit_pro";
    };

    return (
    <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
        <div 
          className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]" 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
          <div className="flex flex-row items-center justify-center">
            <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
            <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
            <span className="text-[#E76F51] text-[45px] font-extrabold">ACCEPT</span>
            <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
            <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
  
        
      </div>
      


        {/* List */}
      <div className=" flex flex-col items-center">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-full w-[300px] p-4 flex flex-row items-center justify-between mt-4"
          >
            <div className="flex flex-row items-center">
              <img
                src="/path-to-assets/dog.png"
                alt="Dog"
                className="w-[50px] h-[50px] rounded-full mr-4"
              />
              <div>
                <p className="text-[18px] text-gray-600">ชื่อแอค....อายุ......</p>
                <p className="text-[14px] text-gray-600">ร้านอาหารที่ชวนไป.......</p>
                <p className="text-[14px] text-gray-600">แนวร้านอาหารที่ชอบ.......</p>
              </div>
            </div>
            <img
              src="src/client/img/Group 19193.png"
              alt="Checkmark"
              className="w-[50px] h-[50px] text-green-500"
            />
          </div>
        ))}
      </div>
        </div>
        <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/Group 19123 (1).png" alt="accept icon" onClick={go_to_accept} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/restaurant.png" alt="restaurant icon" onClick={go_to_restaurant} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/match.png" alt="match icon" onClick={go_to_match} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profile.png" alt="profile icon" onClick={go_to_profile} />
        </div>
        
    </div>
    );
  }