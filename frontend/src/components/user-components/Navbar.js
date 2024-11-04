import React, { useState, useEffect, useRef } from 'react';
import { fetchUserProfile } from '../../services/userService';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo.png';

function Navbar() {
	const [activeMenu, setActiveMenu] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const location = useLocation();
	const moreRef = useRef(null);
	const userRef = useRef(null);

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

	useEffect(() => {
		const currentPath = location.pathname.slice(1);
		setActiveMenu(currentPath);
	}, [location.pathname]);

	const handleMenuClick = (menu) => {
		setActiveMenu(menu);
		setIsMenuOpen(false);
	};

	const handleMoreClick = () => {
		setIsSubmenuOpen(!isSubmenuOpen);
		setIsUserMenuOpen(false); // Đóng User menu khi mở More menu
	};

	const handleUserClick = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
		setIsSubmenuOpen(false); // Đóng More menu khi mở User menu
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
	};

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				moreRef.current &&
				!moreRef.current.contains(event.target) &&
				userRef.current &&
				!userRef.current.contains(event.target)
			) {
				setIsSubmenuOpen(false);
				setIsUserMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
				isScrolled ? 'bg-[#151515] shadow-lg' : ''
			}`}
		>
			<div className='container-cus'>
				<div className='mx-auto px-6 flex justify-between items-center'>
					<Link to='/' className='flex items-center' onClick={() => setActiveMenu('')}>
						<img src={logo} alt='Logo' className='h-12 md:h-12' />
					</Link>

					<div className='md:hidden text-white text-3xl cursor-pointer z-20' onClick={toggleMenu}>
						{isMenuOpen ? '✖' : '☰'}
					</div>

					{isMenuOpen && (
						<div className='fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden' onClick={toggleMenu}></div>
					)}

					<nav
						className={`${
							isMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} md:translate-x-0 fixed md:relative top-0 left-0 md:flex md:items-center w-3/4 md:w-auto h-full md:h-auto bg-gray-800 md:bg-transparent transition-transform duration-300 ease-in-out z-20`}
					>
						<ul className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 p-6 md:p-0 text-lg'>
							{['home', 'about', 'coach', 'course', 'blog', 'contact'].map((menu) => (
								<Link
									key={menu}
									to={`/${menu}`}
									className={`transition-colors duration-300 hover:!text-[#F36100] ${
										activeMenu === menu
											? 'text-[#F36100] border-b-2 border-[#F36100]'
											: 'text-white'
									}`}
									onClick={() => handleMenuClick(menu)}
								>
									{menu.charAt(0).toUpperCase() + menu.slice(1)}
								</Link>
							))}
							<li className='relative' ref={moreRef}>
								<div
									onClick={handleMoreClick}
									className={`transition-colors duration-300 cursor-pointer hover:!text-[#F36100] ${
										isSubmenuOpen ? 'text-[#F36100]' : 'text-white'
									}`}
								>
									More
								</div>
								{isSubmenuOpen && (
									<div className='absolute -left-full mt-2 w-48 bg-gray-900 rounded-lg shadow-2xl py-2'>
										<Link
											to='/bmi'
											className='block px-4 py-3 text-white text-base hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
											onClick={() => setIsSubmenuOpen(false)}
										>
											BMI Calculator
										</Link>
										<Link
											to='/calo'
											className='block px-4 py-3 text-white text-base font-semibold hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
											onClick={() => setIsSubmenuOpen(false)}
										>
											Calorie Calculator
										</Link>
										<Link
											to='/hiring'
											className='block px-4 py-3 text-white text-base font-semibold hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
											onClick={() => setIsSubmenuOpen(false)}
										>
											Join Our Team
										</Link>
									</div>
								)}
							</li>
						</ul>
					</nav>

					<div className='hidden md:flex items-center gap-4'>
						{!isLoggedIn ? (
							<Link
								to='/signin'
								className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
							>
								Login
							</Link>
						) : (
							<div className='relative' ref={userRef}>
								<button
									onClick={handleUserClick}
									className='text-white bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600'
								>
									{userName || 'User'}
								</button>
								{isUserMenuOpen && (
									<div className='absolute left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-2xl py-2 z-20'>
										<Link
											to='/userProfile'
											className='block px-4 py-3 text-white hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300'
											onClick={() => setIsUserMenuOpen(false)}
										>
											User Profile
										</Link>
										<Link
											to='/userSchedule'
											className='block px-4 py-3 text-white hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300'
											onClick={() => setIsUserMenuOpen(false)}
										>
											User Schedule
										</Link>
										<button
											onClick={() => {
												handleLogout();
												setIsUserMenuOpen(false);
											}}
											className='block w-full text-left px-4 py-3 text-white hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300'
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
