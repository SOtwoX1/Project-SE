export default function Restaurant() {
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

      const promotion = [
      {id:0, res_name:"ชื่อร้านอาหาร", Synopsis:"คำแนะนำร้าน", category:"ประเภทร้านอาหาร",time:"ระยะเวลา"},
      {id:1, res_name:"ชื่อร้านอาหาร", Synopsis:"คำแนะนำร้าน", category:"ประเภทร้านอาหาร",time:"ระยะเวลา"},
      {id:2, res_name:"ชื่อร้านอาหาร", Synopsis:"คำแนะนำร้าน", category:"ประเภทร้านอาหาร",time:"ระยะเวลา"},
      {id:3, res_name:"ชื่อร้านอาหาร", Synopsis:"คำแนะนำร้าน", category:"ประเภทร้านอาหาร",time:"ระยะเวลา"},
      
    ];
  
      return (
        <div className="bg-[#E9C46A] h-[812px] fixed overflow-auto flex flex-col items-center">
          <div 
            className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px] space-y-[50px]" 
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="flex flex-row items-center justify-center">
              <img className="w-[55px] h-[55px] " src="src/client/img/French Fries.png" alt="French Fries" />
              <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
              <span className="text-[#E76F51] text-[45px] font-extrabold">RESTAURANT</span>
              <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
              <img className="w-[55px] h-[55px] " src="src/client/img/pizza.png" alt="Pizza" />
          </div>
          
          <div className="relative flex items-center w-[332px] h-[35px] ">
                <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                  <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>

                <label htmlFor="Search" className="sr-only"> Search </label>
                <input
                  type="text"
                  id="Search"
                  placeholder="Search"
                  className="w-full bg-[#F4E4CD] rounded-full py-2 pl-10 pr-4 shadow-sm sm:text-sm"
                />
          </div>

          <div className="space-y-[37px] ">
            {
              promotion.map(promotions => (
                <div className="flex flex-col w-[308px] h-[90px] bg-[#D9D9D9] p-2 relative">
                  <div className="flex flex-col justify-center w-[234px] h-[77px] bg-[#FFFFFF] ">
                      <p className="text-black text-sm">ชื่อร้าน :{promotions.res_name}</p>
                      <p className="text-black text-sm">กล่าวแนะนำร้านอาหาร :{promotions.Synopsis}</p>
                      <p className="text-black text-sm">ประเภทร้านอาหาร :{promotions.category}</p>
                  </div>
                  <div className=" absolute bottom-[1%] left-[81%] h-[88px] border-l border-dashed border-[#FFFFFF]"></div>
                  <div className="absolute right-[1px] transform translate-y-3 rotate-90 mt-1">
                    <p className="text-[#F56464] text-[14px] text-center font-bold">
                      Promotion
                    </p>
                    <p className="text-[#FFFFFF] text-[12px] text-center rounded ">
                      ระยะเวลา{promotions.duration}
                    </p>
                  </div>
                </div>
              ))
              
            }

            
              

              
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