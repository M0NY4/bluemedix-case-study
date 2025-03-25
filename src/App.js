import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import AddUserPage from './pages/AddUserPage';
import AddProductPage from './pages/AddProductPage';
import UserDetail from './components/UserDetail';
import ProductDetail from './components/ProductDetail';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<UsersPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="add-user" element={<AddUserPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="add-product" element={<AddProductPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;