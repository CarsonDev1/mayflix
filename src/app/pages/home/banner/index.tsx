import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const mainNews = [
	{
		id: 1,
		title: 'Thủ tướng Phạm Minh Chính tiếp Bộ trưởng Ngoại giao Singapore',
		image: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5',
		category: 'Chính trị',
	},
	{
		id: 2,
		title: 'Việt Nam - Singapore: Đối tác chiến lược, hợp tác toàn diện',
		image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
		category: 'Đối ngoại',
	},
	{
		id: 3,
		title: 'Bộ Công an đề xuất cấp hộ chiếu gắn chip điện tử từ tháng 7/2023',
		image: 'https://images.unsplash.com/photo-1618944847828-82e943c3bdb7',
		category: 'Xã hội',
	},
	{
		id: 4,
		title: 'Đẩy mạnh hợp tác kinh tế Việt Nam - Hoa Kỳ',
		image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa',
		category: 'Kinh tế',
	},
	{
		id: 5,
		title: 'Phát triển năng lượng tái tạo: Cơ hội và thách thức',
		image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
		category: 'Môi trường',
	},
	{
		id: 6,
		title: 'Kỷ niệm 50 năm quan hệ ngoại giao Việt Nam - Nhật Bản',
		image: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
		category: 'Ngoại giao',
	},
];

const Banner = () => (
	<section className='mb-12'>
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={30}
			slidesPerView={3}
			navigation
			pagination={{ clickable: true }}
			autoplay={{ delay: 5000 }}
			loop={true}
			className='rounded-xl overflow-hidden shadow-2xl'
		>
			{mainNews.map((news) => (
				<SwiperSlide key={news.id}>
					<div className='relative'>
						<img src={news.image} alt={news.title} className='w-full h-[300px] object-cover' />{' '}
						{/* Adjusted height for responsiveness */}
						<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4'>
							{' '}
							{/* Adjusted padding for responsiveness */}
							<span className='inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2'>
								{news.category}
							</span>
							<h3 className='text-xl font-bold mb-1 text-white leading-tight'>{news.title}</h3>{' '}
							{/* Adjusted font size for responsiveness */}
							<a
								href='#'
								className='text-white hover:text-red-300 transition duration-300 inline-flex items-center'
							>
								Đọc thêm
								<svg
									className='w-4 h-4 ml-2'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M5 12h14'></path>
									<path d='M12 5l7 7-7 7'></path>
								</svg>
							</a>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	</section>
);

export default Banner;
