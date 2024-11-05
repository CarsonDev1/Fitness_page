import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CourseDetails() {
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
		<div className='bg-[#111827] sec-com'>
			<div className='bg-[#111827] sec-com'>
				<div className='max-w-5xl container-cus'>
					<button
						className='px-4 py-2 mb-4 text-white transition-colors bg-orange-600 rounded hover:bg-orange-700'
						onClick={handleBack}
					>
						&larr; Back to Courses
					</button>
					<div className='mb-6 text-center'>
						<h1 className='text-4xl font-bold text-orange-600'>{name}</h1>
					</div>

					<div className='flex flex-col gap-6 lg:flex-row'>
						<div className='w-full lg:w-2/3'>
							<div className='p-4 mb-4 rounded-lg shadow-lg bg-orange-50'>
								<h2 className='mb-2 text-xl font-semibold text-orange-600'>Course Description</h2>
								<div className='p-2 bg-white border border-orange-200 rounded quill-container'>
									<ReactQuill value={description} readOnly={true} theme='bubble' />
								</div>
							</div>
							<div className='flex flex-col gap-4 mb-6'>
								<div className='flex items-center justify-between p-4 rounded-lg shadow bg-orange-50'>
									<span className='font-medium text-gray-600'>Duration:</span>
									<span className='text-gray-700'>{duration}</span>
								</div>
								<div className='flex items-center justify-between p-4 rounded-lg shadow bg-orange-50'>
									<span className='font-medium text-gray-600'>Price:</span>
									<span className='text-2xl font-semibold text-orange-700'>
										{price.toLocaleString()}đ
									</span>
								</div>
								<div className='flex items-center justify-between p-4 rounded-lg shadow bg-orange-50'>
									<span className='font-medium text-gray-600'>Difficulty:</span>
									<span className='text-gray-700'>{difficulty}</span>
								</div>
							</div>
							<button
								className='w-full py-3 font-semibold text-white transition-transform transform bg-orange-600 rounded-lg hover:bg-orange-700'
								onClick={handlePayment}
							>
								Subscribe
							</button>
						</div>

						<div className='w-full space-y-6 lg:w-1/3'>
							<div className='p-4 rounded-lg shadow bg-orange-50'>
								<h3 className='mb-3 text-lg font-semibold text-orange-600'>Course Workouts</h3>
								<ul className='space-y-2 list-disc list-inside'>
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

							<div className='p-4 rounded-lg shadow bg-orange-50'>
								<h3 className='mb-3 text-lg font-semibold text-orange-600'>Coach</h3>
								<p className='text-base text-gray-600'>
									{coachId && coachId.accountId
										? coachId.accountId.name
										: coachId?._id || 'No coach assigned'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseDetails;
