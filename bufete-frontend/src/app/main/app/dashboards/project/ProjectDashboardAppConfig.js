import { authRoles } from 'app/auth';
import React from 'react';

export const ProjectDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.dashboard,
    routes  : [
        {
            path     : '/apps/dashboards/project',
            component: React.lazy(() => import('./ProjectDashboardApp'))
        }
    ]
};
