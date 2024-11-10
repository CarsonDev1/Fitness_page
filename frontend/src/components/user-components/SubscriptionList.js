import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubscriptionList = () => {
	const [subscriptions, setSubscriptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const token = localStorage.getItem('token');
			try {
				const response = await axios.get('http://localhost:5000/api/users/subscriptions', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setSubscriptions(response.data.subscriptions);
			} catch (err) {
				setError('Error fetching subscriptions.');
			} finally {
				setLoading(false);
			}
		};
		fetchSubscriptions();
	}, []);

	const handleViewSchedule = (subscriptionId) => {
		navigate(`/userSchedule/${subscriptionId}`);
	};

	if (loading) return <p className='text-center text-gray-500'>Loading subscriptions...</p>;
	if (error) return <p className='text-center text-red-500'>{error}</p>;

	return (
		<div className='p-6 text-white bg-gray-900'>
			<div className='mx-auto container-cus'>
				<h1 className='mb-8 text-3xl font-bold text-center'>My Subscriptions</h1>

				{subscriptions.length > 0 ? (
					<div className='overflow-x-auto'>
						<table className='min-w-full overflow-hidden text-sm bg-gray-800 rounded-lg shadow-lg'>
							<thead>
								<tr className='text-left text-gray-200 uppercase bg-gray-700'>
									<th className='px-6 py-3'>Course Name</th>
									<th className='px-6 py-3'>Price</th>
									<th className='px-6 py-3'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{subscriptions.map((subscription) => (
									<tr
										key={subscription._id}
										className='border-b border-gray-700 even:bg-gray-700 odd:bg-gray-800'
									>
										<td className='px-6 py-4'>{subscription.courseId.name}</td>
										<td className='px-6 py-4'>{`$${subscription.courseId.price}`}</td>
										<td className='px-6 py-4'>
											<button
												className='px-4 py-2 font-semibold text-white transition duration-200 ease-in-out bg-orange-500 rounded hover:bg-orange-600'
												onClick={() => handleViewSchedule(subscription._id)}
											>
												View Schedule
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p className='mt-8 text-center text-gray-400'>No subscriptions found.</p>
				)}
			</div>
		</div>
	);
};

export default SubscriptionList;
