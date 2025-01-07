/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import { getMovies } from '@/api/movies/routes';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';

const SeriesList = () => {
	const [page, setPage] = useState<number>(1);
	const [allMovies, setAllMovies] = useState<any[]>([]);

	const {
		data: moviesData,
		isLoading,
		isFetching,
		isError,
	} = useQuery({
		queryKey: ['movies', page],
		queryFn: () => getMovies(page),
		staleTime: 1000 * 60 * 5,
	});

	const movieSlugs = allMovies?.map((movie: any) => movie.slug) || [];
	const { data: movieDetails } = useQuery({
		queryKey: ['movieDetails', movieSlugs],
		queryFn: async () => {
			const movieDetailsPromises = movieSlugs.map((slug: any) => getMovieSlug(slug));
			return Promise.all(movieDetailsPromises);
		},
		enabled: movieSlugs.length > 0,
	});

	useEffect(() => {
		if (moviesData?.items?.length) {
			setAllMovies((prevMovies) => {
				const newMovies = moviesData.items;
				const uniqueMovies = [
					...prevMovies,
					...newMovies.filter(
						(movie: any) => !prevMovies.some((existingMovie: any) => existingMovie.slug === movie.slug)
					),
				];
				return uniqueMovies;
			});
		}
	}, [moviesData]);

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	if (isError) {
		return <div>Error fetching movies.</div>;
	}

	const filteredMovieDetails = movieDetails?.filter((movie: any) => movie.movie?.type === 'series') || [];

	return (
		<div className='bg-black h-full'>
			<div className='container'>
				<section className='sec-com'>
					<h2 className='text-3xl font-bold mb-6 text-white border-b-2 border-red-600 pb-2'>
						Phim bộ hay nhất
					</h2>

					<div className='hidden xl:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
						{isLoading || isFetching
							? Array.from({ length: 10 }).map((_, index) => (
									<div key={index} className='animate-pulse bg-gray-800 rounded-lg h-56'></div>
							  ))
							: filteredMovieDetails?.map((movie: any) => (
									<MovieCard key={movie.movie?._id} movie={movie.movie} />
							  ))}
					</div>

					{/* Swiper for smaller screens */}
					<div className='flex xl:hidden'>
						{isLoading || isFetching ? (
							<div className='w-full flex space-x-4'>
								{Array.from({ length: 5 }).map((_, index) => (
									<div key={index} className='animate-pulse bg-gray-800 rounded-lg h-56 w-40'></div>
								))}
							</div>
						) : (
							<Swiper
								spaceBetween={16}
								slidesPerView={2}
								breakpoints={{
									640: { slidesPerView: 1 },
									768: { slidesPerView: 3 },
									1024: { slidesPerView: 4 },
								}}
							>
								{filteredMovieDetails?.map((movie: any) => (
									<SwiperSlide key={movie.movie?._id}>
										<MovieCard movie={movie.movie} />
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</div>

					{/* Load More Button */}
					{!isLoading && !isFetching && moviesData?.items?.length > 0 && (
						<button
							className='load-more-btn mt-6 p-2 bg-blue-500 text-white rounded'
							onClick={handleLoadMore}
							disabled={isFetching} // Disable the button if fetching is in progress
						>
							{isFetching ? 'Loading...' : 'Load More'}
						</button>
					)}
				</section>
			</div>
		</div>
	);
};

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
			<button className='cursor-pointer'>
				<div className='w-[83px] h-[83px] bg-red-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center'>
					<div className='absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]' />
					<label className='group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-red-600 to-red-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_2px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center'>
						<div className='w-8 group-active:w-[31px] fill-red-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]'>
							<svg xmlns='http://www.w3.org/2000/svg' id='Filled' viewBox='0 0 24 24'>
								<path d='M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z' />
							</svg>
						</div>
					</label>
				</div>
			</button>
		</div>

		{/* Movie Image */}
		<Image
			src={movie?.poster_url}
			width={500}
			height={500}
			alt='movie image'
			className='rounded-lg object-cover absolute w-full h-full transform transition-transform duration-300 group-hover:scale-105'
		/>

		{/* Movie Title and Description */}
		<div className='p-3 absolute bottom-0 left-0 bg-black bg-opacity-50 w-full text-white'>
			<p className='text-lg font-semibold'>{movie?.name}</p>
			<p className='text-sm'>{movie?.genres?.join(' | ')}</p>
		</div>
	</Link>
);

export default SeriesList;
