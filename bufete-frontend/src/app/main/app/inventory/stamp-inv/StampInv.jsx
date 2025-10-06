import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/stamp-inv';
import StampInvHeader from './StampInvHeader';
import StampInvTable from './StampInvTable';

function StampInv() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<StampInvHeader />}
      content={<StampInvTable />}
      innerScroll
    />
  );
}

export default withReducer('stampInvApp', reducer)(StampInv);
