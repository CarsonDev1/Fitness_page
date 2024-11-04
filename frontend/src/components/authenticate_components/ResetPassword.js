import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const history = useNavigate();
	const { id, token } = useParams();

	axios.defaults.withCredentials = true;

	const validatePassword = (password) => {
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordPattern.test(password);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isPasswordValid) {
			setMessage(
				'Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, and one special character.'
			);
			return;
		}

		setLoading(true);
		axios
			.post(`http://localhost:5000/api/authenticate/resetpassword/${id}/${token}`, { password })
			.then((res) => {
				setLoading(false);
				toast.success('Password updated successfully. Redirecting to login...');
				setTimeout(() => history('/signin'), 3000);
			})
			.catch((err) => {
				setLoading(false);
				setMessage('An error occurred. Please try again.');
				console.log(err);
			});
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		setIsPasswordValid(validatePassword(newPassword));
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
			<div className='max-w-md p-8 bg-white rounded-lg shadow-2xl'>
				<h3 className='mb-6 text-3xl font-bold text-center text-gray-800'>Reset Password</h3>

				{message && <div className='mb-4 text-sm text-center text-blue-600'>{message}</div>}

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<input
							type='password'
							placeholder='Enter New Password'
							autoComplete='off'
							className={`w-full px-4 py-3 text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
								isPasswordValid ? 'border-green-500' : 'border-red-500'
							}`}
							onChange={handlePasswordChange}
							value={password}
							required
						/>
						{!isPasswordValid && password && (
							<div className='mt-1 text-sm text-red-600'>
								Password must be at least 8 characters long, including at least one lowercase letter,
								one uppercase letter, and one special character.
							</div>
						)}
					</div>

					<div className='flex items-center justify-center'>
						<button
							type='submit'
							className='w-full px-8 py-3 font-bold text-white uppercase transition duration-200 ease-in-out transform rounded-md shadow-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-4 focus:ring-orange-500'
							disabled={loading || !isPasswordValid}
						>
							{loading ? 'Updating...' : 'Update'}
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

export default ResetPassword;
