/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import BannerSlide from '@/app/pages/home/banner-slide';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/api/movies/routes';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { MovieCarousel } from '@/app/components/movie-carousel';
import { movies } from '@/data/movie';
import { MovieCard } from '@/app/components/movie-card';
import { getAnimes } from '@/api/movies/anime/getAnime';

const HomePage = () => {
	const [page, setPage] = useState<number>(1);
	const [allMovies, setAllMovies] = useState<any[]>([]);

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['movies', page],
		queryFn: () => getMovies(page),
	});

	const { data: moviesAnime } = useQuery({
		queryKey: ['movieAnime', page],
		queryFn: () => getAnimes(page),
	});

	const movieAnimeData = moviesAnime?.data?.items;

	console.log('movieAnimeData', movieAnimeData);

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

		if (moviesData && moviesData.items.length > 0 && page < 1) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [moviesData, page]);

	if (isError) {
		return <div>Error fetching movies.</div>;
	}

	return (
		<div className='h-full lg:min-h-screen bg-black font-sans'>
			{isLoading ? (
				<div className='flex justify-center items-center h-[60dvh]'>
					<div className='animate-spin border-t-4 border-red-500 border-solid w-16 h-16 rounded-full'></div>
				</div>
			) : (
				<BannerSlide movieDetails={movieDetails} />
			)}
			<div className='container'>
				<div className='grid grid-cols-5'>
					{movieAnimeData?.map((movie: any) => (
						<div key={movie?.id}>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>
			</div>
			{/* <MovieCarousel movies={movies} /> */}

			{/* <main className='container'>
				<MostMovie movieDetails={movieDetails} />
				<MovieSeries movieDetails={movieDetails} />
				<MovieSingle movieDetails={movieDetails} />
			</main> */}
		</div>
	);
};

export default HomePage;
