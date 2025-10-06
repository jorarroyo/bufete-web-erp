import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/records';
import RecordFilesHeader from './RecordFilesHeader';
import RecordFilesTable from './RecordFilesTable';

function RecordFiles() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<RecordFilesHeader />}
      content={<RecordFilesTable />}
      innerScroll
    />
  );
}

export default withReducer('recordsApp', reducer)(RecordFiles);
