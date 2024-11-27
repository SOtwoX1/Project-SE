import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Nopromotion_restaurant(){
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [restaurantID, setRestaurantID] = useState("");
    const [restaurant, setRestaurant] = useState(
      {restaurantID:0, name:"ชื่อร้านอาหาร", description:"คำแนะนำร้าน", tags:["ประเภทร้านอาหาร"],promo:false,time:"00:00",photo:["https://via.placeholder.com/300x250?text=Image+1", "asdf"]}
    );
    const [promo, setPromo] = useState([{
        _id: 0, promoID: "P000", restaurantID: "R002", discountEnd: "", description: "ลด 100%"
    }]);
    useEffect(() => {
        const fetchData = async () => {
            // Get user data from local storage
            const LoginToken = localStorage.getItem("LoginToken");
            const userData = JSON.parse(LoginToken);
            setUsername(userData.username);
            //  Get restaurantID from URL
            const params = new URLSearchParams(location.search);
            const restaurantID = params.get('restaurantID');
            console.log('restaurantID', restaurantID);
            setRestaurantID(restaurantID);
            try {
                // Fetch restaurant and promotion
                const response = await axios.get(`/api/get-restaurant/${restaurantID}`);
                const fetchRestaurant = response.data;
                console.log(fetchRestaurant)
                setRestaurant(fetchRestaurant.restaurant);
                setPromo(fetchRestaurant.promotion);
            } catch (error) {
                console.error('Error fetching promotion:', error);
            }
        };
        fetchData();
    }, []);
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
    const go_to_Whothere = async () => {
      navigate(`/Whothere?restaurantID=${restaurantID}`);
    };
    // Chilling at restaurant
    const pin_rest = async () => {
        try {
            const response = await axios.post(`/api/chilling-at/${restaurantID}?userID=${username}`);
            console.log(response.data);
            Swal.fire({ 
                title: "Now!!", 
                html: `
                    You are chilling at <br>
                    ${restaurant.name}`,
                customClass: {
                    title : "text-[#FF0000] text-xl",
                    html : "text-white",
                    popup: "w-[208px] h-[170px] bg-[#E9C46A] text-white text-sm" ,
                    confirmButton: "text-white text-sm text-center rounded-3xl w-[60px] h-[23.px] border border-gray-800 m-auto"
                }
                });
        } catch (error) {
            console.error('Error posting chilling:', error);
        }
    }
    return (
        <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center ">
            {/* Header */}
            <div 
                className="bg-white w-[375px] h-[717px] rounded-b-[50px]  font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px] p-3" 
                style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center">
                    <img className="w-[55px] h-[55px] " src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[45px] font-extrabold">RESTAURANT</span>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[55px] h-[55px] " src="src/client/img/pizza.png" alt="Pizza" />
                </div>
                {/* Header Restaurant */}
                    <div className="flex flex-col w-full justify-start divide-y divide-gray-300">
                        <div className="flex items-center h-[65px]">
                            <button onClick={() => navigate(-1)} className="ml-2" >
                                <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                                </svg>
                            </button>
                            <div className="flex flex-row space-x-1">
                                <p className="text-[15px] text-black">{restaurant.name}</p>
                            </div>
                        </div>
                        <div className="w-full"></div>    
                    </div>
                    {/* Restaurant detail */}
                    <div className="flex flex-col justify-between h-[530px]">
                        <div className="flex flex-col justify-center space-y-5 mt-5">
                            <img 
                                className="w-[325px] h-[180px] object-cover" 
                                src={restaurant.photo[0]} 
                                alt="รูปอาหาร" 
                            />
                            <div className="w-[325px] h-[89px] bg-[#F9BDBB] bg-opacity-75 border border-[#FF2C2C] ">
                                <div className="" >
                                    <p className="text-[12px] text-black text-left p-2">โปรโมชั่น</p>
                                    {/* Promotion */}
                                    {promo.map(promotion => (
                                        <p className="text-[12px] text-black text-left p-2">{[promotion.description]}</p>
                                    )
                                    )}
                                </div>
                                <img className="w-[56px] h-[56px] absolute left-[0%] bottom-[42%]" src="src\client\img\Fire.png" alt="fire" />
                                <img className="w-[49.4px] h-[49.4px] absolute right-[2%] bottom-[51.5%]" src="src\client\img\Time.png" alt="time" />
                            </div>
                            <div className="w-[325px] h-auto border">
                                <p className="text-[12px] text-black">บรรยายร้านอาหาร  {restaurant.description}</p>
                            </div>
                        </div>
                        {/* Button */}
                        <div className="flex flex-row justify-between w-[320px] ">
                            <button onClick={pin_rest} className="bg-[#B7D55A] w-[75px] h-[75px] rounded-full">
                                <div className="relative flex flex-col space-y-1 ">
                                    <img className="w-[34px] h-[31px] object-cover m-auto" src="src\client\img\Fast Food.png" alt="Chilling IMG" />
                                    <p className="text-[12px] text-white">Chilling</p>
                                </div>
                            </button>
                            <button onClick={go_to_Whothere} className="bg-[#F6A570] w-[75px] h-[75px] rounded-full">
                                <div className="relative flex flex-col space-y-2 ">
                                    <img className="w-[35px] h-[32px] object-cover m-auto" src="src\client\img\Location.png" alt="Who’s there IMG" />
                                    <p className="text-[11px] text-white">Who’s there</p>
                                </div>
                            </button>
                        </div>
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