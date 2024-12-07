import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Manage_Payment_Account() {
    const navigate = useNavigate();
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const go_to_setting = () => {
        navigate("/Setting-Profile");
    };

    const go_to_success_MPA = () => {
        navigate("/Success-Manage-Payment-Account");
    };

    const handleSaveCard = async () => {
        const LoginToken = localStorage.getItem('LoginToken');

        if (!LoginToken) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You must be logged in to add a payment method.',
            });
            return;
        }

        const { username } = JSON.parse(LoginToken);

        if (!cardHolderName || !cardNumber || !expirationDate || !cvv) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Information',
                text: 'Please fill out all fields.',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3000/api/user/create-cardpayment', {
                username,
                cardNumber,
                cardHolderName,
                expirationDate,
                cvv,
            });

            if (response.status === 201 || response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                go_to_success_MPA();
            }
        } catch (error) {
            console.error('Error saving card payment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'An error occurred while saving the card details.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed overflow-hidden w-[375px] h-[812px] rounded-b-[50px] text-[45px] font-extrabold flex flex-col p-3 pt-[16px]"
            style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
        >
            <div className="flex flex-row items-center justify-center">
                <img className="w-[55px] h-[55px] absolute left-[-1%] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
                <img className="w-[22px] h-[27px] mt-12 absolute left-[12%]" src="src/client/img/heart.png" alt="Heart" />
                <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[9%]" src="src/client/img/heart2.png" alt="Heart" />
                <img className="w-[55px] h-[55px] mr-[-325px]" src="src/client/img/pizza.png" alt="Pizza" />
                <span className="absolute text-[#E76F51] text-[45px] font-extrabold">UPDATE CARD</span>
            </div>

            <div className="flex flex-col pt-[3px] divide-y divide-gray-300">
                <div className="flex items-center h-[65px]">
                    <button onClick={go_to_setting} className="ml-2">
                        <svg
                            className="w-[42px] h-[42px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    <p className="text-[20px] text-black">SETTINGS</p>
                </div>
                <div>
                    <p className="text-[18px] text-black pl-3 pt-2">Add Your Credit Card</p>
                    <div className="grid grid-cols-2 gap-1 divide-y divide-gray-300">
                        <div className="col-span-2">
                            <input
                                type="text"
                                placeholder="Cardholder Name"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                className="w-[325px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                        </div>
                        <div className="col-span-2">
                            <input
                                type="text"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-[325px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                        </div>

                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                className="w-[162px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="CVC"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-[162px] h-[29px] border-none focus:outline-none focus:ring-0 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="text-center mt-[40px]">
                        <button
                            onClick={handleSaveCard}
                            disabled={isSubmitting}
                            className="w-[331px] h-[39px] bg-[#E9C46A] text-white text-[16px] font-bold rounded-lg"
                        >
                            {isSubmitting ? 'Saving...' : 'Save new card'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
