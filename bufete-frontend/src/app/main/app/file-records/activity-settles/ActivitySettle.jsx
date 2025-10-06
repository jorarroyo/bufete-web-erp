import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/activity-settle';
import ActivitySettleHeader from './ActivitySettleHeader';
import ActivitySettleTable from './ActivitySettleTable';

function ActivitySettle(props) {
  const { match } = props;
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ActivitySettleHeader proctorAgendaId={match.params.id} />}
      content={<ActivitySettleTable proctorAgendaId={match.params.id} />}
      innerScroll
    />
  );
}

export default withReducer('activitySettleApp', reducer)(ActivitySettle);
