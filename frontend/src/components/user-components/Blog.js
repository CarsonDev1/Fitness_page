// src/pages/Blog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const blogsPerPage = 6;

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/admins/blogs')
			.then((response) => {
				setBlogs(response.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

	// Pagination logic
	const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
	const startIndex = (currentPage - 1) * blogsPerPage;
	const endIndex = startIndex + blogsPerPage;
	const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	if (loading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='w-16 h-16 border-t-4 border-orange-600 rounded-full loader animate-spin'></div>
			</div>
		);

	if (error) return <p className='text-center text-red-500'>Error: {error}</p>;

	return (
		<div className='sec-com'>
			<div className='container-cus'>
				<div className='flex items-center justify-center mb-8'>
					<input
						type='text'
						placeholder='Search by title...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full max-w-2xl p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600'
					/>
				</div>

				<div className='grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3'>
					{currentBlogs.map((blog) => (
						<div
							key={blog._id}
							className='overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl'
						>
							<img src={blog.image} alt={blog.title} className='object-cover w-full h-48' />
							<div className='p-4'>
								<h2 className='mb-2 text-xl font-semibold text-gray-800'>{blog.title}</h2>
								<p className='mb-4 text-gray-600'>{blog.content.substring(0, 150)}...</p>
								<Link
									to={`/blog/${blog._id}`}
									className='inline-block font-semibold text-orange-600 hover:text-orange-500 hover:underline'
								>
									Read More
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className='flex items-center justify-center gap-6'>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						className={`px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold ${
							currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'
						}`}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					<span className='font-semibold text-gray-700'>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						className={`px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold ${
							currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'
						}`}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Blog;
