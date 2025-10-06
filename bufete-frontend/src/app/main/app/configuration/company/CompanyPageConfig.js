import React from 'react';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

export const CompanyPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.config,
  routes: [
    {
      path: '/apps/configuration/companies/list/:id',
      component: React.lazy(() => import('./CompanyPage')),
    },
    {
      path: '/apps/configuration/companies/list',
      component: () => <Redirect to="/app/configuration/companies/list/active" />
    }
  ],
};
