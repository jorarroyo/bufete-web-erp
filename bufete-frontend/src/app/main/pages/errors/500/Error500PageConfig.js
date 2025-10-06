import React from 'react';

export const Error500PageConfig = {
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
  routes: [
    {
      path     : '/pages/errors/error-500',
      component: React.lazy(() => import('./Error500Page'))
    }
  ]
};
