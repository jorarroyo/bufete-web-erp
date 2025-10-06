import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/case-activities';
import CaseActivitiesHeader from './CaseActivitiesHeader';
import CaseActivitiesTable from './CaseActivitiesTable';

function CaseActivities() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<CaseActivitiesHeader />}
      content={<CaseActivitiesTable />}
      innerScroll
    />
  );
}

export default withReducer('caseActivitiesApp', reducer)(CaseActivities);
