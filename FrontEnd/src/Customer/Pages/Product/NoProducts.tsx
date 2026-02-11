import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NoProducts = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width:"full",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
        gap: 3,
        // backgroundColor: '#f9f9f9',
        padding: 4,
      }}
    >
      <Typography variant="h4" color="textPrimary" gutterBottom>
        No Products Available
      </Typography>
      <Typography variant="body1" color="textSecondary">
        We're sorry, but there are no products available in this category at the moment.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ textTransform: 'capitalize' }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NoProducts;
