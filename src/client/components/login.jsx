import { Button } from "react-scroll"

export default function Login() {
    function cheackid(email,password){
        
    }
    const go_to_homelog = async() => {
        window.location.href = "http://localhost:3000/home-login-register";
      }
    const go_to_regis = async() => {
        window.location.href = "http://localhost:3000/Regis";
      }
    const go_to_forget = async() => {
        window.location.href = "http://localhost:3000/Forget-password";
      }
    return (
        <div className="fixed overflow-hidden flex flex-col space-y-[285px]">
                <div className="w-full h-full flex flex-col space-y-[28px]  mt-[56px] px-[21px]">
                
                    <Button onClick={go_to_homelog} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                        <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                        </svg>

                    </Button>
                    
                    <form className="flex flex-col justify-center space-y-5">
                        <div className="text-3xl font-semibold w-[280px] h-[78px]">Welcome back! Glad to see you, Again!</div>
                        
                        <div className="flex flex-col space-y-3 ">
                            <input type="email" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Enetr your email"/>
                            <input type="password" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Enter your password "/>
                            
                            <Button onClick={go_to_forget} className="text-[#6A707C] ml-auto">Forget Password ?</Button>   
                        </div>

                    
                        <Button 
                        onSubmit={cheackid}
                        className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg">
                            Log in
                        </Button>    
                    </form>

                </div>

            <div className="text-center">
                        Don't have an account? <Button onClick={go_to_regis} className="text-[#1b998b]">Register Now</Button> 
            </div>

        </div>
        
        
        
    );
}