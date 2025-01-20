import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { getSeries } from '@/api/movies/series/getSeries';
import { getAnimes } from '@/api/movies/anime/getAnime';

const MovieSeries: React.FC = () => {
	const [page, setPage] = useState<number>(1);

	const { data: moviesAnime } = useQuery({
		queryKey: ['movieAnime', page],
		queryFn: () => getAnimes(page),
	});

	const series = moviesAnime?.data?.items;

	return (
		<section className='sec-com'>
			<div className='flex justify-between items-center'>
				<h2 className='text-3xl font-bold mb-6 text-white border-b-2 border-red-600 pb-2'>
					Phim hoạt hình hay nhất
				</h2>
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
			<button className='cursor-pointer transistion-all duration-500 hover:shadow-[0_15px_50px_-15px_#da132e] p-[12px] rounded-[24px] flex gap-4 bg-gradient-to-r from-[#c52847] to-[#da1327]'>
				<svg className='h-12 w-12 bg-[#0a0a0a] shadow-xl rounded-full p-3' viewBox='0 0 24 24' fill='none'>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M15.003 14H3.5v-4h11.502l-4.165-4.538 2.705-2.947 7.353 8.012c.747.813.747 2.133 0 2.947l-7.353 8.011-2.705-2.947L15.003 14z'
						fill='#F0F0F0'
					></path>
				</svg>
				<span className='text-[1.9rem] font-bold text-white pr-3'>Play Now</span>
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

export default MovieSeries;
