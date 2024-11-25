import { Button } from "react-scroll";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
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

    return (
      <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
        <div className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex items-start justify-center pt-[8px]" style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <img className="w-[55px] h-[55px] mt-[12px] mr-[5px]" src="src/client/img/French Fries.png" alt=""/>
            <img className="w-[22px] h-[27px] mt-[50px] mr-[-20px]" src="src/client/img/heart.png" alt=""/>
          KOO - KINN
            <img className="w-[22px] h-[27px] mr-[-10px]" src="src/client/img/heart2.png" alt=""/>
            <img className="w-[55px] h-[55px] mt-[12px] mr-[5px]" src="src/client/img/pizza.png" alt=""/>
        </div>
        
        <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/accept.png" alt="accept icon" onClick={go_to_accept} />
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/restaurant.png" alt="restaurant icon" onClick={go_to_restaurant} />
          <div className="w-[67px] h-[67px] rounded-full flex items-center justify-center bg-white border-2 border-[#F4A261] cursor-pointer ">
            <img className="w-[48px] h-[48px] cursor-pointer" src="src/client/img/Hamburger.png" alt="match icon" onClick={go_to_match} />
          </div>
          
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profile.png" alt="profile icon" onClick={go_to_profile} />
        </div>
      </div>
    );
  }
  