import React from 'react';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

export const UserPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.config_user,
  routes: [
    {
      path: '/apps/configuration/users/list/:id',
      component: React.lazy(() => import('./UserPage')),
    },
    {
      path: '/apps/configuration/users/list',
      component: () => <Redirect to="/app/configuration/users/list/active" />
    }
  ],
};