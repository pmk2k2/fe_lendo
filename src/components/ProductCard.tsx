import React from "react";

interface ProductCardProps {
    id: number;
    name: string;
    price: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <img
                src={image}
                alt={name}
                className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-gray-600">{price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
