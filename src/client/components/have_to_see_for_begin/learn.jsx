import { useState } from "react";
import { Button } from "antd"; // must import { what we want } from "antd";
import Axios from "axios"; // use axios to make http request
import { DarkThemeToggle, Flowbite } from "flowbite-react";  // use flowbite for css
import { motion } from "framer-motion"
import Swal from 'sweetalert2';
export default function Learn() {
  // axios request example
  const handle1 = async () => {
    const res = await Axios.get("http://localhost:3000/hello");
    console.log('Login successful:',res.data);
    alert(res.data);
  }
  const handle2 = async () => {
    const res = await Axios.get("http://localhost:3000/hello");
    console.log('Login successful:',res.data);
    Swal.fire("GOOD!", res.data, "success");
  }
  const handle3 = async () => {
    await Swal.fire({ title: "Next Page", icon: "success", timer: 5000 }); //wait 5 seconds and go to next page
    window.location.href = "http://localhost:3000/nextpage"; // make a request to next page must wait 5 seconds
  }

  const handle4 = async() => {
    await Swal.fire({ title: "Next Page", icon: "success", timer: 5000 }); //wait 5 seconds and go to next page
    window.location.href = "http://localhost:3000/Login";
  }

  const handle5 = async() => {
    await Swal.fire({ title: "Next Page", icon: "success", timer: 5000 }); //wait 5 seconds and go to next page
    window.location.href = "http://localhost:3000/home-login-register";
  }

  const handle6 = async() => {
    await Swal.fire({ title: "Next Page", icon: "success", timer: 5000 }); //wait 5 seconds and go to next page
    window.location.href = "http://localhost:3000/Regis";
  }

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <>
      {/* classname use for css tailwind */}
      <div className="text-3xl font-bold">this page is the home page and show about the project how to example npm install</div>
      <Button type="primary">Example From antd </Button>

      <Button onClick={handle1}> Example From axios see in console </Button>
      <Button onClick={handle2}> Example From axios + swal see in console </Button>
      <Button onClick={handle3}> Example NEXT Page </Button>
      {/* show massage from axios */}
      <Button onClick = {handle5}> homeLoginregis </Button> 
      <Button onClick = {handle4}> Login </Button> 
      <Button onClick = {handle6}> regis </Button> 
      <Flowbite>
      <DarkThemeToggle />
      </Flowbite>

      <motion.div
        style={{
          x,
          y,
          rotate
        }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        onDrag={(e, { offset: { x, y } }) => {
          setX(x);
          setY(y);
        }}
        onDragEnd={(e, { offset: { x, y } }) => {
          setX(x);
          setY(y);
        }}
        onDragStart={(e, { offset: { x, y } }) => {
          setX(x);
          setY(y);
        }}
      >
        Drag me!
      </motion.div>

      
    </>
  );
}
