import { Carousel, Sidebar } from "flowbite-react";
import {useState} from "react";

export default function Edit_pro() {
    const go_to_profile = () => {
        window.location.href = "/profile";
    }
    const go_to_edit = () => {
        window.location.href = "/profile";
    }
    const go_to_preview = () => {
        window.location.href = "/profile";
    }
    const img_pro = [
        { id: 1, src: "src\client\img\freepik__candid-image-photography-natural-textures-highly-r__97451.jpeg"},
        
    ]
    const handleClick = (category) => {
        setSelectedCategory(category);
        console.log(`Category selected: ${category}`);
    };
    
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
                            <th class="w-[187.25px] bg-gray-300 border border-black  px-4 py-2">
                                <button onClick={go_to_edit}>Edit</button>
                            </th>
                            <th class="w-[187.25px] bg-gray-300 border border-black px-4 py-2">
                                <button onClick={go_to_preview}>Preview</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <div className="relative m-auto w-full h-[405px] bg-gray-300 border border-black">
                            {img_pro.map(img_pro => (
                            <div id={img_pro.id} className="w-full h-[405px] ">
                                <img src={img_pro.src} alt={"img"+img_pro.id} />
                            </div>
                        ))}
                        </div>
                        
                    </tbody>
                    <div className="w-full h-[47px] bg-gray-300 flex">
                        <p className="my-auto text-[20px]">ABOUT ME</p>
                    </div>
                    <div className="w-full h-auto flex">
                        <p className="my-auto text-[20px]">**เอาไว้พิมพ์แนะนำตัว**</p>
                    </div>                   
                    <div className="w-full h-[47px] bg-gray-300 flex">
                        <p className="my-auto text-[20px]">Sexual Orentation</p>
                    </div>
                    <div className="flex flex-col justify-start divide-y divide-gray-300 p-3">
                        <button
                             onClick={() => handleClick('Straight')}
                             className={"w-full h-[40px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Straight
                         </button>
                         <button
                             onClick={() => handleClick('Gay')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Gay
                         </button>
                         <button
                             onClick={() => handleClick('Lesbian')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Lesbian
                         </button>
                         <button
                             onClick={() => handleClick('Bisexual')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Bisexual
                         </button>
                         <button
                             onClick={() => handleClick('Asexual')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Asexual
                         </button>
                         <button
                             onClick={() => handleClick('Demisexual')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Demisexual
                         </button>
                         <button
                             onClick={() => handleClick('Pansexual')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Pansexual
                         </button>
                         <button
                             onClick={() => handleClick('Queer')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Queer
                         </button>
                         <button
                             onClick={() => handleClick('Questioning')}
                             className={"w-full h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                             Questioning
                         </button>
                    </div>
                    <div className="w-full h-[47px] bg-gray-300 flex">
                        <p className="my-auto text-[20px]">Lifestyle</p>
                    </div>
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


    );
}