import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [hasPromo, setHasPromo] = useState(false);

    // Fetch users and profiles data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, profilesResponse] = await Promise.all([
                    axios.get('/api/get-data-user'),
                    axios.get('/api/get-data-profile'),
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
                const response = await axios.get('/api/get-data-restaurant');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchData();
        fetchRestaurants();
    }, []);

    // Handle delete account request
    const handleDeleteAccount = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.delete('/api/delete-account', {
                data: { username: usernameToDelete },
            });
            setSuccessMessage(response.data.message);

            // Re-fetch the data after deleting the account
            const [usersResponse, profilesResponse] = await Promise.all([
                axios.get('/api/get-data-user'),
                axios.get('/api/get-data-profile'),
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
    const handleSubmit = (e) => {
        e.preventDefault();

        const newRestaurant = {
            name,
            tags: tags.split(','),
            location,
            photo: [photo],
            description,
            hasPromo,
        };

        axios.post('/api/post-data-restaurant', newRestaurant)
            .then((response) => {
                setRestaurants([...restaurants, response.data]);
                clearForm();
            })
            .catch((error) => console.error('Error posting restaurant:', error));
    };

    // Delete restaurant by ID
    const handleDelete = (id) => {
        axios.delete(`/api/delete-data-restaurant/${id}`)
            .then(() => {
                setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
            })
            .catch((error) => console.error('Error deleting restaurant:', error));
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
            <div className="container mx-auto p-5">
                <h1 className="text-3xl font-bold mb-5">Restaurant Management</h1>

                {/* Form for adding new restaurant */}
                <form onSubmit={handleSubmit} className="mb-5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Comma separated tags"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location (Latitude, Longitude)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                className="mt-1 block w-1/2 border border-gray-300 rounded-lg p-2"
                                placeholder="Latitude"
                                value={location.latitude}
                                onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                className="mt-1 block w-1/2 border border-gray-300 rounded-lg p-2"
                                placeholder="Longitude"
                                value={location.longitude}
                                onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={hasPromo}
                                onChange={() => setHasPromo(!hasPromo)}
                            />
                            <span className="ml-2 text-sm text-gray-700">Has Promo?</span>
                        </label>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Add Restaurant</button>
                </form>

                {/* List of restaurants */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">Restaurant List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {restaurants.map((restaurant) => (
                            <div key={restaurant._id} className="border border-gray-300 p-5 rounded-lg shadow-md">
                                <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
                                <p className="text-sm text-gray-700 mb-2">{restaurant.description}</p>
                                <div className="mb-2">
                                    <span className="font-medium">Location:</span> Latitude {restaurant.location.latitude}, Longitude {restaurant.location.longitude}
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">Tags:</span> {restaurant.tags.join(', ')}
                                </div>
                                {restaurant.photo.length > 0 && (
                                    <img src={restaurant.photo[0]} alt={restaurant.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                                )}
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handleDelete(restaurant._id)}
                                        className="bg-red-500 text-white p-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
