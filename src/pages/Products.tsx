import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const navigate = useNavigate();

  const productList = [
    { id: 1, name: 'Laptop', image: '/images/laptop.jpg', description: 'High-performance laptop' },
    { id: 2, name: 'Camera', image: '/images/camera.jpg', description: 'DSLR camera' },
    { id: 3, name: 'Smartphone', image: '/images/smartphone.jpg', description: 'Latest smartphone' },
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {productList.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Button size="small" onClick={() => navigate(`/products/${product.id}`)}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
