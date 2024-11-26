import React, { useState } from 'react';
import Slider from 'react-slick';
import { Card, Typography, Button, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const Previewnew = () => {
  const navigate = useNavigate();
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

  const go_to_edit = () => {
    navigate("/Edit");
  }

  return (
    <div 
          className="fixed overflow-hidden w-[375px] h-[812px] rounded-b-[50px] text-[45px] font-extrabold flex flex-col p-3 pt-[16px] " 
          style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className=" flex flex-row items-center justify-center ">
                <img className="w-[55px] h-[55px] absolute left-[-1%] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px] mt-12 absolute left-[12%]" src="src/client/img/heart.png" alt="Heart" />
                <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[9%]" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[55px] h-[55px] mr-[-325px] " src="src/client/img/pizza.png" alt="Pizza" />
                <span className="absolute text-[#E76F51] text-[45px] font-extrabold">UPDATE CARD</span>
            </div>

            <div className="flex flex-col pt-[3px] divide-y divide-gray-300">
                <div className="flex items-center h-[65px]">
                    <button onClick={go_to_edit} className="ml-2" >
                        <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7"/>
                        </svg>
                    </button>
                    <p className="text-[20px] text-black">Edit</p>
      </div>
      {/* Card Section */}
      <Card
        style={{
          width: '100%',
          maxWidth: '100%',
         
          
          justifyContent: 'center',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" padding="36px">
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
              //borderRadius: '20px',
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
              //borderRadius: '20px',
              color: 'white',
              width: '140px',
              height: '40px',
            }}
          >
            ร้านอาหารท้องถิ่น
          </Button>
        </Box>
      </Card>
    </div></div>
  );
};

export default Previewnew;
