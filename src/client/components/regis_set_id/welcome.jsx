import React from "react";

export default function Welcome() {
  const go_to_personal_info = () => {
    window.location.href = "/Personal-info";
  };

  return (
    <div
      className="fixed overflow-hidden flex bg-white items-center justify-center w-screen h-screen"
      style={{ fontFamily: "Abhaya Libre, sans-serif" }}>
      <div className="w-[375px] h-[812px]  text-[45px] font-extrabold flex flex-col pt-[15px]">
        <div className="relative flex flex-row items-center justify-center">
            <img 
            className="w-[211px] h-[220px] object-cover"
            src="src\client\img\image 2.png" alt="Logo" />
        </div>

        <div className="text-center mt-[10px]">
          <p className="text-[25px] text-black">Welcome to KOO - KINN</p>
          <p className="text-[20px] text-black mt-1">
            Please follow these House Rules
          </p>
        </div>

        <div className="mt-[60px] space-y-4 px-6 text-[16px] text-black">
          <div className="flex items-start space-x-3">
            <img className="w-[43px] h-[43px]" src="src/client/img/spoon.png" alt="" />
            <p>
              <strong className="text-[20px]" >Be yourself.</strong>
              <br /> 
              Make sure your photos, age, and bio
              are true to who you are.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <img className="w-[43px] h-[43px]" src="src/client/img/fork.png" alt="" />
            <p>
              <strong className="text-[20px]">Stay safe.</strong> 
              <br />
              Don’t be too quick to give out
              personal information. [Date Safely]
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <img className="w-[43px] h-[43px]" src="src/client/img/Tableware.png" alt="" />
            <p>
              <strong className="text-[20px]">Play it cool.</strong> 
              <br />
              Respect others and treat them as
              you would like to be treated.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={go_to_personal_info}
            className="w-[331px] h-[39px] bg-[#E9C46A] text-white text-[16px] rounded-2xl">
            I AGREE
          </button>
        </div>
      </div>
    </div>
  );
}
