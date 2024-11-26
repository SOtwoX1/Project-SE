import { Button } from "react-scroll";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Forgetpass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Navigate to login and reset token
  const go_to_login = async () => {
    navigate("/Login");
  };

  // Handle email submission
  const checkEmail = async (e) => {
    e.preventDefault();
    console.log("email:", email);

    try {
      const response = await axios.post("http://localhost:3000/api/forgot-password", {
        email,
      });

      console.log("Success", response.data);

      if (response.status === 200) {
        // Save email as token in localStorage
        localStorage.setItem("resetToken", email);

        Swal.fire({
          icon: "success",
          title: "Email sent successfully",
          timer: 5000,
        });

        // Redirect to OTP verification page
        window.location.href = "http://localhost:3000/OTP";
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        timer: 5000,
      });
    }
  };

  return (
    <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
      <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">
        <Button onClick={go_to_login} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
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
        </Button>

        <form className="flex flex-col justify-center space-y-[32px]">
          <div className="flex flex-col w-[331px] h-[97px] space-y-[10px]">
            <p className="text-3xl font-semibold">Forgot Password?</p>
            <p className="text-[#8391A1]">
              Don't worry! It occurs. Please enter the email address linked with your account.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <input
              type="email"
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            onClick={checkEmail}
            type="submit"
            className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold"
          >
            Send Code
          </Button>
        </form>
      </div>

      <div className="flex flex-row justify-center space-x-1">
        <p>Remember Password?</p>
        <Button onClick={go_to_login} className="text-[#1b998b]">
          Login
        </Button>
      </div>
    </div>
  );
}
