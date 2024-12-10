import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "react-scroll";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const go_to_homelog = () => {
    navigate("/home-login-register");
  };

  const go_to_login = () => {
    navigate("/Login");
  };

  const go_sucess = () => {
    navigate("/Register-Sucessfull");
  };

  const saveData = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
  
    // Validate form
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    // Send data to the server  
    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        username, // Ensure this matches the schema
        email,    // Ensure this matches the schema
        password, // Ensure this matches the schema
      });
  
      console.log("Success", response.data);
      localStorage.setItem("LoginToken", 
        JSON.stringify({ email: email,
            username:username
        }));
  
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration successful",
        });
        go_sucess();
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
      <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">
        <Button onClick={go_to_homelog} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
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

        <form className="flex flex-col space-y-5" onSubmit={saveData}>
          <div className="text-3xl font-semibold w-[331px] h-[78px]">Hello! Register to get started</div>

          <div className="flex flex-col space-y-3">
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="Username"
            />
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="Email"
            />
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="Enter your password"
            />
            <input
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold"
          >
            Register
          </button>
        </form>
      </div>

      <div className="flex flex-row justify-center space-x-1">
        <p>Already have an account?</p>
        <Button onClick={go_to_login} className="text-[#1b998b]">
          Login Now
        </Button>
      </div>
    </div>
  );
}
