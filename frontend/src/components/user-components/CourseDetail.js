import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CourseDetails = () => {
	const { id } = useParams();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/users/courses/${id}`);
				setCourse(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [id]);

	if (loading) return <div className='text-center text-gray-500'>Loading course details...</div>;
	if (error) return <div className='text-center text-red-500'>Error: {error}</div>;
	if (!course) return <div className='text-center text-gray-500'>Course not found</div>;

	const { name, description, duration, price, difficulty, workoutId, coachId } = course;

	const handleBack = () => {
		navigate('/course-details');
	};

	const handlePayment = () => {
		navigate('/subscriptionCheckout', { state: { course: course } });
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<button
				className='mb-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors'
				onClick={handleBack}
			>
				&larr; Back to Courses
			</button>
			<div className='text-center mb-6'>
				<h1 className='text-3xl font-bold text-orange-600'>{name}</h1>
			</div>

			<div className='flex flex-col lg:flex-row gap-6'>
				<div className='w-full lg:w-2/3'>
					<div className='mb-4 p-4 bg-orange-50 rounded-lg shadow-lg'>
						<h2 className='text-xl font-semibold text-orange-600 mb-2'>Course Description</h2>
						<div className='quill-container bg-white rounded p-2 border border-orange-200'>
							<ReactQuill value={description} readOnly={true} theme='bubble' />
						</div>
					</div>
					<div className='flex flex-col gap-4 mb-6'>
						<div className='flex justify-between bg-orange-50 p-4 rounded-lg shadow'>
							<span className='font-medium text-gray-600'>Duration:</span>
							<span className='text-gray-700'>{duration}</span>
						</div>
						<div className='flex justify-between bg-orange-50 p-4 rounded-lg shadow'>
							<span className='font-medium text-gray-600'>Price:</span>
							<span className='text-gray-700'>{price} đ</span>
						</div>
						<div className='flex justify-between bg-orange-50 p-4 rounded-lg shadow'>
							<span className='font-medium text-gray-600'>Difficulty:</span>
							<span className='text-gray-700'>{difficulty}</span>
						</div>
					</div>
					<button
						className='w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-transform transform hover:scale-105'
						onClick={handlePayment}
					>
						Subscribe
					</button>
				</div>

				<div className='w-full lg:w-1/3 space-y-6'>
					<div className='p-4 bg-orange-50 rounded-lg shadow'>
						<h3 className='text-lg font-semibold text-orange-600 mb-3'>Course Workouts</h3>
						<ul className='list-disc list-inside space-y-2'>
							{Array.isArray(workoutId) && workoutId.length > 0 ? (
								workoutId.map((workout, index) => (
									<li key={index} className='text-gray-600'>
										{workout?.name || workout?._id || 'Unnamed workout'}
									</li>
								))
							) : (
								<li className='text-gray-500'>No workouts available</li>
							)}
						</ul>
					</div>

					<div className='p-4 bg-orange-50 rounded-lg shadow'>
						<h3 className='text-lg font-semibold text-orange-600 mb-3'>Coach</h3>
						<p className='text-gray-600 text-base'>
							{coachId && coachId.accountId
								? coachId.accountId.name
								: coachId?._id || 'No coach assigned'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetails;
