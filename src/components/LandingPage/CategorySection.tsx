import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Category {
    icon: string;
    name: string;
}

const Categories: React.FC = () => {
    const [categories] = useState<Category[]>([
        { icon: 'src/assets/img.png', name: 'Phones' },
        { icon: '/src/assets/img_1.png', name: 'Computers' },
        { icon: '', name: 'Tablets' },
        { icon: '', name: 'Cameras' },
        { icon: '', name: 'Headphones' },
        { icon: '', name: 'Smartwatches' },
        { icon: '', name: 'Speakers' },
        { icon: '', name: 'Game Consoles' },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const defaultIcon = 'src/assets/default.png'; // Path to the default icon

    const handleNextPage = () => {
        if (startIndex + itemsPerPage < categories.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleCategoryClick = (categoryName: string) => {
        // Navigate to the products page with the category name as a route parameter
        navigate(`/products/${categoryName}`);
    };

    const startIndex = currentPage * itemsPerPage;
    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-4 py-8 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Explore our categories</h4>
                <div className="flex space-x-2">
                    <button
                        className={`border border-gray-400 rounded px-1 py-1 text-sm ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                    >
                        <KeyboardArrowLeftIcon/>
                    </button>
                    <button
                        className={`border border-gray-400 rounded px-1 py-1 text-sm ${startIndex + itemsPerPage >= categories.length ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={handleNextPage}
                        disabled={startIndex + itemsPerPage >= categories.length}
                    >
                        <KeyboardArrowRightIcon/>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {visibleCategories.map((category, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center bg-gray-100 rounded-xl p-6 cursor-pointer"
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        <img
                            src={category.icon || defaultIcon}
                            alt={category.name}
                            className="w-10 h-10 object-contain mb-2"
                        />
                        <span className="text-sm">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
