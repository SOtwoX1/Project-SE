export default function Setting_pro() {
    const go_to_profile = () => {
        window.location.href = "/profile";
    }
    const email = {
        "email": "@gmail.com",
    }
    return(
        
        <div 
          className="w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col p-3 pt-[8px]" 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="flex flex-row items-center justify-center border border-red">
                <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                <span className="text-[#E76F51] text-[45px] font-extrabold">SETTINGS</span>
                <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
            </div>
            <div className="flex flex-col  divide-y divide-blue border border-red">
                <div className="flex items-center h-[65px]">
                    <button onClick={go_to_profile} >
                        <svg class="w-[47px] h-[47px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                        </svg>
                    </button>
                    <p className="text-2xl text-black">PROFILE</p>
                </div>
                <div className="flex justify-between text-2xl  items-center h-[65px]">
                    <p className="text-black p-12">Email</p>
                    <p className="text-[#D9D9D9]">{email.email}</p>
                </div>
                <div className="flex justify-between text-2xl  items-center h-[65px]">
                    <p className="text-black p-12">Show Me</p>
                    <button>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-2xl  items-center h-[65px]">
                    <p className="text-black p-12">Password</p>
                    <button>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-2xl  items-center h-[65px]">
                    <p className="text-black p-12">Manage Payment Account</p>
                    <button>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-2xl  items-center h-[65px]">
                    <p className="text-black p-12">My Package</p>
                    <button>
                        <svg class="w-[29px] h-[29px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m9 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between text-2xl h-[50px] items-center ">
                </div>
                <button className="w-[331px] h-[39px] rounded-lg bg-red text-xl text-white">
                    Logout
                </button>
            </div>
            
        </div>
    );
}