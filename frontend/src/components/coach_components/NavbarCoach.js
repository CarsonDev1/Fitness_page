import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

const NavbarCoach = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='bg-gray-900'>
			{/* Button to toggle sidebar */}
			<button onClick={toggleNavbar} className='block p-2 m-4 text-white bg-gray-900 rounded-md lg:hidden'>
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

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-10 h-screen flex flex-col justify-between w-64 text-white transition-transform bg-gray-900 border-r border-slate-200/50 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0 lg:relative lg:flex lg:w-64`}
			>
				<div>
					<div className='px-6 py-4 text-xl font-bold text-center'>
						<img src={logo} alt='logo' width={200} height={200} />
					</div>
					<ul className='mt-6 space-y-2'>
						<li>
							<Link
								to='/coach/profile'
								className='block px-4 py-2 transition rounded hover:bg-orange-600'
							>
								Dashboard
							</Link>
						</li>
						<li>
							<Link to='/coach/course' className='block px-4 py-2 transition rounded hover:bg-orange-600'>
								Manage Course
							</Link>
						</li>
						<li>
							<Link
								to='/coach/create-course'
								className='block px-4 py-2 transition rounded hover:bg-orange-600'
							>
								Create Course
							</Link>
						</li>
						<li>
							<Link
								to='/coach/exercise-bank'
								className='block px-4 py-2 transition rounded hover:bg-orange-600'
							>
								Manage Exercise
							</Link>
						</li>
						<li>
							<Link
								to='/coach/subscription'
								className='block px-4 py-2 transition rounded hover:bg-orange-600'
							>
								Manage Subscription
							</Link>
						</li>
					</ul>
				</div>
			</div>

			{/* Overlay for small screens */}
			{isOpen && <div onClick={toggleNavbar} className='fixed inset-0 z-0 bg-black opacity-50 lg:hidden'></div>}
		</div>
	);
};

export default NavbarCoach;
