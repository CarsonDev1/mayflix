import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';

const Footer: React.FC = () => {
	return (
		<footer className='bg-black text-white py-12'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-wrap justify-between'>
					<div className='w-full md:w-1/3 mb-8 md:mb-0'>
						<div className='flex items-center gap-2'>
							<Image src='/logo.png' alt='Logo' className='h-12 w-auto' width={90} height={90} />
						</div>
						<p className='mb-4 text-gray-200'>Your Company Description</p>
						<div className='flex space-x-4'>
							<FaFacebookF className='text-2xl hover:text-gray-200 cursor-pointer transition duration-300' />
							<FaTwitter className='text-2xl hover:text-gray-200 cursor-pointer transition duration-300' />
							<FaYoutube className='text-2xl hover:text-gray-200 cursor-pointer transition duration-300' />
							<FaTiktok className='text-2xl hover:text-gray-200 cursor-pointer transition duration-300' />
						</div>
					</div>
					<div className='w-full md:w-1/3 mb-8 md:mb-0'>
						<h3 className='text-2xl font-bold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<a href='#' className='hover:text-gray-200 transition duration-300'>
									About Us
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-gray-200 transition duration-300'>
									Contact
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-gray-200 transition duration-300'>
									Advertising
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-gray-200 transition duration-300'>
									Careers
								</a>
							</li>
						</ul>
					</div>
					<div className='w-full md:w-1/3'>
						<h3 className='text-2xl font-bold mb-4'>Subscribe</h3>
						<form className='flex flex-col sm:flex-row'>
							<input
								type='email'
								placeholder='Enter your email'
								className='flex-grow py-2 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-900 mb-2 sm:mb-0'
							/>
							<button
								type='submit'
								className='bg-red-600 text-white py-2 px-4 rounded-r-lg hover:bg-red-700 transition duration-300 sm:w-auto w-full'
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>
				<div className='mt-12 pt-8 border-t border-red-500 text-center'>
					<p>&copy; 2024 MAYFLIX. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
