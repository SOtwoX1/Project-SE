import { Button } from "react-scroll";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    localStorage.removeItem("LoginToken");

    const go_to_homelog = async () => {
        navigate("/home-login-register");
    };

    const go_to_regis = async () => {
        navigate("/Regis");
    };

    const go_to_forgot = async () => {
        navigate("/Forgot-password");
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(email, password);
      
        try {
          const response = await axios.post('http://localhost:3000/api/login', {
            email,
            password,
          });
      
          console.log('Success', response.data.message);
          localStorage.setItem("LoginToken", 
            JSON.stringify({ email: email, username: response.data.username })
          );
      
          // Check if the role is admin
          if (response.status === 200) {
            if (response.data.username === 'GO2') {
              console.log('User is an admin');
              Swal.fire({
                icon: 'success',
                title: 'Welcome, Admin',
                timer: 5000,
              })
              window.location.href = '/nextpage'; // Redirect to /nextpage if user is an admin
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Login successful',
              });
              navigate("/Profile"); // Redirect to Profile if user is not an admin
            }
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please check your email or password.",
            timer: 5000,
          });
        }
      };
      

    return (
        <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
            <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">

                <Button onClick={go_to_homelog} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                    <svg className="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7" />
                    </svg>
                </Button>

                <form className="flex flex-col justify-center space-y-5" onSubmit={handleLogin}>
                    <div className="text-3xl font-semibold w-[280px] h-[78px]">Welcome back! Glad to see you, Again!</div>

                    <div className="flex flex-col space-y-3">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
                            placeholder="Enter your email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
                            placeholder="Enter your password"
                        />

                        <Button onClick={go_to_forgot} className="text-[#6A707C] ml-auto">Forgot Password?</Button>
                    </div>

                    <button type="submit" className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold">
                        Log in
                    </button>
                </form>
            </div>

            <div className="flex flex-row justify-center space-x-1">
                <p>Don’t have an account?</p>
                <Button onClick={go_to_regis} className="text-[#1b998b]">Register Now</Button>
            </div>
        </div>
    );
}
