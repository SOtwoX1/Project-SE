import {useState} from 'react';

export default function Personal_info(){
    const go_to_add_photo = () => {
        window.location.href = "/Add-photo";
    }

    const [selectedCategory, setSelectedCategory] = useState(null);
    //เลือกเพศ
    const handleClick = (category) => {
        setSelectedCategory(category);
        console.log(`Category selected: ${category}`);
    };
    //เลือกอาหาร
    const [selectedCategories, setSelectedCategories] = useState([]);
      
    const handleButtonClick = (category) => {
        setSelectedCategories((prev) => {
        if (prev.includes(category)) {
              // ถ้ามีหมวดหมู่อยู่ในรายการแล้ว ให้ลบออก
            return prev.filter((item) => item !== category);
        } else {
            // ถ้ายังไม่มี ให้เพิ่มเข้าไป
            return [...prev, category];
            }
          });
        };
    return (
        <div 
          className="overflow-y-scroll overflow-x-hidden fixed w-full h-full flex flex-col pt-[8px] p-4 space-y-12 " 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[55px] h-[55px] absolute left-[3%] top-[3.3%] mt-3 -rotate-2" src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px] mt-12 absolute left-[20%] top-[2%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[45px] font-extrabold text-center">PERSONAL INFOMATION</span>
                    <img className="w-[22px] h-[27px] mt-[-45px] absolute right-[17%] top-[6.5%] rotate-6" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[50px] h-[50px] absolute right-[6%] bottom-[88%]  transform -rotate-12" src="src/client/img/pizza.png" alt="Pizza" />
                </div>
                {/*-------Your first name------*/}
                <div className="flex flex-col space-y-5 ">
                    <div className="flex flex-col space-y-1">
                        <p className="text-xl">Your first name</p>
                        <div className="flex flex-col divide-y divide-gray-300">
                            <input 
                            type="text" 
                            placeholder="Your first name"
                            className="border-none focus:outline-none focus:ring-0 focus:border-transparent"/>
                            <div className="h-2"></div>
                        </div>
                        <p className="text-xs text-gray-400">This is how it will appear in KOO-KNN</p>
                    </div>
                    {/*-------My birthday is------*/}
                    <div className="flex flex-col space-y-1">
                        <p className="text-xl">My birthday is</p>
                        <div className="flex flex-col divide-y divide-gray-300">
                            <input 
                            type="text" 
                            placeholder="BB/MM/YYYY"
                            className="border-none focus:outline-none focus:ring-0 focus:border-transparent"/>
                            <div className="h-2"></div>
                        </div>
                        <p className="text-xs text-gray-400">Your age will be public</p>
                    </div>
                    {/*-------Your age will be public------*/}
                    <div>
                        <p className="text-xl">I am a</p>
                        <div className="flex flex-col justify-start divide-y divide-gray-300 p-3 ">
                            <div>
                                <button
                                    onClick={() => handleClick('Man')}
                                    className={" h-[40px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Man
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Woman')}
                                    className={" h-[40px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Woman
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Gay')}
                                    className={" h-[45px]   my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Gay
                                </button>
                            </div>
                            
                            <div>
                                <button
                                    onClick={() => handleClick('Lesbian')}
                                    className={" h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Lesbian
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Bisexual')}
                                    className={" h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Bisexual
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Asexual')}
                                    className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Asexual
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Demisexual')}
                                    className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Demisexual
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Pansexual')}
                                    className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Pansexual
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Queer')}
                                    className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Queer
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Questioning')}
                                    className={" h-[45px]   my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Questioning
                                </button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    {/*-------Show Me------*/}
                    <div>
                        <p className="text-xl">Show Me</p>
                        <div className="flex flex-col justify-start divide-y divide-gray-300 p-3 ">
                            <div>
                                <button
                                    onClick={() => handleClick('Man')}
                                    className={" h-[40px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Man
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Woman')}
                                    className={" h-[40px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Woman
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleClick('Everyone')}
                                    className={" h-[45px]   my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                    Everyone
                                </button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    {/*--------My university is-----*/}
                    <div className="flex flex-col space-y-1">
                        <p className="text-xl">My university is</p>
                        <div className="flex flex-col divide-y divide-gray-300">
                            <input 
                            type="text" 
                            placeholder="Your university"
                            className="border-none focus:outline-none focus:ring-0 focus:border-transparent"/>
                            <div className="h-2"></div>
                        </div>
                        <p className="text-xs text-gray-400">Your age will be public</p>
                    </div>
                    {/*--------Food Lifestyle-----*/}
                    <div>
                        <p className="my-auto text-xl">Food Lifestyle</p>
                        
                        <div className="flex flex-col space-y-4 mt-4">
                            <div className="flex flex-row gap-3 justify-center">
                                <button onClick={() => handleButtonClick('ร้านอาหารจานด่วน')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารจานด่วน') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารจานด่วน </button>
                                <button onClick={() => handleButtonClick('ร้านอาหารบุฟเฟต์')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารบุฟเฟต์') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารบุฟเฟต์  </button>
                            </div>
                            <div className="flex flex-row gap-3 justify-center">
                                <button onClick={() => handleButtonClick('ร้านอาหารท้องถิ่น')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารท้องถิ่น') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารท้องถิ่น  </button>
                                <button onClick={() => handleButtonClick('ร้านอาหารนานาชาติ')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารนานาชาติ') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารนานาชาติ</button>
                            </div>
                            <div className="flex flex-row gap-3 justify-center">
                                <button onClick={() => handleButtonClick('ร้านอาหารเดลิเวอรี')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารเดลิเวอรี') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารเดลิเวอรี</button>
                                <button onClick={() => handleButtonClick('ร้านกาแฟ')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านกาแฟ') ? 'bg-[#E9C46A]' : ''}`}>ร้านกาแฟ</button>
                            </div>
                            <div className="flex flex-row gap-3 justify-center">
                                <button onClick={() => handleButtonClick('ร้านอาหารตามสั่ง')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารตามสั่ง') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารตามสั่ง</button>
                                <button onClick={() => handleButtonClick('ร้านอาหารระดับหรู')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารระดับหรู') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารระดับหรู</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='m-auto text-white text-[16px] py-6 '>
                    <button 
                    onClick={go_to_add_photo}
                    className='w-[331px] h-[39px] bg-[#E9C46A] rounded-2xl'>
                    CONTINUE</button>
                </div>
                
        </div>
    );
}