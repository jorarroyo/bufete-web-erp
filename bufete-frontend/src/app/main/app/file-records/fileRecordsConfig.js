import { authRoles } from 'app/auth';
import React from 'react';

export const fileRecordsConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.recordFile,
  routes: [
    {
      path: '/apps/file-records/clients/:clientId',
      component: React.lazy(() => import('./client/Client')),
    },
    {
      path: '/apps/file-records/clients',
      component: React.lazy(() => import('./clients/Clients')),
    },
    {
      path: '/apps/file-records/employees/:employeeId',
      component: React.lazy(() => import('./employee/Employee')),
    },
    {
      path: '/apps/file-records/employees',
      component: React.lazy(() => import('./employees/Employees')),
    },
    {
      path: '/apps/file-records/case-activities',
      component: React.lazy(() => import('./caseActivities/CaseActivities')),
    },
    {
      path: '/apps/file-records/records/:recordId',
      component: React.lazy(() => import('./record/RecordFile')),
    },
    {
      path: '/apps/file-records/records',
      component: React.lazy(() => import('./records/RecordFiles')),
    },
    {
      path: '/apps/file-records/activity-settle/:proctorAgendaId/:id',
      component: React.lazy(() => import('./activity-settle/NewActivitySettle')),
    },
    {
      path: '/apps/file-records/activity-settle/:id',
      component: React.lazy(() => import('./activity-settles/ActivitySettle')),
    },
    {
      path: '/apps/file-records/proctor-agenda/:proctorAgenda',
      component: React.lazy(() => import('./proctorAgendaN/NewAgenda')),
    },
    {
      path: '/apps/file-records/proctor-agenda',
      component: React.lazy(() => import('./proctorAgenda/ProctorAgenda')),
    },
  ]
};