import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function EpisodeSelector({ moviesData }: any) {
	const searchParams = useSearchParams();
	const currentEpisode = searchParams.get('episode');

	const dataEpisodes = moviesData?.episodes?.[0];

	return (
		<div className='sec-com'>
			<div className='mx-auto space-y-4'>
				<Accordion type='single' defaultValue='item-1' collapsible className='!border-none'>
					<AccordionItem value='item-1' className='!border-none'>
						<AccordionTrigger className='justify-start items-center gap-3 text-white'>
							<div className='flex items-center gap-2 text-white'>
								<svg viewBox='0 0 24 24' className='w-5 h-5' fill='currentColor'>
									<path d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' />
								</svg>
								<span className='font-medium'>Danh sách tập</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className='!border-none'>
							<div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 mt-4'>
								{dataEpisodes?.server_data?.map((ep: any, index: number) => {
									const isActive = currentEpisode === ep.slug;
									return (
										<Link
											href={{
												pathname: `/product-list/${moviesData?.movie?.slug}/watch`,
												query: { episode: ep.slug, link: ep.link_embed },
											}}
											key={index}
										>
											<button
												className={`w-full aspect-[3/1] flex items-center justify-center rounded bg-gradient-to-b ${
													isActive
														? 'bg-red-600 text-white'
														: 'from-[#1A1F2E] to-[#1A1F2E] text-gray-300 hover:text-white'
												} border border-[#2A3041] transition-colors duration-200 text-sm`}
											>
												{ep?.slug ? ep.slug.toString().padStart(2, '0') : 'Đang cập nhật'}
											</button>
										</Link>
									);
								})}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
