import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MovieCard({ movie }: any) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<div>
					<Button variant='link'>{movie?.name}</Button>
					<Image src={`https://phimimg.com/${movie?.thumb_url}`} width={500} height={500} alt={movie?.name} />
				</div>
			</HoverCardTrigger>
			<HoverCardContent
				className='w-[400px] h-[300px] bg-white shadow-lg p-4 rounded-md'
				style={{
					position: 'absolute',
					top: '-250px',
					right: '-180px',
					zIndex: 10,
					transform: 'translateY(8px)',
				}}
			>
				<div className='flex justify-between space-x-4'>
					<Avatar>
						<AvatarImage src='https://github.com/vercel.png' />
						<AvatarFallback>VC</AvatarFallback>
					</Avatar>
					<div className='space-y-1'>
						<h4 className='text-sm font-semibold'>@nextjs</h4>
						<p className='text-sm'>The React Framework – created and maintained by @vercel.</p>
						<div className='flex items-center pt-2'>
							<CalendarIcon className='mr-2 h-4 w-4 opacity-70' />
							<span className='text-xs text-muted-foreground'>Joined December 2021</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
