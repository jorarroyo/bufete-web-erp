import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/clients';
import ClientsHeader from './ClientsHeader';
import ClientsTable from './ClientsTable';

function Clients() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ClientsHeader />}
      content={<ClientsTable />}
      innerScroll
    />
  );
}

export default withReducer('clientsApp', reducer)(Clients);
