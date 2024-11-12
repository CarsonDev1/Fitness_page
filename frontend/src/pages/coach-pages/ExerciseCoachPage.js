import React, { useState } from 'react';
import ExerciseList from '../../components/coach_components/ExerciseList';
import NavbarCoach from '../../components/coach_components/NavbarCoach';

export default function ExerciseCoachPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full md:h-screen relative'>
			<NavbarCoach isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<ExerciseList toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
}
