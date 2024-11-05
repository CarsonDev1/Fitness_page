import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CoachesList = () => {
	const [coaches, setCoaches] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const coachesPerPage = 3;

	useEffect(() => {
		const fetchCoaches = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/coaches/');
				setCoaches(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCoaches();
	}, []);

	if (loading) return <p className='text-xl font-bold text-center text-orange-600'>Loading coaches...</p>;
	if (error) return <p className='text-xl font-bold text-center text-red-500'>Error: {error}</p>;

	const indexOfLastCoach = currentPage * coachesPerPage;
	const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
	const currentCoaches = coaches.slice(indexOfFirstCoach, indexOfLastCoach);
	const totalPages = Math.ceil(coaches.length / coachesPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const getImageSrc = (imageName) => {
		try {
			return require(`../../assets/avatar/${imageName}`);
		} catch (err) {
			return imageName;
		}
	};

	return (
		<div className='flex flex-col items-center min-h-screen py-10 bg-[#111827]'>
			<h1 className='mb-6 text-3xl font-bold text-orange-600'>Our Coaches</h1>
			<div className='grid w-4/5 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{currentCoaches.map((coach) => (
					<div
						key={coach._id}
						className='p-6 transition duration-300 transform bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105'
					>
						<h2 className='mb-2 text-2xl font-semibold text-gray-800'>
							{coach.accountId?.name || 'Unknown Coach'}
						</h2>
						<div className='flex items-center justify-center w-full h-48 mb-4 overflow-hidden rounded-lg shadow-md'>
							<img
								src={getImageSrc(coach.accountId?.avatar)}
								alt={`${coach.accountId?.name || 'Unknown Coach'}'s profile`}
								className='object-cover w-full h-full rounded-md'
							/>
						</div>
						<p className='mb-4 text-sm text-gray-600'>{coach.introduce}</p>
						<h3 className='mb-2 text-lg font-semibold text-orange-600'>Experience</h3>
						<ul className='mb-4 space-y-1 text-gray-700 list-disc list-inside'>
							{coach.experience.map((exp, index) => (
								<li key={index}>
									{exp.time} - {exp.workplace}
								</li>
							))}
						</ul>
						<Link to={`/coach/${coach._id}`}>
							<button className='w-full py-2 mt-2 font-semibold text-white transition duration-300 bg-orange-600 rounded-md hover:bg-orange-500'>
								View Details
							</button>
						</Link>
					</div>
				))}
			</div>

			<div className='flex items-center justify-center mt-8 space-x-4'>
				<button
					className='px-4 py-2 text-gray-600 transition duration-300 bg-gray-300 rounded-lg hover:bg-gray-400'
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span className='font-semibold text-gray-700'>
					Page {currentPage} of {totalPages}
				</span>
				<button
					className='px-4 py-2 text-gray-600 transition duration-300 bg-gray-300 rounded-lg hover:bg-gray-400'
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CoachesList;
