import { Button } from "react-scroll";
import React from "react";
import vite from "./../../../public/vite.svg";
import 'flowbite';
import { message } from "antd";

function Chat() {
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
    const chat = [
        {id:0, name:"ชื่อแอค", messages:[{name:"ชื่อแอค", message:"hi", time:"13:42", status:"Delivery"},{name:"realguy", message:"ข้อความล่าสุด"}]},
        {id:1, name:"ชื่อแอค", messages:[{name:"realguy", message:"hi"},{name:"ชื่อแอค", message:"ข้อความล่าสุด"}]},
        {id:2, name:"ชื่อแอค", messages:[{name:"ชื่อแอค", message:"hi"},{name:"realguy", message:"ข้อความล่าสุด"}]},
        {id:3, name:"ชื่อแอค", messages:[{name:"realguy", message:"hi"},{name:"ชื่อแอค", message:"ข้อความล่าสุด"}]},
        {id:4, name:"ชื่อแอค", messages:[{name:"realguy", message:"hi"},{name:"ชื่อแอค", message:"ข้อความล่าสุด"}]},
        {id:5, name:"ชื่อแอค", messages:[{name:"realguy", message:"hi"},{name:"ชื่อแอค", message:"ข้อความล่าสุด"}]},
        {id:6, name:"ชื่อแอค", messages:[{name:"ชื่อแอค", message:"hi"},{name:"realguy", message:"ข้อความล่าสุด"}]}
    ];
    return (
        <div className="h-full w-full fixed overflow-hidden flex flex-col pb-[26px] bg-[#e9c46a]">
            <div
                className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]" 
                style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center">
                  <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                  <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                  <span className="text-[#E76F51] text-[45px] font-extrabold">Message</span>
                  <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
                  <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
            </div>
                <div className="h-[600px] w-[375px] rounded-b-[50px] justify-items-center">
                    <div className="flex w-full">
                        <div className="pl-[17px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <div className="text-[20px] pr-[41px] w-full font-extrabold text-center"
                        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                            {chat[0].messages[0].message}
                        </div>
                    </div>
                    
                    <div className="relative h-[571px] w-[341px] bg-[#fff3f3] border-[#d9d9d9] rounded-tr-[20px] rounded-b-[50px] overflow-auto">
                        <div className="w-[341px] h-[495px] overflow-auto p-4">
                        {chat[0].messages.map(message => (
                            (message.name === 'realguy')
                            ?
                            <div 
                            class="absolute right-2 flex items-start gap-2.5 w-fit max-w-[250px] pb-1">
                                <div class="flex flex-col  w-full max-w-[320px] leading-1.5 p-4 bg-[#00AF5B] rounded-ee-xl rounded-s-xl">
                                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span class="text-xs text-gray-200 -mt-3">
                                        {message.time}
                                    </span>
                                    </div>
                                    <p class="text-sm font-normal py-1 text-white">
                                        {message.message}
                                    </p>
                                    {/*option
                                    <span class="text-sm font-normal text-gray-200 dark:text-gray-400">
                                        {message.status}
                                    </span>*/}
                               </div>
                            </div>
                            :
                            <div class="flex items-start gap-2.5 w-fit max-w-[250px] pb-1">
                                <img class="w-8 h-8 rounded-full" src={message.photo} alt={message.name + " image"} />
                                <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-[#FE8947] rounded-e-xl rounded-es-xl">
                                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span class="text-xs text-gray-200 -mt-3">
                                        {message.time}
                                    </span>
                                    </div>
                                    <p class="text-sm font-normal py-1 text-white">
                                        {message.message}
                                    </p>
                                    {/*option
                                    <span class="text-sm font-normal text-gray-200 dark:text-gray-400">
                                        {message.status}
                                    </span>*/}
                               </div>
                            </div>
                    ))}
                        </div>
                        <form className="flxed bottom-4 h-[60px] w-[325px] pl-4">   
                            <label for="message" className="mb-2 text-sm font-medium text-gray-900 sr-only">ส่งข้อความ....</label>
                            <div className="">
                                <input type="text" id="message" 
                                className="block w-[309px] h-[60px] p-4 pr-[60px] text-sm text-gray-900 border border-gray-300 rounded-b-[34px] rounded-t-[34px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="ส่งข้อความ...." required />
                                <button type="submit" 
                                className="text-white absolute end-[24px] bottom-[22px] w-12 h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                                    className="w-6 h-6 ml-[14px]">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
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
export default Chat;