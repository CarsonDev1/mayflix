'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaBars, FaSun } from 'react-icons/fa';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/api/account/getAccount';

const categories = ['Phim Truyền Hình', 'Phim Bộ', 'Đã Xem Gần Đây', 'Danh sách của tôi'];

const Header: React.FC = () => {
	const [isSticky, setIsSticky] = useState(false);

	const { logout } = useAuth();
	const userId: any = localStorage.getItem('userId');

	const { data: dataProfile } = useQuery({
		queryKey: ['dataProfile', userId],
		queryFn: () => getUserById(userId),
	});

	const [keyword, setKeyword] = useState('');
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const router: any = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleSearch = async () => {
		if (!keyword.trim()) return;

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&limit=10`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const data = await response.json();

			router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
		} catch (err: any) {
			setError(err.message || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

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
							<form className='flex bg-zinc-800 border border-zinc-700 rounded-md shadow text-white text-sm'>
								<button
									aria-disabled='true'
									className='text-white w-10 grid place-content-center'
									onClick={handleSearch}
									disabled={loading}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										stroke-width='2'
										stroke-linecap='round'
										stroke-linejoin='round'
									>
										<circle cx='11' cy='11' r='8'></circle>
										<path d='m21 21-4.3-4.3'></path>
									</svg>
								</button>
								<input
									type='text'
									spellCheck='false'
									name='text'
									className='bg-transparent py-2 outline-none placeholder:text-zinc-400 w-28 focus:w-48 transition-all'
									placeholder='Tìm kiếm phim...'
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<button
									className='text-white w-10 grid place-content-center'
									aria-label='Clear input button'
									type='reset'
								>
									<svg
										stroke-linejoin='round'
										stroke-linecap='round'
										stroke-width='2'
										stroke='currentColor'
										fill='none'
										viewBox='0 0 24 24'
										height='16'
										width='16'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M18 6 6 18'></path>
										<path d='m6 6 12 12'></path>
									</svg>
								</button>
							</form>
						</div>
					</div>
					{/* 
					<button className='text-2xl p-2 rounded-full focus:outline-none hover:bg-gray-700 transition'>
						<FaSun />
					</button> */}

					{dataProfile ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className='cursor-pointer'>
									<Image
										src='/ic-profile.jpg'
										width={50}
										height={50}
										alt='ic-profile'
										className='size-10 object-cover rounded-md'
									/>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-56'>
								<DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										Hồ sơ
										<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={logout}>
									Đăng xuất
									<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href='/login'>
							<button className='bg-red-600 text-white py-2 px-4 rounded-full transition duration-300 hover:bg-red-700'>
								Login
							</button>
						</Link>
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
