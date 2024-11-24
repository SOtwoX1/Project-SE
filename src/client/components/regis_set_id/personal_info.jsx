export default function Personal_info(){
    return (
        <div 
          className="overflow-y-scroll overflow-x-hidden fixed w-full h-full flex flex-col  pt-[8px] " 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[50px] h-[50px] absolute left-[6%] mt-3 -rotate-3" src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px] mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[40px] font-extrabold">EDIT PROFILE</span>
                    <img className="w-[22px] h-[27px] mt-[-45px] absolute right-[14%] rotate-6" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[50px] h-[50px] absolute right-[8%] mt-6 transform -rotate-12" src="src/client/img/pizza.png" alt="Pizza" />
                </div>
        </div>
    );
}