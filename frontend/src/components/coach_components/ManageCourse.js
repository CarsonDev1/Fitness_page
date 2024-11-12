import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const ManageCourse = () => {
	const [courses, setCourses] = useState([]);
	const [course, setCourse] = useState({
		name: '',
		description: '',
		duration: '',
		price: 0,
		status: '',
		difficulty: '',
		coachId: '',
	});
	const [coaches, setCoaches] = useState([]);
	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get('/api/courses')
			.then((response) => setCourses(response.data))
			.catch((error) => console.log('Error fetching courses:', error));
	}, []);

	useEffect(() => {
		axios
			.get('/api/coaches')
			.then((response) => setCoaches(response.data))
			.catch((error) => console.log('Error fetching coaches:', error));
	}, []);

	useEffect(() => {
		if (id) {
			axios
				.get(`/api/courses/${id}`)
				.then((response) => setCourse(response.data))
				.catch((error) => console.log('Error fetching course:', error));
		}
	}, [id]);

	const handleDelete = (id) => {
		axios
			.delete(`/api/courses/${id}`)
			.then(() => setCourses(courses.filter((course) => course._id !== id)))
			.catch((error) => console.log('Error deleting course:', error));
	};

	const handleChange = (e) => {
		setCourse({ ...course, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const request = id ? axios.put(`/api/courses/${id}`, course) : axios.post('/api/courses', course);

		request.then(() => history.push('/courses')).catch((error) => console.log('Error saving course:', error));
	};

	return (
		<div className='p-4 md:p-8 bg-gray-100 min-h-screen'>
			<h2 className='text-2xl font-bold mb-4 text-center text-gray-800'>Manage Courses</h2>

			{/* Course List */}
			<div className='overflow-x-auto mb-8'>
				<table className='w-full bg-white shadow-lg rounded-lg overflow-hidden'>
					<thead>
						<tr className='bg-gray-800 text-white text-left'>
							<th className='p-4'>Name</th>
							<th className='p-4'>Description</th>
							<th className='p-4'>Price</th>
							<th className='p-4'>Status</th>
							<th className='p-4'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course._id} className='border-b'>
								<td className='p-4'>{course.name}</td>
								<td className='p-4'>{course.description}</td>
								<td className='p-4'>${course.price}</td>
								<td className='p-4'>{course.status}</td>
								<td className='p-4 flex space-x-2'>
									<button
										onClick={() => history.push(`/courses/${course._id}/edit`)}
										className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(course._id)}
										className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Course Form (Create/Edit) */}
			<div className='bg-white shadow-lg rounded-lg p-6 md:p-8'>
				<h3 className='text-xl font-semibold mb-4'>{id ? 'Edit Course' : 'Create New Course'}</h3>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-gray-700'>Name:</label>
						<input
							type='text'
							name='name'
							value={course.name}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Description:</label>
						<textarea
							name='description'
							value={course.description}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Duration:</label>
						<input
							type='text'
							name='duration'
							value={course.duration}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Price:</label>
						<input
							type='number'
							name='price'
							value={course.price}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Status:</label>
						<input
							type='text'
							name='status'
							value={course.status}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Difficulty:</label>
						<input
							type='text'
							name='difficulty'
							value={course.difficulty}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Coach:</label>
						<select
							name='coachId'
							value={course.coachId}
							onChange={handleChange}
							className='w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						>
							<option value=''>Select a coach</option>
							{coaches.map((coach) => (
								<option key={coach._id} value={coach._id}>
									{coach.introduce}
								</option>
							))}
						</select>
					</div>
					<button
						type='submit'
						className='w-full py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600'
					>
						{id ? 'Update Course' : 'Create Course'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ManageCourse;
