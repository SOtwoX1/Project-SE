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
  const [status, setStatus] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchText, setMatchText] = useState('');
  const [swipeDailyCount, setSwipeDailyCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);

  async function pollProfile(username) {
    try {
      console.log('poll profiles');
      const response = await axios.get(`/api/match-profile/${username}`);
      const fetchProfiles = response.data;
      console.log(response.data);
      setProfiles(fetchProfiles);
      setCurrentProfile(fetchProfiles[0]); // Set the first profile as the current profile
    } catch (error) {
      console.error('Error fetching match profile:', error);
    }
  };

  useEffect(() => {
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setEmail(userData.email);
    setUsername(userData.username);
    try {
      fetchProfiles(userData.username);
      fetchData(userData.username);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
}, []);

  const fetchProfiles = async (userID) => {
    try {
      const response = await axios.get(`/api/match-profile/${userID}`);
      const fetchProfiles = response.data;
      setProfiles(fetchProfiles);
      setCurrentProfile(fetchProfiles[0]); // Set the first profile as the current profile
    } catch (error) {
        console.error('Error fetching match profile:', error);
    }
  };
  const fetchData = async (userID) => {
    try {
      console.log('get status, SwipeDailyCount');
      const response = await axios.get(`/api/get-profile/${userID}`);
      console.log(response.data.isFree);
      setStatus(response.data.isFree);
      setSwipeDailyCount(response.data.swipeDailyCount);
      console.log('fetching ', response.data.isPremium);
      setIsPremium(response.data.isPremium);
    } catch (error) {
      console.error('Error fetching match profile:', error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const handleLike = async () => {
    try {
      console.log('Like profile clicked');
      const response = await axios.post(`/api/like-profile/${username}?otherUserID=${currentProfile.userID}`);
      setMatchText(`${response.data.message}! 🎉`);
      console.log('matchText:', 'Matched! 🎉');
      setTimeout(() => {
        setMatchText('');
        showNextProfile();
      }, 2000);
    } catch (error) {
      console.error('Error liking profile:', error);
    }
  };

  const handleDislike = async () => {
    if (isPremium || swipeDailyCount < 5) {
      try {
        console.log('Dislike clicked');
        if (currentProfile !== undefined) {
          await axios.put(`/api/dislike-profile/${username}?otherUserID=${currentProfile.userID}`);
          showNextProfile();
          setSwipeDailyCount(swipeDailyCount + 1);
        }
      } catch (error) {
        console.error('Error disliking profile:', error);
      }
    } else if (swipeDailyCount >= 5 && currentProfile !== undefined) {
      setMatchText('The daily swipe limit! 🚫');
        setTimeout(() => {
          setMatchText('');
        }, 2000);
    } else {
      console.log(isPremium);
      console.log('test else');
    }
  };

  const handleStatus = async () => {
    console.log('Status clicked');
    changeStatus(status);
  };
  async function changeStatus(status) {
    try {
      await axios.put(`/api/change-status/${username}?isFree=${!status}`);
      setStatus(!status);
      console.log(!status ? 'ว่าง':'ไม่ว่าง');
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const showNextProfile = async () => {
    console.log("profiles.length: ", profiles.length);
    console.log("currentIndex: ", currentIndex);
    if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentProfile(profiles[currentIndex + 1]);
    } else {
        //when not have profile that matching any more poll new profile
        await pollProfile(username);
        setCurrentIndex(0);
        setCurrentProfile(profiles[0]);
    }
  };

  const handleImageClick = (userID) => {
    navigate(`/detailmatch?userID=${userID}`); // ไปยังหน้า /profile-details
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
          
            {/* Profile Image Slider */}
              {
              currentProfile !== undefined ?
              (<Box display="flex" flexDirection="column" alignItems="center" padding="36px">
              <Slider {...sliderSettings} style={{ width: '100%', borderRadius: '16px' }}>
              {currentProfile.photo.map(img => (
                <Box key={currentProfile.photo.findIndex(photo => photo === img)} display="flex" justifyContent="center"
                onClick={() => handleImageClick(currentProfile.userID)}>
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
          )
            :
            <Box display="flex" flexDirection="column" alignItems="center" padding="36px">
              <CardContent style={{ textAlign: 'center', zIndex: 2 }}>
                <Typography variant="h6">No profile that match</Typography>
                <Typography variant="body2" color="textSecondary">
                  please wait for new profile that match with you and try again later
                </Typography>
              </CardContent>
            </Box>}
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
            <Button onClick={() => handleLike()} style={{ color: 'red' }} aria-label="Like">
              <img src="src/client/img/Frame 13.png" alt="Like" style={{ width: '84px', height: '84px' }} />
            </Button>
            <Button onClick={() => handleDislike()} style={{ color: 'gray' }} aria-label="Dislike">
              <img src="src/client/img/Frame 14.png" alt="Dislike" style={{ width: '84px', height: '84px' }} />
            </Button>
            <Button className='h-[84px] w-[84px]' onClick={handleStatus} style={{ color: 'green' }} aria-label="Free">
              <div className={`h-[64px] w-[64px] ${status?'bg-[#b7d55a]':'bg-[#d82d4b]'} text-white content-center rounded-full drop-shadow-xl`}>{status ? 'ว่าง':'ไม่ว่าง'}</div>
            {//<img src='src/client/img/Component 1.png' alt="Free" style={{ width: '84px', height: '84px' }} />
}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Match;
