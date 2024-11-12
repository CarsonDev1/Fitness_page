import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';

const NavbarCoach = ({ isOpen, toggleSidebar }) => {
	return (
		<>
			{/* Overlay for small screens */}
			{isOpen && <div onClick={toggleSidebar} className='fixed inset-0 z-20 bg-black opacity-50 lg:hidden'></div>}
			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-30 h-full md:h-screen flex flex-col justify-between w-64 text-white transition-transform bg-gray-900 border-r border-slate-200/50 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0 lg:relative lg:flex lg:w-64`}
			>
				<div>
					<div className='px-6 py-4 text-xl font-bold text-center'>
						<img src={logo} alt='logo' width={200} height={200} />
					</div>
					<ul className='mt-6 space-y-2'>
						<li>
							<NavLink
								to='/coach/profile'
								className={({ isActive }) =>
									`block px-4 py-2 transition rounded hover:bg-orange-600 ${
										isActive ? 'bg-orange-500' : ''
									}`
								}
							>
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/coach/course'
								className={({ isActive }) =>
									`block px-4 py-2 transition rounded hover:bg-orange-600 ${
										isActive ? 'bg-orange-500' : ''
									}`
								}
							>
								Manage Course
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/coach/create-course'
								className={({ isActive }) =>
									`block px-4 py-2 transition rounded hover:bg-orange-600 ${
										isActive ? 'bg-orange-500' : ''
									}`
								}
							>
								Create Course
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/coach/exercise-bank'
								className={({ isActive }) =>
									`block px-4 py-2 transition rounded hover:bg-orange-600 ${
										isActive ? 'bg-orange-500' : ''
									}`
								}
							>
								Manage Exercise
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/coach/subscription'
								className={({ isActive }) =>
									`block px-4 py-2 transition rounded hover:bg-orange-600 ${
										isActive ? 'bg-orange-500' : ''
									}`
								}
							>
								Manage Subscription
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default NavbarCoach;
