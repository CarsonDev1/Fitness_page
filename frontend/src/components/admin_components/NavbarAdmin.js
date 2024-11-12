import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo.png';

const NavbarAdmin = ({ isOpen, toggleSidebar }) => {
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	return (
		<div>
			{/* Overlay for small screens */}
			{isOpen && <div onClick={toggleSidebar} className='fixed inset-0 z-20 bg-black opacity-50 lg:hidden'></div>}

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-30 h-full flex flex-col justify-between w-64 text-white transition-transform bg-gray-900 border-r border-slate-200/50 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0 lg:relative lg:flex lg:w-64`}
			>
				<div>
					{/* Top Bar */}
					<div className='px-6 py-4 text-xl font-bold text-center'>
						<img src={logo} alt='logo' width={200} height={200} />
					</div>
					{/* Menu */}
					<ul className='mt-6 space-y-2'>
						<li>
							<Link
								to='/admin/dashboard'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/dashboard') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								to='/admin/user'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/user') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Manage Users
							</Link>
						</li>
						<li>
							<Link
								to='/admin/user/createUser'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/user/createUser') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								* Create Users
							</Link>
						</li>
						<li>
							<Link
								to='/admin/coach'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/coach') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Manage Coach
							</Link>
						</li>
						<li>
							<Link
								to='/admin/course'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/course') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Manage Course
							</Link>
						</li>
						<li>
							<Link
								to='/admin/blog'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/blog') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Manage Blog
							</Link>
						</li>
						<li>
							<Link
								to='/admin/hiring'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/hiring') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Manage Hiring Apply
							</Link>
						</li>
						<li>
							<Link
								to='/admin/settings'
								className={`block px-4 py-2 rounded transition ${
									isActive('/admin/settings') ? 'bg-orange-500' : 'hover:bg-orange-600'
								}`}
							>
								Settings
							</Link>
						</li>
					</ul>
				</div>
			</div>

			{/* Main Content Placeholder */}
			{/* <div className='flex-grow p-8'>
				<button
					onClick={toggleSidebar}
					className='p-2 mb-4 text-orange-500 border border-orange-500 rounded lg:hidden'
				>
					Toggle Sidebar
				</button>
				<h2 className='text-2xl font-semibold text-gray-800'>Welcome to the Admin Dashboard</h2>
				<p className='mt-2 text-gray-600'>Select an option from the sidebar to get started.</p>
			</div> */}
		</div>
	);
};

export default NavbarAdmin;
