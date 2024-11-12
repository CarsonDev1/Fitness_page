import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ExerciseList = ({ toggleSidebar }) => {
	const navigate = useNavigate();
	const [exercises, setExercises] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [show, setShow] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [selectedExercise, setSelectedExercise] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [newExercise, setNewExercise] = useState({
		name: '',
		description: '',
		exerciseType: '',
		exerciseDuration: '',
		video: '',
		difficulty: '',
	});

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/coaches/exercises', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			.then((response) => setExercises(response.data))
			.catch((error) => console.error('Error fetching exercises:', error));
	}, []);

	const filteredExercises = exercises.filter(
		(exercise) => !searchTerm || (exercise.name && exercise.name.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	const handleShow = (exercise) => {
		setSelectedExercise(exercise);
		setIsEditing(false);
		setShow(true);
	};

	const handleClose = () => setShow(false);
	const handleEditToggle = () => setIsEditing(true);

	const handleSaveChanges = () => {
		const token = localStorage.getItem('token');
		if (!token) {
			alert('You need to be logged in to update an exercise.');
			return;
		}
		axios
			.put(
				`http://localhost:5000/api/coaches/exercises/${selectedExercise._id}`,
				{ ...selectedExercise },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				setExercises(
					exercises.map((exercise) => (exercise._id === selectedExercise._id ? response.data : exercise))
				);
				alert('Exercise updated successfully!');
				setIsEditing(false);
			})
			.catch((error) => alert('Failed to update exercise.'));
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this exercise?')) {
			const token = localStorage.getItem('token');
			axios
				.delete(`http://localhost:5000/api/coaches/exercises/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then(() => setExercises(exercises.filter((exercise) => exercise._id !== id)))
				.catch((error) => alert('Failed to delete exercise.'));
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSelectedExercise({ ...selectedExercise, [name]: value });
	};

	const handleDescriptionChange = (value) => {
		setSelectedExercise({ ...selectedExercise, description: value });
	};

	const handleShowCreateModal = () => setShowCreateModal(true);
	const handleCloseCreateModal = () => setShowCreateModal(false);

	const handleNewExerciseChange = (e) => {
		const { name, value } = e.target;
		setNewExercise({ ...newExercise, [name]: value });
	};

	const handleCreateExercise = () => {
		const token = localStorage.getItem('token');
		axios
			.post(
				'http://localhost:5000/api/coaches/exercises',
				{ ...newExercise },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				setExercises([...exercises, response.data]);
				alert('Exercise created successfully!');
				handleCloseCreateModal();
			})
			.catch((error) => alert('Failed to create exercise.'));
	};

	return (
		<div className='flex flex-col items-center bg-gray-900 min-h-screen py-10'>
			<div className='container-cus mx-auto bg-gray-900 rounded-lg'>
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
				<h2 className='text-3xl lg:text-4xl font-bold text-white mb-6'>Exercise Bank</h2>

				<div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
					<input
						type='text'
						placeholder='Search exercises...'
						className='text-white bg-gray-700 p-3 rounded-md w-full lg:w-1/2'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button variant='primary' onClick={handleShowCreateModal}>
						Create New Exercise
					</Button>
				</div>

				<div className='mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{filteredExercises.length > 0 ? (
						filteredExercises.map((exercise) => (
							<div
								key={exercise._id}
								className='bg-gray-700 p-4 rounded-md cursor-pointer'
								onClick={() => handleShow(exercise)}
							>
								<h3 className='text-lg font-semibold text-white'>{exercise.name}</h3>
								<p className='text-gray-400'>Type: {exercise.exerciseType}</p>
								<button
									className='text-red-400 mt-2'
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(exercise._id);
									}}
								>
									Delete
								</button>
							</div>
						))
					) : (
						<p className='text-gray-400'>No exercises found</p>
					)}
				</div>

				<Modal show={showCreateModal} onHide={handleCloseCreateModal}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Exercise</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId='formNewName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									name='name'
									value={newExercise.name}
									onChange={handleNewExerciseChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId='formNewDescription'>
								<Form.Label>Description</Form.Label>
								<ReactQuill
									value={newExercise.description}
									onChange={(value) => setNewExercise({ ...newExercise, description: value })}
								/>
							</Form.Group>
							<Form.Group controlId='formNewType'>
								<Form.Label>Type</Form.Label>
								<Form.Control
									type='text'
									name='exerciseType'
									value={newExercise.exerciseType}
									onChange={handleNewExerciseChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId='formNewDuration'>
								<Form.Label>Duration</Form.Label>
								<Form.Control
									type='number'
									name='exerciseDuration'
									value={newExercise.exerciseDuration}
									onChange={handleNewExerciseChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId='formNewDifficulty'>
								<Form.Label>Difficulty</Form.Label>
								<Form.Control
									type='text'
									name='difficulty'
									value={newExercise.difficulty}
									onChange={handleNewExerciseChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId='formNewVideo'>
								<Form.Label>Video Link</Form.Label>
								<Form.Control
									type='text'
									name='video'
									value={newExercise.video}
									onChange={handleNewExerciseChange}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={handleCreateExercise}>
							Create Exercise
						</Button>
						<Button variant='secondary' onClick={handleCloseCreateModal}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>

				{selectedExercise && (
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>{isEditing ? 'Edit Exercise' : selectedExercise.name}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{isEditing ? (
								<Form>
									<Form.Group controlId='formName'>
										<Form.Label>Name</Form.Label>
										<Form.Control
											type='text'
											name='name'
											value={selectedExercise.name}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId='formDescription'>
										<Form.Label>Description</Form.Label>
										<ReactQuill
											value={selectedExercise.description}
											onChange={handleDescriptionChange}
										/>
									</Form.Group>
									<Form.Group controlId='formType'>
										<Form.Label>Exercise Type</Form.Label>
										<Form.Control
											type='text'
											name='exerciseType'
											value={selectedExercise.exerciseType}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId='formDuration'>
										<Form.Label>Duration (minutes)</Form.Label>
										<Form.Control
											type='number'
											name='exerciseDuration'
											value={selectedExercise.exerciseDuration}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId='formDifficulty'>
										<Form.Label>Difficulty</Form.Label>
										<Form.Control
											type='text'
											name='difficulty'
											value={selectedExercise.difficulty}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId='formVideo'>
										<Form.Label>Video Link</Form.Label>
										<Form.Control
											type='text'
											name='video'
											value={selectedExercise.video}
											onChange={handleInputChange}
										/>
									</Form.Group>
								</Form>
							) : (
								<>
									<p>
										<strong>Description:</strong> {selectedExercise.description}
									</p>
									<p>
										<strong>Exercise Type:</strong> {selectedExercise.exerciseType}
									</p>
									<p>
										<strong>Duration:</strong> {selectedExercise.exerciseDuration} minutes
									</p>
									<p>
										<strong>Difficulty:</strong> {selectedExercise.difficulty}
									</p>
									<p>
										<strong>Video:</strong>{' '}
										<a href={selectedExercise.video} target='_blank' rel='noopener noreferrer'>
											Watch Video
										</a>
									</p>
								</>
							)}
						</Modal.Body>
						<Modal.Footer>
							{isEditing ? (
								<>
									<Button variant='primary' onClick={handleSaveChanges}>
										Save Changes
									</Button>
									<Button variant='secondary' onClick={() => setIsEditing(false)}>
										Cancel
									</Button>
								</>
							) : (
								<Button variant='warning' onClick={handleEditToggle}>
									Edit
								</Button>
							)}
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default ExerciseList;
