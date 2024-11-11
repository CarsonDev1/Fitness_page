import React from 'react';
import { Link } from 'react-router-dom';

const NavbarAdmin = () => {
	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar */}
			<div className='flex flex-col justify-between w-64 text-white bg-orange-500'>
				<div>
					{/* Top Bar */}
					<div className='px-6 py-4 text-xl font-bold text-center border-b border-orange-400'>
						Admin Dashboard
					</div>
					{/* Menu */}
					<ul className='mt-6 space-y-2'>
						<li>
							<Link to='/admin/user' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Dashboard
							</Link>
						</li>
						<li>
							<Link to='/admin/user' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Manage Users
							</Link>
						</li>
						<li>
							<Link
								to='/admin/user/createUser'
								className='block px-4 py-2 transition rounded hover:bg-orange-600'
							>
								* Create Users
							</Link>
						</li>
						<li>
							<Link to='/admin/coach' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Manage Coach
							</Link>
						</li>
						<li>
							<Link to='/admin/couse' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Manage Course
							</Link>
						</li>
						<li>
							<Link to='/admin/couse' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Manage Blog
							</Link>
						</li>
						<li>
							<Link to='/admin/hiring' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Manage Hiring Apply
							</Link>
						</li>
						<li>
							<Link
								to='/admin/settings'
								className='block px-4 py-2 transition rounded hover:bg-orange-600'
							>
								Settings
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{/* Main Content Placeholder */}
			<div className='flex-grow p-8'>
				{/* Placeholder for other admin content */}
				<h2 className='text-2xl font-semibold text-gray-800'>Welcome to the Admin Dashboard</h2>
				<p className='mt-2 text-gray-600'>Select an option from the sidebar to get started.</p>
			</div>
		</div>
	);
};

export default NavbarAdmin;
