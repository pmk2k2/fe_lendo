import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProductCard from "../ProductCard.tsx";

// Dummy product data
const productData = {
    newArrivals: [
        { id: 1, name: "Laptop", price: "$1000", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Smartphone", price: "$800", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Tablet", price: "$600", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Headphones", price: "$200", image: "https://via.placeholder.com/150" },
        { id: 5, name: "Smartwatch", price: "$250", image: "https://via.placeholder.com/150" },
        { id: 6, name: "Camera", price: "$700", image: "https://via.placeholder.com/150" },
        { id: 7, name: "Gaming Console", price: "$500", image: "https://via.placeholder.com/150" },
        { id: 8, name: "Drone", price: "$900", image: "https://via.placeholder.com/150" }
    ],
    bestsellers: [
        { id: 9, name: "Wireless Earbuds", price: "$150", image: "https://via.placeholder.com/150" },
        { id: 10, name: "Laptop Stand", price: "$50", image: "https://via.placeholder.com/150" },
        { id: 11, name: "Bluetooth Speaker", price: "$120", image: "https://via.placeholder.com/150" },
        { id: 12, name: "Portable Charger", price: "$80", image: "https://via.placeholder.com/150" },
        { id: 13, name: "Monitor", price: "$350", image: "https://via.placeholder.com/150" },
        { id: 14, name: "Webcam", price: "$100", image: "https://via.placeholder.com/150" },
        { id: 15, name: "Mechanical Keyboard", price: "$110", image: "https://via.placeholder.com/150" },
        { id: 16, name: "Mouse", price: "$40", image: "https://via.placeholder.com/150" }
    ],
    featured: [
        { id: 17, name: "VR Headset", price: "$500", image: "https://via.placeholder.com/150" },
        { id: 18, name: "Smart TV", price: "$1200", image: "https://via.placeholder.com/150" },
        { id: 19, name: "Fitness Tracker", price: "$180", image: "https://via.placeholder.com/150" },
        { id: 20, name: "E-Reader", price: "$250", image: "https://via.placeholder.com/150" },
        { id: 21, name: "Action Camera", price: "$400", image: "https://via.placeholder.com/150" },
        { id: 22, name: "Soundbar", price: "$300", image: "https://via.placeholder.com/150" },
        { id: 23, name: "Projector", price: "$600", image: "https://via.placeholder.com/150" },
        { id: 24, name: "Home Assistant", price: "$100", image: "https://via.placeholder.com/150" }
    ]
};

const ProductGrid: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const getProducts = () => {
        if (selectedTab === 0) return productData.newArrivals.slice(0, 8); // Limit to 8 products
        if (selectedTab === 1) return productData.bestsellers.slice(0, 8); // Limit to 8 products
        if (selectedTab === 2) return productData.featured.slice(0, 8); // Limit to 8 products
    };

    const products = getProducts();

    return (
        <div className="p-6">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="product tabs">
                    <Tab label="New Arrival" />
                    <Tab label="Bestseller" />
                    <Tab label="Featured Products" />
                </Tabs>
            </Box>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
