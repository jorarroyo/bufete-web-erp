import { authRoles } from 'app/auth';

const navigationConfig = [
  {
    id: 'bufeteApp',
    title: 'Bufete Olivero',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        auth: authRoles.dashboard,
        icon: 'dashboard',
        url: '/apps/dashboards/project',
      },
      {
        id: 'file-records-component',
        title: 'Expedientes',
        type: 'collapse',
        auth: authRoles.recordFile,
        icon: 'folder_shared',
        children: [
          {
            id: 'client-component',
            title: 'Clientes',
            auth: authRoles.recordFile_client,
            type: 'item',
            url: '/apps/file-records/clients',
          },
          {
            id: 'employee-component',
            title: 'Empleados',
            auth: authRoles.recordFile_employee,
            type: 'item',
            url: '/apps/file-records/employees',
          },
          {
            id: 'recordfile-component',
            title: 'Expedientes',
            auth: authRoles.recordFile_record,
            type: 'item',
            url: '/apps/file-records/records',
          },
          {
            id: 'proctor-activities-component',
            title: 'Actividades de Procuración',
            auth: authRoles.recordFile_activity,
            type: 'item',
            url: '/apps/file-records/case-activities',
          },
          {
            id: 'proctor-agenda-component',
            title: 'Agenda de Procurador',
            auth: authRoles.recordFile_proctor,
            type: 'item',
            url: '/apps/file-records/proctor-agenda',
          },
        ],
      },
      {
        id: 'billing-process-component',
        title: 'Facturación',
        type: 'collapse',
        auth: authRoles.billingProcess,
        icon: 'receipt',
        children: [
          {
            id: 'expenses-component',
            title: 'Documento de Gastos',
            auth: authRoles.billingProcess_expenses,
            type: 'item',
            url: '/apps/billing-process/expenses',
          },
          {
            id: 'receipt-settlements-component',
            title: 'Liquidación de Factura',
            auth: authRoles.billingProcess_receiptSettlement,
            type: 'item',
            url: '/apps/billing-process/receipt-settlements',
          },
          {
            id: 'receipts-component',
            title: 'Facturación',
            auth: authRoles.billingProcess_receipts,
            type: 'item',
            url: '/apps/billing-process/receipts',
          },
          {
            id: 'receipts-reports-component',
            title: 'Reportes',
            auth: authRoles.billingProcess_receipt_reports,
            type: 'collapse',
            children: [
              {
                id: 'receipts-list-component',
                title: 'Listado de Facturas',
                auth: authRoles.billingProcess_receipt_report_list,
                type: 'item',
                url: '/apps/billing-process/receipt-list-report',
              },
            ],
          },
        ],
      },
      {
        id: 'account-receivable-process-component',
        title: 'Cuentas por cobrar',
        type: 'collapse',
        auth: authRoles.accountReceivable,
        icon: 'credit_card',
        children: [
          {
            id: 'payment-receipts-component',
            title: 'Recibo de Pago',
            auth: authRoles.accountReceivable_payment_receipts,
            type: 'item',
            url: '/apps/account-receivable/payment-receipts',
          },
        ],
      },
      {
        id: 'accountable-component',
        title: 'Contabilidad',
        type: 'collapse',
        auth: authRoles.accountable,
        icon: 'assignment',
        children: [
          {
            id: 'nomenclatures-component',
            title: 'Nomenclaturas',
            auth: authRoles.accountable_nomenclature,
            type: 'item',
            url: '/apps/accountable/nomenclatures',
          },
        ],
      },
      {
        id: 'inventory-component',
        title: 'Inventario de Timbres',
        type: 'collapse',
        auth: authRoles.inventory,
        icon: 'list_alt',
        children: [
          {
            id: 'stamps-component',
            title: 'Timbres',
            auth: authRoles.inventory_product,
            type: 'item',
            url: '/apps/inventory/stamps',
          },
          {
            id: 'stamp-inv-component',
            title: 'Inventario de Timbres',
            auth: authRoles.inventory_stamp,
            type: 'item',
            url: '/apps/inventory/stamp-inv',
          },
        ],
      },
      {
        id: 'catalog-component',
        title: 'Catalogos',
        type: 'collapse',
        auth: authRoles.catalogs,
        icon: 'apps',
        children: [
          {
            id: 'activity-component',
            title: 'Actividades',
            auth: authRoles.catalogs_activity,
            type: 'item',
            url: '/apps/catalogs/activities/list/active',
          },
          {
            id: 'institution-component',
            title: 'Instituciones',
            auth: authRoles.catalogs_institution,
            type: 'item',
            url: '/apps/catalogs/institutions/list/active',
          },
        ],
      },
      {
        id: 'configuration-component',
        title: 'Configuración',
        type: 'collapse',
        auth: authRoles.config,
        icon: 'build',
        children: [
          {
            id: 'user-component',
            title: 'Usuarios',
            auth: authRoles.config_user,
            type: 'item',
            url: '/apps/configuration/users/list/active',
          },
          {
            id: 'role-component',
            title: 'Roles',
            auth: authRoles.config_role,
            type: 'item',
            url: '/apps/configuration/roles/list/active',
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
