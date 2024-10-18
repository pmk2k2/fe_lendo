import axios from 'axios';
import {Product} from "./products.types.ts";


const API_URL = 'api endpoint';

export const fetchProductsByBrand = async (brand: string): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${API_URL}/products?brand=${brand}`);
    return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${API_URL}/products?category=${category}`);
    return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
};

// If you need a specific product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    return response.data;
};
