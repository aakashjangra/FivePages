'use client';

import { useState, useEffect } from 'react';

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultUser = {
    name: 'Guest User',
    email: 'guest@example.com',
    profilePic: '/default-avatar.png',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/v1/user/getUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        setNewName(data.name);
        setNewEmail(data.email);
      } catch (error) {
        console.warn('Error fetching user data, using default values:', error);
        setUser(defaultUser);
        setNewName(defaultUser.name);
        setNewEmail(defaultUser.email);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!newName.trim() || !newEmail.trim()) {
      return alert('Name and email cannot be empty.');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/user/updateProfile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser((prev) => ({
          ...prev,
          name: newName,
          email: newEmail,
        }));
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Error updating profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      return alert('Both old and new passwords are required.');
    }
    if (oldPassword === newPassword) {
      return alert('New password must be different from the old password.');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/user/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        alert(data.message || 'Error updating password.');
      }
    } catch (error) {
      console.error('Error:', error);
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
        <div className="flex justify-center mt-6">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-sm"
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="block text-gray-600 text-sm font-medium">Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          />
        </div>

        {/* Name */}
        <div className="mt-4">
          <label className="block text-gray-600 text-sm font-medium">Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          />
        </div>

        {/* Password Change */}
        <div className="mt-4 relative">
          <label className="block text-gray-600 text-sm font-medium">Old Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] pr-10"
            placeholder="Enter current password"
          />
        </div>

        <div className="mt-4 relative">
          <label className="block text-gray-600 text-sm font-medium">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition ${loading && 'cursor-not-allowed'}`}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          <button
            onClick={handleChangePassword}
            disabled={loading}
            className={`w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition ${loading && 'cursor-not-allowed'}`}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>
    </div>
  );
}
