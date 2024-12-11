import React, { useEffect, useState } from "react";
import 'flowbite';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { messageRoutesURL } from "../../apiConfig";

function Message() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  // On click go to chat
  const goToChatClick = (matchID, userID, photo) => {
    navigate(`/chat?matchID=${matchID}&chatWithUserID=${userID}&photo=${photo}`);
  }
  // Pull all chat room that user have
  async function pullAllChat(username) {
    try {
      const response = await axios.get(`${messageRoutesURL.base}${messageRoutesURL.getAllChatRoomAPI}/${username}`);
      console.log("username: ", username);
      console.log("response.data: ", response.data);
      setChats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching match profile:', error);
    }
  };
  useEffect(() => {
    // Get user data from local storage
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setUserID(userData.username);
    pullAllChat(userData.username);
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
  return (
    <div className="h-[812px] w-[375px] fixed overflow-hidden flex flex-col bg-[#e9c46a]">
      {/* Header */}
      <div
        className="bg-white w-full h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
        <div className="flex flex-row items-center justify-center">
          <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
          <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
          <span className="text-[#E76F51] text-[45px] font-extrabold">Message</span>
          <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
          <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
        </div>
        {/* :ist of chat room */}
        <div className="h-[600px] w-[375px] rounded-b-[50px] overflow-auto">
          {
            loading ?
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                Loading
              </div>
              :
              chats.length !== 0 ?
                chats.map(chat => (
                  <div className="mt-6 w-[324px] h-[80px] justify-self-center flex sticky top-[0px] bg-[#fff7ed] rounded-l-[40px] rounded-r-xl hover:drop-shadow-md hover:scale-105"
                    key={chat._id}
                    onClick={() => goToChatClick(chat.matchID, chat.userID, chat.photo[0])}>
                    <img src={chat.photo[0]} className="h-16 w-16 m-2 rounded-full bg-white items-center drop-shadow-md" />
                    <div className="w-full pl-2 content-center">
                      <div className="pb-2 font-['Abhaya'] text-black text-[15px] font-bold">-{chat.userID}-</div>
                      <div className="font-['Abhaya'] text-[#A09A9A] text-[9px]">{chat.lastContent}</div>
                      <svg className="absolute bottom-2 stroke-[#D9D9D9] stroke-2" viewBox="0 0 249 2" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="230" y2="0" />
                      </svg>
                    </div>
                    <div className="pb-1" />
                  </div>
                ))
                :
                <div className="h-[600px] justify-self-center content-center">
                  ไม่มีห้องแชท
                </div>}
        </div>
      </div>
      {/* Menu */}
      <div className="">
        <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
          <div className="w-[67px] h-[67px] rounded-full flex items-center justify-center bg-white border-2 border-[#F4A261] cursor-pointer ">
            <img className="w-[41px] h-[41px] cursor-pointer" src="src/client/img/Communication.png" alt="message icon" onClick={go_to_message} />
          </div>
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/accept.png" alt="accept icon" onClick={go_to_accept} />
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/restaurant.png" alt="restaurant icon" onClick={go_to_restaurant} />

          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/match.png" alt="match icon" onClick={go_to_match} />
          <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profile.png" alt="profile icon" onClick={go_to_profile} />
        </div>
      </div>
    </div>
  );
}
export default Message;