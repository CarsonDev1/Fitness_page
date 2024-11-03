import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../services/userService';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

function Navbar() {
	const [activeMenu, setActiveMenu] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsLoggedIn(true);
			fetchUserProfile()
				.then((data) => setUserName(data.name))
				.catch((error) => console.error('Error fetching user profile:', error));
		}

		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleMenuClick = (menu) => {
		setActiveMenu(activeMenu === menu ? '' : menu); // Toggle individual menu dropdowns
	};
	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
	};
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
				isScrolled ? 'bg-gray-800 shadow-lg' : ''
			}`}
		>
			<div className='container-cus'>
				<div className='mx-auto px-6 flex justify-between items-center'>
					{/* Logo */}
					<Link to='/' className='flex items-center'>
						<img src={logo} alt='Logo' className='h-12 md:h-16' />
					</Link>

					{/* Mobile Menu Icon */}
					<div className='md:hidden text-white text-3xl cursor-pointer z-20' onClick={toggleMenu}>
						{isMenuOpen ? '✖' : '☰'}
					</div>

					{/* Overlay for Mobile Menu */}
					{isMenuOpen && (
						<div className='fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden' onClick={toggleMenu}></div>
					)}

					{/* Navigation Links */}
					<nav
						className={`${
							isMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} md:translate-x-0 fixed md:relative top-0 left-0 md:flex md:items-center w-3/4 md:w-auto h-full md:h-auto bg-gray-800 md:bg-transparent transition-transform duration-300 ease-in-out z-20`}
					>
						<ul className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 p-6 md:p-0 text-lg text-white'>
							{['home', 'about', 'coach', 'course', 'blog', 'contact'].map((menu) => (
								<li key={menu}>
									<a
										href={`./${menu}`}
										className={`hover:text-yellow-400 transition-colors duration-300 ${
											activeMenu === menu
												? 'text-yellow-400 border-b-2 border-yellow-400'
												: 'text-white'
										}`}
										onClick={() => {
											handleMenuClick(menu);
											setIsMenuOpen(false);
										}}
									>
										{menu.charAt(0).toUpperCase() + menu.slice(1)}
									</a>
								</li>
							))}
							<li>
								<div className='relative'>
									<button
										onClick={() => handleMenuClick('more')}
										className={`hover:text-yellow-400 transition-colors duration-300 ${
											activeMenu === 'more' ? 'text-yellow-400' : 'text-white'
										}`}
									>
										More
									</button>
									{activeMenu === 'more' && (
										<div
											className='flex-col absolute mt-2 bg-gray-700 rounded-md shadow-lg py-2 space-y-1'
											onMouseLeave={() => setActiveMenu('')}
										>
											<a href='./bmi' className='block px-4 py-2 text-white hover:bg-yellow-400'>
												BMI Calculate
											</a>
											<a href='./calo' className='block px-4 py-2 text-white hover:bg-yellow-400'>
												Calories Calculate
											</a>
											<a
												href='./hiring'
												className='block px-4 py-2 text-white hover:bg-yellow-400'
											>
												Hiring
											</a>
										</div>
									)}
								</div>
							</li>
						</ul>
					</nav>

					{/* Login/Profile Section */}
					<div className='hidden md:flex items-center gap-4'>
						{!isLoggedIn ? (
							<Link
								to='/signin'
								className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
							>
								Login
							</Link>
						) : (
							<div className='relative'>
								<button
									onClick={() => handleMenuClick('user')}
									className='text-white bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600'
								>
									{userName || 'User'}
								</button>
								{activeMenu === 'user' && (
									<div
										className='absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-20'
										onMouseLeave={() => setActiveMenu('')}
									>
										<Link
											to='/userProfile'
											className='block px-4 py-2 text-white hover:bg-yellow-400'
										>
											User Profile
										</Link>
										<Link
											to='/userSchedule'
											className='block px-4 py-2 text-white hover:bg-yellow-400'
										>
											User Schedule
										</Link>
										<button
											onClick={handleLogout}
											className='block w-full text-left px-4 py-2 text-white hover:bg-yellow-400'
										>
											Logout
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
