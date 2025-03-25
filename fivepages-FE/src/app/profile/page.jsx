'use client';

import { useState, useEffect } from 'react';

export default function UserProfilePage() {
  const [user, setUser] = useState(null); // User data from API
  const [newName, setNewName] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // API call status

  // Default user data if API doesn't return any
  const defaultUser = {
    name: 'Guest User',
    email: 'guest@example.com',
    profilePic: '/default-avatar.png', // Path to a default avatar image
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getUser'); // Adjust API URL as needed
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        if (!data) throw new Error('User not found');
        setUser(data);
        setNewName(data.name); // Set default name
      } catch (error) {
        console.warn('Error fetching user data, using default values:', error);
        setUser(defaultUser);
        setNewName(defaultUser.name); // Set default name for guest
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG or PNG files are allowed.');
        return;
      }
      setNewProfilePic(file); // Store the file for upload
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    // Validate inputs
    if (!newName.trim()) {
      alert('Name cannot be empty!');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('email', user.email); // Email remains unchanged
      if (newProfilePic) formData.append('profilePic', newProfilePic);
      if (password.trim()) formData.append('password', password);

      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          name: newName,
          profilePic: newProfilePic ? URL.createObjectURL(newProfilePic) : prevUser.profilePic,
        }));
        alert('Profile updated successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-[#4A90E2] text-center">User Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mt-6 text-center justify-center ">
          <img 
            src={newProfilePic ? URL.createObjectURL(newProfilePic) : user.profilePic} 
            alt="Profile" 
            className="w-28 h-28  rounded-full border-2 border-gray-300 shadow-sm "
          />  
          <input 
            type="file" 
            onChange={handleProfilePicChange} 
            className="w-[12rem] mt-3  hover:border p-2 text-sm text-gray-600 text-center "
          />
        </div>

        {/* User Info */}
        <div className="mt-6">
          <p className="text-gray-700 text-lg text-center"><strong className=''>Email:</strong> {user.email}</p>

          {/* Name Input */}
          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4 relative">
            <label className="block text-gray-600 text-sm font-medium">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] pr-10"
                placeholder="Leave blank to keep current password"
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button 
          onClick={handleUpdateProfile} 
          disabled={loading}
          className={`mt-6 w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition ${loading && ' cursor-not-allowed'}`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
}
  