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

const UserForm = ({ initialValues, onSubmit, isEdit }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    name: Yup.object({
      firstname: Yup.string().required('Required'),
      lastname: Yup.string().required('Required'),
    }),
    phone: Yup.string().required('Required'),
    address: Yup.object({
      city: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      zipcode: Yup.string(),
    }),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      email: '',
      username: '',
      password: '',
      name: {
        firstname: '',
        lastname: '',
      },
      phone: '',
      address: {
        city: '',
        street: '',
        number: '',
        zipcode: '',
      },
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit User' : 'Add New User'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name.firstname"
              name="name.firstname"
              label="First Name"
              value={formik.values.name.firstname}
              onChange={formik.handleChange}
              error={formik.touched.name?.firstname && Boolean(formik.errors.name?.firstname)}
              helperText={formik.touched.name?.firstname && formik.errors.name?.firstname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name.lastname"
              name="name.lastname"
              label="Last Name"
              value={formik.values.name.lastname}
              onChange={formik.handleChange}
              error={formik.touched.name?.lastname && Boolean(formik.errors.name?.lastname)}
              helperText={formik.touched.name?.lastname && formik.errors.name?.lastname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          {!isEdit && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.city"
              name="address.city"
              label="City"
              value={formik.values.address.city}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.street"
              name="address.street"
              label="Street"
              value={formik.values.address.street}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.number"
              name="address.number"
              label="Number"
              type="number"
              value={formik.values.address.number}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.zipcode"
              name="address.zipcode"
              label="Zipcode"
              value={formik.values.address.zipcode}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" type="submit">
            {isEdit ? 'Update User' : 'Add User'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UserForm;