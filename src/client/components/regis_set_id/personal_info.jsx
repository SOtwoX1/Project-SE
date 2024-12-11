import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, profileRoutesURL } from '../../../apiConfig.js';

export default function Personal_info() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [genderinterest, setGenderinterest] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]); // Initialize selectedCategories state
    const [listGender, setListGender] = useState(['Man', 'Woman', 'Gay', 'Lesbian', 'Bisexual', 'Asexual', 'Demisexual', 'Pansexual', 'Queer', 'Questioning']);
    const [listGenderInterest, setListGenderInterest] = useState(['Man', 'Woman', 'Everyone']);

    const go_to_add_photo = async () => {
        try {
            const loginToken = localStorage.getItem('LoginToken');
            const { username } = JSON.parse(loginToken);

            const data = {
                username,
                name,
                dob,
                address,
                gender: selectedgender,
                interestgender: genderinterest,
                tags: selectedCategories,
            };

            console.log(data);

            const response = await axios.post(`${BASE_URL}${profileRoutesURL.base}${profileRoutesURL.registerProfileAPI}`, data);
            console.log(response.data);

            if (response.status === 201) {
                console.log('Profile created successfully');
            } else {
                console.log('Failed to create profile');
            }
            window.location.href = "/Add-photo";
        } catch (error) {
            console.error(error);
        }
    };

    const [selectedgender, setSelectedGender] = useState('');
    //เลือกเพศ
    const handleClickGenderinterest = (genderinterest) => {
        setGenderinterest(genderinterest);
        console.log(`Show me selected: ${genderinterest}`);
    };
    const handleClickdGender = (gender) => {
        setSelectedGender(gender);
        console.log(`Gender selected: ${gender}`);
    };

    // Handle food style category selection
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


    return (
        <div
            className="overflow-y-scroll overflow-x-hidden fixed w-full h-full flex flex-col pt-[8px] p-4 space-y-12 "
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}>
            <div className="flex flex-row items-center justify-center ">
                <img className="w-[55px] h-[55px] absolute left-[3%] top-[3.3%] mt-3 -rotate-2" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px] mt-12 absolute left-[20%] top-[2%]" src="src/client/img/heart.png" alt="Heart" />
                <span className="text-[#E76F51] text-[45px] font-extrabold text-center">PERSONAL INFOMATION</span>
                <img className="w-[22px] h-[27px] mt-[-45px] absolute right-[17%] top-[6.5%] rotate-6" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[50px] h-[50px] absolute right-[6%] bottom-[88%]  transform -rotate-12" src="src/client/img/pizza.png" alt="Pizza" />
            </div>
            {/*-------Your first name------*/}
            <div className="flex flex-col space-y-5 ">
                <div className="flex flex-col space-y-1">
                    <p className="text-xl">Your first name</p>
                    <div className="flex flex-col divide-y divide-gray-300">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your first name"
                            className="border-none focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                        <div className="h-2"></div>
                    </div>
                    <p className="text-xs text-gray-400">This is how it will appear in KOO-KNN</p>
                </div>

                {/*-------My birthday is------*/}
                <div className="flex flex-col space-y-1">
                    <p className="text-xl">My birthday is</p>
                    <div className="flex flex-col divide-y divide-gray-300">
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            placeholder="BB/MM/YYYY"
                            className="border-none focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                        <div className="h-2"></div>
                    </div>
                    <p className="text-xs text-gray-400">Your age will be public</p>
                </div>
            </div>
            {/*-------Your age will be public------*/}
            <div>
                <p className="text-xl">I am a</p>
                <div className="flex flex-col justify-start divide-y divide-gray-300 p-3 ">
                    {listGender.map((gender, index) => (
                        <div className={selectedgender == gender ? 'text-[#E9C46A]' : 'text-black'}>
                        <button
                            key={index}
                            onClick={() => handleClickdGender(gender)}
                            className={"h-[40px] my-auto hover:text-[#E9C46A] text-[20px] "}>{gender}
                        </button>
                    </div>
                ))}
                    <div></div>
                </div>
            </div>
            {/*-------Show Me------*/}
            <div>
                <p className="text-xl">Show Me</p>
                <div className="flex flex-col justify-start divide-y divide-gray-300 p-3 ">
                    {listGenderInterest.map((genderinterest, index) => (
                        <div className={selectedgender == genderinterest ? 'text-[#E9C46A]' : 'text-black'}>
                        <button
                        key={index}
                            onClick={() => handleClickGenderinterest(genderinterest)}
                            className={" h-[40px]  my-auto hover:text-[#E9C46A] text-[20px]"}>{genderinterest}
                        </button>
                    </div>))}
                    <div></div>
                </div>
            </div>
            {/*-------My university is-----*/}
            <div className="flex flex-col space-y-1">
                <p className="text-xl">My university is</p>
                <div className="flex flex-col divide-y divide-gray-300">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Your university"
                        className="border-none focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                    <div className="h-2"></div>
                </div>
                <p className="text-xs text-gray-400">Your age will be public</p>
            </div>
            {/*--------Food Lifestyle-----*/}
            <div>
                <p className="my-auto text-xl">Food Lifestyle</p>

                <div className="flex flex-col space-y-4 mt-4">
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
            </div>
            <button
                onClick={go_to_add_photo}
                className="border-none outline-none bg-[#E9C46A] text-white py-[5px] px-[15px] rounded-xl mt-[50px]">
                CONTINUE
            </button>
        </div>
    );
}
