import React, { useState } from 'react';
import SubscriptionList from '../../components/coach_components/SubscriptionList';
import NavbarCoach from '../../components/coach_components/NavbarCoach';

export default function SubscriptionListPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full md:h-screen relative'>
			<NavbarCoach isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<SubscriptionList toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
}
