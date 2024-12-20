import { useState } from 'react';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { Favorites } from './Pages/Favorites';
import { Order } from './Pages/Order';

// Sidebar component
import Sidebar from './components/Sidebar';

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

// Import other pages
import { Login } from './Pages/login';
import { SignUp } from './Pages/register';
import { Landing } from './Pages/landing';
import AdminDashboard from './Pages/admin';
import AdminSidebar from './components/adminsidebar';
import AdminEditUsers from './components/EditeUSer';
import Banned from './Pages/baned';

function Layout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet /> {/* Renders nested routes */}
      </main>
    </div>
  );
}

function AdminLayout() {
  return (
    <div>
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/baned" element={<Banned />} />


        {/* Admin Routes with separate /admin path */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminEditUsers />} />

        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
