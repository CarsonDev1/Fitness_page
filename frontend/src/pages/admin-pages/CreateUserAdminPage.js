import React, { useState } from 'react';
import Navbar from '../../components/admin_components/NavbarAdmin';
import CreateUserAdmin from '../../components/admin_components/CreateUserAdmin';

const CreateUserAdminPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='flex h-full relative'>
			<Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			<div className='flex-1 bg-gray-900'>
				<CreateUserAdmin toggleSidebar={toggleSidebar} />
			</div>
		</div>
	);
};

export default CreateUserAdminPage;
