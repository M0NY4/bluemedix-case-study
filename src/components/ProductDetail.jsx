import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import { AppContext } from '../context/AppContext';
import ProductForm from './ProductForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error, updateProduct } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, products]);

  const handleUpdate = async (values) => {
    try {
      await updateProduct(id, values);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <div>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      {isEditing ? (
        <ProductForm 
          initialValues={product} 
          onSubmit={handleUpdate} 
          isEdit={true} 
        />
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">
              {product.title}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Product
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.title}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="div">
                    ₹{product.price}
                    </Typography>
                    <Chip label={product.category} color="primary" />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product ID: {product.id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default ProductDetail;