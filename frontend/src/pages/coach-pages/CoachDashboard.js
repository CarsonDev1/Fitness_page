import React, { useState } from 'react';
import Dashboard from '../../components/coach_components/CoachDashboard';
import NavbarCoach from '../../components/coach_components/NavbarCoach';

export default function CoachDasboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full md:h-screen relative'>
			<NavbarCoach isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<Dashboard toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
}
