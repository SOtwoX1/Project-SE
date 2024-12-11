import React, { useState } from 'react';
import Menu from './Menu';
import { Card, CardMedia, CardContent, Typography, Button, Collapse } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import SwipeIcon from '@mui/icons-material/Swipe';

const Match = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    console.log('Liked!');
  };

  const handleDislike = () => {
    console.log('Disliked!');
  };

  const handleSkip = () => {
    console.log('Skipped!');
  };

  const profile = {
    name: 'น้องขวัญคนสวย',
    age: 25,
    bio: 'รักอาหารญี่ปุ่นและขนมหวาน',
    details: 'ฉันชอบไปเที่ยวสวนสาธารณะและวิ่งเล่นกับเพื่อน ๆ สนใจที่จะรู้จักกับคนใหม่ ๆ และแบ่งปันความสุข',
    image: 'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__69794.jpeg',
    lifestyle:['ร้านอาหารบุฟเฟต์','ความชอบที่2'],
  };

  return (
    <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
      <Menu />
      <div className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex items-center justify-center" style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
        <Card
          onClick={handleExpandClick}
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
            height="280"
            image={profile.image}
            alt="Profile"
            style={{ borderRadius: '16px 16px 0 0' }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="h6">{`${profile.name}, ${profile.age}`}</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.bio}
            </Typography>
          </CardContent>
          
          {/* ข้อมูลเพิ่มเติมที่จะแสดงเมื่อคลิก */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                {profile.details}
              </Typography>
            </CardContent>
          </Collapse>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
            <Button onClick={handleLike} style={{ color: 'red' }} aria-label="Like">
              <FavoriteIcon />
            </Button>
            <Button onClick={handleDislike} style={{ color: 'gray' }} aria-label="Dislike">
              <ClearIcon />
            </Button>
            <Button onClick={handleSkip} style={{ color: 'green' }} aria-label="Skip">
              <SwipeIcon />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Match;
