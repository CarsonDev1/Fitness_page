import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faEdit, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';

const ManagerUser = ({ toggleSidebar }) => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showConfirmBlockModal, setShowConfirmBlockModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const res = await axios.get('http://localhost:5000/api/admins/accounts', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			setUsers(res.data);
			setFilteredUsers(res.data);
		} catch (err) {
			toast.error('Failed to fetch users');
		}
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		const filtered = users.filter(
			(user) =>
				(user.email && user.email.toLowerCase().includes(e.target.value.toLowerCase())) ||
				(user.name && user.name.toLowerCase().includes(e.target.value.toLowerCase()))
		);
		setFilteredUsers(filtered);
	};

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`http://localhost:5000/api/admins/accounts/${selectedUser._id}`, selectedUser, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			toast.success(res.data.msg);
			fetchUsers();
			setShowEditModal(false);
		} catch (err) {
			toast.error('Failed to update user');
		}
	};

	const handleBlockUnblockUser = async () => {
		try {
			const res = await axios.patch(
				`http://localhost:5000/api/admins/accounts/${selectedUser._id}/status`,
				{ status: selectedUser.status === 'activate' ? 'blocked' : 'activate' },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success(res.data.msg);
			fetchUsers();
			setShowConfirmBlockModal(false);
		} catch (err) {
			toast.error('Failed to change user status');
		}
	};

	const handleShowViewModal = (user) => {
		setSelectedUser(user);
		setShowViewModal(true);
	};
	const handleCloseViewModal = () => setShowViewModal(false);

	const handleShowEditModal = (user) => {
		setSelectedUser(user);
		setShowEditModal(true);
	};
	const handleCloseEditModal = () => setShowEditModal(false);

	const handleShowConfirmBlockModal = (user) => {
		setSelectedUser(user);
		setShowConfirmBlockModal(true);
	};
	const handleCloseConfirmBlockModal = () => setShowConfirmBlockModal(false);

	const handleUpgradeToCoach = async (userId) => {
		setLoading(true);
		try {
			if (!userId) {
				toast.error('No user selected for upgrade');
				return;
			}
			const res = await axios.put(
				`http://localhost:5000/api/admins/accounts/role/${userId}`,
				{ role: 'coach' },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			await axios.post(
				`http://localhost:5000/api/admins/createCoach`,
				{
					accountId: userId,
					introduce: '',
					selfImage: [],
					contract: '',
					certificate: [],
					experience: [],
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			toast.success(res.data.msg);
			fetchUsers();
		} catch (err) {
			toast.error('Failed to upgrade user to coach');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='h-full md:h-screen'>
			<div className='container-cus mt-5 px-4 sm:px-6 lg:px-8'>
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
				<h2 className='text-2xl font-bold mb-5 text-center text-white'>User Management</h2>
				<ToastContainer />

				<div className='flex flex-wrap justify-between mb-4 items-center space-y-2 md:space-y-0'>
					<Link
						to='/admin/user/createUser'
						className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
					>
						Create User
					</Link>
					<div className='flex items-center space-x-2 px-3 py-2 rounded focus:outline-none bg-gray-800'>
						<FontAwesomeIcon icon={faSearch} className='text-white' />
						<input
							type='text'
							placeholder='Search by email or name'
							value={searchTerm}
							onChange={handleSearch}
							className='text-white w-64 bg-transparent focus:outline-none'
						/>
					</div>
				</div>

				{/* Users List */}
				<div className='overflow-x-auto'>
					<table className='table-auto w-full text-left text-white bg-gray-900 rounded-md overflow-hidden shadow-md'>
						<thead>
							<tr className='bg-gray-800'>
								<th className='px-4 py-2'>Avatar</th>
								<th className='px-4 py-2'>Email</th>
								<th className='px-4 py-2'>Name</th>
								<th className='px-4 py-2'>Role</th>
								<th className='px-4 py-2'>Status</th>
								<th className='px-4 py-2'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentUsers.map((user) => (
								<tr key={user._id} className='border-b border-gray-700'>
									<td className='px-4 py-2'>
										<img
											src={user.avatar || 'https://via.placeholder.com/50'}
											alt='avatar'
											className='w-12 h-12 rounded-full'
										/>
									</td>
									<td className='px-4 py-2'>{user.email}</td>
									<td className='px-4 py-2'>{user.name}</td>
									<td className='px-4 py-2'>{user.role}</td>
									<td className='px-4 py-2'>{user.status}</td>
									<td className='px-4 py-2 flex flex-wrap space-x-2 space-y-2 items-center justify-center'>
										<div className='hidden md:flex space-x-2'>
											<button
												onClick={() => handleShowViewModal(user)}
												className='p-2 text-blue-500 hover:bg-blue-600 hover:text-white rounded transition duration-150'
											>
												<FontAwesomeIcon icon={faEye} />
											</button>
											<button
												onClick={() => handleShowEditModal(user)}
												className='p-2 text-green-500 hover:bg-green-600 hover:text-white rounded transition duration-150'
											>
												<FontAwesomeIcon icon={faEdit} />
											</button>
											<button
												onClick={() => handleShowConfirmBlockModal(user)}
												className={`p-2 ${
													user.status === 'activate'
														? 'text-red-500 hover:bg-red-600'
														: 'text-yellow-500 hover:bg-yellow-600'
												} hover:text-white rounded transition duration-150`}
											>
												<FontAwesomeIcon icon={user.status === 'activate' ? faBan : faCheck} />
											</button>
											<button
												onClick={() => handleUpgradeToCoach(user._id)}
												className='p-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-150'
												disabled={loading}
											>
												Upgrade to Coach
											</button>
										</div>
										{/* Select Menu for Small Screens */}
										<div className='md:hidden'>
											<select
												onChange={(e) => {
													const action = e.target.value;
													if (action === 'view') handleShowViewModal(user);
													if (action === 'edit') handleShowEditModal(user);
													if (action === 'block-unblock') handleShowConfirmBlockModal(user);
													if (action === 'upgrade') handleUpgradeToCoach(user._id);
												}}
												className='p-2 bg-gray-700 text-white rounded'
											>
												<option value=''>Actions</option>
												<option value='view'>View</option>
												<option value='edit'>Edit</option>
												<option value='block-unblock'>Block/Unblock</option>
												<option value='upgrade'>Upgrade to Coach</option>
											</select>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<nav className='mt-4'>
					<ul className='flex justify-center space-x-1'>
						{Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
							<li key={index}>
								<button
									onClick={() => paginate(index + 1)}
									className='px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600'
								>
									{index + 1}
								</button>
							</li>
						))}
					</ul>
				</nav>

				{/* Modals */}
				{showViewModal && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-white rounded-lg w-96 p-5'>
							<h2 className='text-xl font-bold mb-4'>User Details</h2>
							<p>
								<strong>ID:</strong> {selectedUser?._id}
							</p>
							<p>
								<strong>Email:</strong> {selectedUser?.email}
							</p>
							<p>
								<strong>Name:</strong> {selectedUser?.name}
							</p>
							<p>
								<strong>Role:</strong> {selectedUser?.role}
							</p>
							<p>
								<strong>Status:</strong> {selectedUser?.status}
							</p>
							<div className='mt-4'>
								<button
									onClick={handleCloseViewModal}
									className='bg-red-500 text-white px-4 py-2 rounded'
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Edit Modal */}
				{showEditModal && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-white rounded-lg w-96 p-5'>
							<h2 className='text-xl font-bold mb-4'>Edit User</h2>
							<form onSubmit={handleUpdateUser}>
								<div className='mb-2'>
									<label>Email:</label>
									<input
										type='email'
										value={selectedUser?.email}
										className='w-full bg-gray-200 p-2 rounded'
										readOnly
									/>
								</div>
								<div className='mb-2'>
									<label>Name:</label>
									<input
										type='text'
										value={selectedUser?.name}
										onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
										className='w-full bg-gray-200 p-2 rounded'
										required
									/>
								</div>
								<div className='mt-4'>
									<button
										type='button'
										onClick={handleCloseEditModal}
										className='bg-red-500 text-white px-4 py-2 rounded mr-2'
									>
										Close
									</button>
									<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
										Update
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{/* Confirm Block/Unblock Modal */}
				{showConfirmBlockModal && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-white rounded-lg w-80 p-5'>
							<h2 className='text-xl font-bold mb-4'>
								{selectedUser?.status === 'activate' ? 'Block User' : 'Unblock User'}
							</h2>
							<p>
								Are you sure you want to {selectedUser?.status === 'activate' ? 'block' : 'unblock'}{' '}
								this user?
							</p>
							<div className='mt-4'>
								<button
									onClick={handleCloseConfirmBlockModal}
									className='bg-gray-300 px-4 py-2 rounded mr-2'
								>
									Cancel
								</button>
								<button
									onClick={handleBlockUnblockUser}
									className='bg-red-500 text-white px-4 py-2 rounded'
								>
									{selectedUser?.status === 'activate' ? 'Block' : 'Unblock'}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManagerUser;
