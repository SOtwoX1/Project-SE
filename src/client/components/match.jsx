import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Collapse, Box } from '@mui/material';
import Menu from './Menu';
import axios from 'axios';

const Match = () => {
  
  const navigate = useNavigate(); // สร้างตัวแปร navigate
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profiles, setProfiles] = useState([
    {userID: 'undefind',
      bio: "",
      photo: []
    }
  ]);

  async function pollProfile(username) {
    try {
      const response = await axios.get(`/api/match-profile/${username}`);
      console.log("username: ", username);
      console.log("response.data: ", response.data); // Logs the expected output
      setProfiles(response.data); // Update profiles state
      
    } catch (error) {
      console.error('Error fetching match profile:', error);
    }
  };

  useEffect(() => {
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setEmail(userData.email);
    setUsername(userData.username);
    //get profile that matching
    pollProfile(userData.username);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchText, setMatchText] = useState('');
  const [currentProfile, setCurrentProfile] = useState(profiles[currentIndex]);

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
    console.log('Disliked!');
  };

  const handleSkip = () => {
    showNextProfile();
  
    console.log('Skipped!');
  };

  const showNextProfile = () => {
    console.log("profiles.length: ", profiles.length);
    console.log("currentIndex: ", currentIndex);
    if (currentIndex <= profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentProfile(profiles[currentIndex])
      console.log("profiles[currentIndex]: ", profiles[currentIndex]);
    } else {
      //when not have profile that matching any more poll new profile
      console.log("relode profile");
      pollProfile(username);
      setCurrentIndex(0);
      setCurrentProfile(profiles[currentIndex])
    }
  };

  const handleImageClick = () => {
    navigate('/detailmatch'); // ไปยังหน้า /profile-details
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
              {currentProfile.photo.map(img => (
                <Box key={currentProfile.photo.findIndex(photo => photo === img)} display="flex" justifyContent="center">
                  <img
                    src={img}
                    alt={`Profile ${currentProfile.photo.findIndex(photo => photo === img)}`}
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
              <Typography variant="h6">{`${currentProfile.userID}, ${currentProfile.age}`}</Typography>
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
