import React, { useState } from 'react';
import Navbar from '../../components/admin_components/NavbarAdmin';
import ManageCoachAdmin from '../../components/admin_components/ManageCoachAdmin';

const ManageCoachAdminPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full md:h-screen relative'>
			<Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900 h-full'>
				<ManageCoachAdmin toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
};

export default ManageCoachAdminPage;
