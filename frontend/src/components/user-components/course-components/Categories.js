import { useState } from 'react';

const btnStyles = `self-start font-medium transition-all hover:text-red hover:bg-transparent`;

function Categories() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleClickOutside = (e) => {
		if (e.target.id === 'modalBackground') {
			closeModal();
		}
	};

	return (
		<div className='flex flex-col gap-4 text-white'>
			<h3 className='relative pb-2 text-xl font-bold before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red'>
				Categories
			</h3>
			<div className='flex items-center justify-between'>
				<button className={btnStyles}>&rsaquo; Body Building</button>
				<span className='transition-all duration-300 cursor-pointer hover:underline' onClick={openModal}>
					View
				</span>
			</div>
			<div className='flex items-center justify-between'>
				<button className={btnStyles}>&rsaquo; Boxing</button>
				<span className='transition-all duration-300 cursor-pointer hover:underline' onClick={openModal}>
					View
				</span>
			</div>
			<div className='flex items-center justify-between'>
				<button className={btnStyles}>&rsaquo; Crossfit</button>
				<span className='transition-all duration-300 cursor-pointer hover:underline' onClick={openModal}>
					View
				</span>
			</div>
			<div className='flex items-center justify-between'>
				<button className={btnStyles}>&rsaquo; Fitness</button>
				<span className='transition-all duration-300 cursor-pointer hover:underline' onClick={openModal}>
					View
				</span>
			</div>
			<div className='flex items-center justify-between'>
				<button className={btnStyles}>&rsaquo; Meditation</button>
				<span className='transition-all duration-300 cursor-pointer hover:underline' onClick={openModal}>
					View
				</span>
			</div>
			<div className='flex items-center justify-between'>
				<button className={btnStyles}>&rsaquo; Yoga</button>
				<span className='transition-all duration-300 cursor-pointer hover:underline' onClick={openModal}>
					View
				</span>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div
					id='modalBackground'
					className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
					onClick={handleClickOutside}
				>
					<div className='relative w-full max-w-2xl bg-white rounded-md shadow-lg md:w-11/12 lg:w-3/4'>
						<button
							onClick={closeModal}
							className='absolute text-lg text-white top-2 right-2 hover:!text-red hover:bg-transparent'
						>
							X
						</button>
						<div className='aspect-w-16 aspect-h-9'>
							<iframe
								src='https://www.youtube.com/embed/7Tk6rjTzPfg?autoplay=1'
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								referrerPolicy='strict-origin-when-cross-origin'
								allowFullScreen
								className='w-full h-80'
							></iframe>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Categories;
