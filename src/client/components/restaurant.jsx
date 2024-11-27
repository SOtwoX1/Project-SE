import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Restaurant() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [promotions, setPromotions] = useState([
    {restaurantID:0, name:"ชื่อร้านอาหาร", description:"คำแนะนำร้าน", tags:["ประเภทร้านอาหาร"],promo:false,time:"00:00"}
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  // Search bar function
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Filter restaurant by search term
  const filteredPromotions = promotions.filter((promotion) =>
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promotion.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Go to other page
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
  const go_to_pro_in_res = async (restaurantID) => {
    navigate(`/Promotion_restaurant?restaurantID=${restaurantID}`);
  };
  const go_to_resNopro = async (restaurantID) => {
    navigate(`/NoPromotion_restaurant?restaurantID=${restaurantID}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      // Get user data from local storage
        const LoginToken = localStorage.getItem("LoginToken");
        const userData = JSON.parse(LoginToken);
        setUserID(userData.username);
        try {
          // Fetch all restaurant
            const response = await axios.get('/api/get-all-restaurants');
            const fetchPromotions = response.data;
            console.log(fetchPromotions);
            setPromotions(fetchPromotions);
        } catch (error) {
            console.error('Error fetching promotion:', error);
        }
    };
    fetchData();
}, []);
return (
  <div className="bg-[#E9C46A] h-[812px] fixed overflow-auto flex flex-col items-center">
    {/* Header */}
    <div 
      className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px] space-y-[50px]" 
      style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
      <div className="flex flex-row items-center justify-center">
        <img className="w-[55px] h-[55px] " src="src/client/img/French Fries.png" alt="French Fries" />
        <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
        <span className="text-[#E76F51] text-[45px] font-extrabold">RESTAURANT</span>
        <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
        <img className="w-[55px] h-[55px] " src="src/client/img/pizza.png" alt="Pizza" />
    </div>
    {/* Search bar */}
    <div className="relative flex items-center w-[332px] h-[35px] ">
          <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
          <label htmlFor="Search" className="sr-only"> Search </label>
          <input
            type="text"
            id="Search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#F4E4CD] rounded-full py-2 pl-10 pr-4 shadow-sm sm:text-sm"
          />
    </div>
    {/* List of restaurant */}
    <div className="space-y-[37px] ">
      {
        filteredPromotions.map((promotion) => (
            promotion.hasPromo === true ? (
              <button key={promotion.restaurantID} onClick={() => go_to_pro_in_res(promotion.restaurantID)} className="flex flex-col w-[308px] h-auto  bg-[#D9D9D9] p-2 relative">
                <div className="flex flex-row justify-center items-center ">
                    <div className="flex flex-col justify-start w-[234px] h-auto max-h-[88px] overflow-auto bg-[#FFFFFF]">
                        <p className="text-black text-xs text-left pl-1">ชื่อร้าน :{promotion.name}</p>
                        <p className="text-black text-xs text-left pl-1">กล่าวแนะนำร้านอาหาร :{promotion.description}</p>
                        <p className="text-black text-xs text-left pl-1">ประเภทร้านอาหาร :{promotion.tags.join(', ')}</p>
                    </div>
                    <div className=" absolute bottom-[0] left-[81%] h-[88px] h-full border-l border-dashed border-[#FFFFFF]"></div>
                    <div className="h-full w-[80px] transform rotate-90">
                        <p className="text-[#F56464] text-[14px] text-center font-bold">
                          Promotion
                        </p>
                    </div>
                </div>
                
                </button>
          ) : (
            /* If the restaurant doesn't have promotion */
            <button key={promotion.restaurantID} onClick={() => go_to_resNopro(promotion.restaurantID)} className="flex flex-col w-[308px] h-auto bg-[#D9D9D9] p-2 relative">
              <div className="flex flex-col justify-start w-[234px] h-auto max-h-[88px] bg-[#FFFFFF] overflow-auto">
                  <p className="text-black text-xs text-left pl-1">ชื่อร้าน :{promotion.name}</p>
                  <p className="text-black text-xs text-left pl-1">กล่าวแนะนำร้านอาหาร :{promotion.description}</p>
                  <p className="text-black text-xs text-left pl-1">ประเภทร้านอาหาร :{promotion.tags}</p>
              </div>
              <div className=" absolute bottom-[1%] left-[81%] h-full border-l border-dashed border-[#FFFFFF]"></div>
            </button>
          )
        ))}
    </div>
  </div>
  {/* Menu */}
    <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
      <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
      <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/accept.png" alt="accept icon" onClick={go_to_accept} />
      <div className="w-[67px] h-[67px] rounded-full flex items-center justify-center bg-white border-2 border-[#F4A261] cursor-pointer ">
          <img className="w-[48px] h-[48px] cursor-pointer" src="src/client/img/restaurant_notblack.png" alt="restaurant icon" onClick={go_to_restaurant} />   
      </div>
      <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/match.png" alt="match icon" onClick={go_to_match} />
      <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profile.png" alt="profile icon" onClick={go_to_profile} />
    </div>
  </div>
  );
}