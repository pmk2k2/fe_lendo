import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByBrand, fetchProductsByCategory } from '../api/products/products.api.ts';
import {Product} from "../api/products/products.types.ts";


const ProductsPage: React.FC = () => {
    const { brandName, categoryName } = useParams<{ brandName?: string; categoryName?: string }>();

    // Determine the query function based on the URL parameters
    const fetchProducts = () => {
        if (brandName) {
            return fetchProductsByBrand(brandName);
        } else if (categoryName) {
            return fetchProductsByCategory(categoryName);
        } else {
            return fetchProducts(); // Fetch all products if no filters are applied
        }
    };

    const { data: products, error, isLoading } = useQuery<Product[]>({
        queryKey: ['products', brandName || categoryName], // Key based on brand or category
        queryFn: fetchProducts,
    });

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products: {(error as Error).message}</div>;

    // Render the products
    return (
        <div>
            <h1>{brandName ? `Products by ${brandName}` : categoryName ? `Products in ${categoryName}` : 'All Products'}</h1>
            <ul>
                {products?.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
