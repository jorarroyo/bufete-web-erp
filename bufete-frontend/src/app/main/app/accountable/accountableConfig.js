import { authRoles } from 'app/auth';
import React from 'react';

export const accountableConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.accountable,
  routes: [
    {
      path: '/apps/accountable/nomenclatures',
      component: React.lazy(() => import('./nomeclatures/Nomenclatures')),
    },
  ]
};
