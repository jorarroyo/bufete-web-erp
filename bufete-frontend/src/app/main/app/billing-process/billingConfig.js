import { authRoles } from 'app/auth';
import React from 'react';

export const billingConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.billingProcess,
  routes: [
    {
      path: '/apps/billing-process/expenses/:permissions/:expenseId',
      component: React.lazy(() => import('./expense/NewExpense')),
    },
    {
      path: '/apps/billing-process/expenses/:expenseId',
      component: React.lazy(() => import('./expense/NewExpense')),
    },
    {
      path: '/apps/billing-process/expenses',
      component: React.lazy(() => import('./expenses/Expenses')),
    },
    {
      path: '/apps/billing-process/receipt-settlements/:receiptSettlementId',
      component: React.lazy(() => import('./receipt-settlement/NewReceiptSettlement')),
    },
    {
      path: '/apps/billing-process/receipt-settlements',
      component: React.lazy(() => import('./receipt-settlements/ReceiptSettlements')),
    },
    {
      path: '/apps/billing-process/receipts/:receiptId',
      component: React.lazy(() => import('./receipt/NewReceipt')),
    },
    {
      path: '/apps/billing-process/receipts',
      component: React.lazy(() => import('./receipts/Receipts')),
    },
    {
      path: '/apps/billing-process/receipt-list-report',
      component: React.lazy(() => import('./receipts-reports/ReceiptList')),
    },
  ]
};
