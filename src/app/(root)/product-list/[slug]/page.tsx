/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { getMovieSlug } from '@/api/movies/[slug]/route';
import EpisodeSelector from '@/app/components/espisode';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import PlayButton from '@/app/components/play-button';

interface Params {
	slug: string;
}

const ProductDetail = () => {
	const params = useParams() as unknown as Params;
	const { slug } = params;

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['moviesDetail', slug],
		queryFn: () => getMovieSlug(slug),
	});

	const dataEpisodes = moviesData?.episodes?.[0]?.server_data?.[0];

	return (
		<div className='bg-black sec-com'>
			<div className='container'>
				<div className='w-full h-[600px] relative'>
					<Image
						src={moviesData?.movie?.poster_url}
						alt='thumb_movie'
						width={1820}
						height={1200}
						className='object-cover w-full h-full rounded-sm'
					/>
					<div className='absolute w-full h-full inset-0 bg-black/50 bg-opacity-25'></div>
					<div className='absolute left-3 bottom-3 w-full flex items-center gap-12'>
						<Image
							src={moviesData?.movie?.poster_url}
							alt='thumb_movie'
							width={500}
							height={500}
							className='object-cover w-1/4 h-56 border rounded-sm'
						/>
						<div className='flex flex-col gap-3 text-white'>
							<h2 className='text-5xl'>{moviesData?.movie?.name}</h2>
							<p
								className='w-[90%] line-clamp-3 text-sm sm:text-base md:text-lg'
								dangerouslySetInnerHTML={{ __html: moviesData?.movie?.content }}
							/>
							<span>{moviesData?.movie?.origin_name}</span>
							<Link
								href={{
									pathname: `/product-list/${moviesData?.movie?.slug}/watch`,
									query: { episode: dataEpisodes?.name, link: dataEpisodes?.link_embed },
								}}
							>
								<Button className='w-fit'>Xem Phim</Button>
							</Link>
						</div>
					</div>
				</div>
				<EpisodeSelector moviesData={moviesData} />
				<div className='flex flex-col gap-1 text-white'>
					<h2 className='text-xl text-white mb-2'>Thông Tin Phim</h2>
					<div className='flex flex-col gap-3'>
						<p className='text-sm sm:text-base'>
							Ngày phát hành:{' '}
							{moviesData?.movie?.created?.time
								? format(new Date(moviesData.movie.created.time), 'dd/MM/yyyy', { locale: vi })
								: 'Đang cập nhật'}
						</p>
						<p className='text-sm sm:text-base'>
							Đạo diễn:{' '}
							{moviesData?.movie?.director?.map((director: any) => director).join(', ') ||
								'Đang cập nhật'}
						</p>
						<p className='text-sm sm:text-base'>
							Diễn viên:{' '}
							{moviesData?.movie?.actor?.map((actor: any) => actor).join(', ') || 'Đang cập nhật'}
						</p>
						<p className='text-sm sm:text-base'>
							Thể loại: {moviesData?.movie?.category?.map((category: any) => category?.name).join(', ')}
						</p>
						<p className='text-sm sm:text-base'>
							Quốc gia: {moviesData?.movie?.country?.map((country: any) => country.name).join(', ')}
						</p>
						<div className='flex flex-col gap-2'>
							<span className='text-white'>Tóm tắt phim:</span>
							<p
								className='w-full text-sm sm:text-base'
								dangerouslySetInnerHTML={{ __html: moviesData?.movie?.content }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
