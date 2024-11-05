import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './blog-components/Pagination';
import SearchBar from './blog-components/SearchBar';
import Categories from './blog-components/Categories';
import RecentPosts from './blog-components/RecentPosts';
import PopularTags from './blog-components/PopularTags';

const BlogDetail = () => {
	const { blogId } = useParams();
	const [blog, setBlog] = useState(null);
	const [comments, setComments] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [newComment, setNewComment] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const [editingCommentId, setEditingCommentId] = useState(null);
	const [editedComment, setEditedComment] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsLoggedIn(true);

			const fetchProfile = async () => {
				try {
					const response = await axios.get('http://localhost:5000/api/users/getUserProfile', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setUserId(response.data._id);
				} catch (error) {
					console.error('Error fetching profile:', error);
				}
			};

			fetchProfile();
		}

		const fetchData = async () => {
			try {
				const blogResponse = await axios.get(`http://localhost:5000/api/admins/blogs/${blogId}`);
				setBlog(blogResponse.data);

				const commentsResponse = await axios.get(`http://localhost:5000/api/admins/blogs/${blogId}/comments`);
				setComments(commentsResponse.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [blogId]);

	const fetchComments = async () => {
		try {
			const commentsResponse = await axios.get(`http://localhost:5000/api/admins/blogs/${blogId}/comments`);
			setComments(commentsResponse.data);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleCommentChange = (e) => {
		setNewComment(e.target.value);
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			toast.info('You need to be logged in to comment.');
			return;
		}
		try {
			await axios.post(
				`http://localhost:5000/api/admins/blogs/${blogId}/comments`,
				{
					content: newComment,
					userId: userId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			setNewComment('');
			fetchComments(); // Refresh comments after adding
		} catch (err) {
			setError(err.message);
		}
	};

	const handleEditClick = (comment) => {
		setEditingCommentId(comment._id);
		setEditedComment(comment.content);
	};

	const handleEditChange = (e) => {
		setEditedComment(e.target.value);
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				`http://localhost:5000/api/admins/comments/${editingCommentId}`,
				{
					content: editedComment,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			setEditingCommentId(null);
			setEditedComment('');
			fetchComments(); // Refresh comments after editing
		} catch (err) {
			setError(err.message);
		}
	};

	const handleDeleteClick = async (commentId) => {
		try {
			await axios.delete(`http://localhost:5000/api/admins/comments/${commentId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			fetchComments(); // Refresh comments after deleting
		} catch (err) {
			setError(err.message);
		}
	};

	if (loading) return <p className='text-center text-orange-600'>Loading...</p>;
	if (error) return <p className='text-center text-red-500'>Error: {error}</p>;

	return (
		<section className='bg-white'>
			<div className='space-y-4 sec-com'>
				<div className='container-cus lg:flex lg:gap-20'>
					{/* Blog Posts */}
					<div className='flex flex-col gap-10 lg:w-2/3'>
						<div key={blog._id} className='flex flex-col gap-3 overflow-hidden bg-white rounded-lg'>
							<img src={blog.image} alt={blog.title} className='object-cover w-full h-full rounded-2xl' />
							<div className='flex flex-col gap-2'>
								<p className='text-gray-500'>
									By <span className='font-semibold text-gray-700'>{blog.author}</span> | {blog.date}{' '}
									| <span className='font-semibold text-orange-600'>{blog.category}</span>
								</p>
								<h3 className='text-2xl font-bold text-gray-800'>{blog.title}</h3>
								<p className='text-lg text-gray-500'>{blog.content}...</p>
							</div>
						</div>

						{/* Pagination */}
					</div>

					{/* Sidebar */}
					<aside className='hidden lg:block lg:w-1/3'>
						<div className='sticky flex flex-col gap-10 top-24'>
							<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
							<RecentPosts />
							<Categories />
						</div>
					</aside>
				</div>
				<div className='container-cus'>
					<h2 className='mb-4 text-2xl font-bold text-orange-600'>Comments</h2>
					<div className='space-y-4'>
						{comments.map((comment) => (
							<div key={comment._id} className='p-4 bg-white rounded-lg shadow-md'>
								<p className='text-sm font-semibold text-gray-600'>
									{comment.userId ? comment.userId.name : 'Unknown User'} -{' '}
									{new Date(comment.date).toLocaleString()}
								</p>
								<p className='mt-2 text-gray-700'>{comment.content}</p>
								{isLoggedIn && userId === comment.userId?._id && (
									<div className='flex mt-4 space-x-4 text-orange-600'>
										<FontAwesomeIcon
											icon={faEdit}
											onClick={() => handleEditClick(comment)}
											className='cursor-pointer'
										/>
										<FontAwesomeIcon
											icon={faTrash}
											onClick={() => handleDeleteClick(comment._id)}
											className='cursor-pointer'
										/>
									</div>
								)}
								{editingCommentId === comment._id && (
									<form onSubmit={handleEditSubmit} className='mt-4'>
										<textarea
											value={editedComment}
											onChange={handleEditChange}
											required
											className='w-full p-2 border border-gray-300 rounded-lg'
										/>
										<button
											type='submit'
											className='px-4 py-2 mt-2 text-white bg-orange-600 rounded-lg'
										>
											Save
										</button>
									</form>
								)}
							</div>
						))}
					</div>

					{isLoggedIn ? (
						<form className='mt-8' onSubmit={handleCommentSubmit}>
							<textarea
								value={newComment}
								onChange={handleCommentChange}
								placeholder='Add a comment...'
								required
								className='w-full p-4 border border-gray-300 rounded-lg'
							/>
							<button
								type='submit'
								className='px-6 py-2 mt-4 font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700'
							>
								Submit
							</button>
						</form>
					) : (
						<p className='mt-8 text-center text-gray-700'>Please log in to add a comment.</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default BlogDetail;
