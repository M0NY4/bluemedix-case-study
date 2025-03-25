import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { AppContext } from '../context/AppContext';
import { Box, Typography } from '@mui/material';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useContext(AppContext);

  const handleSubmit = async (values) => {
    try {
      await addProduct(values);
      navigate('/products');
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <ProductForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default AddProductPage;