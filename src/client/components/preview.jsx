import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Card, Typography, Button, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, profileRoutesURL } from '../../apiConfig';

const Preview = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date("2024-11-04"); // Use the specified date
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the current month and day are before the birth month and day
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setEmail(userData.email);
    setUsername(userData.username);



    // Fetch profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${profileRoutesURL.base}${profileRoutesURL.getDataProfileAPI}`, {
          params: { username: userData.username }, // Send username as query parameter
        });
        setProfile(response.data); // Set profile data in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();

    // Set up auto scroll every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5); // Cycle through images (0 to 4)
    }, 2000); // 5 seconds interval

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Extract profile data
  const { bio, name: profileName, address, dob, education, job, hobby, tags, gender, photo } = profile || {};
  const images = photo || [];

  return (
    <div
      className="fixed overflow-hidden  items-center justify-center"
      style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
    >
      {/* Header */}
      <div
        className="bg-white w-[350px] h-[80px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
      >

        <div className="flex flex-row items-center justify-center">
          <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
          <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
          <span className="text-[#E76F51] text-[40px] ml-6 mr-6 font-extrabold">Preview </span>
          <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
          <img className="w-[55px] h-[55px] ml-4 " src="src/client/img/pizza.png" alt="Pizza" />
        </div>

      </div>
      <div style={{}}>
        <button style={{ border: 'none', background: 'none' }}>
          <a onClick={() => navigate('/Edit-Profile')}><img
            src="src/client/img/Back.png"
            alt="Button Image"
            style={{ width: '30px', height: '30px' }}
          /> </a>

        </button>
        <span style={{ color: 'BLACK', fontSize: '20px', marginTop: '8px' }}>EDIT</span>
      </div>
      {/* Card Section */}
      <Card
        style={{
          width: '100%',
          maxWidth: '375px',


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
          <Box fontStyle=" " display="flex" flexDirection="column" gap={2} width="100%" marginTop="40px" className="font-bold divide-y divide-gray-300">
            <Typography > AGE : {calculateAge(dob)}</Typography>
            <Typography > University : {address} </Typography>
            <Typography> Hobby : {hobby}</Typography>
            <Typography> About Me : {bio}
            </Typography>
            <Typography> Food Lifestyle : </Typography>
            <div className="flex flex-row items-center justify-center">
              <div>
                <button className={`w-[160px] h-[36px] m-2  border border-black rounded-3xl bg-[#B7D55A] text-sm`}>{tags[0]} </button>
                <button className={`w-[160px] h-[36px] m-2  border border-black rounded-3xl bg-[#B7D55A] text-sm`}>{tags[1]} </button>
              </div>
              <div>
                <button className={`w-[160px] h-[36px] m-2  border border-black rounded-3xl bg-[#B7D55A] text-sm`}>{tags[2]} </button>
                <button className={`w-[160px] h-[36px] m-2  border border-black rounded-3xl bg-[#B7D55A] text-sm`}>{tags[3]} </button>
              </div>
            </div>
          </Box>
        </Box>

        {/* Lifestyle Buttons */}
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-around" padding="30px" >
          <Button
            variant="contained"
            style={{
              backgroundColor: '#B7D55A',
              borderRadius: '20px',
              color: 'white',
              width: '140px',
              height: '40px',
            }}
          >
            out to eat
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: 'red',
              borderRadius: '20px',
              color: 'white',
              width: '140px',
              height: '40px',
            }}
          >
            dine in
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Preview;
