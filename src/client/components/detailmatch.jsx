import React, { useState } from 'react';
import Slider from 'react-slick';
import { Card, Typography, Button, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DetailMatch = () => {
  const images = [
    'https://via.placeholder.com/300x250?text=Image+1', // เปลี่ยน URL เป็นรูปจริง
    'https://via.placeholder.com/300x250?text=Image+2',
    'https://via.placeholder.com/300x250?text=Image+3',
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      className="  items-center justify-center"
      style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
    >
      {/* Header */}
      <div
        className="bg-white w-[350px] h-[80px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
      >
        <div className="flex flex-row items-center justify-center">
          <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
          <span className="text-[#E76F51] text-[35px] font-extrabold">KOO - KINN</span>
          <img className="w-[55px] h-[55px] ml-4" src="src/client/img/pizza.png" alt="Pizza" />
          
        </div>
        
      </div>
      <div style={{ }}>
        <button style={{ border: 'none', background: 'none' }}>
            <a href='/Match'><img
            src="src/client/img/Back.png"
            alt="Button Image"
            style={{ width: '30px', height: '30px' }}
          /> </a>
          
        </button>
        <span style={{ color: '#E76F51', fontSize: '20px', marginTop: '8px' }}>ชื่อแอค</span>
      </div>
      {/* Card Section */}
      <Card
        style={{
          width: '100%',
          maxWidth: '375px',
          borderRadius: '16px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          justifyContent: 'center',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" padding="16px">
          {/* Profile Image Slider */}
          <Slider {...sliderSettings} style={{ width: '100%', borderRadius: '16px' }}>
            {images.map((img, index) => (
              <Box key={index} display="flex" justifyContent="center">
                <img
                  src={img}
                  alt={`Profile ${index + 1}`}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              </Box>
            ))}
          </Slider>

          {/* Fields */}
          <Box display="flex" flexDirection="column" gap={2} width="100%" marginTop="16px">
            <Typography>อายุ..</Typography>
            <Typography>มหาวิทยาลัย .....</Typography>
            <Typography>แนวร้านอาหารที่ชอบ .....</Typography>
            <Typography>เกี่ยวกับฉัน.......</Typography>
            <Typography>Lifestyle</Typography>
          </Box>
        </Box>

        {/* Lifestyle Buttons */}
        <Box display="flex" justifyContent="space-around" padding="16px">
          <Button
            variant="contained"
            style={{
              backgroundColor: '#A3BE8C',
              borderRadius: '20px',
              color: 'white',
              width: '140px',
              height: '40px',
            }}
          >
            ร้านอาหารบุฟเฟต์
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#A3BE8C',
              borderRadius: '20px',
              color: 'white',
              width: '140px',
              height: '40px',
            }}
          >
            ร้านอาหารท้องถิ่น
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default DetailMatch;
