import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Whothere() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [restaurantID, setRestaurantID] = useState("");
  const [whoThere, setWhoThere] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        // Get user data from local storage
          const LoginToken = localStorage.getItem("LoginToken");
          const userData = JSON.parse(LoginToken);
          setUsername(userData.username);
          // Get restaurantID from URL
          const params = new URLSearchParams(location.search);
          const restaurantID = params.get('restaurantID');
          console.log('restaurantID', restaurantID);
          setRestaurantID(restaurantID);
          try {
            // Fetch chilling
              const response = await axios.get(`/api/restaurant/get-all-chilling/${restaurantID}`);
              const fetchChilling = response.data;
              setWhoThere(fetchChilling);
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
  // Send request to chill with user
  const requestMatch = async (userID, otherUserID, restaurantID) => {
    try {
      // Post chilling
      const response = await axios.post(`/api/restaurant/chilling-with-you/${userID}?otherUserID=${otherUserID}&restaurantID=${restaurantID}`);
      console.log(response.data);
      Swal.fire({ 
        title: "Note!!", 
        html: `
            ${response.data.message}`,
        customClass: {
            title : "text-[#FF0000] text-xl",
            html : "text-white",
            popup: "w-[208px] h-[170px] bg-[#E9C46A] text-white text-sm" ,
            confirmButton: "text-white text-sm text-center rounded-3xl w-[60px] h-[23.px] border border-gray-800 m-auto"
        }
      });
    } catch (error) {
      console.error('Error chilling with you:', error);
    }
  };

    return (
    <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
        {/* Header */}
        <div 
          className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]" 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
          <div className="flex flex-row items-center justify-center">
            <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
            <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
            <span className="text-[#E76F51] text-[45px] font-extrabold">WHOTHERE</span>
            <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
            <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
          </div>
          {/* Back to restaurant */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      
      borderRadius: '30px',
      padding: '10px 20px',
      cursor: 'pointer',
    }}
    onClick={() => navigate(-1)}
  >
    <img
      src="src/client/img/Back.png"
      alt="Back"
      style={{ width: '24px', height: '24px', marginRight: '10px' }}
    />
    <span style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>BACK TO RESTURANT</span>
</div>
        
      </div>
      <div style={{ height: '2px', backgroundColor: '#E0E0E0', width: '80%' }}></div>



        {/* List */}
      <div className=" flex flex-col items-center">
        {whoThere.length !== 0 ?
        whoThere.map(profile => (
          <div
            key={profile._id}
            className="bg-gray-200 rounded-full w-[300px] p-4 flex flex-row items-center justify-between mt-4"
          >
            <div className="flex flex-row items-center">
              <img
                src={profile.photo[0]}
                alt="Dog"
                className="w-[50px] h-[50px] rounded-full mr-4"
              />
              <div>
                <p className="text-[18px] text-gray-600">{profile.userID}{profile.age}</p>
                <p className="text-[14px] text-gray-600">แนวที่ชอบ: {profile.tags}</p>
              </div>
            </div>
            <img
              src="src/client/img/Group 19194.png"
              alt="Checkmark"
              className="w-[50px] h-[50px] text-green-500"
              onClick={() => requestMatch(username, profile.userID, restaurantID)}
            />
          </div>
        )):
        <div>Nobody chilling</div>
        }
      </div>
        </div>
        {/* Menu */}
        <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/accept.png" alt="accept icon" onClick={go_to_accept} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/Group 19124 (1).png" alt="restaurant icon" onClick={go_to_restaurant} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/match.png" alt="match icon" onClick={go_to_match} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profile.png" alt="profile icon" onClick={go_to_profile} />
        </div>
        
    </div>
    );
  }