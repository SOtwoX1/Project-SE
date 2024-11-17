import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "react-scroll";
import axios from "axios";

export default function Cnr() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const go_to_otp = () => {
    window.location.href = "http://localhost:3000/OTP";
  };

  const resetPassword = async () => {
    const email = localStorage.getItem("resetToken"); // Retrieve email from localStorage

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Invalid Request",
        text: "No email token found. Please start the password reset process again.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure both passwords are the same.",
      });
      return;
    }
    // console.log(email, password);
    try {
      const response = await axios.put("http://localhost:3000/api/reset-password", {
        email,
        password,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Reset Successfully",
          text: "You can now log in with your new password.",
        });
        window.location.href = "/Password-Change"; // Navigate to success page
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
      <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">
        <Button onClick={go_to_otp} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
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

        <form
          className="flex flex-col justify-center space-y-[32px]"
          onSubmit={(e) => {
            e.preventDefault();
            resetPassword();
          }}
        >
          <div className="flex flex-col w-[331px] h-[97px] space-y-[10px]">
            <p className="text-3xl font-semibold">Create new password</p>
            <p className="text-sm text-[#8391A1]">
              Your new password must be unique from those previously used.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="New Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="Confirm Password"
            />
          </div>

          <Button
            onClick={resetPassword}
            type="submit"
            className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
