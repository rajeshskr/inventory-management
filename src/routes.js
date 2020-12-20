import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import Print from './components/Print';

const routes = [
  {
    path: 'print',
    element: <Print />
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <CustomerListView /> },
    ]
  },
  {
    path: 'admin',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <CustomerListView /> },
    ]
  }
];

export default routes;
