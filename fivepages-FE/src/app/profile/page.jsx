'use client';

import { useState } from 'react';

export default function UserProfilePage() {
  // Dummy user data (Replace with real data from an API)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePic: '/default-avatar.png', // Replace with real image URL
  });

  const [newName, setNewName] = useState(user.name);
  const [newProfilePic, setNewProfilePic] = useState(null);

  // Handle Profile Picture Change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewProfilePic(imageURL);
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = () => {
    setUser({
      ...user,
      name: newName,
      profilePic: newProfilePic || user.profilePic,
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

        {/* Profile Picture */}
        <div className="relative">
          <img 
            src={newProfilePic || user.profilePic} 
            alt="Profile" 
            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
          />
          <input type="file" onChange={handleProfilePicChange} className="mt-2 block mx-auto text-sm" />
        </div>

        {/* User Info */}
        <div className="mt-4">
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>

          {/* Name Input */}
          <div className="mt-3">
            <label className="block text-gray-700 text-left">Name</label>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Update Button */}
        <button 
          onClick={handleUpdateProfile} 
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
