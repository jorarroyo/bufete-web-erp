import React from 'react';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

export const RolePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.config_role,
  routes: [
    {
      path: '/apps/configuration/roles/list/:id',
      component: React.lazy(() => import('./RolePage')),
    },
    {
      path: '/apps/configuration/roles/list',
      component: () => <Redirect to="/app/configuration/roles/list/active" />
    }
  ],
};
