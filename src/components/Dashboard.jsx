import React from 'react';
import { Link, useLocation, Outlet  } from 'react-router-dom';
import { Box, Container, CssBaseline, Typography, Paper, Grid, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import Navbar from './Navbar';

const Dashboard = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          p: 3
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {location.pathname === '/' ? (
            <>
              <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#1976d2' }}>
                Welcome to BlueMedix Dashboard
              </Typography>

              <Grid container spacing={3}>
                {/* Users Section */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <PeopleIcon fontSize="large" color="primary" />
                      <div>
                        <Typography variant="h6" sx={{ mb: 1 }}>Users</Typography>
                        <Link to="/users" style={{ textDecoration: 'none' }}>
                          Manage User Accounts
                        </Link>
                      </div>
                    </Stack>
                  </Paper>
                </Grid>

                {/* Products Section */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <InventoryIcon fontSize="large" color="primary" />
                      <div>
                        <Typography variant="h6" sx={{ mb: 1 }}>Products</Typography>
                        <Link to="/products" style={{ textDecoration: 'none' }}>
                          Manage Pharmaceutical Inventory
                        </Link>
                      </div>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Pharmaceutical Management System
                </Typography>
                <Typography>
                  BlueMedix provides comprehensive tools for managing pharmaceutical inventory 
                  and staff accounts, ensuring efficient operations and patient care.
                </Typography>
              </Paper>
            </>
          ) : (
            <Outlet />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;