import { Button } from "react-scroll";
import { useRef } from "react";

export default function OTP() {
    const inputRefs = useRef([]);

    const go_to_forgotpass = async() => {
        window.location.href = "http://localhost:3000/Forgot-password";
    } 
    
    const cheackotp = () => {
        window.location.href = "http://localhost:3000/Create-new-password";
    }
    const Resend = () => {
        //ฟังก์ชันขอotp
    }

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
            <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px] ">
                
                    <Button onClick={go_to_forgotpass} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                        <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                        </svg>

                    </Button>
                    
                    <form className="flex flex-col justify-center space-y-[32px]">
                        <div className="flex flex-col w-[331px] h-[97px] space-y-[10px]">
                            <p className="text-3xl font-semibold ">OTP Verification</p>
                            <p className="text-[#8391A1]">Enter the verification code we just sent on your email address.</p>
                        </div>
                        
                        <div className="flex flex-row space-x-[12.75px]">
                            {Array(4)
                                .fill(0)
                                .map((_, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        className="w-[70px] h-[60px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg text-center"
                                        maxLength="1"
                                        pattern="[0-9]"
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ))}
                        </div>

                        <Button 
                        onClick={cheackotp}
                        className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold">
                            Verify
                        </Button>    
                    </form>

            </div>

            <div className="flex flex-row justify-center space-x-1">                        
                    <p>Didn’t received code?</p>
                    <Button onClick={Resend} className="text-[#1b998b]">Resend</Button>
            </div>

        </div>
    );
}