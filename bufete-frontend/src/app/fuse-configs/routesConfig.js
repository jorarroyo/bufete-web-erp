import React from 'react';
import { Redirect } from 'react-router-dom';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { pagesConfigs } from 'app/main/pages/pagesConfigs';
import { appConfigs } from 'app/main/app/configuration/appConfigs';
import { fileRecordsConfig } from 'app/main/app/file-records/fileRecordsConfig';
import { FileManagerAppConfig } from 'app/main/app/file-manager/FileManagerAppConfig';
import { catalogsConfig } from 'app/main/app/catalogs/catalogsConfig';
import { inventoryConfig } from 'app/main/app/inventory/inventoryConfig';
import { ProjectDashboardAppConfig } from 'app/main/app/dashboards/project/ProjectDashboardAppConfig';
import { FuseUtils } from '@fuse';
import { billingConfig } from 'app/main/app/billing-process/billingConfig';
import { accountableConfig } from 'app/main/app/accountable/accountableConfig';
import { accountReceivableConfig } from 'app/main/app/account-receivable/accountReceivableConfig';

// TODO: add pageConfig for app folder.

const routeConfigs = [
  ...pagesConfigs,
  ...appConfigs,
  fileRecordsConfig,
  catalogsConfig,
  LoginConfig,
  ExampleConfig,
  FileManagerAppConfig,
  inventoryConfig,
  billingConfig,
  accountReceivableConfig,
  accountableConfig,
  ProjectDashboardAppConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/apps/dashboards/project" />,
  },
  {
    component: () => <Redirect to="/pages/errors/error-404" />,
  },
];

export default routes;
