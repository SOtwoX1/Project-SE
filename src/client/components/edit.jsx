import React, { useState } from "react";

export default function Edit() {
    const go_to_edit_profile = () => {
        window.location.href = "/NewEdit_pro";
    };

    const go_to_preview = () => {
        window.location.href = "/preview";
    };

    const [images, setImages] = useState([null, null, null, null]); //กำหนด 4 ช่องให้ใส่
    
    const handleImageUpload = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file); 
            setImages(newImages);
        }
    };

    const handleImageRemove = (index) => {
        const newImages = [...images];
        newImages[index] = null; 
        setImages(newImages);
    };

    return (
        <div
            className="fixed overflow-hidden flex bg-white items-center justify-center"
            style={{ fontFamily: "Abhaya Libre, sans-serif" }}>
            <div className="w-[375px] h-[812px] text-[45px] font-extrabold flex flex-col pt-[15px]">
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[55px] h-[55px] absolute left-[5%] mr-4" src="src/client/img/French Fries.png" alt="French Fries"/>
                    <img className="w-[22px] h-[27px] mt-12 absolute left-[22%]" src="src/client/img/heart.png" alt="Heart"/>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[22%]" src="src/client/img/heart2.png" alt="Heart"/>
                    <img className="w-[55px] h-[55px] mr-[-270px]" src="src/client/img/pizza.png" alt="Pizza"/>
                    <span className="absolute text-[#E76F51] text-[45px] font-extrabold">EDIT</span>
                </div>

                <div className="pt-[5px]">
                    <div className="flex items-center h-[65px] p-3">
                        <button onClick={go_to_edit_profile} className="ml-2">
                            <svg className="w-[42px] h-[42px] text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7"/>
                            </svg>
                        </button>
                        <p className="text-[20px] text-black">EDIT PROFILE</p>
                    </div>
                    <div className="w-full m-0 text-[20px] text-black bg-gray-300 border-t border-b border-black text-center py-1.5">
                        <button onClick={go_to_preview} className="w-full">
                            Preview
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 p-5 h-[570px]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-full w-[148px] h-[236px] border border-black rounded-[10px] border-dashed flex items-center justify-center bg-[#C4C4C4]">
                            {image ? (
                                <div className="relative w-full h-full">
                                    <img src={image} alt={"Uploaded ${index}"} className="w-full h-full object-cover rounded-[10px]"/>
                                    <button
                                       onClick={() => handleImageRemove(index)}
                                       className="absolute bottom-0 right-0 bg-transparent mb-[-8px] mr-[-8px]">
                                       <img src="src/client/img/close.png" alt="Delete" className="w-6 h-6" />
                                    </button>
                                </div>) : (
                                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                    <span className="text-gray-400 text-white text-[80px]">+</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, index)}
                                        className="hidden"/>
                                </label>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={go_to_edit_profile}
                    className="mx-auto w-[148px] h-[39px] p-[5px] mt-2 bg-[#F4A261] text-white rounded-xl text-[16px] font-bold focus:outline-none focus:ring-2">
                    Save
                </button>
            </div>
        </div>
    );
}
