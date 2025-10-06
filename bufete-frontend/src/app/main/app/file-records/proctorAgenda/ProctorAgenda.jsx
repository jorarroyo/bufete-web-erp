import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/proctor-agenda';
import ProctorAgendaHeader from './ProctorAgendaHeader';
import ProctorAgendaTable from './ProctorAgendaTable';

function ProctorAgenda() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ProctorAgendaHeader />}
      content={<ProctorAgendaTable />}
      innerScroll
    />
  );
}

export default withReducer('proctorAgendaApp', reducer)(ProctorAgenda);
