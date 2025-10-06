import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import * as Actions from '../store/actions/expenses';
import ExpensesTableHead from './ExpensesTableHead';
import ExpenseStateChange from './ExpensesStateChange';
import ExpensesInnerMenu from './ExpensesInnerMenu';

const initialData = {
  totalElements: 1,
  content: null,
};

function ExpensesTable(props) {
  const dispatch = useDispatch();
  const expenses = useSelector(({ expensesApp }) => expensesApp.expenses.data);
  const searchText = useSelector(({ expensesApp }) => expensesApp.expenses.searchText);
  const loading = useSelector(({ expensesApp }) => expensesApp.expenses.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(expenses);
  }, [expenses]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getPagedExpenses(page, rowsPerPage, searchText.toLowerCase(), order));
  }, [dispatch, page, rowsPerPage, searchText, order]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleClickMenu(id, status, link) {
    if (link === '#1') {
      dispatch(Actions.openChangeStatusExpenseDialog(id, status));
    } else {
      props.history.push(link.replace(':id', id));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <ExpensesTableHead order={order} onRequestSort={handleRequestSort} rowCount="1" />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.provider_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.concept_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.expenses_num}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.expenses_total}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.created}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.modified}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {ExpensesInnerMenu(n, handleClickMenu)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        component="div"
        count={data.totalElements || 0}
        rowsPerPage={rowsPerPage}
        page={data.totalElements < 10 ? 0 : page}
        backIconButtonProps={{
          'aria-label': 'Anterior',
        }}
        nextIconButtonProps={{
          'aria-label': 'Siguiente',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por Página:"
        rowsPerPageOptions={[10]}
        className="table-pagination"
      />
      <ExpenseStateChange />
      <LoadingComponent loadingRecord={loading} />
    </div>
  );
}

export default withRouter(ExpensesTable);
