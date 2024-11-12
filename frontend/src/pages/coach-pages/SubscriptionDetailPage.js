import React, { useState } from 'react';
import SubscriptionDetail from '../../components/coach_components/SubscriptionDetail';
import NavbarCoach from '../../components/coach_components/NavbarCoach';

export default function SubscriptionDetailPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full md:h-screen relative'>
			<NavbarCoach isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<SubscriptionDetail toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
}
