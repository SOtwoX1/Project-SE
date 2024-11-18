export default function Password() {
    const go_to_setting = () => {
        window.location.href = "/Setting-Profile";
    };
    const go_to_change_password = () => {
        window.location.href = "/Change-Password";
    }

    return (
        <div className="w-full h-full fixed top-0 flex bg-white items-center justify-center"
            style={{ fontFamily: 'Abhaya Libre, sans-serif'}}>
            <div className="w-[375px] h-[812px] text-[45px] font-extrabold  flex flex-col p-3 pt-[8px]">
                <div className="flex flex-row items-center justify-center ">
                    <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                    <img className="w-[22px] h-[27px] mt-14 absolute left-[14%]" src="src/client/img/heart.png" alt="Heart" />
                    <span className="text-[#E76F51] text-[45px] font-extrabold">PASSWORD</span>
                    <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[14%]" src="src/client/img/heart2.png" alt="Heart" />
                    <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
                </div>
                <div className="divide-y divide-gray-300">
                <div className="flex items-center h-[65px]">
                        <button onClick={go_to_setting} className="ml-2">
                            <svg className="w-[42px] h-[42px] text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7" />
                            </svg>
                        </button>
                        <p className="text-[20px] text-black">SETTINGS</p>
                    </div>
                    <div style={{height: "1px", background: "linear-gradient(to right, #D1D5DB, #D1D5DB)", transform: "scaleY(0.8)"}}></div>
                </div>
                <div className="flex flex-col p-5 mt-[-10px]">
                    <h2 className="text-[18px] text-black font-bold mb-1">Set a new password</h2>
                    <p className="text-[12px] text-[#989898] mb-4">
                        Create a new password. Ensure it differs from previous ones for security.</p>
                    <form className="flex flex-col gap-3">
                        <p className="text-[16px] text-black">Password</p>
                        <input
                            type="password"
                            className="w-full p-[3px] border border-gray-300 border-[2px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E1E1E1]" />
                        <p className="text-[16px] text-black">New Password</p>
                        <input
                            type="password"
                            className="w-full p-[3px] border border-gray-300 border-[2px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E1E1E1]" />
                        <p className="text-[16px] text-black">Confirm Password</p>
                        <input
                            type="password"
                            className="w-full p-[3px] border border-gray-300 border-[2px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E1E1E1]" />
                        <button
                            type="button"
                            onClick={go_to_change_password}
                            className="w-full p-[5px] mt-6 bg-[#E9C46A] text-white rounded-xl text-[16px] font-bold focus:outline-none focus:ring-2 ">
                                Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
