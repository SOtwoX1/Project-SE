import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Swal from "sweetalert2";


const Mypackage = () => {
  const [username, setUsername] = useState('');
  
  const go_to_package = async () => {
    // Retrieve username from localStorage
    const LoginToken = localStorage.getItem("LoginToken");
    if (!LoginToken) {
        console.error("Login token not found.");        return;
    }

    const userData = JSON.parse(LoginToken);
    const { username } = userData;
    setUsername(username);

    // must input text cvv in alret this code must run 10 seconds before do other
    Swal.fire({
        title: 'Enter your CVV',  // only integer 3 digit
        input: 'text',
         //must check integer 3 digit
        inputValidator: (value) => {
            if (!/^\d{3}$/.test(value)) {
                return 'Please enter a 3-digit number.';
            }
        },
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        timer: 10000,
        timerProgressBar: true
    }).then((result) => {
        if (result.isConfirmed) {
            const cvv = result.value;
            console.log('CVV:', cvv);
            const data = {
                username
            };
            axios.put('http://localhost:3000/api/set-ispremium', data)
                .then(response => {
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'You are now a premium user!',
                        timer: 5000
                    })
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while processing your request.',
                        timer: 2000
                    })
                    // handle the error here
                });
        }
    });
  };

  return (
    <div
      className="fixed overflow-hidden  items-center justify-center"
      style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
    >
      {/* Header */}
      <div
        className="bg-white w-[375px] h-[80px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
      >

        <div className="flex flex-row items-center justify-center">
          <img className="w-[55px] h-[55px] ml-4" src="src/client/img/French Fries.png" alt="French Fries" />
          <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
          <span className="text-[#E76F51] text-[40px] font-extrabold">MYPACKAGE</span>
          <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
          <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
        </div>

      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // เพื่อให้ส่วนเส้นคั่นอยู่ด้านล่าง
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: '#fff', // เพิ่มพื้นหลังสีขาว
        }}
      >
        {/* ส่วนหัวข้อ */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <button
            style={{
              border: 'none',
              background: 'none',
              marginRight: '8px', // ระยะห่างระหว่างปุ่มและข้อความ
              cursor: 'pointer',
            }}
          >
            <a href="/Setting-Profile">
              <img
                src="src/client/img/Back.png"
                alt="Button Image"
                style={{ width: '24px', height: '24px' }} // ขนาดเล็กลงให้พอดี
              />
            </a>
          </button>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#000',
            }}
          >
            SETTINGS
          </span>
        </div>

        {/* เส้นคั่น */}
        <div
          style={{
            width: '80%', // ความยาวเส้น 80% ของหน้าจอ
            height: '1px', // ความหนาของเส้น
            backgroundColor: '#d3d3d3', // สีเทา
            marginTop: '8px', // ระยะห่างจากหัวข้อ
          }}
        ></div>
      </div>




      {/* Cards Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '375px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingTop: "20px",
          paddingLeft: "35px",
          borderRadius: '0px',
        }}
      >
        {/* Option Cards */}
        {[
          { title: 'Accept Match', color: '#E76F51', description: 'เมื่อผู้ใช้สมัครสมาชิก ผู้ใช้สามารถกดรับ Accept เพื่อเริ่มบทสนทนาได้โดยไม่จำกัดครั้ง' },
          { title: 'Swipe Right/Left', color: '#F4A261', description: 'เมื่อผู้ใช้สมัครสมาชิกผู้ใช้สามารถใช้ฟีเจอร์ นั่งรอได้โดยไม่จำกัดครั้ง' },
          { title: 'นั่งรอ', color: '#E9C46A', description: 'เมื่อผู้ใช้สมัครสมาชิกผู้ใช้สามารถปัดไปทางขวาเพื่อ แสดงความสนใจได้โดยไม่จำกัดครั้ง' },
        ].map((option, index) => (
          <Card
            key={index}
            style={{
              backgroundColor: option.color,
              padding: '0px 5px 5px 5px',
              marginBottom: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              height: '76px',
              width: '306px'
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#fff',
                marginBottom: '8px',
              }}
            >
              {option.title}
            </Typography>
            <Typography style={{ color: '#fff', fontSize: '9px' }}>
              {option.description}
            </Typography>
          </Card>
        ))}
        <div className="text-center ml-[20px] mr-[70px]">
          <button
            onClick={go_to_package}
            className="w-[150px] h-[50px] bg-[#E9C46A] text-white text-[16px] font-bold rounded-lg"> Try for free <br></br> Premium ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypackage;
