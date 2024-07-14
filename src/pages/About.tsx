import React from 'react';
import { Typography, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Welcome to Electronics Rental, your number one source for renting the latest electronics. We're dedicated to giving you the very best of electronic gadgets, with a focus on quality, customer service, and affordability.
      </Typography>
    </Box>
  );
};

export default About;
