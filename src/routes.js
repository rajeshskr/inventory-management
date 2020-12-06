import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import Print from './components/Print';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <CustomerListView /> },
    ]
  },
  {
    path: 'print',
    element: <Print />
  },
  {
    path: '/',
    children: [
      { path: '/', element: <Navigate to="/app/customers" /> },
    ]
  }
];

export default routes;
