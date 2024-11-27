import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'flowbite';
import axios from "axios";

function Chat() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userID, setUserID] = useState("");
    const [matchID, setMatchID] = useState("");
    const [chatWithUser, setChatWithUser] = useState("");
    const [chats, setChats] = useState([]);

    useEffect(() => {
        // Get userID from local storage
        const LoginToken = localStorage.getItem("LoginToken");
        const userData = JSON.parse(LoginToken);
        setUserID(userData.username);
        // Get matchID, chatWithUserID, and photo from URL query string
        const params = new URLSearchParams(location.search);
        const matchID = params.get('matchID');
        const chatWithUserID = params.get('chatWithUserID');
        const photo = params.get('photo');
        setMatchID(matchID);
        setChatWithUser({ userID: chatWithUserID , photo });
        // Poll chats
        if (matchID && chatWithUserID) {
            pollChats(matchID, chatWithUserID);
        }
    }, [location.search]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (matchID && chatWithUser.userID) {
                pollChats(matchID, chatWithUser.userID);
            }
        }, 10000); // Poll every 10 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [matchID, chatWithUser.userID]);
    // Poll chats
    async function pollChats(matchID, userID) {
        try {
            console.log('poll chats ', matchID, userID);
            const response = await axios.get(`/api/get-chat/${userID}?matchID=${matchID}`);
            const fetchChats = response.data;
            console.log(response.data);
            setChats(fetchChats);
        } catch (error) {
            console.error('Error poll chats:', error);
        }
    }
    // Send message
    const sendMessage = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries()); // Convert formData to JSON
            console.log(`sending ${formJson.message} to ${matchID}`);
            const response = await axios.post(`/api/send-message/${userID}?matchID=${matchID}&text=${formJson.message}`);
            console.log(response.data);
            form.reset(); // Clear the input field after sending the message
            pollChats(matchID, userID); // Poll chats after sending the message
        } catch (error) {
            console.error('Error sending chats:', error);
        }
    }
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
      const go_to_viewprofile = async (userID) => {
        navigate("/Viewmatchprofile?userID=" + userID);
      };

    return (
        <div className="h-full w-full fixed overflow-hidden flex flex-col pb-[26px] bg-[#e9c46a]">
            {/* Header */}
            <div
                className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]" 
                style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center">
                  <img className="w-[55px] h-[55px] mr-4" src="../src/client/img/French Fries.png" alt="French Fries" />
                  <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="../src/client/img/heart.png" alt="Heart" />
                  <span className="text-[#E76F51] text-[45px] font-extrabold">Message</span>
                  <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="../src/client/img/heart2.png" alt="Heart" />
                  <img className="w-[55px] h-[55px] ml-4" src="../src/client/img/pizza.png" alt="Pizza" />
            </div>

            {/* Chat header */}
                <div className="h-[600px] w-[375px] rounded-b-[50px] justify-items-center">
                    <div className="flex w-full">
                        <div className="pl-[17px]" onClick={() => navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <div className="text-[20px] pr-[41px] w-full font-extrabold text-center"
                        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                            <button onClick={() => go_to_viewprofile(chatWithUser.userID)}>{chatWithUser.userID}</button>
                        </div>
                    </div>
                    
                    <div className="h-[571px] w-[341px] bg-[#fff3f3] border-[#d9d9d9] rounded-tr-[20px] rounded-b-[50px] overflow-auto">
                        <div className="w-[341px] h-[495px] overflow-auto flex flex-col-reverse p-4">
                        {
                        chats.length !== 0 ?
                        chats.map(message => (
                            (message.userID_sender === userID)
                            ?
                            <div 
                            key={message._id}
                            className="flex justify-end gap-2 w-full  pb-1">
                                <div className="flex flex-col  w-fit max-w-[230px] leading-1.5 p-2 bg-[#00AF5B] rounded-ee-xl rounded-s-xl">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-xs text-gray-200 -mt-3">
                                        {message.time}
                                    </span>
                                    </div>
                                    <p className="text-sm font-normal py-1 text-white">
                                        {message.text}
                                    </p>
                                    {/*option
                                    <span className="text-sm font-normal text-gray-200 dark:text-gray-400">
                                        {message.status}
                                    </span>*/}
                               </div>
                            </div>
                            :
                            <div 
                            key={message._id}
                            className="flex items-start gap-2 w-full pb-1">
                                <img className="w-8 h-8 rounded-full" src={"../" + chatWithUser.photo} alt={chatWithUser.userID + " image"} />
                                <div className="flex flex-col w-fit max-w-[230px] leading-1.5 p-2 bg-[#FE8947] rounded-e-xl rounded-es-xl">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-xs text-gray-200 -mt-3">
                                        {message.time}
                                    </span>
                                    </div>
                                    <p className="text-sm font-normal py-1 text-white">
                                        {message.text}
                                    </p>
                                    {/*option
                                    <span className="text-sm font-normal text-gray-200 dark:text-gray-400">
                                        {message.status}
                                    </span>*/}
                               </div>
                            </div>
                    ))
                :
                <div></div>}
                        </div>
                        <form className="flxed bottom-4 h-[60px] w-[325px] pl-4" onSubmit={sendMessage}>   
                            <label htmlFor="message" className="mb-2 text-sm font-medium text-gray-900 sr-only">ส่งข้อความ....</label>
                            <div className="relative">
                                <input type="text" id="message" name="message" 
                                className="block w-[309px] h-[60px] p-4 pr-[60px] text-sm text-gray-900 border border-gray-300 rounded-b-[34px] rounded-t-[34px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="ส่งข้อความ...." required />
                                <button type="submit" 
                                className="text-white absolute end-[6px] bottom-[6px] w-12 h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                    className="w-6 h-6 ml-[14px]">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
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
export default Chat;