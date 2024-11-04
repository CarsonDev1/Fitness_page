import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validatePassword = (password) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setEmail(value);
		if (!validateEmail(value)) {
			setEmailError('Please enter a valid email address');
		} else {
			setEmailError('');
		}
	};

	const handleNameChange = (e) => {
		const value = e.target.value;
		setName(value);
	};

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		if (!validatePassword(value)) {
			setPasswordError(
				'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character.'
			);
		} else {
			setPasswordError('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (emailError || passwordError) {
			toast.error('Please fix the errors before submitting.');
			return;
		}
		try {
			const response = await axios.post('http://localhost:5000/api/authenticate/register', {
				email,
				password,
				name,
			});
			toast.success(response.data.msg);
			navigate('/signin');
		} catch (error) {
			toast.error(error.response.data.msg);
		}
	};

	return (
		<section className='flex items-center justify-center min-h-screen bg-[#151515]'>
			<div className='max-w-md p-8 bg-white rounded-lg shadow-2xl container-cus'>
				<h3 className='mb-6 text-3xl font-bold text-center text-gray-800'>Sign Up</h3>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<input
							type='email'
							className='w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300'
							placeholder='Email'
							value={email}
							onChange={handleEmailChange}
							required
						/>
						{emailError && <div className='mt-1 text-sm text-red-600'>{emailError}</div>}
					</div>

					<div>
						<input
							type='text'
							className='w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300'
							placeholder='Name'
							onChange={handleNameChange}
							value={name}
							required
						/>
					</div>

					<div>
						<input
							type='password'
							className='w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300'
							placeholder='Password'
							value={password}
							onChange={handlePasswordChange}
							required
						/>
						{passwordError && <div className='mt-1 text-sm text-red-600'>{passwordError}</div>}
					</div>

					<div className='flex items-center justify-center'>
						<button
							type='submit'
							className='px-8 py-3 font-bold text-white uppercase bg-gradient-to-r from-orange-600 to-red-600 rounded-md shadow-lg transform hover:from-orange-500 hover:to-red-500 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-500 skew-x-[-10deg] w-full'
							disabled={emailError || passwordError}
						>
							Sign Up
						</button>
					</div>
				</form>

				<div className='mt-6 text-center'>
					<Link to='/forgotpassword' className='text-sm text-gray-500 transition hover:text-indigo-500'>
						Forgot password?
					</Link>
				</div>

				<div className='mt-4 text-center'>
					<p className='text-gray-600'>
						Already have an account?{' '}
						<Link
							to='/signin'
							className='font-medium text-indigo-500 hover:text-indigo-400 hover:underline'
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
			<ToastContainer />
		</section>
	);
}
