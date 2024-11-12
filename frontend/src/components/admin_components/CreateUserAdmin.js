// CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = ({ onUserCreated, toggleSidebar }) => {
	const [newUser, setNewUser] = useState({
		email: '',
		name: '',
		role: 'user',
		status: 'activate',
		avatar: '',
		gender: 'male',
		dob: '',
		phone: '',
		address: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewUser({ ...newUser, [name]: value });
	};

	const handleCreateUser = async (e) => {
		e.preventDefault();

		// Simple validation example
		if (!newUser.email || !newUser.name) {
			toast.error('Email and Name are required.');
			return;
		}

		try {
			const res = await axios.post('http://localhost:5000/api/admins/accounts', newUser, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			toast.success(res.data.msg);
			onUserCreated();
			setNewUser({
				email: '',
				name: '',
				role: 'user',
				status: 'activate',
				avatar: '',
				gender: 'male',
				dob: '',
				phone: '',
				address: '',
			});
		} catch (err) {
			toast.error(err.response?.data?.msg || 'Failed to create user'); // More specific error message
		}
	};

	return (
		<div className='h-full md:h-screen sec-com container-cus'>
			<button onClick={toggleSidebar} className='block lg:hidden mb-4 p-2 bg-gray-800 text-white rounded'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='inline-block w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
				</svg>
			</button>
			<div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>Create New User</h2>
				<ToastContainer />
				<form onSubmit={handleCreateUser} className='space-y-4'>
					{/* Email */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Email</label>
						<input
							type='email'
							name='email'
							value={newUser.email}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
							required
						/>
					</div>
					{/* Name */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Name</label>
						<input
							type='text'
							name='name'
							value={newUser.name}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
							required
						/>
					</div>
					{/* Gender */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Gender</label>
						<select
							name='gender'
							value={newUser.gender}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						>
							<option value=''>Select Gender</option>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</select>
					</div>
					{/* Date of Birth */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
						<input
							type='date'
							name='dob'
							value={newUser.dob}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					{/* Phone */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Phone</label>
						<input
							type='text'
							name='phone'
							value={newUser.phone}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					{/* Address */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Address</label>
						<input
							type='text'
							name='address'
							value={newUser.address}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						/>
					</div>
					{/* Status */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>Status</label>
						<select
							name='status'
							value={newUser.status}
							onChange={handleInputChange}
							className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
						>
							<option value='activate'>Activate</option>
							<option value='blocked'>Blocked</option>
						</select>
					</div>
					{/* Buttons */}
					<div className='flex justify-end space-x-4 mt-6'>
						<button
							type='button'
							onClick={() => window.history.back()}
							className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold text-gray-700'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold'
						>
							Create User
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
