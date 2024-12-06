import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Ensure axios is imported

export default function Edit() {
  const [photos, setPhotos] = useState(Array(4).fill(null)); // Store paths for up to 4 photos
  const [username, setUsername] = useState("");
  const loginToken = localStorage.getItem("LoginToken");

  // Use effect to initialize the username from localStorage
  useEffect(() => {
    if (loginToken) {
      const userData = JSON.parse(loginToken);
      setUsername(userData.username);
    }
  }, [loginToken]);

  const navigate = useNavigate();
  
  const go_to_profile = () => navigate("/profile"); // Assuming this is the profile page

  const [images, setImages] = useState([null, null, null, null]); // Initially set to null

  // Handle the image upload process
  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        const response = await axios.post("http://localhost:3000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        const { filePath } = response.data;

        // Update the photos array with the returned path
        const newPhotos = [...photos];
        newPhotos[index] = filePath; // Use filePath from the server response
        setPhotos(newPhotos);
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("Failed to upload the image. Please try again.");
      }
    }
  };

  // Remove image from state
  const handleImageRemove = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;  // Remove the image
    setPhotos(newPhotos);
  };

  // Ensure at least 2 photos are added
  const canContinue = photos.filter((photo) => photo).length >= 2;

  // Submit the photos to backend
  const handleSubmit = async () => {
    if (canContinue) {
      // Prepare the payload for the backend
      const payload = {
        username: username,
        photo: photos, // Directly use the photos array as it already contains valid paths
      };
      console.log(payload);
      try {
        const response = await axios.put("http://localhost:3000/api/set-photo", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        alert("Photos uploaded successfully!");
        window.location.href = "/profile"; // Redirect after success
      } catch (error) {
        console.error("Error submitting photos:", error);
        alert("Failed to submit photos. Please try again.");
      }
    } else {
      alert("Please upload at least 2 photos before submitting.");
    }
  };

  return (
    <div className="fixed overflow-hidden flex bg-white items-center justify-center" style={{ fontFamily: "Abhaya Libre, sans-serif" }}>
      <div className="w-[375px] h-[812px] text-[45px] font-extrabold flex flex-col pt-[15px]">
        <div className="flex flex-row items-center justify-center">
          <img className="w-[55px] h-[55px] absolute left-[5%] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
          <img className="w-[22px] h-[27px] mt-12 absolute left-[22%]" src="src/client/img/heart.png" alt="Heart" />
          <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[22%]" src="src/client/img/heart2.png" alt="Heart" />
          <img className="w-[55px] h-[55px] mr-[-270px]" src="src/client/img/pizza.png" alt="Pizza" />
          <span className="absolute text-[#E76F51] text-[45px] font-extrabold">EDIT</span>
        </div>

        <div className="pt-[5px]">
          <div className="flex items-center h-[65px] p-3">
            <button onClick={go_to_profile} className="ml-2">
              <svg className="w-[42px] h-[42px] text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7" />
              </svg>
            </button>
            <p className="text-[20px] text-black">EDIT PROFILE</p>
          </div>
          <div className="w-full m-0 text-[20px] text-black bg-gray-300 border-t border-b border-black text-center py-1.5">
            <button onClick={handleSubmit} className="w-full">
              Perview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 p-5 h-[570px]">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-[148px] h-[236px] border border-black rounded-[10px] border-dashed flex items-center justify-center bg-[#C4C4C4]">
              {photo ? (
                <div className="relative w-full h-full">
                  <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-[10px]" />
                  <button onClick={() => handleImageRemove(index)} className="absolute bottom-0 right-0 bg-transparent mb-[-8px] mr-[-8px]">
                    <img src="src/client/img/close.png" alt="Delete" className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <span className="text-gray-400 text-white text-[80px]">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="mx-auto w-[148px] h-[39px] p-[5px] mt-2 bg-[#F4A261] text-white rounded-xl text-[16px] font-bold focus:outline-none focus:ring-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
