import React, { useState } from 'react';
import Form from '../../components/coach_components/CreateCourseForm';
import NavbarCoach from '../../components/coach_components/NavbarCoach';
export default function FormCreateCourse() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full md:h-screen relative'>
			<NavbarCoach isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<Form toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
}
