import { Button } from "react-scroll";

export default function Forgetpass() {
    const go_to_login = async() => {
        window.location.href = "http://localhost:3000/Login";
    } 
    const cheackemail = () => {
        window.location.href = "http://localhost:3000/OTP";
    }

    return (
        <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
            <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px] ">
                
                    <Button onClick={go_to_login} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                        <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                        </svg>

                    </Button>
                    
                    <form className="flex flex-col justify-center space-y-[32px]">
                        <div className="flex flex-col w-[331px] h-[97px] space-y-[10px]">
                            <p className="text-3xl font-semibold ">Forgot Password?</p>
                            <p className="text-[#8391A1]">Don't worry! It occurs. Please enter the email address linked with your account.</p>
                        </div>
                        
                        <div className="flex flex-col space-y-3 ">
                            <input type="email" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Enetr your email"/>   
                        </div>

                        <Button
                        onClick={cheackemail}
                        className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold">
                            Send Code
                        </Button>    
                    </form>

            </div>

            <div className="flex flex-row justify-center space-x-1">                        
                    <p>Remember Password?</p>
                    <Button onClick={go_to_login} className="text-[#1b998b]">Login</Button>
            </div>

        </div>
    );
}