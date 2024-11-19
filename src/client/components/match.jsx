import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการนำทาง
import Menu from './Menu';
import { Card, CardMedia, CardContent, Typography, Button, Collapse } from '@mui/material';


const Match = () => {
  
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  

  const handleLike = () => {
    console.log('Liked!');
  };

  const handleDislike = () => {
    console.log('Disliked!');
  };

  const handleSkip = () => {
    console.log('Skipped!');
  };

  const handleImageClick = () => {
    navigate('/Detail-Match'); // ไปยังหน้า /profile-details
  };

  const profile = {
    name: 'น้องขวัญคนสวย',
    age: 25,
    bio: 'รักอาหารญี่ปุ่นและขนมหวาน',
    details: 'ฉันชอบไปเที่ยวสวนสาธารณะและวิ่งเล่นกับเพื่อน ๆ สนใจที่จะรู้จักกับคนใหม่ ๆ และแบ่งปันความสุข',
    image: 'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__69794.jpeg',
    lifestyle: ['ร้านอาหารบุฟเฟต์', 'ความชอบที่2'],
  };

  return (
    <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
      <Menu />
      <div
        className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex items-center justify-center"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' ,marginTop:'40px'}}
      >
        <Card
          style={{
            width: '350px',
            borderRadius: '16px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            zIndex: 2,
            cursor: 'pointer',
          }}
        >
          <CardMedia
            component="img"
            height="200px"
            image={profile.image}
            alt="Profile"
            style={{ borderRadius: '16px 16px 0 0' }}
            onClick={handleImageClick} // คลิกแล้วไปหน้าใหม่
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="h6">{`${profile.name}, ${profile.age}`}</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.bio}
            </Typography>
          </CardContent>

          

          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
            <Button onClick={handleLike} style={{ color: 'red' }} aria-label="Like">
            <img src='src/client/img/Frame 13.png' alt="Like" style={{ width: '70px', height: '70px' }} />
            </Button>
            <Button onClick={handleDislike} style={{ color: 'gray' }} aria-label="Dislike">
            <img src='src/client/img/Frame 14.png' alt="Dislike" style={{ width: '70px', height: '70px' }} />
            </Button>
            <Button onClick={handleSkip} style={{ color: 'green' }} aria-label="Free">
            <img src='src/client/img/Component 1.png' alt="Free" style={{ width: '70px', height: '70px' }} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Match;
