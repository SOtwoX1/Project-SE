import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Edit_pro() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startX, setStartX] = useState(0);  // To handle touch events
    const [bio, setBio] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [education, setEducation] = useState("");
    const [job, setJob] = useState("");
    const [hobby, setHobby] = useState("");
    const navigate = useNavigate();
    const go_to_profile = () => {
        navigate("/profile");
    }
    const go_to_edit = () => {
        navigate("/Edit");
    }
    const go_to_preview = () => {
        navigate("/Preview");
    }
    //ide bar
    const [currentIndex, setCurrentIndex] = useState(0);
    //ัดรู
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX); // Store initial touch position
    };
    // Handle swipe end
    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX; // Store end touch position
        const diff = endX - startX;

        if (diff > 50) {
            // Swipe Right
            setCurrentIndex((prevIndex) =>
                (prevIndex - 1 + images.length) % images.length
            );
        } else if (diff < -50) {
            // Swipe Left
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }
    };

    //เลือกเพศ
    const [selectedGender, setSelectedGender] = useState([]);
    const handleClick = (gender) => {
        setSelectedGender(gender);
        console.log(`Gender selected: ${gender}`);
    };

    //เลือกอาหาร
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleButtonClick = (category) => {
        setSelectedCategories((prev) => {
            const updatedTags = [...prev];
            const index = updatedTags.indexOf(category);
            if (index === -1) {
                updatedTags.push(category);
            } else {
                updatedTags.splice(index, 1);
            }
            return updatedTags;
        });
        console.log(`Category selected: ${category}`);
        console.log(`Selected categories: ${selectedCategories}`);
    };

    useEffect(() => {
        // Fetch user data from local storage
        const LoginToken = localStorage.getItem("LoginToken");
        const userData = JSON.parse(LoginToken);
        setUsername(userData.username);

        // Fetch profile data from backend API
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/get-data", {
                    params: { username: userData.username },
                });
                setProfile(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to load profile");
                setLoading(false);
            }
        };

        fetchProfile();

        // Image carousel automatic sliding (optional)
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5); // Cycle through images
        }, 2000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    // Loading and error handling
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Extract profile details
    const { photo, username: profileUsername } = profile || {};
    const images = photo || [];

    const handleSavealldata = async () => {
        const fromdata = { name, username, bio, address, dob, education, job, hobby, tags: selectedCategories, gender: selectedGender };
        console.log(fromdata);
        try {
            const response = await axios.put("http://localhost:3000/api/update-dataprofile", fromdata);
            console.log(response.data);
            alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (

        <div
            className="overflow-y-scroll overflow-x-hidden fixed w-full h-full flex flex-col  pt-[8px] "
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="flex flex-row items-center justify-center ">
                <img className="w-[50px] h-[50px] absolute left-[6%] mt-3 -rotate-3" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px] mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
                <span className="text-[#E76F51] text-[40px] font-extrabold">EDIT PROFILE</span>
                <img className="w-[22px] h-[27px] mt-[-45px] absolute right-[14%] rotate-6" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[50px] h-[50px] absolute right-[8%] mt-6 transform -rotate-12" src="src/client/img/pizza.png" alt="Pizza" />
            </div>
            <div className="">
                <div className="flex items-center h-[65px]">
                    <button onClick={go_to_profile} className="ml-2" >
                        <svg class="w-[42px] h-[42px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    <p className="text-xl text-black">PROFILE</p>
                </div>
            </div>
            <div className="table-auto mx-auto w-full ">
                <thead>
                    <tr className="flex justify-center">
                        <th class="w-[187.25px] bg-gray-300 border border-black  px-4 py-2">
                            <button onClick={go_to_edit} className="w-[100.25px]">Edit</button>
                        </th>
                        <th class="w-[187.25px] bg-gray-300 border border-black px-4 py-2">
                            <button onClick={go_to_preview} className="w-[100.25px]">Preview</button>
                        </th>
                    </tr>
                </thead>

                <div className="relative w-full mx-auto ">
                    <div
                        className="overflow-hidden w-full h-[405px] relative"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-500"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="min-w-full h-[405px] flex-shrink-0"
                                >
                                    <img
                                        src={img}
                                        alt={`Profile ${index + 1}`}
                                        className="w-[375px] h-full object-cover border border-black"
                                    />
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-[96%] left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-[60px] h-1 rounded-lg mt-3  ${currentIndex === index ? 'bg-white' : 'bg-gray-300'
                                    }`}
                            ></button>
                        ))}
                    </div>

                </div>



                <div className="w-full h-[47px] bg-gray-300 flex">
                    <p className="pl-2 my-auto text-[20px]">ABOUT ME</p>
                </div>
                <div className="px-6 py-4">
                    {/* Bio Field */}
                    <div className="m-2 w-full h-auto">
                        <div className="text-s text-[black] m-2 ml-2">Can you share a little about yourself ?</div>
                        <input
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            type="text"
                            className="w-72 h-20 text-[#8391A1] mt-1 ml-2 bg-gray-300 border border-gray-300 rounded-3xl"
                            placeholder="Bio"
                        />
                    </div>

                    {/* Name Field */}
                    <div className="m-2 w-full h-auto flex">
                        <span className="text-s text-[b] m-2 ml-2">Name: </span>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="w-56 h-8 text-[#8391A1] mt-1 ml-2 bg-gray-300 border border-gray-300 rounded-3xl"
                            placeholder="Name"
                        />
                    </div>

                    {/* Address Field */}
                    <div className="m-2 w-full h-auto flex">
                        <span className="text-s text-[b] m-2 ml-2">Address: </span>
                        <input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="w-52 h-8 text-[#8391A1] mt-1 ml-2 bg-gray-300 border border-gray-300 rounded-3xl"
                            placeholder="Address"
                        />
                    </div>

                    {/* Date of Birth Field */}
                    <div className="m-2 w-full h-auto flex">
                        <span className="text-s text-[b] m-2 ml-2">Date of Birth: </span>
                        <input
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            type="date"
                            className="w-44 h-8 text-[#8391A1] mt-1 ml-2  bg-gray-300 border border-gray-300 rounded-3xl"
                        />
                    </div>

                    {/* Education Field */}
                    <div className="m-2 w-full h-auto flex">
                        <span className="text-s text-[b] m-2 ml-2">Education: </span>
                        <input
                            id="education"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            type="text"
                            className="w-48 h-8 text-[#8391A1] mt-1 ml-2 bg-gray-300 border border-gray-300 rounded-3xl"
                            placeholder="Education"
                        />
                    </div>

                    {/* Job Field */}
                    <div className="m-2 w-full h-auto flex">
                        <span className="text-s text-[b] m-2 ml-2">Job: </span>
                        <input
                            id="job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                            type="text"
                            className="w-60 h-8 text-[black] mt-1 ml-2 bg-gray-300 border border-gray-300 rounded-3xl"
                            placeholder="Job"
                        />
                    </div>

                    {/* Hobby Field */}
                    <div className="m-2 w-full h-auto flex">
                        <span className="text-s text-[black] m-2 ml-2">Hobby: </span>
                        <input
                            id="hobby"
                            value={hobby}
                            onChange={(e) => setHobby(e.target.value)}
                            type="text"
                            className="w-250 h-8 text-[#8391A1] mt-1 ml-2 border bg-gray-300 border-gray-300 rounded-3xl"
                            placeholder="Hobby"
                        />
                    </div>
                </div>
                <div className="w-full h-[47px] bg-gray-300 flex">
                    <p className="pl-2 my-auto text-[20px]">Sexual Orentation</p>
                </div>
                <div className="flex flex-col justify-start divide-y divide-gray-300 p-3 ">
                    <div>
                        <button
                            onClick={() => handleClick('Straight')}
                            className={" h-[40px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Straight
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Gay')}
                            className={" h-[45px]   my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Gay
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => handleClick('Lesbian')}
                            className={" h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Lesbian
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Bisexual')}
                            className={" h-[45px] my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Bisexual
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Asexual')}
                            className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Asexual
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Demisexual')}
                            className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Demisexual
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Pansexual')}
                            className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Pansexual
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Queer')}
                            className={" h-[45px]  my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Queer
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleClick('Questioning')}
                            className={" h-[45px]   my-auto text-black hover:text-[#E9C46A] text-[20px]"}>
                            Questioning
                        </button>
                    </div>
                </div>
                <div className="w-full h-[47px] bg-gray-300 flex">
                    <p className="pl-2 my-auto text-[20px]">Lifestyle</p>
                </div>
                <div className="flex flex-col space-y-4 mt-4 h-[250px]">
                    <div className="flex flex-row gap-3 justify-center">
                        <button onClick={() => handleButtonClick('ร้านอาหารจานด่วน')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารจานด่วน') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารจานด่วน </button>
                        <button onClick={() => handleButtonClick('ร้านอาหารบุฟเฟต์')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารบุฟเฟต์') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารบุฟเฟต์  </button>
                    </div>
                    <div className="flex flex-row gap-3 justify-center">
                        <button onClick={() => handleButtonClick('ร้านอาหารท้องถิ่น')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารท้องถิ่น') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารท้องถิ่น  </button>
                        <button onClick={() => handleButtonClick('ร้านอาหารนานาชาติ')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารนานาชาติ') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารนานาชาติ</button>
                    </div>
                    <div className="flex flex-row gap-3 justify-center">
                        <button onClick={() => handleButtonClick('ร้านอาหารเดลิเวอรี')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารเดลิเวอรี') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารเดลิเวอรี</button>
                        <button onClick={() => handleButtonClick('ร้านกาแฟ')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านกาแฟ') ? 'bg-[#E9C46A]' : ''}`}>ร้านกาแฟ</button>
                    </div>
                    <div className="flex flex-row gap-3 justify-center">
                        <button onClick={() => handleButtonClick('ร้านอาหารตามสั่ง')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารตามสั่ง') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารตามสั่ง</button>
                        <button onClick={() => handleButtonClick('ร้านอาหารระดับหรู')} className={`w-[175px] h-[36px] border border-black rounded-3xl ${selectedCategories.includes('ร้านอาหารระดับหรู') ? 'bg-[#E9C46A]' : ''}`}>ร้านอาหารระดับหรู</button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className={`w-[331px] h-[39px] bg-[#E9C46A] rounded-2xl font-bold text-white text-[16px] ${selectedCategories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedCategories.length === 0}
                        onClick={handleSavealldata}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>


    );
}