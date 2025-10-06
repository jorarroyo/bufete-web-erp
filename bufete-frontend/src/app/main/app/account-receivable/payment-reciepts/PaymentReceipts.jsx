import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/payment-receipts';
import PaymentReceiptsHeader from './PaymentReceiptsHeader';
import PaymentReceiptsTable from './PaymentReceiptsTable';

function PaymentReceipts() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<PaymentReceiptsHeader />}
      content={<PaymentReceiptsTable />}
      innerScroll
    />
  );
}

export default withReducer('paymentReceiptsApp', reducer)(PaymentReceipts);
