import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HiringAdmin = () => {
	const [applications, setApplications] = useState([]);
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [status, setStatus] = useState('');

	useEffect(() => {
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/api/admins/hiring-applications');
			setApplications(data);
		} catch (error) {
			console.error('Error fetching applications', error);
		}
	};

	const fetchApplicationDetails = async (id) => {
		try {
			const { data } = await axios.get(`http://localhost:5000/api/admins/hiring-applications/${id}`);
			setSelectedApplication(data);
		} catch (error) {
			console.error('Error fetching application details', error);
		}
	};

	const updateApplicationStatus = async (id) => {
		try {
			await axios.put(`http://localhost:5000/api/admins/hiring-applications/${id}/status`, { status });
			alert(`Successfully updated status to ${status}`);
			setSelectedApplication(null);
			fetchApplications();
		} catch (error) {
			console.error('Error updating status', error);
		}
	};

	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-2xl font-semibold text-gray-800 mb-4'>Manage Hiring Applications</h1>

			{/* List of applications */}
			<div className='overflow-x-auto'>
				<table className='w-full bg-white shadow-md rounded-lg'>
					<thead>
						<tr className='bg-gray-200 text-gray-700'>
							<th className='p-3 text-left'>Name</th>
							<th className='p-3 text-left'>Email</th>
							<th className='p-3 text-left'>Status</th>
							<th className='p-3 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{applications.map((app) => (
							<tr key={app._id} className='border-b border-gray-200 hover:bg-gray-100'>
								<td className='p-3'>{app.name}</td>
								<td className='p-3'>{app.email}</td>
								<td className='p-3'>{app.status}</td>
								<td className='p-3'>
									<button
										onClick={() => fetchApplicationDetails(app._id)}
										className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
									>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Selected Application Details */}
			{selectedApplication && (
				<div className='mt-8 bg-white p-6 shadow-lg rounded-lg'>
					<h2 className='text-xl font-semibold text-gray-800'>
						Application Details for {selectedApplication.name}
					</h2>
					<p className='mt-2 text-gray-600'>Email: {selectedApplication.email}</p>
					<p className='mt-1 text-gray-600'>Status: {selectedApplication.status}</p>

					{/* Hiring Apply Details */}
					<h3 className='mt-4 text-lg font-semibold text-gray-800'>Hiring Apply Info</h3>
					{selectedApplication.hiringApply.map((apply, index) => (
						<div key={index} className='mt-2 p-4 border rounded-lg bg-gray-50'>
							<p>
								CV:{' '}
								<a
									href={apply.cvFile}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 underline'
								>
									{apply.cvFile}
								</a>
							</p>
							<p>
								Front ID Card:{' '}
								<a
									href={apply.frontIDCard}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 underline'
								>
									{apply.frontIDCard}
								</a>
							</p>
							<p>
								Back ID Card:{' '}
								<a
									href={apply.backIDCard}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 underline'
								>
									{apply.backIDCard}
								</a>
							</p>
							<p>
								Face Photo:{' '}
								<a
									href={apply.facePhoto}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 underline'
								>
									{apply.facePhoto}
								</a>
							</p>
							<p>Applied Date: {new Date(apply.date).toLocaleDateString()}</p>
						</div>
					))}

					{/* Update Status */}
					<div className='mt-6'>
						<label className='block text-gray-700 font-medium mb-2'>
							Update Status:
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className='block w-full mt-1 p-2 border border-gray-300 rounded-md'
							>
								<option value=''>Select Status</option>
								<option value='accept'>Accept</option>
								<option value='deny'>Deny</option>
							</select>
						</label>
						<button
							onClick={() => updateApplicationStatus(selectedApplication._id)}
							className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
						>
							Update Status
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default HiringAdmin;
