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
		setIsUserMenuOpen(false);
	};

	const handleUserClick = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
		setIsSubmenuOpen(false);
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
				isScrolled ? 'bg-[#151515] shadow-lg' : 'bg-[#151515] md:bg-transparent'
			}`}
		>
			<div className='container-cus'>
				<div className='flex items-center justify-between px-6 mx-auto'>
					<Link to='/' className='flex items-center' onClick={() => setActiveMenu('')}>
						<img src={logo} alt='Logo' className='block object-cover w-full h-12 md:h-8' />
					</Link>

					<div className='z-20 text-3xl text-white cursor-pointer md:hidden' onClick={toggleMenu}>
						{isMenuOpen ? '✖' : '☰'}
					</div>

					{isMenuOpen && (
						<div className='fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden' onClick={toggleMenu}></div>
					)}

					<nav
						className={`${
							isMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} md:translate-x-0 fixed md:relative top-0 left-0 md:flex md:items-center w-3/4 md:w-auto h-full md:h-auto bg-gray-800 md:bg-transparent transition-transform duration-300 ease-in-out z-20`}
					>
						<ul className='flex flex-col items-start gap-6 p-6 text-lg md:flex-row md:items-center md:gap-10 md:p-0 font-oswald'>
							{['home', 'about', 'coach', 'course', 'blog', 'contact'].map((menu) => {
								const path =
									menu === 'home'
										? ''
										: menu === 'coach'
										? 'coach-details'
										: menu === 'course'
										? 'course-details'
										: menu;
								const isActive = activeMenu === menu || activeMenu === path;

								return (
									<Link
										key={menu}
										to={`/${path}`}
										className={`transition-colors duration-300 hover:!text-[#F36100] ${
											isActive ? 'text-[#F36100] border-b-2 border-[#F36100]' : 'text-white'
										}`}
										onClick={() => handleMenuClick(menu)}
									>
										{menu.charAt(0).toUpperCase() + menu.slice(1)}
									</Link>
								);
							})}

							{/* Mobile Login/User Profile Menu */}
							<div className='flex md:hidden'>
								{!isLoggedIn ? (
									<Link
										to='/signin'
										className='px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-400 skew-x-[-10deg] transform'
										onClick={() => setIsMenuOpen(false)}
									>
										Login
									</Link>
								) : (
									<div className='relative' ref={userRef}>
										<button
											onClick={handleUserClick}
											className='px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-400 skew-x-[-10deg] transform'
										>
											{userName || 'User'}
										</button>
										{isUserMenuOpen && (
											<div className='absolute left-0 z-20 w-48 py-2 mt-2 bg-gray-900 rounded-lg shadow-2xl'>
												<Link
													to='/userProfile'
													className='block px-4 py-3 text-white hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300'
													onClick={() => {
														setIsUserMenuOpen(false);
														setIsMenuOpen(false);
													}}
												>
													User Profile
												</Link>
												<Link
													to='/userSchedule'
													className='block px-4 py-3 text-white hover:bg-[#F36100] hover:text-gray-900 rounded-lg transition duration-300'
													onClick={() => {
														setIsUserMenuOpen(false);
														setIsMenuOpen(false);
													}}
												>
													User Schedule
												</Link>
												<button
													onClick={() => {
														handleLogout();
														setIsUserMenuOpen(false);
														setIsMenuOpen(false);
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
						</ul>
					</nav>

					{/* Desktop Login/User Profile */}
					<div className='items-center hidden gap-4 md:flex'>
						{!isLoggedIn ? (
							<Link
								to='/signin'
								className='px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-400 skew-x-[-10deg] transform'
							>
								Login
							</Link>
						) : (
							<div className='relative' ref={userRef}>
								<button
									onClick={handleUserClick}
									className='px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-400 skew-x-[-10deg] transform'
								>
									{userName || 'User'}
								</button>
								{isUserMenuOpen && (
									<div className='absolute left-0 z-20 w-48 py-2 mt-2 bg-gray-900 rounded-lg shadow-2xl'>
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
