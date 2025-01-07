'use client';

import { getMovieSlug } from '@/api/movies/[slug]/route';
import { getMovies } from '@/api/movies/routes';
import EpisodeSelector from '@/app/components/espisode';
import { useQuery } from '@tanstack/react-query';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

const Watch = () => {
	const searchParams = useSearchParams();
	const episode = searchParams.get('episode');
	const link = searchParams.get('link');

	const params = useParams() as unknown as Params;
	const { slug } = params;

	const { data: moviesDataSlug } = useQuery({
		queryKey: ['moviesDetail', slug],
		queryFn: () => getMovieSlug(slug),
	});

	const {
		data: moviesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['movies', 1],
		queryFn: () => getMovies(1),
	});

	const items = moviesData?.items?.slice(0, 10);

	console.log('items: ', items);

	return (
		<div className='w-full sec-com bg-black text-white'>
			<div className='container'>
				<div className='w-full flex gap-16'>
					<div className='w-3/4 flex flex-col gap-6'>
						<iframe
							src={link || ''}
							title={`Episode ${episode}`}
							className='w-full h-[30rem] border-none'
							allowFullScreen
						></iframe>
						<EpisodeSelector moviesData={moviesDataSlug} />
					</div>
					<div className='flex flex-col gap-2 w-[25%]'>
						<h2 className='uppercase text-xl'>Có thể bạn muốn xem</h2>
						{items?.map((movie: any) => (
							<Link href={`/product-list/${movie?.slug}`} passHref key={movie?.id}>
								<div className='flex gap-3 text-white'>
									<Image
										src={`https://img.ophim.live/uploads/movies/${movie?.thumb_url}`}
										alt='thumb_movie'
										width={500}
										height={500}
										className='object-cover w-1/3 h-28 border rounded-sm'
									/>
									<div className='flex flex-col gap-3'>
										<h3 className='text-sm'>{movie?.name}</h3>
										<p className='text-xs'>{movie?.origin_name}</p>
										<p className='text-xs'>{movie?.year}</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Watch;
