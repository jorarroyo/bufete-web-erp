import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/stamp-duty';
import StampDutyHeader from './StampDutyHeader';
import StampDutyTable from './StampDutyTable';

function StampDuty() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<StampDutyHeader />}
      content={<StampDutyTable />}
      innerScroll
    />
  );
}

export default withReducer('stampDutyApp', reducer)(StampDuty);
