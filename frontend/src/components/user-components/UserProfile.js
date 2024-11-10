import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchUserProfile } from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [profile, setProfile] = useState(null);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [hasPassword, setHasPassword] = useState(true);
	const [isEditing, setIsEditing] = useState(true);

	const handleEditProfileClick = () => {
		setIsEditing(!isEditing);
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await fetchUserProfile();
				setLoading(false);
				setProfile(data);
				setName(data.name);
				setEmail(data.email);
				setGender(data.gender);
				setDob(data.dob);
				setPhone(data.phone);
				setAddress(data.address);
				setHasPassword(data.password);
			} catch (error) {
				setError(error.message);
				setLoading(false);
				console.error('Error fetching profile:', error);
			}
		};
		fetchProfile();
	}, []);

	const handleEditProfile = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				'http://localhost:5000/api/users/editUserProfile',
				{ name, email, gender, dob, phone, address },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success('Profile updated successfully');
		} catch (error) {
			console.error('Error updating profile:', error);
			toast.error('Failed to update profile');
		}
	};

	const handleChangePassWord = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error('New passwords do not match');
			return;
		}
		try {
			await axios.put(
				'http://localhost:5000/api/users/changePassword',
				{
					currentPassword: hasPassword ? currentPassword : '',
					newPassword: newPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success('Password changed successfully');
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (error) {
			console.error('Error changing password:', error);
			toast.error('Error: ' + error.message);
		}
	};

	if (loading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='loader'>Loading...</div>
			</div>
		);
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='min-h-screen p-6 text-white bg-gray-900'>
			<ToastContainer />
			<div className='grid max-w-4xl grid-cols-1 gap-6 mx-auto lg:grid-cols-3'>
				<div className='lg:col-span-1'>
					<div className='p-6 text-center bg-gray-800 rounded-lg shadow-lg'>
						<img
							src='https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg'
							className='w-32 mx-auto mb-4 rounded-full'
							alt='Profile'
						/>
						<h5 className='text-xl font-bold'>{profile && profile.name}</h5>
						<p className='mt-2 font-semibold text-green-500'>Online</p>
					</div>

					<div className='p-6 mt-6 bg-gray-800 rounded-lg shadow-lg'>
						<h5 className='mb-4 text-xl font-bold'>Change Password</h5>
						<form onSubmit={handleChangePassWord} className='space-y-4'>
							{hasPassword && (
								<div>
									<label className='block text-sm font-medium'>Current Password</label>
									<input
										type='password'
										className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
									/>
								</div>
							)}
							<div>
								<label className='block text-sm font-medium'>New Password</label>
								<input
									type='password'
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>Confirm New Password</label>
								<input
									type='password'
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
							<button
								type='submit'
								className='w-full py-2 font-bold bg-blue-600 rounded-md hover:bg-blue-700'
							>
								Save Change
							</button>
						</form>
					</div>
				</div>

				<div className='lg:col-span-2'>
					<div className='p-6 bg-gray-800 rounded-lg shadow-lg'>
						<div className='flex items-center justify-between mb-6'>
							<h3 className='text-2xl font-bold'>My Account</h3>
							<button
								className={`px-4 py-2 rounded-md font-semibold ${
									isEditing ? 'bg-blue-600' : 'bg-red-600'
								}`}
								onClick={handleEditProfileClick}
							>
								{isEditing ? 'Edit Profile' : 'Cancel'}
							</button>
						</div>
						<form onSubmit={handleEditProfile} className='space-y-4'>
							<div>
								<label className='block text-sm font-medium'>Email address</label>
								<input
									type='email'
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={email}
									readOnly
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>Full name</label>
								<input
									type='text'
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={name}
									onChange={(e) => setName(e.target.value)}
									readOnly={isEditing}
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>Gender</label>
								<select
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									disabled={isEditing}
								>
									<option value=''>Select Gender</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
								</select>
							</div>
							<div>
								<label className='block text-sm font-medium'>Date of Birth</label>
								<input
									type='date'
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={dob}
									onChange={(e) => setDob(e.target.value)}
									readOnly={isEditing}
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>Phone number</label>
								<input
									type='text'
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									readOnly={isEditing}
								/>
							</div>
							<div>
								<label className='block text-sm font-medium'>Address</label>
								<textarea
									className='w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									readOnly={isEditing}
								/>
							</div>
							{!isEditing && (
								<button
									type='submit'
									className='w-full py-2 font-bold bg-blue-500 rounded-md hover:bg-blue-700'
								>
									Save Changes
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
