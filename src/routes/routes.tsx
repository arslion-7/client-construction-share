import React from 'react';
import { Route, Routes } from 'react-router';

import App from '@/App';
import Registries from '@/pages/registries/Registries';
import About from '@/pages/About';
import AuthLayout from '@/layouts/AuthLayout';
import SignIn from '@/pages/SignIn';
import GeneralContractors from '@/pages/generalContractors/GeneralContractors';
import GeneralContractor from '../pages/generalContractor/GeneralContractor';
import Registry from '../pages/registry/Registry';
import Users from '../pages/users/Users';
import User from '../pages/user/User';
import { PATHS } from './paths';
import Buildings from '@/pages/buildings/Buildings';
import Building from '@/pages/building/Building';
import Builders from '@/pages/builders/Builders';
import Builder from '@/pages/builder/Builder';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path={PATHS.USERS}>
          <Route index element={<Users />} />
          <Route path=':id' element={<User />} />
        </Route>
        <Route path={PATHS.REGISTRIES}>
          <Route index element={<Registries />} />
          <Route path=':id' element={<Registry />} />
        </Route>
        <Route path={PATHS.GENERAL_CONTRACTORS}>
          <Route index element={<GeneralContractors />} />
          <Route path=':id' element={<GeneralContractor />} />
        </Route>
        <Route path={PATHS.BUILDINGS}>
          <Route index element={<Buildings />} />
          <Route path=':id' element={<Building />} />
        </Route>
        <Route path={PATHS.BUILDERS}>
          <Route index element={<Builders />} />
          <Route path=':id' element={<Builder />} />
        </Route>

        <Route path='about' element={<About />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={PATHS.SIGNIN} element={<SignIn />} />
        {/* <Route path='register' element={<Register />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
