import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography,
  CircularProgress,
  Box,
  Avatar
} from '@mui/material';
import { AppContext } from '../context/AppContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductList = () => {
  const { products, loading, error, deleteProduct } = useContext(AppContext);

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

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Products</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link}
          to="/add-product"
        >
          Add New Product
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar 
                    src={product.image} 
                    alt={product.title} 
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/products/${product.id}`}
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteProduct(product.id)}
                    startIcon={<DeleteIcon />}
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;