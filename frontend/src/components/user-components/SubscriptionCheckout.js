import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionCheckout = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const course = state?.course;

	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [level, setLevel] = useState('');
	const [dayPerWeek, setDayPerWeek] = useState('');
	const [hourPerDay, setHourPerDay] = useState('');
	const [step, setStep] = useState(1);

	const [errors, setErrors] = useState({
		weight: '',
		height: '',
		level: '',
		dayPerWeek: '',
		hourPerDay: '',
	});

	const handleNext = () => setStep(2);
	const handleBack = () => setStep(1);

	const validateFields = () => {
		const newErrors = {};
		if (!weight) newErrors.weight = 'Weight is required.';
		if (!height) newErrors.height = 'Height is required.';
		if (!level) newErrors.level = 'Level is required.';
		if (!dayPerWeek) newErrors.dayPerWeek = 'Days per week is required.';
		if (!hourPerDay) newErrors.hourPerDay = 'Hours per day is required.';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePayment = async () => {
		const token = localStorage.getItem('token');

		if (!token) {
			toast.error('You need to log in first to proceed with the payment.');
			return;
		}

		try {
			await axios.post(
				'http://localhost:5000/api/users/payment',
				{
					courseId: course._id,
					price: course.price,
					weight,
					height,
					level,
					dayPerWeek,
					hourPerDay,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success('Payment successful! Redirecting to home...');
			setTimeout(() => {
				navigate('/');
			}, 1500);
		} catch (error) {
			console.error('Payment error:', error);
			toast.error('Payment failed. Please try again.');
		}
	};

	if (!course) {
		return <div className='mt-10 text-center text-gray-500'>Course not found</div>;
	}

	return (
		<div className='bg-[#111827] sec-com'>
			<div className='max-w-3xl container-cus'>
				<ToastContainer />
				{step === 1 && (
					<div className='p-6 space-y-6 rounded-lg shadow-lg bg-orange-50'>
						<h1 className='text-2xl font-bold text-center text-orange-600'>Confirm Course Information</h1>
						<div className='text-center'>
							<h2 className='text-2xl font-semibold text-gray-800'>{course.name}</h2>
							<div className='mt-4 space-y-2'>
								<p className='text-gray-700'>
									<strong>Price:</strong>{' '}
									<span className='text-xl font-semibold text-orange-700'>
										{course.price.toLocaleString()} đ
									</span>
								</p>
								<p className='text-gray-700'>
									<strong>Duration:</strong> {course.duration}
								</p>
								<p className='text-gray-700'>
									<strong>Coach:</strong>{' '}
									{course.coachId
										? course.coachId.accountId?.name || course.coachId._id
										: 'No coach assigned'}
								</p>
							</div>
						</div>
						<button
							className='w-full py-3 mt-6 font-semibold text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-700'
							onClick={handleNext}
						>
							Next
						</button>
					</div>
				)}

				{step === 2 && (
					<div className='p-6 space-y-4 text-gray-900 rounded-lg shadow-lg bg-orange-50'>
						<h2 className='text-2xl font-bold text-center text-orange-600'>Enter Your Details</h2>
						<div className='space-y-4'>
							<div className='flex flex-col'>
								<label className='text-gray-700'>Weight (kg):</label>
								<input
									type='number'
									value={weight}
									onChange={(e) => setWeight(e.target.value)}
									className='p-2 border border-orange-200 rounded'
									required
								/>
								{errors.weight && <p className='text-sm text-red-500'>{errors.weight}</p>}
							</div>
							<div className='flex flex-col'>
								<label className='text-gray-700'>Height (cm):</label>
								<input
									type='number'
									value={height}
									onChange={(e) => setHeight(e.target.value)}
									className='p-2 border border-orange-200 rounded'
									required
								/>
								{errors.height && <p className='text-sm text-red-500'>{errors.height}</p>}
							</div>
							<div className='flex flex-col'>
								<label className='text-gray-700'>Level:</label>
								<input
									type='text'
									value={level}
									onChange={(e) => setLevel(e.target.value)}
									className='p-2 border border-orange-200 rounded'
									required
								/>
								{errors.level && <p className='text-sm text-red-500'>{errors.level}</p>}
							</div>
							<div className='flex flex-col'>
								<label className='text-gray-700'>Days per Week:</label>
								<input
									type='text'
									value={dayPerWeek}
									onChange={(e) => setDayPerWeek(e.target.value)}
									className='p-2 border border-orange-200 rounded'
									required
								/>
								{errors.dayPerWeek && <p className='text-sm text-red-500'>{errors.dayPerWeek}</p>}
							</div>
							<div className='flex flex-col'>
								<label className='text-gray-700'>Hours per Day:</label>
								<input
									type='text'
									value={hourPerDay}
									onChange={(e) => setHourPerDay(e.target.value)}
									className='p-2 border border-orange-200 rounded'
									required
								/>
								{errors.hourPerDay && <p className='text-sm text-red-500'>{errors.hourPerDay}</p>}
							</div>
						</div>
						<div className='flex justify-between mt-6'>
							<button
								className='px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300'
								onClick={handleBack}
							>
								Back
							</button>
							<button
								className='px-4 py-2 font-semibold text-white transition-transform transform bg-orange-600 rounded-lg hover:bg-orange-700 hover:scale-105'
								onClick={handlePayment}
							>
								Proceed to Payment
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SubscriptionCheckout;
