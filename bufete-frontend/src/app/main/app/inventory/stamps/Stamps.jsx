import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/stamps';
import StampsHeader from './StampsHeader';
import StampsTable from './StampsTable';

function Stamps() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<StampsHeader />}
      content={<StampsTable />}
      innerScroll
    />
  );
}

export default withReducer('stampsApp', reducer)(Stamps);
