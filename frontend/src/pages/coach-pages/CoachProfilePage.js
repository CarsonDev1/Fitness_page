import React, { useState } from 'react';
import NavbarCoach from '../../components/coach_components/NavbarCoach';
import CoachProfile from '../../components/coach_components/CoachProfile';

export default function CoachProfilePage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className='flex h-full md:h-screen relative'>
			{/* NavbarCoach will be hidden by default on smaller screens */}
			<NavbarCoach isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<CoachProfile toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
}
