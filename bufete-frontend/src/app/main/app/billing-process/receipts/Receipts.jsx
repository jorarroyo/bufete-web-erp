import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/receipts';
import ReceiptsHeader from './ReceiptsHeader';
import ReceiptsTable from './ReceiptsTable';

function Receipts() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ReceiptsHeader />}
      content={<ReceiptsTable />}
      innerScroll
    />
  );
}

export default withReducer('receiptsApp', reducer)(Receipts);
