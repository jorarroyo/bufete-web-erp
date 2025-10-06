import React from 'react';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

export const catalogsConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.catalogs,
  routes: [
    {
      path: '/apps/catalogs/activities/list/:id',
      component: React.lazy(() => import('./activity/ActivityPage')),
    },
    {
      path: '/apps/catalogs/activities/list',
      component: () => <Redirect to="/app/catalogs/activities/list/active" />
    },
    {
      path: '/apps/catalogs/institutions/list/:id',
      component: React.lazy(() => import('./institution/InstitutionPage')),
    },
    {
      path: '/apps/catalogs/institutions/list',
      component: () => <Redirect to="/app/catalogs/institutions/list/active" />
    }
  ]
};