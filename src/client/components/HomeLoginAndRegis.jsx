import { Button } from "react-scroll";
import Swal from 'sweetalert2';
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
            <div className="fixed overflow-hidden flex flex-col justify-center space-y-[122px]">
                <div>
                    <img className="w-[424px] h-[469px]"
                    src="src\client\img\homelogin.png"
                    alt="logo" />
                </div>
    
                <div className="flex flex-col justify-center items-center space-y-[15px]">
                    <Button 
                    class=" w-[331px] h-[56px] text-black bg-yellow font-medium rounded-lg"
                    onClick={go_to_Login}>
                    Login
                    </Button>

                    <Button 
                    className="w-[331px] h-[56px] border border-yellow font-medium rounded-lg " 
                    onClick={go_to_regis}>
                    Register
                    </Button>
                </div>
                
                
            </div>
          );
}