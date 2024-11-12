import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faEdit, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerCoach = ({ toggleSidebar }) => {
	const [coaches, setCoaches] = useState([]);
	const [filteredCoaches, setFilteredCoaches] = useState([]);
	const [selectedCoach, setSelectedCoach] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showConfirmBlockModal, setShowConfirmBlockModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [coachesPerPage] = useState(10);

	useEffect(() => {
		fetchCoaches();
	}, []);

	const fetchCoaches = async () => {
		try {
			const res = await axios.get('http://localhost:5000/api/admins/coaches', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			setCoaches(res.data.coaches);
			setFilteredCoaches(res.data.coaches);
		} catch (err) {
			toast.error('Failed to fetch coaches');
			console.error('Error fetching coaches:', err);
		}
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		const filtered = coaches.filter(
			(coach) =>
				(coach.email && coach.email.toLowerCase().includes(e.target.value.toLowerCase())) ||
				(coach.name && coach.name.toLowerCase().includes(e.target.value.toLowerCase()))
		);
		setFilteredCoaches(Array.isArray(filtered) ? filtered : []);
	};

	const indexOfLastCoach = currentPage * coachesPerPage;
	const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
	const currentCoaches = filteredCoaches.slice(indexOfFirstCoach, indexOfLastCoach);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleShowViewModal = (coach) => {
		setSelectedCoach(coach);
		setShowViewModal(true);
	};
	const handleCloseViewModal = () => setShowViewModal(false);

	const handleShowEditModal = (coach) => {
		setSelectedCoach(coach);
		setShowEditModal(true);
	};
	const handleCloseEditModal = () => setShowEditModal(false);

	const handleShowConfirmBlockModal = (coach) => {
		setSelectedCoach(coach);
		setShowConfirmBlockModal(true);
	};
	const handleCloseConfirmBlockModal = () => setShowConfirmBlockModal(false);

	const handleUpdateCoach = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(
				`http://localhost:5000/api/admins/coaches/${selectedCoach._id}`,
				selectedCoach,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success(res.data.msg);
			fetchCoaches();
			handleCloseEditModal();
		} catch (err) {
			toast.error('Failed to update coach');
		}
	};

	const handleBlockUnblockCoach = async () => {
		try {
			const newStatus = selectedCoach.status === 'activate' ? 'blocked' : 'activate';
			const res = await axios.patch(
				`http://localhost:5000/api/admins/coaches/${selectedCoach._id}/status`,
				{ status: newStatus },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success(res.data.msg);
			fetchCoaches();
			handleCloseConfirmBlockModal();
		} catch (err) {
			toast.error('Failed to change coach status');
		}
	};

	return (
		<div className='sec-com'>
			<div className='container-cus'>
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
				<h2 className='text-2xl font-bold mb-4 text-center text-white'>Coach Management</h2>
				<ToastContainer />

				<div className='flex flex-col md:flex-row justify-between mb-6'>
					<Link
						to='/admin/coach'
						className='btn btn-primary mb-4 md:mb-0 md:mr-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
					>
						Create Coach
					</Link>
					<div className='relative flex items-center text-white'>
						<input
							type='text'
							placeholder='Search by email or name'
							value={searchTerm}
							onChange={handleSearch}
							className='form-input w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
						/>
						<FontAwesomeIcon
							icon={faSearch}
							className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500'
						/>
					</div>
				</div>

				{/* Coaches List */}
				<div className='overflow-x-auto'>
					<table className='min-w-full bg-gray-800 text-white rounded-lg overflow-hidden'>
						<thead>
							<tr>
								<th className='py-3 px-5 text-left'>Avatar</th>
								<th className='py-3 px-5 text-left'>Email</th>
								<th className='py-3 px-5 text-left'>Name</th>
								<th className='py-3 px-5 text-left'>Role</th>
								<th className='py-3 px-5 text-left'>Status</th>
								<th className='py-3 px-5 text-center'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentCoaches.map((coach) => (
								<tr key={coach._id} className='border-b border-gray-700'>
									<td className='py-3 px-5'>
										<img
											src={coach.avatar || 'https://via.placeholder.com/50'}
											alt='avatar'
											className='w-12 h-12 rounded-full'
										/>
									</td>
									<td className='py-3 px-5'>{coach.email}</td>
									<td className='py-3 px-5'>{coach.name}</td>
									<td className='py-3 px-5'>{coach.role}</td>
									<td className='py-3 px-5'>{coach.status}</td>
									<td className='py-3 px-5 text-center flex justify-center space-x-4'>
										<FontAwesomeIcon
											icon={faEye}
											className='text-blue-500 cursor-pointer'
											onClick={() => handleShowViewModal(coach)}
										/>
										<FontAwesomeIcon
											icon={faEdit}
											className='text-yellow-500 cursor-pointer'
											onClick={() => handleShowEditModal(coach)}
										/>
										<FontAwesomeIcon
											icon={coach.status === 'activate' ? faBan : faCheck}
											className={`cursor-pointer ${
												coach.status === 'activate' ? 'text-red-500' : 'text-green-500'
											}`}
											onClick={() => handleShowConfirmBlockModal(coach)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<nav className='flex justify-center mt-6'>
					<ul className='inline-flex items-center'>
						{Array.from({ length: Math.ceil(filteredCoaches.length / coachesPerPage) }).map((_, index) => (
							<li key={index} className='mx-1'>
								<button
									onClick={() => paginate(index + 1)}
									className='px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700'
								>
									{index + 1}
								</button>
							</li>
						))}
					</ul>
				</nav>

				{/* View Coach Modal */}
				<Modal show={showViewModal} onHide={handleCloseViewModal}>
					<Modal.Header closeButton>
						<Modal.Title>Coach Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedCoach && (
							<>
								<p>
									<strong>ID:</strong> {selectedCoach._id}
								</p>
								<p>
									<strong>Email:</strong> {selectedCoach.email}
								</p>
								<p>
									<strong>Name:</strong> {selectedCoach.name}
								</p>
								<p>
									<strong>Gender:</strong> {selectedCoach.gender}
								</p>
								<p>
									<strong>Date of Birth:</strong> {selectedCoach.dob}
								</p>
								<p>
									<strong>Phone Number:</strong> {selectedCoach.phoneNumber}
								</p>
								<p>
									<strong>Address:</strong> {selectedCoach.address}
								</p>
								<p>
									<strong>Status:</strong> {selectedCoach.status}
								</p>
							</>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleCloseViewModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Edit Coach Modal */}
				<Modal show={showEditModal} onHide={handleCloseEditModal}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Coach</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleUpdateCoach}>
							<Form.Group className='mb-3'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									value={selectedCoach ? selectedCoach.email : ''}
									onChange={(e) => setSelectedCoach({ ...selectedCoach, email: e.target.value })}
									required
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									value={selectedCoach ? selectedCoach.name : ''}
									onChange={(e) => setSelectedCoach({ ...selectedCoach, name: e.target.value })}
									required
								/>
							</Form.Group>
							<Button
								type='submit'
								className='bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white'
							>
								Update
							</Button>
						</Form>
					</Modal.Body>
				</Modal>

				{/* Confirm Block/Unblock Modal */}
				<Modal show={showConfirmBlockModal} onHide={handleCloseConfirmBlockModal}>
					<Modal.Header closeButton>
						<Modal.Title>
							{selectedCoach && selectedCoach.status === 'activate' ? 'Block' : 'Unblock'} Coach
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							Are you sure you want to{' '}
							{selectedCoach && selectedCoach.status === 'activate' ? 'block' : 'unblock'} this coach?
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleCloseConfirmBlockModal}>
							Cancel
						</Button>
						<Button
							className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md'
							onClick={handleBlockUnblockCoach}
						>
							{selectedCoach && selectedCoach.status === 'activate' ? 'Block' : 'Unblock'}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default ManagerCoach;
