'use client';

import { useState } from 'react';

export default function UserProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePic: '/default-avatar.png',
  });

  const [newName, setNewName] = useState(user.name);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewProfilePic(imageURL);
    }
  };

  const handleUpdateProfile = () => {
    setUser({
      ...user,
      name: newName,
      profilePic: newProfilePic || user.profilePic,
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-[#4A90E2] text-center">User Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mt-6">
          <img 
            src={newProfilePic || user.profilePic} 
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
          className="mt-6 w-full bg-[#A3BCE2] text-white py-3 rounded hover:bg-[#8FA8D1] transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
