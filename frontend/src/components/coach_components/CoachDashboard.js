import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CourseTable = ({ toggleSidebar }) => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [selectedCourseId, setSelectedCourseId] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/coaches/course?page=${currentPage}&limit=10`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((response) => {
				setCourses(response.data.courses || []);
				setTotalPages(response.data.totalPages);
			})
			.catch((error) => {
				console.error('Error fetching courses:', error);
			});
	}, [currentPage]);

	const handleCreateCourse = () => {
		navigate('/coach/create-course');
	};

	const handleEditCourse = (courseId) => {
		navigate(`coach/edit-course/${courseId}`);
	};

	const handleViewCourse = (courseId) => {
		navigate(`/coach/detail-course/${courseId}`);
	};

	const handleDeleteCourse = (courseId) => {
		if (window.confirm('Are you sure you want to delete this course?')) {
			axios
				.delete(`http://localhost:5000/api/coaches/courses/delete/${courseId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(() => {
					setCourses(courses.filter((course) => course._id !== courseId));
					alert('Course deleted successfully!');
				})
				.catch((error) => {
					console.error('Error deleting course:', error);
				});
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className='w-full sec-com'>
			<div className='container-cus mx-auto bg-gray-900/50 rounded-lg shadow-md p-6 text-white'>
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
				<div className='flex justify-between'>
					<h2 className='text-2xl font-semibold text-gray-800 mb-6'>Courses</h2>
					<button
						onClick={handleCreateCourse}
						className='px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
					>
						Create Course
					</button>
				</div>

				<div className='overflow-x-auto'>
					<table className='min-w-full bg-gray-900/50 border rounded-lg'>
						<thead>
							<tr className='bg-gray-800 text-white text-left'>
								<th className='p-4'>#</th>
								<th className='p-4'>Course Name</th>
								<th className='p-4'>Description</th>
								<th className='p-4'>Price</th>
								<th className='p-4'>Exercises</th>
								<th className='p-4'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{courses.map((course, index) => (
								<tr key={course._id} className='border-b'>
									<td className='p-4'>{(currentPage - 1) * 10 + index + 1}</td>
									<td className='p-4 font-semibold text-white'>{course.name}</td>
									<td className='p-4'>
										<ReactQuill
											value={course.description}
											readOnly={true}
											theme='snow'
											modules={{ toolbar: false }}
											className='text-sm'
										/>
									</td>
									<td className='p-4'>${course.price}</td>
									<td className='p-4'>
										{course.exercises && course.exercises.length > 0 ? (
											<ul className='list-disc ml-4 text-sm text-white'>
												{course.exercises.map((exercise) => (
													<li key={exercise._id}>{exercise.name}</li>
												))}
											</ul>
										) : (
											<p className='text-sm text-gray-500'>No exercises</p>
										)}
									</td>
									<td className='p-4'>
										<div className='flex space-x-2'>
											<button
												onClick={() => handleViewCourse(course._id)}
												className='px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition'
											>
												View
											</button>
											<button
												onClick={() => handleEditCourse(course._id)}
												className='px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition'
											>
												Edit
											</button>
											<button
												onClick={() => handleDeleteCourse(course._id)}
												className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition'
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className='flex justify-center mt-4 space-x-2'>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={`px-3 py-1 rounded ${
							currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
					>
						Previous
					</button>
					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index}
							onClick={() => handlePageChange(index + 1)}
							className={`px-3 py-1 rounded ${
								index + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
							}`}
						>
							{index + 1}
						</button>
					))}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={`px-3 py-1 rounded ${
							currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
						}`}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseTable;
