import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Component to show confirmation modal

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Add z-50 */}
            <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 sm:w-1/3">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
                <p className="text-gray-600 mb-6">This action will permanently delete the account and associated data. This cannot be undone.</p>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 border border-red-500 text-black rounded-lg hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main component to list Users and Profiles
const UsersProfilesList = () => {
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [usernameToDelete, setUsernameToDelete] = useState('');

    const [restaurantData, setRestaurantData] = useState({
        restaurantID: '',
        name: '',
        tags: '',
        latitude: '',
        longitude: '',
        photo: '',
        description: '',
        hasPromo: false,
    });

    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();
    // Fetch users and profiles data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, profilesResponse] = await Promise.all([
                    axios.get('/api/admin/get-data-user'),
                    axios.get('/api/admin/get-data-profile'),
                ]);
                setUsers(usersResponse.data);
                setProfiles(profilesResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            }
        };

        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/api/admin/get-data-restaurant');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchData();
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('/api/admin/get-data-restaurant');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };
    // Handle delete account request
    const handleDeleteAccount = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.delete('/api/user/delete-account', {
                data: { username: usernameToDelete },
            });
            setSuccessMessage(response.data.message);

            // Re-fetch the data after deleting the account
            const [usersResponse, profilesResponse] = await Promise.all([
                axios.get('/api/admin/get-data-user'),
                axios.get('/api/admin/get-data-profile'),
            ]);
            setUsers(usersResponse.data);
            setProfiles(profilesResponse.data);
        } catch (error) {
            setError('Error deleting account');
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    // Handle form submission
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRestaurantData({
            ...restaurantData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/admin/post-data-restaurant', {
                restaurantID: restaurantData.restaurantID,
                name: restaurantData.name,
                tags: restaurantData.tags.split(','),
                location: {
                    latitude: parseFloat(restaurantData.latitude),
                    longitude: parseFloat(restaurantData.longitude),
                },
                photo: restaurantData.photo.split(','),
                description: restaurantData.description,
                hasPromo: restaurantData.hasPromo,
            });
            console.log('Restaurant created:', response.data);
            fetchRestaurants(); // Refresh the restaurant list
            setRestaurantData({
                restaurantID: '',
                name: '',
                tags: '',
                latitude: '',
                longitude: '',
                photo: '',
                description: '',
                hasPromo: false,
            });
            setLoading(false);
            alert('Restaurant added successfully');
        } catch (error) {
            console.error('Error submitting data:', error);
            setLoading(false);
            alert('Failed to submit restaurant data');
        }
    };

    // Delete restaurant by ID
    const handleDelete = async (restaurantID) => {
        try {
            await axios.delete('/api/admin/delete-restaurant', { data: { restaurantID } });
            fetchRestaurants(); // Refresh the restaurant list after deletion
            alert('Restaurant deleted successfully');
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('Failed to delete restaurant');
        }
    };

    // Clear the form after submission
    const clearForm = () => {
        setName('');
        setTags('');
        setLocation({ latitude: '', longitude: '' });
        setPhoto('');
        setDescription('');
        setHasPromo(false);
    };

    const go_to_login = () => {
        navigate("/home-login-register");
        localStorage.removeItem("LoginToken");
    }

    return (
        <div className="max-w-full mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className=" text-2xl sm:text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">Users and Profiles List</h2>

            {/* Success and Error Messages */}
            {successMessage && (
                <div className="text-green-600 mb-4 p-2 border border-green-600 rounded-lg">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="text-red-600 mb-4 p-2 border border-red-600 rounded-lg">
                    {error}
                </div>
            )}

            {/* Combined Users and Profiles List with Scrollable Table */}
            <div className="overflow-y-auto max-h-60"> {/* Scrollable container */}
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-2 py-1 text-left text-sm sm:text-base">Username</th>
                            <th className="px-2 py-1 text-left text-sm sm:text-base">Profile Info</th>
                            <th className="px-2 py-1 text-left text-sm sm:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const profile = profiles.find((p) => p.userID === user.username);
                            return (
                                <tr key={user.username} className="border-b">
                                    <td className="px-2 py-1 text-sm sm:text-base">{user.username}</td>
                                    <td className="px-2 py-1 text-sm sm:text-base">{profile ? profile.bio : 'No Profile'}</td>
                                    <td className="px-2 py-1 text-sm sm:text-base">
                                        <button
                                            className="px-4 py-2 border border-red-600 text-black rounded-lg hover:bg-red-700"
                                            onClick={() => {
                                                setUsernameToDelete(user.username);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Delete Account
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Add Restaurant Form */}
            <div className="App mt-8">
                <div className="max-w-4xl mx-auto p-8 border rounded-lg shadow-lg bg-white mb-8">
                    <h2 className="text-2xl font-bold mb-6">Add New Restaurant</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Restaurant ID</label>
                            <input
                                type="text"
                                name="restaurantID"
                                value={restaurantData.restaurantID}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Restaurant Name</label>
                            <input
                                type="text"
                                name="name"
                                value={restaurantData.name}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={restaurantData.tags}
                                onChange={handleChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                value={restaurantData.latitude}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                value={restaurantData.longitude}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Photos (comma separated)</label>
                            <input
                                type="text"
                                name="photo"
                                value={restaurantData.photo}
                                onChange={handleChange}
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-medium">Description</label>
                            <textarea
                                name="description"
                                value={restaurantData.description}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="hasPromo"
                                checked={restaurantData.hasPromo}
                                onChange={handleChange}
                                className="h-5 w-5"
                            />
                            <label className="text-lg font-medium">Has Promotion?</label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Restaurant'}
                        </button>
                    </form>
                </div>

                <div className="max-w-4xl mx-auto p-8 border rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-6">Restaurants List</h2>
                    <ul>
                        {restaurants.map((restaurant) => (
                            <li key={restaurant.restaurantID} className="flex justify-between items-center border-b py-3">
                                <div className="flex items-center space-x-4">
                                    {/* Display the first photo from the photo array */}
                                    {restaurant.photo && restaurant.photo[0] && (
                                        <img
                                            src={restaurant.photo[0]}
                                            alt={restaurant.name}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-xl font-medium">{restaurant.name}</h3>
                                        <p className="text-gray-600">{restaurant.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(restaurant.restaurantID)}
                                    className="border border-red-500 text-black px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-center pt-[25px]">
                    <button
                        onClick={go_to_login}
                        className="w-[331px] h-[39px] rounded-lg bg-red text-xl text-white">
                        Logout
                    </button>
                </div>

            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteAccount}
            />
        </div>
    );
};

export default UsersProfilesList;
