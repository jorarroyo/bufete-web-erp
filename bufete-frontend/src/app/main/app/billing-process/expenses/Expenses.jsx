import React from 'react';
import withReducer from 'app/store/withReducer';
import { FusePageCarded } from '@fuse';
import reducer from '../store/reducers/expenses';
import ExpensesHeader from './ExpensesHeader';
import ExpensesTable from './ExpensesTable';

function Expenses() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ExpensesHeader />}
      content={<ExpensesTable />}
      innerScroll
    />
  );
}

export default withReducer('expensesApp', reducer)(Expenses);
