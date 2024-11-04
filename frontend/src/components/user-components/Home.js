import React from 'react';
import 'tailwindcss/tailwind.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Home.css';

function Home() {
	return (
		<div>
			{/* Hero Section Begin */}
			<section className=''>
				<Swiper
					modules={[Pagination, Autoplay]}
					pagination={{ clickable: true }}
					loop={true}
					autoplay={{ delay: 3000 }}
					className='w-full h-[850px]'
				>
					<SwiperSlide className='relative'>
						<img
							className='w-full h-full object-cover'
							src={require('../img/hero/hero-1.jpg')}
							alt='Description'
						/>
						<div className='absolute inset-0 bg-black bg-opacity-50 flex justify-end items-center'>
							<div className='text-white p-8 max-w-md'>
								<span className='text-lg'>Shape your body</span>
								<h1 className='text-4xl font-bold mt-2'>
									Be <strong>strong</strong> <br /> training hard
								</h1>
								<a href='#' className='mt-4 inline-block bg-orange-500 text-white py-2 px-6 rounded'>
									Get info
								</a>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className='relative'>
						<img
							className='w-full h-full object-cover'
							src={require('../img/hero/hero-2.jpg')}
							alt='Description'
						/>
						<div className='absolute inset-0 bg-black bg-opacity-50 flex justify-end items-center'>
							<div className='text-white p-8 max-w-md'>
								<span className='text-lg'>Shape your body</span>
								<h1 className='text-4xl font-bold mt-2'>
									Be <strong>strong</strong> <br /> training hard
								</h1>
								<a href='#' className='mt-4 inline-block bg-orange-500 text-white py-2 px-6 rounded'>
									Get info
								</a>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</section>
			{/* Hero Section End */}

			{/* Choose Us Section Begin */}
			<section className='choseus-section py-16 bg-gray-100'>
				<div className='container mx-auto'>
					<div className='text-center mb-12'>
						<span className='text-lg'>Why choose us?</span>
						<h2 className='text-4xl font-bold'>PUSH YOUR LIMITS FORWARD</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='text-center p-4'>
							<span className='text-5xl mb-4'>🚴</span>
							<h4 className='text-xl font-semibold'>Modern equipment</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className='text-center p-4'>
							<span className='text-5xl mb-4'>💪</span>
							<h4 className='text-xl font-semibold'>Trained instructors</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className='text-center p-4'>
							<span className='text-5xl mb-4'>🏋️</span>
							<h4 className='text-xl font-semibold'>Fitness programs</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className='text-center p-4'>
							<span className='text-5xl mb-4'>🤝</span>
							<h4 className='text-xl font-semibold'>Support community</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
			</section>
			{/* Choose Us Section End */}

			{/* Team Section Begin */}
			<section className='team-section py-16'>
				<div className='container mx-auto'>
					<div className='text-center mb-12'>
						<span className='text-lg'>Our Team</span>
						<h2 className='text-4xl font-bold'>TRAIN WITH EXPERTS</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='relative'>
							<img
								className='w-full h-80 object-cover'
								src={require('../img/team/team-1.jpg')}
								alt='Description'
							/>
							<div className='absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-center text-white'>
								<h4>Athart Rachel</h4>
								<span>Gym Trainer</span>
							</div>
						</div>
						<div className='relative'>
							<img
								className='w-full h-80 object-cover'
								src={require('../img/team/team-2.jpg')}
								alt='Description'
							/>
							<div className='absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-center text-white'>
								<h4>Athart Rachel</h4>
								<span>Gym Trainer</span>
							</div>
						</div>
						<div className='relative'>
							<img
								className='w-full h-80 object-cover'
								src={require('../img/team/team-3.jpg')}
								alt='Description'
							/>
							<div className='absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-center text-white'>
								<h4>Athart Rachel</h4>
								<span>Gym Trainer</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Team Section End */}
		</div>
	);
}

export default Home;
