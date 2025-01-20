'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaBars, FaSun } from 'react-icons/fa';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';

const categories = ['TV Shows', 'Movies', 'Recently Added', 'My List'];

const Header: React.FC = () => {
	const [isSticky, setIsSticky] = useState(false);

	const { dataProfile, logout } = useAuth();

	console.log('dataProfile', dataProfile);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`${
				isSticky ? 'bg-[#0F0F0F] shadow-lg' : 'bg-transparent'
			} text-white py-4 px-6 fixed w-full top-0 z-50 transition-all duration-300`}
		>
			<div className='container flex justify-between items-center'>
				<div className='flex items-center gap-10'>
					<Link href='/'>
						<div className='flex items-center gap-2'>
							<Image src='/logo.png' alt='Logo' className='h-12 w-auto' width={90} height={90} />
						</div>
					</Link>
					<nav className='hidden lg:flex space-x-8'>
						{categories.map((category, index) => (
							<a key={index} href='#' className='hover:text-red-600 transition duration-300 text-lg'>
								{category}
							</a>
						))}
					</nav>
				</div>

				<div className='flex items-center space-x-6'>
					<div className='relative hidden md:block'>
						<div className='relative'>
							<input
								type='text'
								name='text'
								className='pl-10 h-10 text-sm text-white bg-[#1f0404] border-none outline-none rounded-full cursor-pointer shadow-md focus:ring-2 focus:ring-red-600'
								placeholder='Search...'
								required
							/>
							<div className='absolute top-0 left-0 w-10 h-10 p-2 pointer-events-none'>
								<FaSearch className='w-full h-full' />
							</div>
						</div>
					</div>

					<button className='text-2xl p-2 rounded-full focus:outline-none hover:bg-gray-700 transition'>
						<FaSun />
					</button>

					{dataProfile ? (
						<div className='flex items-center gap-2'>
							<span>{dataProfile?.name}</span>
							<span onClick={logout} className='cursor-pointer'>
								Log out
							</span>
						</div>
					) : (
						<button className='bg-red-600 text-white py-2 px-4 rounded-full transition duration-300 hover:bg-red-700'>
							Login
						</button>
					)}

					<Sheet>
						<SheetTrigger asChild>
							<button className='lg:hidden text-2xl p-2 rounded-full focus:outline-none hover:bg-gray-700 transition'>
								<FaBars />
							</button>
						</SheetTrigger>
						<SheetContent className='bg-gray-800 text-white py-4 px-6'>
							<ul className='space-y-2'>
								{categories.map((category, index) => (
									<li key={index}>
										<a
											href='#'
											className='block py-2 hover:bg-gray-700 px-3 rounded transition duration-300'
										>
											{category}
										</a>
									</li>
								))}
							</ul>
							<div className='mt-4'>
								<input
									type='text'
									placeholder='Search...'
									className='w-full py-2 px-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-red-600'
								/>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};

export default Header;
