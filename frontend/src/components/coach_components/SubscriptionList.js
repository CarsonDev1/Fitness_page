import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function SubscriptionList({ toggleSidebar }) {
	const [subscriptions, setSubscriptions] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchSubscriptions = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/coaches/subscriptions', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				setSubscriptions(response.data.data);
			} catch (error) {
				console.error('Error fetching subscriptions:', error);
			}
		};
		fetchSubscriptions();
	}, []);

	// Filter subscriptions based on search term
	const filteredSubscriptions = subscriptions.filter((subscription) =>
		subscription.courseId?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
			<div className='flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white'>
				<h2 className='text-2xl font-bold mb-4'>Subscription List</h2>

				{/* Search bar */}
				<input
					type='text'
					placeholder='Search subscriptions...'
					className='w-full md:w-1/2 p-2 rounded-lg border border-gray-600 bg-gray-800 text-white mb-6'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<div className='w-full md:w-3/4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{filteredSubscriptions.length > 0 ? (
						filteredSubscriptions.map((subscription) => (
							<div
								key={subscription._id}
								className='bg-gray-800 p-4 rounded-lg shadow-lg transition duration-300 hover:scale-105'
							>
								<h3 className='text-lg font-semibold mb-2'>{subscription.courseId?.name}</h3>
								<p>
									<strong>User:</strong> {subscription.userId?.name}
								</p>
								<p>
									<strong>Status:</strong> {subscription.subscriptionStatus}
								</p>
								<Link to={`/coach/subscription/${subscription._id}`}>
									<Button variant='primary' className='mt-4 w-full bg-blue-600 hover:bg-blue-700'>
										View Subscription
									</Button>
								</Link>
							</div>
						))
					) : (
						<p className='text-center col-span-full text-gray-400'>No subscriptions found</p>
					)}
				</div>
			</div>
		</>
	);
}

export default SubscriptionList;
