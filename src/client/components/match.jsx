import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Menu from './Menu';


const Match = () => {
  const profiles = [
    {
      name: 'น้องขวัญคนสวย',
      age: 25,
      bio: 'รักอาหารญี่ปุ่นและขนมหวาน',
      images: [
        'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__69794.jpeg',
        'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__97451.jpeg',
      ],
    },
    {
      name: 'น้องมุกน่ารัก',
      age: 22,
      bio: 'ชอบดนตรีและเดินป่า',
      images: [
        'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__97451.jpeg',
        'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__69794.jpeg',
      ],
    },
    {
      name: 'หมาป่าเดียวดาย',
      age: 25,
      bio: 'ชอบดนตรีและเดินป่า',
      images: [
        'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__97451.jpeg',
        'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__69794.jpeg',
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchText, setMatchText] = useState('');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleLike = () => {
    console.log('Like clicked');
    setMatchText('Matched! 🎉');
    console.log('matchText:', 'Matched! 🎉');
    setTimeout(() => {
      setMatchText('');
      showNextProfile();
    }, 2000);
  };
  

  const handleDislike = () => {
    showNextProfile();
  };

  const handleSkip = () => {
    console.log('Skipped!');
  };

  const handleImageClick = () => {
    navigate('/detailmatch'); // ไปยังหน้า /profile-details
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
        style={{ fontFamily: 'Abhaya Libre, sans-serif', marginTop: '40px' }}
      >
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
              {currentProfile.images.map((img, index) => (
                <Box key={index} display="flex" justifyContent="center">
                  <img
                    src={img}
                    alt={`Profile ${index + 1}`}
                    style={{
                      width: '100%',
                      maxWidth: '313px',
                      height: '336px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                    }}
                  />
                </Box>
              ))}
            </Slider>

            {/* Profile Details */}
            <CardContent style={{ textAlign: 'center', zIndex: 2 }}>
              <Typography variant="h6">{`${currentProfile.name}, ${currentProfile.age}`}</Typography>
              <Typography variant="body2" color="textSecondary">
                {currentProfile.bio}
              </Typography>
            </CardContent>
          </Box>

          {/* Match Text */}
          {matchText && (
            <Typography
              variant="h5"
              style={{
                color: 'green',
                textAlign: 'center',
                marginTop: '10px',
                fontWeight: 'bold',
                zIndex:10,
                fontSize:'20px',
                
                position: 'relative'
                
              }}
            >
              {matchText}
            </Typography>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '5px 0' }}>
            <Button onClick={handleLike} style={{ color: 'red' }} aria-label="Like">
              <img src="src/client/img/Frame 13.png" alt="Like" style={{ width: '84px', height: '84px' }} />
            </Button>
            <Button onClick={handleDislike} style={{ color: 'gray' }} aria-label="Dislike">
              <img src="src/client/img/Frame 14.png" alt="Dislike" style={{ width: '84px', height: '84px' }} />
            </Button>
            <Button onClick={handleSkip} style={{ color: 'green' }} aria-label="Free">
            <img src='src/client/img/Component 1.png' alt="Free" style={{ width: '84px', height: '84px' }} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Match;
