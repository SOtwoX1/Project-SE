import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import 'flowbite';
import axios from "axios";
import { BASE_URL, matchRoutesURL } from "../../apiConfig";

export default function Accept() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [acceptRequests, setAcceptRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get user data from local storage
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setUserID(userData.username);
    try {
      // Fetch match request
      fetchData(userData.username);
    } catch (error) {
      console.error('Error fetching match profile:', error);
      }
  }, []);
  // Fetch match request
  const fetchData = async (userID) => {
    const response = await axios.get(`${matchRoutesURL.base}${matchRoutesURL.getAllMatchRequestAPI}/${userID}`);
    console.log("username: ", userID);
    console.log("response.data: ", response.data);
    setAcceptRequests(response.data);
    setLoading(false);
  };
  // Navigation to other pages
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
  // Accept and Denied match request
  const accept = async (userID, matchID) => {
    try {
      const response = await axios.put(`${matchRoutesURL.base}${matchRoutesURL.acceptMatchRequestAPI}/${userID}?matchID=${matchID}`);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Accepted',
        text: 'The match request has been accepted successfully.',
      });
      fetchData();
    } catch (error) {
      console.error('Error accepting match request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error accepting the match request.',
      });
    }
  };
  const denied = async (matchID) => {
    try {
      const response = await axios.delete(`${matchRoutesURL.base}${matchRoutesURL.declineMatchRequestAPI}/${matchID}`);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Denied',
        text: 'The match request has been denied successfully.',
      });
      fetchData();
    } catch (error) {
      console.error('Error denying match request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error denying the match request.',
      });
    }
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
      <div className="h-full flex flex-col items-center">
        {
          loading ?
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            Loading
          </div>
          :
          acceptRequests.length !== 0 ?
          acceptRequests.map(profile => (
            <div className="flex content-center">
            <div
              key={profile._id}
              className="bg-gray-200 rounded-full w-[300px] p-4 flex flex-row items-center justify-between mt-4"
            >
              <div className="flex flex-row items-center">
                <img
                  src={profile.photo[0]}
                  alt={`Profile ${profile.userID}`}
                  className="w-[50px] h-[50px] rounded-full mr-4"
                />
                <div className="w-[150px]">
                  <p className="text-[18px] text-gray-600">{profile.userID}, {profile.age}</p>
                  <p className="text-[14px] text-gray-600">{profile.restaurant ? "ร้าน" + profile.restaurant : ""}</p>
                  <p className="text-[14px] text-gray-600 truncate hover:text-clip hover:text-wrap">แนวที่ชอบ: {profile.tags.length === 0 ? profile.tags : profile.tags.join(', ')}</p>
                </div>
              </div>
              <img
                onClick={() => accept(userID, profile.matchID)}
                src="src/client/img/Group 19194.png"
                alt="Checkmark"
                className="w-[50px] h-[50px] text-green-500"
              />
            </div>
            <svg
            onClick={() => denied(profile.matchID)}
            className="w-5 pt-4"
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
              <path d="M6 4H18V21H6z" opacity=".3"></path><path d="M11 18H9V7h2V18zM15 18h-2V7h2V18zM4 3H20V5H4z"></path><path d="M17 5L14 2 10 2 7 5z"></path><path d="M17,22H7c-1.1,0-2-0.9-2-2V3h14v17C19,21.1,18.1,22,17,22z M7,5v15h10V5H7z"></path>
            </svg>
            </div>

          )):
            <div className="h-full justify-self-center content-center">ไม่มีคำขอ</div>}
      </div>
        </div>
        {/* Menu */}
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