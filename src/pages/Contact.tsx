import React from 'react';
import { Typography, Box } from '@mui/material';

const Contact: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        Have any questions? Feel free to reach out to us via email at support@electronicsrental.com or call us at (123) 456-7890.
      </Typography>
    </Box>
  );
};

export default Contact;
