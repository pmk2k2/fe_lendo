
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const product = {
    id,
    name: 'Laptop',
    image: '/images/laptop.jpg',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
    price: '$20/day',
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <Typography variant="body1" gutterBottom>{product.description}</Typography>
      <Typography variant="h6" color="primary">{product.price}</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Rent Now</Button>
    </Box>
  );
};

export default ProductDetail;
