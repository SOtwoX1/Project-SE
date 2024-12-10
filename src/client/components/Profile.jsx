import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseProfileRouteURL, getDataProfileAPI } from "../../server/routes/profileRoutes";
import { BASE_URL } from "../../server/main";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const LoginToken = localStorage.getItem("LoginToken");
    const userData = JSON.parse(LoginToken);
    setEmail(userData.email);
    setUsername(userData.username);

    // Fetch profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${baseProfileRouteURL}${getDataProfileAPI}`, {
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

  // Navigate functions
  const go_to_message = () => navigate("/message");
  const go_to_accept = () => navigate("/accept");
  const go_to_restaurant = () => navigate("/restaurant");
  const go_to_match = () => navigate("/match");
  const go_to_profile = () => navigate("/profile");
  const go_to_setting = () => navigate("/Setting-Profile");
  const go_to_Edit_pro = () => navigate("/Edit-Profile");

  //if (loading) return <div>Loading...</div>;
  //if (error) return <div>{error}</div>;

  // Extract profile data
  const { name, photo, username: profileUsername } = profile || {};

  const images = [
    "https://www.mkrestaurant.com/public/uploads/promotion/images/025a564b678a79c1641e7b4b5b23f8eb.jpg",
    "https://st-th-1.byteark.com/assets.punpro.com/cover-contents/i21865/1635500075116-250139097_5070389379664041_2088383967691511298_n.jpg",
    "https://www.matichon.co.th/wp-content/uploads/2018/02/Valentine.png",
    "https://www.hotpro.today/ProImages/1123/mkrestaurantssSpat6tfI.jpg",
    "https://static.thairath.co.th/media/Dtbezn3nNUxytg04OMDiO47d7MlJ5tToMM7BzZTuamanxm.webp",
  ];

  return (
    <div className="bg-[#E9C46A] h-[812px] fixed overflow-hidden flex flex-col items-center">
      {/* Header */}
      <div
        className="bg-white w-[375px] h-[717px] rounded-b-[50px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: "Abhaya Libre, sans-serif" }}
      >
        <div className="flex flex-row items-center justify-center">
          <img
            className="w-[55px] h-[55px] mr-4"
            src="src/client/img/French Fries.png"
            alt="French Fries"
          />
          <img
            className="w-[22px] h-[27px] mt-12 absolute left-[20%]"
            src="src/client/img/heart.png"
            alt="Heart"
          />
          <span className="text-[#E76F51] text-[45px] font-extrabold">PROFILE</span>
          <img
            className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]"
            src="src/client/img/heart2.png"
            alt="Heart"
          />
          <img
            className="w-[55px] h-[55px] ml-4"
            src="src/client/img/pizza.png"
            alt="Pizza"
          />
        </div>
        {/* Profile Section */}
        {
          loading ?
            <div className="flex flex-col items-center justify-center h-[349px] text-[#E76F51]"
              style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              Loading
            </div>
            : error ?
              <div className="h-[349px] justify-self-center content-center">{error}</div>
              :
              <div className="flex flex-col items-center">
                <div className="bg-yellow-400flex flex-col items-center mt-6">
                  <img
                    className="w-[200px] h-[200px] rounded-full border-[#E9C46A]"
                    src={photo && photo[0] ? photo[0] : "src/client/img/pure.png"}
                    alt="Profile"
                  />
                </div>
                <div className="text-center mt-4 text-[30px] font-bold text-black">{name}</div>
                <div className="flex flex-row justify-center mt-6 space-x-4">
                  <button
                    onClick={go_to_Edit_pro}
                    className="bg-gray-300 w-[130px] h-[40px] text-[14px] text-black font-medium"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={go_to_setting}
                    className="bg-gray-300 w-[130px] h-[40px] text-[14px] text-black font-medium"
                  >
                    Setting
                  </button>
                </div>
              </div>}

        {/* Scrollable Image Section */}
        <div className="bg-gray-200 w-[346px] h-[161px] mt-6 overflow-x-auto flex items-center justify-start space-x-4">
          <div className="snap-start">
            <img
              src={images[currentImageIndex]}
              className="w-[346px] h-[160px] object-cover rounded-lg"
              alt="Ad"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-row justify-between w-full max-w-[375px] mt-4 px-2">
        <img
          className="w-[67px] h-[67px] cursor-pointer"
          src="src/client/img/messege.png"
          alt="message icon"
          onClick={go_to_message}
        />
        <img
          className="w-[67px] h-[67px] cursor-pointer"
          src="src/client/img/accept.png"
          alt="accept icon"
          onClick={go_to_accept}
        />
        <img
          className="w-[67px] h-[67px] cursor-pointer"
          src="src/client/img/restaurant.png"
          alt="restaurant icon"
          onClick={go_to_restaurant}
        />
        <img
          className="w-[67px] h-[67px] cursor-pointer"
          src="src/client/img/match.png"
          alt="match icon"
          onClick={go_to_match}
        />
        <img
          className="w-[67px] h-[67px] cursor-pointer"
          src="src/client/img/profilecolor.png"
          alt="profile icon"
          onClick={go_to_profile}
        />
      </div>
    </div>
  );
}
