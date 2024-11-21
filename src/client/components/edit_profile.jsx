import { Carousel, Sidebar } from "flowbite-react";
import Slider from 'react-slick';
import { Card, Typography, Button, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useState} from "react";

export default function Edit_pro() {
    const go_to_profile = () => {
        window.location.href = "/profile";
    }
    const go_to_edit = () => {
        window.location.href = "/Edit";
    }
    const go_to_preview = () => {
        window.location.href = "/Previewnew";
    }
    //ide bar
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);

    const images = [
        'https://via.placeholder.com/300x250?text=Image+1', // เปลี่ยน URL เป็นรูปจริง
        'https://via.placeholder.com/300x250?text=Image+2',
        'https://via.placeholder.com/300x250?text=Image+3',
      ];
    //ัดรู
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX); // Store initial touch position
    };
    // Handle swipe end
    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX; // Store end touch position
        const diff = endX - startX;

        if (diff > 50) {
            // Swipe Right
            setCurrentIndex((prevIndex) => 
                (prevIndex - 1 + images.length) % images.length
            );
        } else if (diff < -50) {
            // Swipe Left
            setCurrentIndex((prevIndex) => 
                (prevIndex + 1) % images.length
            );
        }
    };

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
                                <button onClick={go_to_edit} className="w-[100.25px]">Edit</button>
                            </th>
                            <th class="w-[187.25px] bg-gray-300 border border-black px-4 py-2">
                                <button onClick={go_to_preview} className="w-[100.25px]">Preview</button>
                            </th>
                        </tr>
                    </thead>
                    
                    <div className="relative w-full mx-auto ">
                        <div 
                            className="overflow-hidden w-full h-[405px] relative"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                                <div
                                    className="flex transition-transform duration-500"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                    }}
                                >
                                    {images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="min-w-full h-[405px] flex-shrink-0"
                                        >
                                            <img
                                                src={img}
                                                alt={`Profile ${index + 1}`}
                                                className="w-[375px] h-full object-cover border border-black"
                                            />
                                        </div>
                                        
                                    ))}
                                </div>
                        </div>
                            
                            <div className="absolute bottom-[96%] left-1/2 -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-[60px] h-1 rounded-lg mt-3  ${
                                            currentIndex === index ? 'bg-white' : 'bg-gray-300'
                                        }`}
                                    ></button>
                                ))}
                            </div>

                    </div>

                                
                    
                    <div className="w-full h-[47px] bg-gray-300 flex">
                        <p className="pl-2 my-auto text-[20px]">ABOUT ME</p>
                    </div>
                    <div className="w-full h-auto flex">
                        <p className="pl-2 my-auto text-[20px]">**เอาไว้พิมพ์แนะนำตัว**</p>
                    </div>                   
                    <div className="w-full h-[47px] bg-gray-300 flex">
                        <p className="pl-2 my-auto text-[20px]">Sexual Orentation</p>
                    </div>
                    <div className="flex flex-col justify-start divide-y divide-gray-300 p-3 ">
                        <div>
                            <button
                                onClick={() => handleClick('Straight')}
                                className={" h-[40px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                                Straight
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
                    </div>
                    <div className="w-full h-[47px] bg-gray-300 flex">
                        <p className="pl-2 my-auto text-[20px]">Lifestyle</p>
                    </div>
                    <div className="flex flex-col space-y-4 mt-4 h-[250px]">
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