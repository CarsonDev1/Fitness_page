import React from 'react';

function Footer() {
	return (
		<div className='text-gray-300 bg-gray-900'>
			{/* Get In Touch Section */}
			<div className='py-10 bg-gray-800'>
				<div className='px-6 mx-auto text-center container-cus md:text-left'>
					<div className='flex flex-col space-y-8 text-center md:flex-row md:justify-around md:text-left md:space-y-0'>
						<div className='flex flex-col items-center space-y-3'>
							<div className='flex items-center justify-center bg-orange-600 rounded-full size-14'>
								<i className='text-3xl text-white fa fa-map-marker'></i>
							</div>
							<p className='text-lg font-semibold'>Fitness Hue</p>
						</div>
						<div className='flex flex-col items-center space-y-3'>
							<div className='flex items-center justify-center bg-orange-600 rounded-full size-14'>
								<i className='text-3xl text-white fa fa-mobile'></i>
							</div>
							<p className='text-lg font-semibold'>(+84) 123 456 789</p>
						</div>
						<div className='flex flex-col items-center space-y-3'>
							<div className='flex items-center justify-center bg-orange-600 rounded-full size-14'>
								<i className='text-3xl text-white fa fa-envelope'></i>
							</div>
							<p className='text-lg font-semibold'>email@gmail.com</p>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Main Section */}
			<section className='py-16'>
				<div className='container-cus'>
					<div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4'>
						{/* About Section */}
						<div className='flex flex-col items-center space-y-6 text-center lg:text-left'>
							<a href='#' className='flex justify-center lg:justify-start'>
								<img src={require('../img/logo.png')} alt='Logo' className='h-auto w-28' />
							</a>
							<p className='text-sm leading-relaxed'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore dolore magna aliqua.
							</p>
							<div className='flex justify-center space-x-4 text-gray-400 lg:justify-start'>
								<a href='#'>
									<i className='text-2xl transition-colors fa fa-facebook hover:text-orange-500'></i>
								</a>
								<a href='#'>
									<i className='text-2xl transition-colors fa fa-twitter hover:text-orange-500'></i>
								</a>
								<a href='#'>
									<i className='text-2xl transition-colors fa fa-youtube hover:text-orange-500'></i>
								</a>
								<a href='#'>
									<i className='text-2xl transition-colors fa fa-instagram hover:text-orange-500'></i>
								</a>
								<a href='#'>
									<i className='text-2xl transition-colors fa fa-envelope hover:text-orange-500'></i>
								</a>
							</div>
						</div>

						{/* Useful Links */}
						<div>
							<h4 className='mb-4 text-xl font-bold text-center text-white lg:text-left'>Useful Links</h4>
							<ul className='space-y-3 text-center text-white lg:text-left'>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										About
									</a>
								</li>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										Blog
									</a>
								</li>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										Classes
									</a>
								</li>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										Contact
									</a>
								</li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h4 className='mb-4 text-xl font-bold text-center text-white lg:text-left'>Support</h4>
							<ul className='space-y-3 text-center text-white lg:text-left'>
								<li>
									<a href='/signin' className='transition-colors hover:text-orange-500'>
										Login
									</a>
								</li>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										My Account
									</a>
								</li>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										Subscribe
									</a>
								</li>
								<li>
									<a href='#' className='transition-colors hover:text-orange-500'>
										Contact
									</a>
								</li>
							</ul>
						</div>

						{/* Tips & Guides */}
						<div>
							<h4 className='mb-4 text-xl font-bold text-center text-white lg:text-left'>
								Tips & Guides
							</h4>
							<div className='space-y-4 text-center lg:text-left'>
								<div>
									<h6>
										<a href='#' className='font-semibold transition-colors hover:text-orange-500'>
											Physical fitness may help prevent depression, anxiety
										</a>
									</h6>
									<p className='text-xs text-gray-500'>3 min read • 20 Comments</p>
								</div>
								<div>
									<h6>
										<a href='#' className='font-semibold transition-colors hover:text-orange-500'>
											Fitness: The best exercise to lose belly fat and tone up...
										</a>
									</h6>
									<p className='text-xs text-gray-500'>3 min read • 20 Comments</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Footer;
