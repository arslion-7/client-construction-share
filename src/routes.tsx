import React from 'react';
import { Route, Routes } from 'react-router';

import App from './App';
import Registries from './pages/Registries';
import About from './pages/About';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';

// Import pages

// import About from './pages/About';
// import Contact from './pages/Contact';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='registries' element={<Registries />} />
        <Route path='about' element={<About />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        {/* <Route path='register' element={<Register />} /> */}
      </Route>

      {/* <Route path='concerts'>
        <Route index element={<ConcertsHome />} />
        <Route path=':city' element={<City />} />
        <Route path='trending' element={<Trending />} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
