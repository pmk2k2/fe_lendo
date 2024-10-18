// src/components/Brands.tsx
import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom'; // Import Link for navigation

interface Category {
    icon: string;
    name: string;
}

const Brands: React.FC = () => {
    const [categories] = useState<Category[]>([
        { icon: 'src/assets/img.png', name: 'Apple' },
        { icon: '/src/assets/img_1.png', name: 'Samsung' },
        { icon: '', name: 'Asus' },
        { icon: '', name: 'Dell' },
        { icon: '', name: 'LG' },
        { icon: '', name: 'Canon' },
        { icon: '', name: 'Xiaomi' },
        { icon: '', name: 'Huawei' },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const startIndex = currentPage * itemsPerPage;
    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-4 py-8 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Brands</h4>
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
                    <Link to={`/products/brand/${category.name}`} key={index} className="flex flex-col items-center text-center bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition duration-300">
                        <img src={category.icon} alt={category.name} className="w-10 h-10 object-contain mb-2" />
                        <span className="text-sm">{category.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Brands;
