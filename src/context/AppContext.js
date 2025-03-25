import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async (user) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/users', user);
      setUsers([...users, response.data]);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Add a new product
  const addProduct = async (product) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', product);
      setProducts([...products, response.data]);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Update a user
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/users/${id}`, updatedUser);
      setUsers(users.map(user => user.id === id ? response.data : user));
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Update a product
  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
      setProducts(products.map(product => product.id === id ? response.data : product));
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider value={{
      users,
      products,
      loading,
      error,
      fetchUsers,
      fetchProducts,
      addUser,
      addProduct,
      updateUser,
      updateProduct,
      deleteUser,
      deleteProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};