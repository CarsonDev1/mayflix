interface CategoryBarProps {
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, activeCategory, setActiveCategory }) => (
    <div className="bg-gray-200 py-4">
        <div className="container mx-auto flex justify-center space-x-6">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-gray-700 hover:text-red-600 transition duration-300 ${activeCategory === category ? 'font-bold text-red-600' : ''}`}
                >
                    {category}
                </button>
            ))}
        </div>
    </div>
);

export default CategoryBar;