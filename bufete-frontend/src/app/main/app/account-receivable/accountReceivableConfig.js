import { authRoles } from 'app/auth';
import React from 'react';

export const accountReceivableConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.accountReceivable,
  routes: [
    {
      path: '/apps/account-receivable/payment-receipts/:paymentReceiptId',
      component: React.lazy(() => import('./payment-receipt/NewPaymentReceipt')),
    },
    {
      path: '/apps/account-receivable/payment-receipts',
      component: React.lazy(() => import('./payment-reciepts/PaymentReceipts')),
    },
  ]
};
