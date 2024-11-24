import React, { useState } from "react";

export default function AddPhoto() {
  const [images, setImages] = useState(Array(4).fill(null)); // สร้าง state สำหรับเก็บรูปภาพ (สูงสุด 4 รูป)

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const canContinue = images.filter((img) => img).length >= 2; // ตรวจสอบว่ามีรูปอย่างน้อย 2 รูป

  const go_to_profile = () => {
    if (canContinue) {
      window.location.href = "/profile"; // ลิงก์ไปยังหน้าที่ต้องการ
    }
  };

  return (
    <div
      className="fixed overflow-hidden flex bg-white items-center justify-center"
      style={{ fontFamily: "Abhaya Libre, sans-serif" }}>
      <div className="w-[375px] h-[812px] text-[45px] font-extrabold flex flex-col pt-[15px]">
        
        <div className="flex flex-row items-center justify-center ">
          <img
            className="w-[55px] h-[55px] absolute left-[1%] mr-4"
            src="src/client/img/French Fries.png"
            alt="French Fries"/>
          <img
            className="w-[22px] h-[27px] mt-12 absolute left-[12%]"
            src="src/client/img/heart.png"
            alt="Heart"/>
          <img
            className="w-[22px] h-[27px] mt-[-40px] absolute right-[10%]"
            src="src/client/img/heart2.png"
            alt="Heart"/>
          <img
            className="w-[55px] h-[55px] mr-[-310px]"
            src="src/client/img/pizza.png"
            alt="Pizza"/>
          <span className="absolute text-[#E76F51] text-[45px] font-extrabold">
            ADD PHOTOS
          </span>
        </div>

        <p className="text-[20px] text-black p-5 ">Add least 2 photos to continue</p>

        <div className="grid grid-cols-2 gap-8 mt-[-20px] p-5 h-[570px]">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[148px] h-[236px] border border-black rounded-[10px] border-dashed flex items-center justify-center bg-[#C4C4C4]"
            >
              {image ? (
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-[10px]"/>
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute bottom-0 right-0 bg-transparent mb-[-8px] mr-[-8px]">
                    <img
                      src="src/client/img/close.png"
                      alt="Delete"
                      className="w-6 h-6"/>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <span className="text-gray-400 text-white text-[80px]">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"/>
                </label>)}
            </div>))}
        </div>
        <div className="flex items-center justify-center">
        <button
          onClick={go_to_profile}
          className={`w-[331px] h-[39px] bg-[#E9C46A] rounded-2xl font-bold text-white text-[16px] mt-5 ${
            canContinue ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!canContinue}>
          CONTINUE
        </button>
        </div>
      </div>
    </div>
  );
}
