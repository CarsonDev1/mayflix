import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface MovieCardProps {
	movie: {
		name: string;
		thumb_url: string;
		description?: string;
	};
}

export function MovieCard({ movie }: MovieCardProps) {
	return (
		<Card className='w-full max-w-sm mx-auto border-none'>
			<CardHeader className='p-0'>
				<div className='relative aspect-[16/9] w-full overflow-hidden rounded-t-lg'>
					<Image
						src={`https://phimimg.com/${movie.thumb_url}`}
						alt={movie.name}
						fill
						className='object-cover'
					/>
				</div>
			</CardHeader>
		</Card>
	);
}
