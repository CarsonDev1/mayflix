'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const keyword = searchParams.get('keyword') || '';
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			if (!keyword) return;

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
				setMovies(data.data.items || []);
			} catch (err: any) {
				setError(err.message || 'Something went wrong');
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, [keyword]);

	return (
		<div className='py-20 bg-black text-white h-dvh'>
			<div className='container'>
				<h1 className='text-2xl font-bold mb-4'>Kết quả tìm kiếm cho: {keyword}</h1>
				{loading && <p>Đang tải...</p>}
				{error && <p className='text-red-500'>{error}</p>}
				<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
					{movies.map((movie: any) => (
						<Link
							key={movie._id}
							href={`/product-list/${movie?.slug}`}
							className='border border-slate-800 rounded-lg text-center shadow-md hover:shadow-lg transition duration-300 transform hover:border-red-500 group flex flex-col justify-between relative h-56 overflow-hidden'
						>
							<span className='px-2 py-1 text-white text-xs sm:text-sm md:text-base bg-red-600 rounded-sm w-fit relative z-10'>
								{movie?.episode_total > 0
									? `${movie?.episode_total.replace('Tập', '')} Tập`
									: 'Đang cập nhật'}
							</span>

							{/* Overlay on hover */}
							<div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10 rounded-lg'>
								<button
									className='group relative w-20 h-20 bg-red-600 rounded-full overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50'
									aria-label='Play movie'
								>
									<div className='absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out' />
									<div className='absolute inset-0 flex items-center justify-center'>
										<Play className='w-10 h-10 text-white transform translate-x-0.5 group-hover:scale-125 transition-transform duration-300 ease-in-out' />
									</div>
									<div className='absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-25 rounded-full scale-50 group-hover:scale-100 transition-all duration-300 ease-in-out' />
								</button>
							</div>

							<Image
								src={`https://phimimg.com/${movie?.poster_url}`}
								width={500}
								height={500}
								alt='movie image'
								className='rounded-lg object-cover absolute w-full h-full transform transition-transform duration-300 group-hover:scale-105'
							/>

							{/* Movie Title and Description */}
							<div className='p-3 absolute bottom-0 left-0 bg-black/40 w-full'>
								<span className='text-lg font-semibold text-white flex items-center justify-center'>
									<span className='mr-2'>{movie?.name}</span>
								</span>
							</div>
						</Link>
					))}
				</ul>
				{!loading && !movies.length && <p>Không tìm thấy phim nào.</p>}
			</div>
		</div>
	);
}
