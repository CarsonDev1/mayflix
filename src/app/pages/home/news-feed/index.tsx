import React, { useMemo } from 'react';
import Image from 'next/image';

const NewsFeed = () => {
    const latestNews = useMemo(() => [
        { id: 1, title: 'Bắc Bộ và Trung Bộ tiếp tục nắng nóng gay gắt', image: 'https://images.unsplash.com/photo-1598965914211-69e109f7a873' },
        { id: 2, title: 'Việt Nam đăng cai tổ chức Hội nghị Du lịch toàn cầu 2023', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6' },
        { id: 3, title: 'Giá vàng hôm nay biến động nhẹ', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d' },
        { id: 4, title: 'U23 Việt Nam sẵn sàng cho trận ra quân tại SEA Games 32', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55' },
        { id: 5, title: 'Khám phá ẩm thực đường phố Hà Nội', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828' },
        { id: 6, title: 'Công nghệ AI đang thay đổi ngành y tế như thế nào?', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d' },
        { id: 7, title: 'Xu hướng thời trang bền vững đang phát triển tại Việt Nam', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
        { id: 8, title: 'Nghiên cứu mới về biến đổi khí hậu tại Đồng bằng sông Cửu Long', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' },
        { id: 9, title: 'Khai mạc Liên hoan Phim Quốc tế Hà Nội lần thứ VI', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26' },
        { id: 10, title: 'Phát triển nông nghiệp thông minh tại Tây Nguyên', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef' },
        { id: 11, title: 'Triển lãm công nghệ 5G và ứng dụng tại Việt Nam', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' },
        { id: 12, title: 'Đề xuất mới về cải cách giáo dục đại học', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1' },
    ], []);

    return (
        <div className="container mx-auto py-8">
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-red-600 pb-2">Tin mới nhất</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {latestNews.map((news) => (
                        <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                            <Image
                                src={news.image}
                                alt={news.title}
                                className="w-full h-48 object-cover"
                                width={500}
                                height={200}
                                priority
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                                <p className="text-gray-600 mb-3 text-sm line-clamp-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <a href="#" className="text-red-600 hover:text-red-800 transition duration-300 font-semibold text-sm inline-flex items-center">
                                    Đọc thêm
                                    <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NewsFeed;