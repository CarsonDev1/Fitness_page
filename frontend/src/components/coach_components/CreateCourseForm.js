import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ProgressBar } from 'react-bootstrap';
import 'tailwindcss/tailwind.css';

const CreateCourseForm = ({ toggleSidebar }) => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [progress, setProgress] = useState(50);
	const [courseData, setCourseData] = useState({
		name: '',
		description: '',
		slotNumber: '',
		price: '',
		image: '',
		exercises: [],
		category: '',
	});
	const [exerciseSearch, setExerciseSearch] = useState([]);
	const [exercisesList, setExercisesList] = useState([]);
	const [selectedExercises, setSelectedExercises] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/coaches/exercises', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			.then((response) => {
				setExercisesList(response.data || []);
			})
			.catch((error) => {
				console.error('Error fetching exercises:', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCourseData({ ...courseData, [name]: value });
	};

	const handleDescriptionChange = (value) => {
		setCourseData({ ...courseData, description: value });
	};

	const validateForm = () => {
		const newErrors = {};
		if (!courseData.name.trim()) newErrors.name = 'Course name is required';
		if (!courseData.description.trim()) newErrors.description = 'Description is required';
		if (!courseData.slotNumber.trim()) newErrors.slotNumber = 'Slot number is required';
		if (!courseData.price || isNaN(+courseData.price) || +courseData.price <= 0)
			newErrors.price = 'Please enter a valid price';
		if (!courseData.category.trim()) newErrors.category = 'Category is required';
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		const course = {
			...courseData,
			exercises: selectedExercises.map((exercise) => exercise._id),
		};

		axios
			.post('http://localhost:5000/api/coaches/createCourse', course, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				alert('Course created successfully!');
				navigate('/coach/course');
			})
			.catch((error) => {
				console.error('Error creating course:', error);
				alert('Error creating course.');
			});
	};

	const handleNext = () => {
		setCurrentStep(currentStep + 1);
		setProgress(progress + 50);
	};

	const handlePrevious = () => {
		setCurrentStep(currentStep - 1);
		setProgress(progress - 50);
	};

	const renderStep1 = () => (
		<div className='bg-gray-900 shadow-md rounded-lg w-full lg:w-1/2 mx-auto'>
			<h2 className='text-2xl font-semibold text-center mb-4'>Course Details</h2>
			<form className='space-y-4'>
				<div>
					<label className='block'>Course Name</label>
					<input
						type='text'
						name='name'
						value={courseData.name}
						onChange={handleInputChange}
						className='mt-1 w-full border p-2 rounded focus:outline-none focus:border-indigo-500'
					/>
					{errors.name && <p className='text-red-500'>{errors.name}</p>}
				</div>
				<div>
					<label className='block'>Description</label>
					<ReactQuill
						value={courseData.description}
						onChange={handleDescriptionChange}
						className='mt-1 bg-white text-gray-800 rounded-lg border'
					/>
					{errors.description && <p className='text-red-500'>{errors.description}</p>}
				</div>
				<div>
					<label className='block'>Slot Number</label>
					<input
						type='text'
						name='slotNumber'
						value={courseData.slotNumber}
						onChange={handleInputChange}
						className='mt-1 w-full border p-2 rounded focus:outline-none focus:border-indigo-500'
					/>
					{errors.slotNumber && <p className='text-red-500'>{errors.slotNumber}</p>}
				</div>
				<div>
					<label className='block'>Price</label>
					<input
						type='number'
						name='price'
						value={courseData.price}
						onChange={handleInputChange}
						className='mt-1 w-full border p-2 rounded focus:outline-none focus:border-indigo-500'
					/>
					{errors.price && <p className='text-red-500'>{errors.price}</p>}
				</div>
				<div>
					<label className='block'>Category</label>
					<input
						type='text'
						name='category'
						value={courseData.category}
						onChange={handleInputChange}
						className='mt-1 w-full border p-2 rounded focus:outline-none focus:border-indigo-500'
					/>
					{errors.category && <p className='text-red-500'>{errors.category}</p>}
				</div>
				<div>
					<label className='block'>Images</label>
					<textarea
						name='image'
						rows={2}
						placeholder='Enter image URLs separated by commas'
						value={courseData.image}
						onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
						className='mt-1 w-full border p-2 rounded focus:outline-none focus:border-indigo-500'
					/>
				</div>
				<div className='flex justify-end space-x-4'>
					<button
						type='button'
						onClick={handleNext}
						className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600'
					>
						Next
					</button>
				</div>
			</form>
		</div>
	);

	const renderStep2 = () => (
		<div className='bg-gray-900 shadow-md rounded-lg w-full lg:w-1/2 mx-auto'>
			<h2 className='text-2xl font-semibold text-center mb-4'>Select Exercises</h2>
			<form className='space-y-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
					{exercisesList.map((exercise) => (
						<div key={exercise._id} className='flex items-center'>
							<input
								type='checkbox'
								id={`exercise-${exercise._id}`}
								checked={selectedExercises.includes(exercise)}
								onChange={() => {
									const newSelectedExercises = selectedExercises.includes(exercise)
										? selectedExercises.filter((ex) => ex !== exercise)
										: [...selectedExercises, exercise];
									setSelectedExercises(newSelectedExercises);
								}}
								className='mr-2 rounded'
							/>
							<label htmlFor={`exercise-${exercise._id}`}>{exercise.name}</label>
						</div>
					))}
				</div>
				<div className='flex justify-between mt-4'>
					<button
						type='button'
						onClick={handlePrevious}
						className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'
					>
						Previous
					</button>
					<button
						type='button'
						onClick={handleSubmit}
						className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);

	return (
		<>
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
			<div className='min-h-screen bg-gray-900 flex flex-col items-center p-6 text-white'>
				<h1 className='text-3xl font-bold mb-4 text-orange-600'>Create Course</h1>
				<ProgressBar now={progress} animated className='w-full md:w-1/2 mb-6' />
				{currentStep === 1 && renderStep1()}
				{currentStep === 2 && renderStep2()}
			</div>
		</>
	);
};

export default CreateCourseForm;
