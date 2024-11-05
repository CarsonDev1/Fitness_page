import { blogs } from './Data';

function RecentPosts() {
	return (
		<div className='flex flex-col gap-4 p-6 bg-gray-100'>
			<h3 className='relative pb-2 text-xl font-bold before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red'>
				Recent Posts
			</h3>
			{blogs.slice(blogs.length - 6, blogs.length).map((post) => (
				<div className='flex items-center gap-4' key={post.id}>
					<img src={post.image} alt='' className='w-48 h-32' />
					<div>
						<p className='mb-2 font-medium text-gray-300'>{post.date}</p>
						<h4 className='font-semibold '>
							{post.title.length > 32 ? post.title.slice(0, 32) + '...' : post.title}
						</h4>
					</div>
				</div>
			))}
		</div>
	);
}

export default RecentPosts;
