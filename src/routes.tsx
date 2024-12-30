import React from 'react';
import { Route, Routes } from 'react-router';

import App from '@/App';
import Registries from '@/pages/registries/Registries';
import About from '@/pages/About';
import AuthLayout from '@/layouts/AuthLayout';
import SignIn from '@/pages/SignIn';
import GeneralContractors from '@/pages/generalContractors/GeneralContractors';
import GeneralContractor from './pages/generalContractor/GeneralContractor';
import Registry from './pages/registry/Registry';
import Users from './pages/users/Users';
import User from './pages/user/User';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='users'>
          <Route index element={<Users />} />
          <Route path=':id' element={<User />} />
        </Route>
        <Route path='registries'>
          <Route index element={<Registries />} />
          <Route path=':id' element={<Registry />} />
        </Route>
        <Route path='general_contractors'>
          <Route index element={<GeneralContractors />} />
          <Route path=':id' element={<GeneralContractor />} />
        </Route>

        <Route path='about' element={<About />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='sign-in' element={<SignIn />} />
        {/* <Route path='register' element={<Register />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
