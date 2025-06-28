
import React from 'react';
import { AdminLogin } from '@/components/AdminLogin';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/admin/dashboard');
  };

  return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
};

export default AdminLoginPage;
