import {Button} from "react-scroll"

export default function Register() {
    const go_to_homelog = async() => {
        window.location.href = "http://localhost:3000/home-login-register";
      }
    const go_to_login = async() => {
        window.location.href = "http://localhost:3000/Login";
      }
      const check_regis = async() => {
        const id = {}
      } 
    return(
        <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
            <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">
                
                <Button onClick={go_to_homelog} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                    <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                    </svg>
                </Button>

                
                <form className="flex flex-col space-y-5 space">
                        <div className="text-3xl font-semibold w-[331px] h-[78px]">Hello! Register to get started</div>
                        
                        <div className="flex flex-col space-y-3 ">
                            <input type="text" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Uesrname"/>
                            <input type="Email" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Email"/>
                            <input type="password" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Enter your password "/>
                            <input type="password" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Confirm password "/>   
                        </div>
                    <Button
                        onSubmit={check_regis}
                        className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold">
                            Register
                    </Button>
                            
                </form>
            </div>

            <div className="flex flex-row justify-center space-x-1">                        
                <p>Already have an account?</p>
                <Button onClick={go_to_login} className="text-[#1b998b]">Login Now</Button>
            </div>

        </div>
    );
}