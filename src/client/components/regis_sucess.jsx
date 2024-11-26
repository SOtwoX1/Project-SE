import { useNavigate } from "react-router-dom";
export default function Regis_sucess(){
    const navigate = useNavigate();
    const go_to_welcome = () => {
        navigate("/Welcome");
    }
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center space-y-[51px]">
            <div className="flex flex-col justify-center items-center space-y-[35px]">
                <img 
                src="src\client\img\Sticker.png" 
                alt="Sucess Img" 
                className="w-[100px] h-[100px]"
                />
                <div className="w-[232px] h-[74px] flex flex-col text-center space-y-[20px]">
                    <p className="text-2xl font-semibold">Register Sucessfully</p>
                    <p className="text-sm text-[#8391A1]">Your account has been created !!!</p>
                </div>
            </div>
            <div>
                <button 
                onClick={go_to_welcome}
                className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold">
                    Set up your Account
                </button>
            </div>
        </div>
    );
}