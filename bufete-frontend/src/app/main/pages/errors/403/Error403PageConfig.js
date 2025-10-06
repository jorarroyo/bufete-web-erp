import React from 'react';

export const Error403PageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes  : [
    {
      path     : '/pages/errors/error-403',
      component: React.lazy(() => import('./Error403Page'))
    }
  ]
};