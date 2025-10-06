import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers';
import SearchRecordFileHeader from './SearchRecordFileHeader';
import SearchRecordFileTable from './SearchRecordFileTable';

function SearchRecordFile(props) {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<SearchRecordFileHeader />}
      content={<SearchRecordFileTable {...props} />}
      innerScroll
    />
  );
}

export default withReducer('searchRecordsApp', reducer)(SearchRecordFile);
