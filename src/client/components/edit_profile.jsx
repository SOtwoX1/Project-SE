export default function Edit_pro() {
    const go_to_profile = () => {
        window.location.href = "/profile";
    }
    const img_pro = [
        { id: 1, src: "https://i.imgur.com/8Q6Q"},
    ]
    return(
        
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
                <div className="">
                    <div className="flex items-center h-[65px]">
                        <button onClick={go_to_profile} className="ml-2" >
                            <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                            </svg>
                        </button>
                        <p className="text-xl text-black">PROFILE</p>
                    </div>
                </div>
                <div className="table-auto mx-auto w-full "> 
                    <thead>
                        <tr className="flex justify-center">
                            <th class="w-[187.25px] bg-gray-300 border border-black  px-4 py-2">Title</th>
                            <th class="w-[187.25px] bg-gray-300 border border-black px-4 py-2">Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        //map
                        <div>

                        </div>
                    </tbody>                   

                </div>
        </div>


    );
}