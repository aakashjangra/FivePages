'use client';

import { useState, useEffect } from 'react';

export default function UserProfilePage() {
  const [user, setUser] = useState(null); // User data from API
  const [newName, setNewName] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // API call status

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getUser'); // Adjust API URL as needed
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        setNewName(data.name); // Set default name
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file); // Store the file for upload
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('email', user.email); // Email remains unchanged
      if (newProfilePic) formData.append('profilePic', newProfilePic);
      if (password) formData.append('password', password);

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
        <div className="flex flex-col items-center mt-6">
          <img 
            src={newProfilePic ? URL.createObjectURL(newProfilePic) : user.profilePic} 
            alt="Profile" 
            className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-sm"
          />
          <input 
            type="file" 
            onChange={handleProfilePicChange} 
            className="mt-3 text-sm text-gray-600"
          />
        </div>

        {/* User Info */}
        <div className="mt-6">
          <p className="text-gray-700 text-lg"><strong>Email:</strong> {user.email}</p>

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
                placeholder="Enter new password"
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
          className={`mt-6 w-full bg-[#A3BCE2] text-white py-3 rounded hover:bg-[#8FA8D1] transition ${loading && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
}
