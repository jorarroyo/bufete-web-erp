import { authRoles } from 'app/auth';
import React from 'react';

export const inventoryConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.inventory,
  routes: [
    {
      path: '/apps/inventory/stamp-duty',
      component: React.lazy(() => import('./stamp-duties/StampDuty')),
    },
    {
      path: '/apps/inventory/stamps',
      component: React.lazy(() => import('./stamps/Stamps')),
    },
    {
      path: '/apps/inventory/stamp-inv/:stampInvId',
      component: React.lazy(() => import('./new-stamp-inv/NewStampInv')),
    },
    {
      path: '/apps/inventory/stamp-inv',
      component: React.lazy(() => import('./stamp-inv/StampInv')),
    },
  ]
};
