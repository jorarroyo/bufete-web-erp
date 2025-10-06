import React from 'react';

export const FileManagerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/file-records/documents/:id/record',
            component: React.lazy(() => import('./FileManagerApp'))
        }
    ]
};
