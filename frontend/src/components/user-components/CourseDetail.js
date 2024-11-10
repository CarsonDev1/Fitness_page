import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import SearchBar from './blog-components/SearchBar';
import RecentPosts from './course-components/RecentPosts';
import Categories from './course-components/Categories';
import img1 from '../../assets/image/blog-page/1.webp';
import img2 from '../../assets/image/blog-page/2.webp';
import img3 from '../../assets/image/blog-page/3.webp';
import TertiaryButton from './blog-components/TertiaryButton';

function CourseDetails() {
	const { id } = useParams();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');

	// Đặt mảng images tạm thời để kiểm tra Swiper
	const images = [img1, img2, img3];

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/users/courses/${id}`);
				setCourse(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [id]);

	if (loading) return <div className='text-center text-gray-500'>Loading course details...</div>;
	if (error) return <div className='text-center text-red-500'>Error: {error}</div>;
	if (!course) return <div className='text-center text-gray-500'>Course not found</div>;

	const { name, description, duration, price, difficulty, workoutId, coachId } = course;

	const handleBack = () => {
		navigate('/course-details');
	};

	const handlePayment = () => {
		navigate('/subscriptionCheckout', { state: { course: course } });
	};

	return (
		<section className='bg-black'>
			<div className='space-y-4 sec-com'>
				<div className='container-cus lg:flex lg:gap-20'>
					{/* Blog Posts */}
					<div className='flex flex-col gap-10 lg:w-2/3'>
						<div className='flex flex-col gap-3 overflow-hidden rounded-lg'>
							{/* swiper image */}
							<div className='flex flex-col gap-2'>
								<Swiper
									modules={[Pagination, Navigation]}
									pagination={{ clickable: true }}
									className='z-0 w-full mySwiper'
									autoplay={true}
								>
									{images.map((image, index) => (
										<SwiperSlide key={index}>
											<img
												src={image}
												alt={`Slide ${index}`}
												className='object-cover w-full h-80'
											/>
										</SwiperSlide>
									))}
								</Swiper>
								<p className='text-gray-500'>
									<p className='text-base text-gray-600'>
										{coachId && coachId.accountId
											? coachId.accountId.name
											: coachId?._id || 'No coach assigned'}
									</p>
									<span className='font-semibold text-orange-600'>{difficulty}</span>
								</p>
								{Array.isArray(workoutId) && workoutId.length > 0 ? (
									workoutId.map((workout, index) => (
										<li key={index} className='text-gray-600'>
											{workout?.name || workout?._id || 'Unnamed workout'}
										</li>
									))
								) : (
									<li className='text-gray-500'>No workouts available</li>
								)}
								<div
									className='text-lg text-gray-500'
									dangerouslySetInnerHTML={{ __html: description }}
								></div>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, et recusandae
									fugit velit porro dolore! Omnis, beatae. Quas delectus atque dolor at minus sint,
									voluptate quae laboriosam officia ratione nostrum. Rerum at libero eius iste iure
									nesciunt obcaecati in nulla perspiciatis facere totam molestias ad maiores laborum
									magnam, saepe adipisci minus vel natus! Sunt ullam nemo architecto dignissimos id
									nulla. Distinctio repellendus nemo cum quis ducimus officiis eum esse nihil.
									Recusandae sequi optio libero? Tempora soluta qui modi, reprehenderit architecto
									inventore? Ea eum mollitia quaerat excepturi velit quod, quidem illo? Illo aut,
									laudantium voluptas architecto nostrum eos sapiente sed est corporis fugiat
									perspiciatis, unde officia eaque! Minus, quod voluptas porro recusandae eveniet ex
									dolor aliquid, fuga nobis rerum doloremque. Nostrum? Tempora magni consectetur
									pariatur quidem sunt quibusdam autem fuga doloribus in eaque, id voluptate sed
									corporis aspernatur voluptatibus exercitationem explicabo laborum. Aspernatur
									doloribus illo soluta voluptatem exercitationem veniam earum ipsam. Illum in
									sapiente qui quam vel enim eos dolorum aspernatur soluta earum tempore repellendus,
									fuga temporibus pariatur libero nemo. Quibusdam pariatur tenetur odit aperiam illo,
									rem eum reiciendis dolorum quasi. Libero corrupti in eos distinctio culpa voluptatem
									debitis, nostrum, saepe exercitationem quod assumenda reiciendis ratione velit
									veniam ipsam dolorem repellendus hic quos provident impedit ducimus explicabo
									sapiente tempore. Veritatis, possimus. Praesentium rem delectus assumenda
									exercitationem provident, itaque veniam, modi, nesciunt repellat minima cumque sunt
									perspiciatis velit? Velit in dolorem suscipit ea nemo repellendus labore fuga
									praesentium consequatur nihil, id nam. Porro doloremque aspernatur unde fugiat ullam
									dicta cupiditate ducimus rerum nostrum nihil, autem neque itaque fuga natus.
									Provident libero quos corporis ut aliquam! Praesentium, dolorum maxime ratione eius
									ducimus corrupti! Quae dicta harum quo! Enim deserunt architecto ipsam placeat!
									Veritatis, ducimus voluptates molestiae eaque est doloremque veniam ratione sit
									dolores. Tempora accusantium maiores, voluptates soluta ex alias quam vitae
									deserunt. Eveniet officia iste, ipsa exercitationem ut cupiditate blanditiis aut
									culpa sed voluptatibus, nam neque obcaecati quas a. Accusantium hic maxime
									laboriosam neque! Ratione labore, velit tempora suscipit voluptates eaque possimus.
									Ducimus expedita fugit magnam iure sunt culpa assumenda voluptates accusamus
									doloremque ex deleniti placeat odio facere asperiores tenetur, necessitatibus
									accusantium id voluptatibus perspiciatis porro repudiandae ea reprehenderit
									dignissimos dolorum. Autem?
								</p>
							</div>
						</div>
						<TertiaryButton to='/subscriptionCheckout'>Subscribe</TertiaryButton>
						{/* Pagination */}
					</div>

					{/* Sidebar */}
					<aside className='hidden lg:block lg:w-1/3'>
						<div className='sticky flex flex-col gap-10 top-24'>
							<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
							<Categories />
							<RecentPosts />
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}

export default CourseDetails;
