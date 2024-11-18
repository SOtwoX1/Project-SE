import { Button } from "react-scroll";
import React from "react";
import vite from "./../../../public/vite.svg";
import 'flowbite';
import { useEffect } from "react";
import axios from "axios";

function Messages() {
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
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('/api/chats');
                setChats(response.data);
            } catch(error) {
                console.error("Error fetching chats: ", error)
            }
        };
        fetchChats();
        const interval = setInterval(fetchChats, 5000);
        return () => clearInterval(interval);
        [
            {id:0, name:"ชื่อแอค", massages:[{name:"ชื่อแอค", massage:"hi"},{name:"realguy", massage:"ข้อความล่าสุด"}]},
            {id:1, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
            {id:2, name:"ชื่อแอค", massages:[{name:"ชื่อแอค", massage:"hi"},{name:"realguy", massage:"ข้อความล่าสุด"}]},
            {id:3, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
            {id:4, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
            {id:5, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
            {id:6, name:"ชื่อแอค", massages:[{name:"ชื่อแอค", massage:"hi"},{name:"realguy", massage:"ข้อความล่าสุด"}]}
        ];
    });
    return (
        <div className="h-full w-full fixed overflow-hidden flex flex-col pb-[26px] bg-[#e9c46a]">
            <div
                className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]" 
                style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center">
                  <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                  <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                  <span className="text-[#E76F51] text-[45px] font-extrabold">Messages</span>
                  <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
                  <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
            </div>
                <div className="pt-8 grid gap-10 h-[600px] w-[375px] rounded-b-[50px] overflow-auto">

                    <div class="text-center">
                       <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                       Show navigation
                       </button>
                    </div>

                    <div id="drawer-navigation" class="fixed top-0 left-0 z-40 w-full h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white" tabindex="-1" aria-labelledby="drawer-navigation-label">
                        <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                        <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close menu</span>
                        </button>
                    </div>
                    {chats.map(chat => (
                        <div className="w-[324px] h-[80px] justify-self-center flex sticky top-[0px] bg-[#fff7ed] rounded-l-[40px] rounded-r-xl hover:drop-shadow-md hover:scale-105"
                        key={chat.id}>
                            <img src={vite} className="h-16 w-16 m-2 rounded-full bg-white items-center drop-shadow-md" />
                            <div className="w-full pl-2 content-center">
                                <div className="pb-2 font-['Abhaya'] text-black text-[15px] font-bold">-{chat.name}-</div>
                                <div className="font-['Abhaya'] text-[#A09A9A] text-[9px]">{chat.massages[chat.massages.length - 1].name + ": " + chat.massages[chat.massages.length - 1].massage}</div>
                                <svg className="absolute bottom-2 stroke-[#D9D9D9] stroke-2" viewBox="0 0 249 2" xmlns="http://www.w3.org/2000/svg">
                                  <line x1="0" y1="0" x2="230" y2="0" />
                                </svg>
                            </div>
                        </div>
                    ))}
                    <div className="pb-1"></div>
                </div>
            </div>
            
            <div className="">
                <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
                    <div className="w-[67px] h-[67px] rounded-full flex items-center justify-center bg-white border-2 border-[#F4A261] cursor-pointer ">
                        <img className="w-[48px] h-[48px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
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
export default Messages;