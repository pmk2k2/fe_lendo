import React from 'react';

interface RentalCardProps {
    title: string;
    price: string;
    imageSrc: string;
    status?: string;
    views?: number;
    likes?: number;
}

const RentalCard: React.FC<RentalCardProps> = ({ title, price, imageSrc, status, views, likes }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex">
            <img src={imageSrc} alt={title} className="h-24 w-24 object-cover rounded-md" />
            <div className="ml-4 flex-grow">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-500">{price}</p>
                {status && <p className="text-sm text-gray-400">{status}</p>}
            </div>
            <div className="flex flex-col items-end">
                {views !== undefined && (
                    <p className="text-sm text-gray-400">{views} views</p>
                )}
                {likes !== undefined && (
                    <p className="text-sm text-gray-400">{likes} likes</p>
                )}
            </div>
        </div>
    );
}

export default RentalCard;
