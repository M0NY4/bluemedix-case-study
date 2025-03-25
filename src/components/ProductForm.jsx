import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box
} from '@mui/material';

const ProductForm = ({ initialValues, onSubmit, isEdit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Must be positive'),
    description: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    image: Yup.string().url('Must be a valid URL').required('Required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="category"
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
            {formik.values.image && (
              <Box mt={2}>
                <img 
                  src={formik.values.image} 
                  alt="Product preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px' }} 
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" type="submit">
            {isEdit ? 'Update Product' : 'Add Product'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProductForm;