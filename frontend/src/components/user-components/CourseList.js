import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CourseList.css';

const CoursesList = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const coursesPerPage = 3;

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/users/courses');
				setCourses(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	if (loading) return <div className='text-lg font-semibold text-center text-orange-600'>Loading courses...</div>;
	if (error) return <div className='text-lg font-semibold text-center text-red-500'>Error: {error}</div>;

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
	const totalPages = Math.ceil(courses.length / coursesPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div className='py-12 bg-[#111827]'>
			<div className='container-cus'>
				<h1 className='mb-8 text-4xl font-bold text-center text-orange-600'>Available Courses</h1>

				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{currentCourses.map((course) => (
						<div
							key={course._id}
							className='p-6 transition-transform duration-300 transform border-2 border-orange-600 rounded-lg shadow-lg bg-slate-200 hover:scale-105 hover:shadow-xl'
						>
							<div className='flex flex-col items-start mb-4'>
								<h2 className='mb-1 text-2xl font-semibold text-orange-600'>{course.name}</h2>
								<span className='text-sm '>
									Coach: {course.coachId ? course.coachId.name : 'Unknown'}
								</span>
							</div>
							<div className='mb-4'>
								<p className='text-black' dangerouslySetInnerHTML={{ __html: course.description }} />
							</div>
							<div className='mb-4'>
								<h3 className='mb-2 text-lg font-semibold text-orange-600'>Workouts</h3>
								<ul className='list-disc list-inside '>
									{course.workoutId &&
										course.workoutId
											.slice(0, 3)
											.map((workout) => <li key={workout._id}>{workout.name}</li>)}
								</ul>
							</div>
							<Link
								to={`/course/${course._id}`}
								className='inline-block w-full py-2 font-semibold text-center text-white transition duration-300 bg-orange-600 rounded-md hover:bg-orange-500'
							>
								View Details
							</Link>
						</div>
					))}
				</div>

				<div className='flex items-center justify-center gap-4 mt-8'>
					<button
						className='px-4 py-2 font-semibold text-white bg-gray-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed'
						onClick={handlePrevPage}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					<span className='text-white'>
						Page {currentPage} of {totalPages}
					</span>
					<button
						className='px-4 py-2 font-semibold text-white bg-gray-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed'
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default CoursesList;
