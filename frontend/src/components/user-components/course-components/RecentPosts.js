import TertiaryButton from '../blog-components/TertiaryButton';
import { blogs } from './Data';

function RecentPosts() {
	return (
		<div className='flex flex-col gap-6'>
			<h3 className='relative pb-2 text-xl font-bold text-white before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red'>
				Latest Posts
			</h3>
			{blogs.slice(blogs.length - 6, blogs.length).map((post) => (
				<div
					className='flex flex-col items-start transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl'
					key={post.id}
				>
					<img src={post.image} alt='' className='object-cover w-full h-48 rounded-t-lg' />
					<div className='flex flex-col w-full gap-2 p-4'>
						<p className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
							<span className='font-bold'>Slot:</span>
							<span className='font-semibold text-red-500'>{post.slot}</span>
						</p>
						<p className='flex items-center gap-2 text-lg font-semibold text-gray-500'>
							<span className='font-bold'>Price:</span>
							<span className='font-bold text-red-500'>{post.price}</span>
						</p>
						<p className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
							<span className='font-bold'>Difficulty:</span>
							<span className='font-bold text-red-500'>{post.difficulty}</span>
						</p>
						<TertiaryButton className='mt-3 text-white bg-red-500 hover:bg-red-600'>
							Subscribe
						</TertiaryButton>
					</div>
				</div>
			))}
		</div>
	);
}

export default RecentPosts;
