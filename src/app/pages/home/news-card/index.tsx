interface NewsCardProps {
    title: string;
    image: string;
    category: string;
    isLarge?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, image, category, isLarge = false }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isLarge ? 'col-span-2 row-span-2' : ''}`}>
        <img src={image} alt={title} className={`w-full ${isLarge ? 'h-96' : 'h-48'} object-cover`} />
        <div className="p-4">
            <span className="text-sm text-red-600 font-semibold">{category}</span>
            <h2 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold mt-2 mb-4`}>{title}</h2>
            <a href="#" className="text-red-600 hover:underline">Read more</a>
        </div>
    </div>
);

export default NewsCard;