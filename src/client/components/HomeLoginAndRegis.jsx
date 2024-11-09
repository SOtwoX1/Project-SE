import { Button } from "react-scroll";
import Swal from 'sweetalert2';

export default function HomeLoginAndRegister() {
    const go_to_Login = async() => {
        await Swal.fire({ title: "Next Page", icon: "success", timer: 5000 }); //wait 5 seconds and go to next page
        window.location.href = "http://localhost:3000/Login";
      }

    const go_to_regis = async() => {
        await Swal.fire({ title: "Next Page", icon: "success", timer: 5000 }); //wait 5 seconds and go to next page
        window.location.href = "http://localhost:3000/regis";
      }
    return(
            <div className="flex flex-col justify-center space-y-[122px]">
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