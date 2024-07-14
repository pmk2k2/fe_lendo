import React from 'react';
import { Typography, Box } from '@mui/material';

const Help: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Help
      </Typography>
      <Typography variant="body1">
        Need help? Check out our FAQ section or contact our support team for assistance.
      </Typography>
    </Box>
  );
};

export default Help;
