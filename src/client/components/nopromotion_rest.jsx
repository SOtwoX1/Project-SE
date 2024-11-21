import Swal from 'sweetalert2';

export default function Nopromotion_restaurant(){
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
      const go_to_Whothere = async () => {
        window.location.href = "http://localhost:3000/profile";
      };
      const pin_rest = () => {
        Swal.fire({ title: "Pin Restaurant", icon: "success"});
      }
    return (
        <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center ">
            <div 
                className="bg-white w-[375px] h-[717px] rounded-b-[50px]  font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px] p-3" 
                style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center">
                    <img className="w-[55px] h-[55px] " src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[45px] font-extrabold">RESTAURANT</span>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[55px] h-[55px] " src="src/client/img/pizza.png" alt="Pizza" />
                </div>
                <div className="flex flex-col w-full justify-start divide-y divide-gray-300">
                    <div className="flex items-center h-[65px]">
                        <button onClick={go_to_restaurant} className="ml-2" >
                            <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                            </svg>
                        </button>
                        <div className="flex flex-row space-x-1">
                            <p className="text-[15px] text-black">ชื่อร้านอาหาร</p>
                            <p className="text-[15px] text-black"> ................</p>
                        </div>
                        
                    </div>
                    <div className="w-full"></div>    
                </div>
                <div className="flex flex-col justify-between h-[530px]">
                    <div className="flex flex-col justify-center space-y-5 mt-5">
                        <img 
                            className="w-[325px] h-[180px] object-cover" 
                            src="https://via.placeholder.com/300x250?text=Image+1" 
                            alt="รูปอาหาร" 
                        />
                        <div className="w-[325px] h-auto border">
                            <p className="text-[12px] text-black">บรรยายร้านอาหาร  {/**/} .....................................</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between w-[320px]">
                        <button onClick={pin_rest} className="bg-[#B7D55A] w-[75px] h-[75px] rounded-full">
                            <div className="relative flex flex-col space-y-1 ">
                                <img className="w-[34px] h-[31px] object-cover m-auto" src="src\client\img\Fast Food.png" alt="Chilling IMG" />
                                <p className="text-[12px] text-white">Chilling</p>
                            </div>
                        </button>
                        <button onClick={go_to_Whothere} className="bg-[#F6A570] w-[75px] h-[75px] rounded-full">
                            <div className="relative flex flex-col space-y-2 ">
                                <img className="w-[35px] h-[32px] object-cover m-auto" src="src\client\img\Location.png" alt="Who’s there IMG" />
                                <p className="text-[11px] text-white">Who’s there</p>
                            </div>
                        </button>
                    </div>
                </div>
                
                
            </div>
            <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/messege.png" alt="message icon" onClick={go_to_message} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/accept.png" alt="accept icon" onClick={go_to_accept} />
                <div className="w-[67px] h-[67px] rounded-full flex items-center justify-center bg-white border-2 border-[#F4A261] cursor-pointer ">
                    <img className="w-[48px] h-[48px] cursor-pointer" src="src/client/img/restaurant_notblack.png" alt="restaurant icon" onClick={go_to_restaurant} />   
                </div>
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/match.png" alt="match icon" onClick={go_to_match} />
                <img className="w-[67px] h-[67px] cursor-pointer" src="src/client/img/profile.png" alt="profile icon" onClick={go_to_profile} />
            </div>
        </div>
    );
}