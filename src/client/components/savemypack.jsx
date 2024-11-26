import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Mypackage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Abhaya Libre, sans-serif',
        padding: '16px',
        maxWidth:'375px',
        height: '100vh',
      }}
    >
      {/* Header */}
      <div
        className=" fixed overflow-hidden bg-white w-[350px] h-[80px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
      >
        
        <div className="flex flex-row items-center justify-center">
            <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
            <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
            <span className="text-[#E76F51] text-[40px] font-extrabold">MY PACKAGE</span>
            <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
            <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
          </div>
        
      </div>

      {/* Back Button */}
      <div
        style={{
          width: '100%',
          maxWidth: '375px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <a onClick={() => navigate(-1)} style={{ textDecoration: 'none' }}>
          <img
            src="src/client/img/Back.png"
            alt="Back"
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
          />
        </a>
        <span style={{  fontSize: '20px', marginLeft: '8px' }}>Settings</span>
      </div>

      {/* Cards Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '375px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingTop:"20px"
        }}
      >
        {/* Option Cards */}
        {[
          { title: 'Accept Match', color: '#F4A261', description: 'เมื่อผู้ใช้สมัครสมาชิก ผู้ใช้สามารถกดรับ Accept เพื่อเริ่มบทสนทนาได้โดยไม่จำกัดครั้ง' },
          { title: 'Swipe Right/Left', color: '#E9C46A', description: 'เมื่อผู้ใช้สมัครสมาชิกผู้ใช้สามารถใช้ฟีเจอร์ นั่งรอได้โดยไม่จำกัดครั้ง' },
          { title: 'นั่งรอ', color: '#F4A261', description: 'เมื่อผู้ใช้สมัครสมาชิกผู้ใช้สามารถปัดไปทางขวาเพื่อ แสดงความสนใจได้โดยไม่จำกัดครั้ง' },
        ].map((option, index) => (
          <Card
            key={index}
            style={{
              backgroundColor: option.color,
              padding: '16px',
              marginBottom: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#fff',
                marginBottom: '8px',
              }}
            >
              {option.title}
            </Typography>
            <Typography style={{ color: '#fff', fontSize: '14px' }}>
              {option.description}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Mypackage;
