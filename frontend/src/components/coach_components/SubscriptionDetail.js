import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

function SubscriptionDetail({ toggleSidebar }) {
	const { subscriptionId } = useParams();
	const [subscription, setSubscription] = useState(null);
	const [workouts, setWorkouts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(1);
	const [selectedWorkout, setSelectedWorkout] = useState(null);
	const [exercises, setExercises] = useState([]);
	const [selectedExercises, setSelectedExercises] = useState([]);

	const workoutsPerPage = 12;

	useEffect(() => {
		const fetchSubscriptionDetail = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/coaches/subscriptions/${subscriptionId}/workouts`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				const sortedWorkouts = response.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
				setSubscription(response.data.data);
				setWorkouts(sortedWorkouts);
			} catch (error) {
				console.error('Error fetching subscription details:', error);
			}
		};
		fetchSubscriptionDetail();
	}, [subscriptionId]);

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/coaches/exercises', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				setExercises(response.data);
			} catch (error) {
				console.error('Error fetching exercises:', error);
			}
		};
		fetchExercises();
	}, []);

	const lastWorkoutIndex = currentPage * workoutsPerPage;
	const firstWorkoutIndex = lastWorkoutIndex - workoutsPerPage;
	const currentWorkouts = workouts.slice(firstWorkoutIndex, lastWorkoutIndex);

	const totalPages = Math.ceil(workouts.length / workoutsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleEditClick = (workout) => {
		setSelectedWorkout(workout);
		setOpen(true);
		setStep(1);
		setSelectedExercises([]);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedWorkout(null);
		setSelectedExercises([]);
	};

	const handleNextStep = () => (step === 1 ? setStep(2) : handleSave());

	const handleBackStep = () => step === 2 && setStep(1);

	const handleSave = () => {
		const isDuplicateDate = workouts.some(
			(workout) =>
				workout.date &&
				new Date(workout.date).toDateString() === new Date(selectedWorkout.date).toDateString() &&
				workout._id !== selectedWorkout._id
		);

		if (isDuplicateDate) {
			toast.error('A workout already exists for this date.');
			return;
		}

		const updatedWorkout = {
			...selectedWorkout,
			workout: selectedExercises.map((exercise) => ({
				exerciseId: exercise._id,
				quantity: 1,
			})),
		};

		axios
			.put(`http://localhost:5000/api/coaches/workouts/${selectedWorkout._id}`, updatedWorkout, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			.then(() => {
				setOpen(false);
				setWorkouts(
					workouts.map((workout) => (workout._id === selectedWorkout._id ? updatedWorkout : workout))
				);
				toast.success('Workout updated successfully!');
			})
			.catch((error) => {
				console.error('Error saving workout:', error);
				toast.error('Error saving workout. Please try again.');
			});
	};

	const handleExerciseSelect = (exercise) => {
		if (selectedExercises.includes(exercise)) {
			setSelectedExercises(selectedExercises.filter((ex) => ex !== exercise));
		} else {
			setSelectedExercises([...selectedExercises, exercise]);
		}
	};

	if (!subscription) return <p className='text-white'>Loading subscription details...</p>;

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
			<div className='bg-gray-900 text-white min-h-screen p-6'>
				<h2 className='text-2xl font-bold mb-6'>Subscription Detail</h2>
				<Link to='/coach/subscription' className='text-blue-400 mb-4 block'>
					Back to Subscription List
				</Link>
				<h3 className='text-xl font-semibold mb-4'>Workouts</h3>

				<div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{currentWorkouts.map((workout) => (
						<div
							key={workout._id}
							className='bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition transform'
						>
							<h4 className='text-lg font-semibold'>{workout.name}</h4>
							<p>Status: {workout.status}</p>
							<p>Date: {workout.date ? new Date(workout.date).toLocaleDateString() : 'Not Available'}</p>
							<ul>
								{workout.workout.map((exercise) => (
									<li key={exercise.exerciseId._id}>
										{exercise.exerciseId.name} <br />
										Quantity: {exercise.quantity}
									</li>
								))}
							</ul>
							<FaEdit
								className='text-blue-500 cursor-pointer mt-2'
								onClick={() => handleEditClick(workout)}
							/>
						</div>
					))}
				</div>

				<div className='flex justify-center items-center mt-6 space-x-4'>
					<button
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						className='px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500'
					>
						Previous
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className='px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500'
					>
						Next
					</button>
				</div>

				<Modal
					isOpen={open}
					onRequestClose={handleClose}
					contentLabel='Edit Workout'
					className='bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto text-gray-900'
					overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
				>
					{step === 1 && (
						<div>
							<h2 className='text-2xl font-bold mb-4'>Edit Workout Details</h2>
							<form className='space-y-4'>
								<label className='block'>
									<span>Name:</span>
									<input
										type='text'
										value={selectedWorkout?.name || ''}
										onChange={(e) =>
											setSelectedWorkout({ ...selectedWorkout, name: e.target.value })
										}
										className='mt-1 p-2 w-full border rounded-md'
									/>
								</label>
								<label className='block'>
									<span>Status:</span>
									<input
										type='text'
										value={selectedWorkout?.status || ''}
										onChange={(e) =>
											setSelectedWorkout({ ...selectedWorkout, status: e.target.value })
										}
										className='mt-1 p-2 w-full border rounded-md'
									/>
								</label>
								<label className='block'>
									<span>Date:</span>
									<input
										type='date'
										value={selectedWorkout?.date || ''}
										onChange={(e) =>
											setSelectedWorkout({ ...selectedWorkout, date: e.target.value })
										}
										className='mt-1 p-2 w-full border rounded-md'
									/>
								</label>
								<button
									type='button'
									onClick={handleNextStep}
									className='px-4 py-2 bg-blue-600 rounded-lg text-white mt-4'
								>
									Next
								</button>
							</form>
						</div>
					)}

					{step === 2 && (
						<div>
							<h2 className='text-2xl font-bold mb-4'>Select Exercises</h2>
							<ul className='space-y-2'>
								{exercises.map((exercise) => (
									<li key={exercise._id} className='flex items-center'>
										<input
											type='checkbox'
											checked={selectedExercises.includes(exercise)}
											onChange={() => handleExerciseSelect(exercise)}
											className='mr-2'
										/>
										<span>{exercise.name}</span>
									</li>
								))}
							</ul>
							<div className='flex justify-between mt-4'>
								<button
									type='button'
									onClick={handleBackStep}
									className='px-4 py-2 bg-gray-600 rounded-lg text-white'
								>
									Back
								</button>
								<button
									type='button'
									onClick={handleSave}
									className='px-4 py-2 bg-blue-600 rounded-lg text-white'
								>
									Save
								</button>
							</div>
						</div>
					)}
				</Modal>

				<ToastContainer />
			</div>
		</>
	);
}

export default SubscriptionDetail;
