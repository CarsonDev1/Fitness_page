import React, { useState } from 'react';
import Navbar from '../../components/admin_components/NavbarAdmin';
import ManagerUser from '../../components/admin_components/ManageUserAdmin';

const ManageUserPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full relative'>
			<Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<ManagerUser toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
};

export default ManageUserPage;
