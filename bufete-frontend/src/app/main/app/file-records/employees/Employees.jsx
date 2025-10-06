import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/employees';
import EmployeesHeader from './EmployeesHeader';
import EmployeesTable from './EmployeesTable';

function Employees() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<EmployeesHeader />}
      content={<EmployeesTable />}
      innerScroll
    />
  );
}

export default withReducer('employeesApp', reducer)(Employees);
