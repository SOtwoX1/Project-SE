import { useNavigate } from "react-router-dom";

export default function Change_passwords(){
    const navigate = useNavigate();
    const go_to_setting = () => {
        navigate("/Setting-Profile");
    };
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center space-y-[51px]">
            <div className="flex flex-col justify-center items-center space-y-[35px]">
                <img 
                src="src\client\img\Sticker.png" 
                alt="Sucess Img" 
                className="w-[100px] h-[100px]"
                />
                <div className="w-[375px] h-[74px] flex flex-col text-center space-y-[20px]">
                    <p className="text-2xl font-semibold">Change Password Sucessfully</p>
                    <p className="text-sm text-[#8391A1]">Your password has been changed !!!</p>
                </div>
            </div>
            <div>
                <button 
                onClick={go_to_setting}
                className="w-[331px] h-[56px] text-white bg-[#E9C46A] rounded-lg font-semibold">
                    Back to settings
                </button>
            </div>
        </div>
    );
}