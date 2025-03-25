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
  CardContent
} from '@mui/material';
import { AppContext } from '../context/AppContext';
import UserForm from './UserForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading, error, updateUser } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find(u => u.id === parseInt(id));
      setUser(foundUser || null);
    }
  }, [id, users]);

  const handleUpdate = async (values) => {
    try {
      await updateUser(id, values);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update user:', err);
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

  if (!user) {
    return (
      <Box mt={4}>
        <Typography variant="h6">User not found</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/users')}
          sx={{ mt: 2 }}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  // Safe data access with fallbacks
  const userName = {
    firstname: user.name?.firstname || 'N/A',
    lastname: user.name?.lastname || ''
  };

  const userAddress = {
    street: user.address?.street || 'N/A',
    number: user.address?.number || '',
    city: user.address?.city || 'N/A',
    zipcode: user.address?.zipcode || 'N/A'
  };

  return (
    <div>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/users')}
        sx={{ mb: 2 }}
      >
        Back to Users
      </Button>

      {isEditing ? (
        <UserForm 
          initialValues={user} 
          onSubmit={handleUpdate} 
          isEdit={true} 
        />
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">
              {userName.firstname} {userName.lastname}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit User
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Typography><strong>Username:</strong> {user.username || 'N/A'}</Typography>
                  <Typography><strong>Email:</strong> {user.email || 'N/A'}</Typography>
                  <Typography><strong>Phone:</strong> {user.phone || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Address
                  </Typography>
                  <Typography>
                    <strong>Street:</strong> {userAddress.street} {userAddress.number}
                  </Typography>
                  <Typography><strong>City:</strong> {userAddress.city}</Typography>
                  <Typography><strong>Zipcode:</strong> {userAddress.zipcode}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default UserDetail;