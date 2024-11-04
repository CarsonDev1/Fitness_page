import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleNavigation = (role, name) => {
		localStorage.setItem('role', role);
		localStorage.setItem('name', name);

		if (role === 'admin') {
			navigate('/admin/user');
		} else if (role === 'coach') {
			navigate('/coach');
		} else {
			navigate('/');
		}
	};

	const onSuccess = async (response) => {
		const credential = response.credential;
		const decoded = jwtDecode(credential);

		const { email, name, sub: googleId } = decoded;

		try {
			const res = await axios.post('http://localhost:5000/api/authenticate/googleLogin', {
				email,
				name,
				googleId,
			});
			toast.success(res.data.msg);
			localStorage.setItem('token', res.data.token);

			handleNavigation(res.data.role);
		} catch (error) {
			const errorMsg =
				error.response && error.response.data && error.response.data.msg
					? error.response.data.msg
					: 'Error logging in with Google';
			toast.error(errorMsg);
			setErrorMessage(errorMsg);
		}
	};

	const onFailure = (error) => {
		console.log('[Login Failed]', error);
		toast.error('Google login failed.');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/api/authenticate/login', { email, password });
			toast.success(response.data.msg);
			localStorage.setItem('token', response.data.token);

			handleNavigation(response.data.role);
		} catch (error) {
			const errorMsg =
				error.response && error.response.data && error.response.data.msg
					? error.response.data.msg
					: 'Error logging in';
			toast.error(errorMsg);
			setErrorMessage(errorMsg);
		}
	};

	return (
		<section className='flex items-center justify-center min-h-screen bg-[#151515]'>
			<div className='max-w-md p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-2xl container-cus'>
				<h3 className='mb-6 text-3xl font-bold text-center text-gray-800'>Welcome Back</h3>
				<div className='flex justify-center mb-4'>
					<GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
				</div>

				{errorMessage && (
					<div className='px-4 py-2 mb-4 text-red-700 bg-red-100 border border-red-400 rounded'>
						{errorMessage}
					</div>
				)}

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<input
							type='email'
							className='w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300'
							placeholder='Email address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div>
						<input
							type='password'
							className='w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className='flex items-center justify-center'>
						<button
							type='submit'
							class='px-8 py-3 font-bold text-white uppercase bg-gradient-to-r from-orange-600 to-red-600 rounded-md shadow-lg transform hover:from-orange-500 hover:to-red-500 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-500 skew-x-[-10deg] w-full'
						>
							LOGIN
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
						Don't have an account?{' '}
						<Link
							to='/signup'
							className='font-medium text-indigo-500 hover:text-indigo-400 hover:underline'
						>
							Sign up here
						</Link>
					</p>
				</div>
			</div>
			<ToastContainer />
		</section>
	);
}
