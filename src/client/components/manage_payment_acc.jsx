export default function Manage_Payment_Account () {
    const go_to_setting = () => {
        window.location.href = "/Setting-Profile";
    }
    const go_to_sucess_MPA = () => {
        window.location.href = "/Success-Manage-Payment-Account";
    }
    return (
        <div 
          className="fixed overflow-hidden w-[375px] h-[812px] rounded-b-[50px] text-[45px] font-extrabold flex flex-col p-3 pt-[16px] " 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className=" flex flex-row items-center justify-center ">
                <img className="w-[55px] h-[55px] absolute left-[-1%] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px] mt-12 absolute left-[12%]" src="src/client/img/heart.png" alt="Heart" />
                <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[9%]" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[55px] h-[55px] mr-[-325px] " src="src/client/img/pizza.png" alt="Pizza" />
                <span className="absolute text-[#E76F51] text-[45px] font-extrabold">UPDATE CARD</span>
            </div>

            <div className="flex flex-col pt-[3px] divide-y divide-gray-300">
                <div className="flex items-center h-[65px]">
                    <button onClick={go_to_setting} className="ml-2" >
                        <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                        </svg>
                    </button>
                    <p className="text-[20px] text-black">SETTINGS</p>
                </div>
                <div>
                    <p className="text-[18px] text-black pl-3 pt-2">Add Your Credit Card</p>
                    <div className="grid grid-col-2 gap-1  divide-y divide-gray-300">
                        <div className="col-span-2">
                            <input 
                            type="text" 
                            placeholder="Cardholder Name" 
                            className="w-[325px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent"/>
                        </div>
                        <div className="col-span-2">
                            <input 
                            type="text" 
                            placeholder="Card Number"
                            className="w-[325px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        
                        <div className="col-span-1">
                                <input
                                type="text" 
                                placeholder="MM/YY" 
                                className="w-[162px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        <div className="col-span-1">
                                <input 
                                type="text" 
                                placeholder="CVC" 
                                className="w-[162px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent"/>
                                
                        </div>
                        <div className="col-span-1 "></div>
                        <div className="col-span-1" ></div>
                               
                    </div>
                    <div className="text-center mt-[40px]">
                        <button 
                        onClick={go_to_sucess_MPA}
                        className="w-[331px] h-[39px] bg-[#E9C46A] text-white text-[16px] font-bold rounded-lg">
                            Save new card
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>    
    );
}