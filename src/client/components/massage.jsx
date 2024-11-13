import { Button } from "react-scroll";
import React from "react";
import vite from "./../../../public/vite.svg";

function Massage() {
    const chat = [
        {id:0, name:"ชื่อแอค", massages:[{name:"ชื่อแอค", massage:"hi"},{name:"realguy", massage:"ข้อความล่าสุด"}]},
        {id:1, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
        {id:2, name:"ชื่อแอค", massages:[{name:"ชื่อแอค", massage:"hi"},{name:"realguy", massage:"ข้อความล่าสุด"}]},
        {id:3, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
        {id:4, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
        {id:5, name:"ชื่อแอค", massages:[{name:"realguy", massage:"hi"},{name:"ชื่อแอค", massage:"ข้อความล่าสุด"}]},
        {id:6, name:"ชื่อแอค", massages:[{name:"ชื่อแอค", massage:"hi"},{name:"realguy", massage:"ข้อความล่าสุด"}]}
    ];
    return (
        <div className="h-full w-full fixed overflow-hidden flex flex-col pb-[26px]">
            <div className="w-full top-2 font-['KOO-KINN'] text-[45px] text-[#E76F51] text-center">
                MASSAGE
            </div>
            <div className="pt-8 grid gap-10 h-[600px] overflow-auto">
                {chat.map(chat => (
                    <div className="w-[324px] h-[80px] justify-self-center flex sticky top-[0px] bg-[#fff7ed] rounded-l-[40px] rounded-r-md hover:drop-shadow-md hover:scale-105" id={chat.id}>
                        <img src={vite} className="h-16 w-16 m-2 rounded-full bg-white items-center" />
                        <div className="w-full pl-2 content-center">
                            <div className="pb-2 font-['Abhaya'] text-black text-[15px] font-bold">-{chat.name}-</div>
                            <div className="font-['Abhaya'] text-[#A09A9A] text-[9px]">{chat.massages[chat.massages.length - 1].name + ": " + chat.massages[chat.massages.length - 1].massage}</div>
                            <svg className="absolute bottom-2 stroke-[#D9D9D9] stroke-2" viewBox="0 0 249 2" xmlns="http://www.w3.org/2000/svg">
                              <line x1="0" y1="0" x2="230" y2="0" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Massage;