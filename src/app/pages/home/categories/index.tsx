import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { getOdd } from '@/api/movies/odd/getOdd';
import { Play } from 'lucide-react';

const MostMovie: React.FC = () => {
	const [page, setPage] = useState<number>(1);

	const { data: movieMost } = useQuery({
		queryKey: ['movieMost', page],
		queryFn: () => getOdd(page),
	});

	const series = movieMost?.data?.items;

	return (
		<section className='sec-com'>
			<div className='flex justify-between items-center'>
				<h2 className='text-3xl font-bold mb-6 text-white border-b-2 border-red-600 pb-2'>Phim lẻ hot nhất</h2>
				<Link href='/series-list'>
					<span className='text-red-500'>Xem tất cả</span>
				</Link>
			</div>

			<div className='hidden xl:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
				{series?.map((movie: any) => (
					<MovieCard key={movie?._id} movie={movie} />
				))}
			</div>
			<div className='flex xl:hidden'>
				<Swiper
					spaceBetween={16}
					slidesPerView={2}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 3 },
						1024: { slidesPerView: 4 },
					}}
				>
					{series?.map((movie: any) => (
						<SwiperSlide key={movie.movie?._id}>
							<MovieCard movie={movie.movie} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

// MovieCard Component
const MovieCard: React.FC<{ movie: any }> = ({ movie }) => (
	<Link
		href={`/product-list/${movie?.slug}`}
		className='border border-slate-800 rounded-lg text-center shadow-md hover:shadow-lg transition duration-300 transform hover:border-red-500 group flex flex-col justify-between relative h-56 overflow-hidden'
	>
		<span className='px-2 py-1 text-white text-xs sm:text-sm md:text-base bg-red-600 rounded-sm w-fit relative z-10'>
			{movie?.episode_total > 0 ? `${movie?.episode_total.replace('Tập', '')} Tập` : 'Đang cập nhật'}
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
);

export default MostMovie;
