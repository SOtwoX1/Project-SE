import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการนำทาง
import Menu from './Menu';
import { Card, CardMedia, CardContent, Typography, Button, Collapse } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';


const Match = () => {
  
  const navigate = useNavigate(); // สร้างตัวแปร navigate
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profiles, setProfiles] = useState([
    {userID: 'undefind',
      bio: ""
    }
  ]);
  const [numberProfile, setNumberProfile] = useState(0);
  const [numberPhoto, setNumberPhoto] = useState(0);

  async function pollProfile() {
    try {
      const response = await axios.get(`/api/match-profile/${username}`);
      console.log(response.data); // Logs the expected output
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
    pollProfile();
  }, []);
  

  const handleLike = () => {
    console.log('Liked!');
    //when not have profile that matching any more poll new profile
    (profiles.length - 1 === numberProfile) ? (setNumberProfile(0), pollProfile()) : setNumberProfile(numberProfile + 1);
    setNumberPhoto(0)
  };

  const handleDislike = () => {
    console.log('Disliked!');
    (profiles.length - 1 === numberProfile) ? (setNumberProfile(0), pollProfile()) : setNumberProfile(numberProfile + 1);
    setNumberPhoto(0)
  };

  const handleSkip = () => {
    console.log('Skipped!');
    (profiles.length - 1 === numberProfile) ? (setNumberProfile(0), pollProfile()) : setNumberProfile(numberProfile + 1);
    setNumberPhoto(0)
  };

  const handleImageClick = () => {
    navigate('/detailmatch'); // ไปยังหน้า /profile-details
  };
  const image = 'src/client/img/freepik__candid-image-photography-natural-textures-highly-r__69794.jpeg';
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
            image={image}//profiles[numberProfile].photo[numberPhoto]}
            alt="Profile"
            style={{ borderRadius: '16px 16px 0 0' }}
            onClick={handleImageClick} // คลิกแล้วไปหน้าใหม่
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="h6">{`${profiles[numberProfile].userID}`}</Typography>
            <Typography variant="body2" color="textSecondary">
              {profiles[numberProfile].bio}
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
