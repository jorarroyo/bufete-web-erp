import React from 'react';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

export const CurrencyPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.config,
  routes: [
    {
      path: '/apps/configuration/currency/list/:id',
      component: React.lazy(() => import('./CurrencyPage')),
    },
    {
      path: '/apps/configuration/currency/list',
      component: () => <Redirect to="/app/configuration/currency/list/active" />
    }
  ],
};
