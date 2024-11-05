// src/pages/Blog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './blog-components/SearchBar';
import Categories from './blog-components/Categories';
import RecentPosts from './blog-components/RecentPosts';
import PopularTags from './blog-components/PopularTags';
import Pagination from './blog-components/Pagination';
import TertiaryButton from './blog-components/TertiaryButton';
import './Blog.css';

const Blog = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
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
	const numPages = Math.ceil(filteredBlogs.length / blogsPerPage);
	const currentBlogs = filteredBlogs.slice(currentPage * blogsPerPage, (currentPage + 1) * blogsPerPage);

	if (loading)
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='w-16 h-16 border-t-4 border-orange-600 rounded-full loader animate-spin'></div>
			</div>
		);

	if (error) return <p className='text-center text-red-500'>Error: {error}</p>;

	return (
		<section className='bg-white'>
			<div className='sec-com'>
				<div className='container-cus lg:flex lg:gap-20'>
					{/* Blog Posts */}
					<div className='flex flex-col gap-10 lg:w-2/3'>
						{currentBlogs.map((blog) => (
							<div
								key={blog._id}
								className='flex flex-col gap-2 overflow-hidden bg-white rounded-lg shadow-md'
							>
								<img
									src={blog.image}
									alt={blog.title}
									className='object-cover w-full h-64 transition-transform duration-300 hover:scale-105'
								/>
								<div className='flex flex-col gap-2 p-6'>
									<p className='text-gray-500'>
										By <span className='font-semibold text-gray-700'>{blog.author}</span> |{' '}
										{blog.date} |{' '}
										<span className='font-semibold text-orange-600'>{blog.category}</span>
									</p>
									<h3 className='text-2xl font-bold text-gray-800'>{blog.title}</h3>
									<p className='text-gray-600'>{blog.content.substring(0, 150)}...</p>
									<TertiaryButton to={`/blog/${blog._id}`}>Read More</TertiaryButton>
								</div>
							</div>
						))}

						{/* Pagination */}
						<Pagination curPage={currentPage} numPages={numPages} setCurPage={setCurrentPage} />
					</div>

					{/* Sidebar */}
					<aside className='hidden lg:block lg:w-1/3'>
						<div className='sticky flex flex-col gap-10 top-24'>
							<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
							<Categories />
							<RecentPosts />
							<PopularTags />
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
};

export default Blog;
