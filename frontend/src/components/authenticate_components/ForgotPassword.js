import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);

	axios.defaults.withCredentials = true;

	const handleEmailChange = (e) => {
		const inputEmail = e.target.value;
		setEmail(inputEmail);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setIsEmailValid(emailRegex.test(inputEmail));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isEmailValid) {
			toast.error('Please enter a valid email address.');
			return;
		}

		setLoading(true);
		axios
			.post('http://localhost:5000/api/authenticate/forgotpassword', { email })
			.then((res) => {
				setLoading(false);
				if (res.data.Status === 'Not Existed') {
					toast.error('Not Existed Email In System.');
				} else if (res.data.Status === 'Success') {
					setMessage('Check your email for further instructions.');
					toast.success('Email sent successfully!');
				} else {
					setMessage('An error occurred. Please try again.');
					toast.error('An error occurred. Please try again.');
				}
			})
			.catch((err) => {
				setLoading(false);
				setMessage('An error occurred. Please try again.');
				toast.error('An error occurred. Please try again.');
				console.log(err);
			});
	};

	return (
		<section className='flex items-center justify-center min-h-screen bg-[#151515]'>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				draggable
				pauseOnHover
			/>
			<div className='w-full max-w-xl p-8 bg-white rounded-lg shadow-2xl'>
				<h3 className='mb-6 text-3xl font-bold text-center text-gray-800'>Forgot Password</h3>

				{message && <div className='mb-4 text-sm text-center text-blue-600'>{message}</div>}

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<input
							type='email'
							placeholder='Enter your email'
							autoComplete='off'
							className={`w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
								!isEmailValid && email ? 'border-red-500' : ''
							}`}
							onChange={handleEmailChange}
							value={email}
							required
						/>
						{!isEmailValid && email && (
							<div className='mt-1 text-sm text-red-600'>Please enter a valid email address.</div>
						)}
					</div>

					<div className='flex items-center justify-center'>
						<button
							className='w-full px-8 py-3 font-bold text-white uppercase transition duration-200 ease-in-out transform rounded-md shadow-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-4 focus:ring-orange-500'
							type='submit'
							disabled={loading || !isEmailValid}
						>
							{loading ? 'Sending...' : 'Send'}
						</button>
					</div>
				</form>

				<div className='mt-6 text-center'>
					<Link to='/signin' className='text-sm text-gray-500 transition hover:text-indigo-500'>
						Back to Login
					</Link>
				</div>
			</div>
		</section>
	);
}
