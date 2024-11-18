export default function Show_me() {
    const go_to_setting_profile = () => {
        window.location.href = "/Setting_profile";
    }
    const email = {};
    const handleClick = (category) => {
        console.log(`Category selected: ${category}`);
    };
    return (
        <div className="w-full h-full fixed top-0 flex bg-white items-center justify-center"
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="w-[375px] h-[812px] text-[45px] font-extrabold text-[#E76F51] flex flex-col p-3 pt-[8px]">
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px] mt-14 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[45px] font-extrabold">SHOW ME</span>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[18%]" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
                </div>
                <div className="divide-y divide-gray-300 ml-2 mr-2">
                    <div className="flex items-center h-[65px]">
                        <button onClick={go_to_setting_profile} className="ml-2">
                            <svg className="w-[40px] h-[40px] text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7" />
                            </svg>
                        </button>
                        <p className="text-[20px] text-black">SETTINGS</p>
                    </div>
                    <div className="flex justify-between text-[20px] items-center h-[65px]">
                        <button onClick={() => handleClick('Men')} className="text-black p-12">Men</button>
                    </div>
                    <div className="flex justify-between text-[20px] items-center h-[65px]">
                         <button onClick={() => handleClick('Women')} className="text-black p-12">Women</button>
                    </div>
                    <div className="flex justify-between text-[20px] items-center h-[65px]">
                        <button onClick={() => handleClick('Everyone')} className="text-black p-12">Everyone</button>
                    </div>
                    <div className="flex justify-between text-[10px] items-center h-[65px]">
                        <p className="text-black p-12">You will only see your  selected in discovery.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

