import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CoachDetails = () => {
	const { id } = useParams();
	const [coach, setCoach] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCoach = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/coaches/${id}`);
				setCoach(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCoach();
	}, [id]);

	if (loading) return <p className='text-center text-gray-500'>Loading coach details...</p>;
	if (error) return <p className='text-center text-red-500'>Error: {error}</p>;
	if (!coach) return <p className='text-center text-gray-500'>Coach not found</p>;

	const { accountId, introduce, experience } = coach || {};
	const { name, gender, dob, address, avatar } = accountId || {};

	const handleBack = () => {
		navigate('/coach-details');
	};

	const getImageSrc = (imageName) => {
		try {
			return require(`../../assets/avatar/${imageName}`);
		} catch (err) {
			return imageName;
		}
	};

	return (
		<div className='bg-[#111827] sec-com'>
			<div className='max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-lg coach-details'>
				<button
					className='mb-4 font-bold text-blue-500 hover:text-blue-700 hover:bg-transparent'
					onClick={handleBack}
				>
					&larr; Back
				</button>

				{accountId ? (
					<>
						<h1 className='mb-4 text-3xl font-bold text-gray-800'>{name}'s Profile</h1>

						<div className='flex flex-col items-center p-4 mb-6 bg-white rounded-lg shadow-md account-info md:flex-row'>
							<div className='w-32 h-32 overflow-hidden border-4 border-blue-500 rounded-full img-container md:w-40 md:h-40'>
								<img
									src={getImageSrc(avatar)}
									alt={`${name}'s profile`}
									className='object-cover w-full h-full'
								/>
							</div>
							<div className='mt-4 text-gray-700 md:mt-0 md:ml-6'>
								<p className='text-lg'>
									<strong>Name:</strong> {name}
								</p>
								<p className='text-lg'>
									<strong>Gender:</strong> {gender ? 'Male' : 'Female'}
								</p>
								<p className='text-lg'>
									<strong>Date of Birth:</strong> {dob ? new Date(dob).toLocaleDateString() : 'N/A'}
								</p>
								<p className='text-lg'>
									<strong>Address:</strong> {address || 'N/A'}
								</p>
							</div>
						</div>
					</>
				) : (
					<p className='text-center text-gray-500'>No account information available.</p>
				)}

				<div className='mb-6 coach-info'>
					<h3 className='mb-2 text-2xl font-semibold text-gray-800'>Introduction</h3>
					<div className='p-4 bg-white rounded-lg shadow-md'>
						<ReactQuill value={introduce || ''} readOnly={true} theme='bubble' />
					</div>
				</div>

				<div className='coach-experience'>
					<h3 className='mb-2 text-2xl font-semibold text-gray-800'>Experience</h3>
					<div className='p-4 bg-white rounded-lg shadow-md'>
						<ul className='list-disc list-inside'>
							{experience?.length ? (
								experience.map((exp, index) => (
									<li key={index} className='text-gray-700'>
										<span className='font-semibold text-gray-800'>{exp.time}</span> -{' '}
										{exp.workplace}
									</li>
								))
							) : (
								<li className='text-gray-500'>No experience listed</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoachDetails;
