import React from 'react';
import 'tailwindcss/tailwind.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Home.css';

const slides = [
	{
		image: require('../img/hero/hero-1.jpg'),
		subtitle: 'Shape your body',
		link: '#',
	},
	{
		image: require('../img/hero/hero-2.jpg'),
		subtitle: 'Shape your body',
		link: '#',
	},
];

function Home() {
	return (
		<div>
			<section className=''>
				<Swiper
					modules={[Pagination, Autoplay, Navigation]}
					pagination={{ clickable: true }}
					navigation
					loop={true}
					autoplay={{ delay: 3000 }}
					className='w-full pt-24 h-2/3 md:pt-0 md:h-screen custom-swiper'
				>
					{slides.map((slide, index) => (
						<SwiperSlide key={index} className='relative'>
							<img className='object-cover w-full h-full' src={slide.image} alt='Description' />
							<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
								<div className='max-w-xl p-10 text-center text-gray-300'>
									<span className='text-xl tracking-wide uppercase'>{slide.subtitle}</span>
									<h1 className='mt-4 text-5xl font-bold leading-tight uppercase lg:text-7xl md:text-6xl'>
										Be <span className='text-orange-600'>strong</span> <br /> Training hard
									</h1>
									<a href={slide.link} passHref>
										<span className='inline-block px-6 py-2 mt-6 text-lg text-white transition-all duration-500 bg-orange-500 rounded-lg hover:bg-orange-600 hover:scale-105'>
											Get info
										</span>
									</a>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</section>
			{/* Hero Section End */}

			{/* Choose Us Section Begin */}
			<section className='sec-com'>
				<div className='mx-auto container-cus text-white'>
					<div className='mb-12 text-center'>
						<span className='text-lg'>Why choose us?</span>
						<h2 className='text-4xl font-bold'>PUSH YOUR LIMITS FORWARD</h2>
					</div>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
						<div className='p-4 text-center'>
							<span className='mb-4 text-5xl'>🚴</span>
							<h4 className='text-xl font-semibold'>Modern equipment</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className='p-4 text-center'>
							<span className='mb-4 text-5xl'>💪</span>
							<h4 className='text-xl font-semibold'>Trained instructors</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className='p-4 text-center'>
							<span className='mb-4 text-5xl'>🏋️</span>
							<h4 className='text-xl font-semibold'>Fitness programs</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className='p-4 text-center'>
							<span className='mb-4 text-5xl'>🤝</span>
							<h4 className='text-xl font-semibold'>Support community</h4>
							<p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
			</section>
			{/* Choose Us Section End */}

			{/* Team Section Begin */}
			<section className='sec-com'>
				<div className='mx-auto container-cus text-white'>
					<div className='mb-12 text-center'>
						<span className='text-lg'>Our Team</span>
						<h2 className='text-4xl font-bold'>TRAIN WITH EXPERTS</h2>
					</div>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
						{[
							{ image: require('../img/team/team-1.jpg'), name: 'Athart Rachel', role: 'Gym Trainer' },
							{ image: require('../img/team/team-2.jpg'), name: 'John Doe', role: 'Fitness Expert' },
							{ image: require('../img/team/team-3.jpg'), name: 'Jane Smith', role: 'Yoga Instructor' },
						].map((member, index) => (
							<div
								key={index}
								className='relative overflow-hidden transition-all duration-700 border border-black rounded-lg md:hover:scale-105 md:hover:!border-orange-600'
							>
								<img
									className='object-cover w-full transition-all duration-700 h-96 md:hover:scale-105'
									src={member.image}
									alt={`${member.name} - ${member.role}`}
								/>
								<div className='absolute inset-0 flex flex-col items-center justify-end p-4 text-white bg-gradient-to-t from-black/80 to-black/40'>
									<h4 className='text-xl font-semibold transition-colors duration-300 hover:text-orange-500'>
										{member.name}
									</h4>
									<span className='text-sm text-gray-200'>{member.role}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section End */}
		</div>
	);
}

export default Home;
