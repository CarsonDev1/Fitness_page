const btnStyles = `self-start font-medium transition-all hover:text-red-500 hover:bg-transparent`;

function Categories() {
	return (
		<div className='flex flex-col gap-4 p-6 bg-gray-100'>
			<h3 className='relative pb-2 text-xl font-bold before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red-500'>
				Categories
			</h3>
			<button className={btnStyles}>&rsaquo; Body Building</button>
			<button className={btnStyles}>&rsaquo; Boxing</button>
			<button className={btnStyles}>&rsaquo; Crossfit</button>
			<button className={btnStyles}>&rsaquo; Fitness</button>
			<button className={btnStyles}>&rsaquo; Meditation</button>
			<button className={btnStyles}>&rsaquo; Yoga</button>
		</div>
	);
}

export default Categories;
