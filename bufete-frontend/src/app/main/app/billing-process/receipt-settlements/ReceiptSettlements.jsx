import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/receipt-settlements';
import ReceiptSettlementsHeader from './ReceiptSettlementsHeader';
import ReceiptSettlementsTable from './ReceiptSettlementsTable';

function ReceiptSettlements() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ReceiptSettlementsHeader />}
      content={<ReceiptSettlementsTable />}
      innerScroll
    />
  );
}

export default withReducer('receiptSettleApp', reducer)(ReceiptSettlements);
