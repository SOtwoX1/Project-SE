import { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function VerifyLetter() {
  const inputRefs = useRef([]);
  const [generatedCode, setGeneratedCode] = useState(generateCode());
  const [userInput, setUserInput] = useState(Array(4).fill(""));

  // Generate a random 4-letter code
  function generateCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array(4)
      .fill("")
      .map(() => letters[Math.floor(Math.random() * letters.length)])
      .join("");
  }

  // Navigate to the forgot password page
  const go_to_forgotpass = async () => {
    window.location.href = "http://localhost:3000/Forgot-password";
  };

  // Check if the entered code matches the displayed code
  const checkCode = () => {
    if (userInput.join("") === generatedCode) {
      Swal.fire("Success", "Verification successful!", "success");
      window.location.href = "http://localhost:3000/Create-new-password";
    } else {
      Swal.fire("Error", "Incorrect code. Please try again.", "error");
    }
  };

  // Regenerate a new 4-letter code
  const regenerateCode = () => {
    setGeneratedCode(generateCode());
    setUserInput(Array(4).fill(""));
    inputRefs.current[0].focus();
  };

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedInput = [...userInput];
    updatedInput[index] = value.toUpperCase();
    setUserInput(updatedInput);

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
      <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">
        <button
          onClick={go_to_forgotpass}
          className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg"
        >
          <svg
            className="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </button>

        <form className="flex flex-col justify-center space-y-[32px]">
          <div className="flex flex-col w-[331px] h-[97px] space-y-[10px]">
            <p className="text-3xl font-semibold">4-Letter Verification</p>
            <p className="text-[#8391A1]">Enter the verification code below:</p>
            <p className="text-lg font-bold text-[#E76F51]">{generatedCode}</p>
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
                  onChange={(e) => handleInputChange(e, index)}
                  value={userInput[index]}
                />
              ))}
          </div>

          <button
            type="button"
            onClick={checkCode}
            className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold"
          >
            Verify
          </button>
        </form>
      </div>

      <div className="flex flex-row justify-center space-x-1">
        <p>Didn’t receive code?</p>
        <button onClick={regenerateCode} className="text-[#1b998b]">
          Regenerate Code
        </button>
      </div>
    </div>
  );
}
