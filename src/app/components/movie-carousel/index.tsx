'use client';

import { MovieCard } from '@/app/components/movie-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Movie } from '@/data/movie';

interface MovieCarouselProps {
	movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
	return (
		<Carousel
			opts={{
				align: 'start',
				loop: true,
			}}
			className='w-full max-w-5xl mx-auto'
		>
			<CarouselContent>
				{movies.map((movie) => (
					<CarouselItem key={movie.id} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
						<MovieCard movie={movie} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
