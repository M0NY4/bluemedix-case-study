import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { AppContext } from '../context/AppContext';
import { Box, Typography } from '@mui/material';

const AddUserPage = () => {
  const navigate = useNavigate();
  const { addUser } = useContext(AppContext);

// In AddUserPage.jsx
const handleSubmit = async (values) => {
    try {
      // Ensure proper data structure for the API
      const userData = {
        ...values,
        name: {
          firstname: values.name.firstname,
          lastname: values.name.lastname
        },
        address: {
          city: values.address.city,
          street: values.address.street,
          number: values.address.number,
          zipcode: values.address.zipcode
        }
      };
      await addUser(userData);
      navigate('/users');
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New User
      </Typography>
      <UserForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default AddUserPage;