import { Button } from "react-scroll";

export default function Cnr() {
    const go_to_otp = () => {
        window.location.href = "http://localhost:3000/OTP";
    }
    const Reset_pass = () => {
        window.location.href = "/Password-Change"
    }

    return (
        <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
        <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px] ">
            
                <Button onClick={go_to_otp} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                    <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                    </svg>

                </Button>
                
                <form className="flex flex-col justify-center space-y-[32px]">
                    <div className="flex flex-col w-[331px] h-[97px] space-y-[10px]">
                        <p className="text-3xl font-semibold ">Create new password</p>
                        <p className="text-sm text-[#8391A1]">Your new password must be unique from those previously used.</p>
                    </div>
                    
                    <div className="flex flex-col space-y-3 ">
                        <input type="password" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="New Password"/>
                        <input type="password" className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg" placeholder="Confirm Password"/>   
                    </div>

                    <Button
                    onClick={Reset_pass}
                    className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold ">
                        Reset Password
                    </Button>    
                </form>

        </div>

    </div>

    
    );
}