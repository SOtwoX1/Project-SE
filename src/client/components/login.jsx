import { Button } from "react-scroll";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const go_to_homelog = async () => {
        window.location.href = "http://localhost:3000/home-login-register";
    }

    const go_to_regis = async () => {
        window.location.href = "http://localhost:3000/Regis";
    }

    const go_to_forgot = async () => {
        window.location.href = "http://localhost:3000/Forgot-password";
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        // Validate username and password before proceeding with login
        if (username === '' || password === '') {
            alert('Please enter both username and password');
            return;
        }

        try {
            // Example of sending a login request to an API
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                // Redirect to home page after successful login
                window.location.href = "http://localhost:3000/home-login-register";
            } else {
                alert('Invalid credentials, please try again');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert('An error occurred, please try again later');
        }
    }

    return (
        <div className="h-full fixed overflow-hidden flex flex-col pb-[26px]">
            <div className="w-full h-full flex flex-col space-y-[28px] mt-[56px] px-[21px]">

                <Button onClick={go_to_homelog} className="w-[41px] h-[41px] border border-[#E8ECF4] rounded-lg">
                    <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7" />
                    </svg>
                </Button>

                <form onSubmit={handleLogin} className="flex flex-col justify-center space-y-5">
                    <div className="text-3xl font-semibold w-[280px] h-[78px]">Welcome back! Glad to see you, Again!</div>

                    <div className="flex flex-col space-y-3">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-[331px] h-[56px] bg-[#F7F8F9] placeholder-[#8391A1] border border-[#E8ECF4] rounded-lg"
                            placeholder="Enter your username"
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

                    <Button type="submit" className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold">
                        Log in
                    </Button>
                </form>
            </div>

            <div className="flex flex-row justify-center space-x-1">
                <p>Don’t have an account?</p>
                <Button onClick={go_to_regis} className="text-[#1b998b]">Register Now</Button>
            </div>
        </div>
    );
}
