import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaList, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const BannerSlide = ({ movieDetails }: any) => {
	const [itemActive, setItemActive] = useState<number>(0);

	const items = movieDetails?.slice(0, 5);

	const countItem = items?.length;

	const next = () => {
		setItemActive((prev) => (prev + 1) % countItem);
	};

	const prev = () => {
		setItemActive((prev) => (prev - 1 + countItem) % countItem);
	};

	const showSlider = (index: number) => {
		setItemActive(index);
	};

	useEffect(() => {
		if (movieDetails) {
			const interval = setInterval(() => {
				next();
			}, 5000);

			return () => clearInterval(interval);
		}
	}, [itemActive, movieDetails, next]);

	return (
		<div>
			<div className='bg-black text-white'>
				{/* Slider */}
				<div className='relative h-[50vh] sm:h-dvh'>
					{/* Main Slider */}
					<div className='absolute inset-0'>
						{items?.map((item: any, index: number) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-500 ${
									index === itemActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
								}`}
							>
								<Image
									src={item?.movie?.thumb_url}
									alt={`Slide ${index + 1}`}
									className='w-full object-cover'
									fill
									quality={100}
								/>
								<div className='absolute inset-0 bg-black/30 w-full h-full rounded-md'></div>
								<div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
								<div className='absolute top-1/4 left-4 sm:left-10 md:left-20 lg:left-32 z-10 flex flex-col justify-between h-72'>
									<span className='px-3 py-1 text-sm sm:text-base md:text-xl bg-red-600 rounded-md w-fit'>
										{item?.movie?.episode_total > 0
											? `${item?.movie?.episode_total?.replace('Tập', '')} Tập`
											: 'Đang cập nhật'}
									</span>
									<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-6 md:leading-10'>
										{item?.movie?.name}{' '}
									</h2>
									<p
										className='w-full sm:w-3/4 lg:w-2/3 line-clamp-3 text-sm sm:text-base md:text-lg'
										dangerouslySetInnerHTML={{ __html: item?.movie?.content }}
									/>
									<div className='flex items-center gap-5'>
										{item?.movie?.tmdb.vote_average > 0 && (
											<p className='flex items-center space-x-1 text-sm sm:text-base px-3 py-1 bg-yellow-300/20 w-fit rounded-sm'>
												<FaStar className='text-yellow-500' />
												<span>{item?.movie?.tmdb.vote_average?.toFixed(1)}</span>
											</p>
										)}
									</div>
									<div className='flex space-x-4 mt-4'>
										<Link href={`/product-list/${item?.movie?.slug}`} passHref>
											<button className='flex gap-2 sm:gap-3 items-center bg-white text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded'>
												<FaPlay />
												<span>Play</span>
											</button>
										</Link>
										<button className='flex gap-2 sm:gap-3 items-center bg-white/20 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded'>
											<FaList /> My List
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Arrow Buttons */}
					<div className='absolute top-1/4 right-2 sm:right-10 md:right-14 lg:right-20 z-20 flex space-x-2 sm:space-x-4'>
						<button
							onClick={prev}
							className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 hover:bg-gray-300 text-white font-bold rounded-lg'
						>
							{'<'}
						</button>
						<button
							onClick={next}
							className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 hover:bg-gray-300 text-white font-bold rounded-lg'
						>
							{'>'}
						</button>
					</div>

					{/* Thumbnails */}
					<div className='absolute hidden sm:block bottom-20 sm:bottom-28 w-full px-4 sm:px-8 z-10'>
						<div className='block xl:hidden'>
							<Swiper
								spaceBetween={16}
								slidesPerView='auto'
								onSlideChange={(swiper) => setItemActive(swiper.activeIndex)}
								initialSlide={itemActive}
							>
								{items?.map((item: any, index: number) => (
									<SwiperSlide
										key={index}
										className={`cursor-pointer relative w-36 h-20 sm:!w-72 sm:!h-40 ${
											index === itemActive ? 'brightness-150' : 'brightness-50'
										}`}
										onClick={() => showSlider(index)}
									>
										<div className='absolute inset-0 bg-black/50 w-full h-full rounded-md'></div>
										<span className='absolute top-1 left-1 px-2 py-1 text-xs sm:text-sm bg-red-600 text-white rounded-md'>
											Nổi bật
										</span>
										<span className='absolute bottom-1 left-1/2 text-xs sm:text-sm text-white -translate-x-1/2 text-center'>
											{item?.movie?.name}
										</span>
										<Image
											src={item?.movie?.poster_url}
											alt={`Thumbnail ${index + 1}`}
											className='w-full h-full object-contain rounded-lg'
											width={600}
											height={600}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						{/* Regular thumbnails for xl and larger screens */}
						<div className='hidden xl:flex justify-center space-x-2 sm:space-x-4 overflow-auto'>
							{items?.map((item: any, index: number) => (
								<div
									key={index}
									onClick={() => showSlider(index)}
									className={`cursor-pointer flex-shrink-0 w-36 h-20 sm:w-72 sm:h-40 relative transition-all duration-500 ${
										index === itemActive ? 'brightness-150' : 'brightness-50'
									}`}
								>
									<div className='absolute inset-0 bg-black/50 w-full h-full rounded-md'></div>
									<span className='absolute top-1 left-1 px-2 py-1 text-xs sm:text-sm bg-red-600 text-white rounded-md'>
										Nổi bật
									</span>
									<span className='absolute bottom-1 left-1/2 text-xs sm:text-sm text-white -translate-x-1/2 text-center'>
										{item?.movie?.name}
									</span>
									<Image
										src={item?.movie?.thumb_url}
										alt={`Thumbnail ${index + 1}`}
										className='w-full h-full object-cover rounded-lg'
										width={600}
										height={600}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerSlide;
