import { useState } from "react";
import { Button } from "antd"; // must import { what we want } from "antd";
import Axios from "axios"; // use axios to make http request
import { DarkThemeToggle, Flowbite } from "flowbite-react";  // use flowbite for css
import { motion } from "framer-motion"
import Swal from 'sweetalert2';

export default function Welcome() {
  return (
    <div class="fixed top-0 left-0 w-[375px] h-[812px] overflow-hidden">
      <div class="h-[57vh]">
        <img src="https://s3-alpha-sig.figma.com/img/060d/bd98/2508f4bc21b96758d9e5fe9f25cc5e69?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G~OR8sGEX-HhKl-iqF~ksui1--Vz1D49HAFpyDwGFznl8F4PZJ9iLvxmLJG1P1RlQQUqlSW8CeWoPQjGVKI12NtCw54W1J1rvrm7687sl3CgSvqSwkr~oClvLtAO5Br28swCq9XgXY8lK4Nzgv17w7E9yB8ZobMa7sXBUydX2RArOQ74yL8HuKsxkpVVSrKNDmZ307VzM9p0nZpaochYgmrAnLSInqNUD~oWcY-jm3xaFdIxKEjucGjIMBbW8J3GF5Cp4pK0CU7~CUkHJjPPybn5kQk4hMj-gZSMvG0yd2YkZD4iIO12JwI1DEgYxgZSmsEnJy1QHnUMOic4dI9emA__" alt="Welcome" class="w-full h-full object-cover scale-150" />
      </div>
      <div class="flex flex-col items-center justify-center h-[57vh] bg-white dark:bg-gray-100">
        <div class="w-11/12 text-center">
          <button class="w-full py-2 my-2 text-b bg-[#e9c46a] active:bg-[#d4a259] focus:outline-none focus:ring focus:ring-[#e9c46a] shadow-lg shadow-[#e9c46a] rounded-lg ">Login</button>
          <button class="w-full py-2 my-2 text-b border border-[#e9c46a] active:bg-[#d4a259] shadow-lg shadow-[#e9c46a] rounded-lg">Register</button>
        </div>
      </div>
    </div>
  );
}