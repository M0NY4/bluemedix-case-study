import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  useTheme,
  Divider,
  Avatar,
  Typography,
  Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../Bluemedix.png';

const drawerWidth = 240;

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();

  const navItems = [
    { 
      text: 'Dashboard',
      icon: <HomeIcon />,
      path: '/',
      ariaLabel: 'Go to Dashboard'
    },
    { 
      text: 'Users',
      icon: <PeopleIcon />,
      path: '/users',
      ariaLabel: 'Manage Users'
    },
    { 
      text: 'Products',
      icon: <ShoppingBasketIcon />,
      path: '/products',
      ariaLabel: 'Manage Products'
    },
    {
      text: 'Add New',
      icon: <AddCircleOutlineIcon />,
      subItems: [
        { text: 'Add User', path: '/add-user' },
        { text: 'Add Product', path: '/add-product' }
      ]
    }
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff', // White background
          color: theme.palette.text.primary, // Dark text color
          borderRight: `1px solid ${theme.palette.divider}`, // Add border
        },
      }}
      variant="permanent"
      anchor="left"
      aria-label="Main navigation"
    >
      <Toolbar 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          backgroundColor: '#ffffff', // White background
          borderBottom: `1px solid ${theme.palette.divider}` // Add border
        }}
      >
        <Avatar 
          src={logo} 
          alt="BlueMedix Logo" 
          sx={{ 
            width: 56, 
            height: 56,
            mb: 1,
            bgcolor: 'background.paper',
            padding: 0.5 
          }} 
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%',
            color: theme.palette.text.primary // Dark text color
          }}
        >
          BlueMedix
          <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
            Management Portal
          </Typography>
        </Typography>
      </Toolbar>

      <Divider />

      <List component="nav" aria-label="Main menu">
        {navItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.path ? (
              <ListItem 
                button 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#f5f5f5', // Light gray selected state
                    '&:hover': {
                      backgroundColor: '#eeeeee', // Slightly darker on hover
                    }
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5', // Light gray hover
                  },
                  py: 1.5,
                  transition: 'background-color 0.2s ease',
                }}
                aria-label={item.ariaLabel}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? 
                    theme.palette.primary.main : 
                    theme.palette.text.secondary,
                  minWidth: 40 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body1',
                    fontWeight: location.pathname === item.path ? '600' : '400',
                    color: location.pathname === item.path ? 
                      theme.palette.primary.main : 
                      theme.palette.text.primary
                  }} 
                />
              </ListItem>
            ) : (
              <Box key={item.text} sx={{ pl: 2, pt: 1 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  {item.icon}
                  {item.text}
                </Typography>
                {item.subItems.map((subItem) => (
                  <ListItem
                    key={subItem.text}
                    button
                    component={Link}
                    to={subItem.path}
                    selected={location.pathname === subItem.path}
                    sx={{
                      pl: 4,
                      py: 1,
                      '&.Mui-selected': {
                        backgroundColor: '#f5f5f5',
                      },
                      '&:hover': {
                        backgroundColor: '#eeeeee',
                      },
                    }}
                    aria-label={`Add new ${subItem.text.split(' ')[1]}`}
                  >
                    <ListItemText 
                      primary={subItem.text} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        fontWeight: location.pathname === subItem.path ? '500' : '400',
                        color: theme.palette.text.primary
                      }} 
                    />
                  </ListItem>
                ))}
              </Box>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider />
    </Drawer>
  );
};

export default Navbar;