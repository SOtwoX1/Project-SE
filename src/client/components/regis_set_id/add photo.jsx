import React, { useState } from "react";
import axios from "axios";

export default function AddPhoto() {
  const [photos, setPhotos] = useState(Array(4).fill(null)); // Store paths for up to 4 photos
  const [username, setUsername] = useState("");
  const loginToken = localStorage.getItem("LoginToken");

  React.useEffect(() => {
    if (loginToken) {
      const userData = JSON.parse(loginToken);
      setUsername(userData.username);
    }
  }, [loginToken]);

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

  const handleImageRemove = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos); // Remove the photo from the state
  };

  const canContinue = photos.filter((photo) => photo).length >= 2; // Ensure at least 2 photos are added

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


        <div className="flex flex-row items-center justify-center ">
          <img
            className="w-[55px] h-[55px] absolute left-[1%] mr-4"
            src="src/client/img/French Fries.png"
            alt="French Fries" />
          <img
            className="w-[22px] h-[27px] mt-12 absolute left-[12%]"
            src="src/client/img/heart.png"
            alt="Heart" />
          <img
            className="w-[22px] h-[27px] mt-[-40px] absolute right-[10%]"
            src="src/client/img/heart2.png"
            alt="Heart" />
          <img
            className="w-[55px] h-[55px] mr-[-310px]"
            src="src/client/img/pizza.png"
            alt="Pizza" />
          <span className="absolute text-[#E76F51] text-[45px] font-extrabold">ADD PHOTOS</span>
        </div>
        <p className="text-[20px] text-black p-5">Add at least 2 photos to continue</p>

        <div className="grid grid-cols-2 gap-8 mt-[-20px] p-5 h-[570px]">
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
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="hidden" />
                </label>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className={`w-[331px] h-[39px] bg-[#E9C46A] rounded-2xl font-bold text-white text-[16px] mt-5 ${canContinue ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!canContinue}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
