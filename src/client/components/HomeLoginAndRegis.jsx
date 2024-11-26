import { useNavigate } from "react-router-dom";

export default function HomeLoginAndRegister() {
   const navigate = useNavigate();
    const go_to_Login = async() => {
      navigate("/Login");
      }

    const go_to_regis = async() => {
      navigate("/regis");
      }
    return(
            <div className="fixed overflow-hidden flex flex-col justify-center space-y-1">
                <div>
                    <img className="w-[424px] h-[469px]"
                    src="src\client\img\homelogin.png"
                    alt="logo" />
                </div>
    
                <div className="flex flex-col justify-center items-center space-y-[15px]">
                    <div className="flex flex-col justify-center items-center space-y-[20px] mb-[25px]">
                      <p className="h-[53px] text-[45px] text-[#E76F51] text-center " style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>KOO - KINN</p>
                      <p className="w-[228px] h-[36px] text-center text-[15px] font-semibold">"Meet a new friend, share a meal, and create new memories."</p>
                    </div>
                    <button 
                    class=" w-[331px] h-[56px] text-black bg-yellow font-medium rounded-lg "
                    onClick={go_to_Login}>
                    Login
                    </button>

                    <button 
                    className="w-[331px] h-[56px] border border-yellow font-medium rounded-lg " 
                    onClick={go_to_regis}>
                    Register
                    </button>
                </div>
                
                
            </div>
          );
}