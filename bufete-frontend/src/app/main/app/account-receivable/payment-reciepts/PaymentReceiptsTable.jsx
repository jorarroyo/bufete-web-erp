import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import helperFunctions from 'app/utils/helperFunc';
import { FuseScrollbars } from '@fuse';
import * as Actions from '../store/actions/payment-receipts';
import PaymentReceiptsTableHead from './PaymentReceiptsTableHead';
import PaymentReceiptsInnerMenu from './PaymentReceiptsInnerMenu';
import PaymentReceiptsStateChange from './PaymentReceiptsStateChange';

const initialData = {
  totalElements: 1,
  content: null,
};

function PaymentReceiptsTable(props) {
  const dispatch = useDispatch();
  const records = useSelector(({ paymentReceiptsApp }) => paymentReceiptsApp.paymentReceipts.data);
  const searchText = useSelector(({ paymentReceiptsApp }) => paymentReceiptsApp.paymentReceipts.searchText);
  const loading = useSelector(({ paymentReceiptsApp }) => paymentReceiptsApp.paymentReceipts.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(records);
  }, [records]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getPagedPayments(page, rowsPerPage, searchText.toLowerCase(), order));
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
    if (link === 'cambioEstado') {
      dispatch(Actions.openChangeStatusPaymentReceiptDialog(id, status));
    } else {
      props.history.push(link.replace(':id', id));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <PaymentReceiptsTableHead order={order} onRequestSort={handleRequestSort} rowCount="1" />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.client_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {helperFunctions.numberFormat('en-US', 'currency', n.currency_name, n.total_payment)}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.created}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.modified}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {PaymentReceiptsInnerMenu(n, handleClickMenu)}
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
      <LoadingComponent loadingRecord={loading} />
      <PaymentReceiptsStateChange />
    </div>
  );
}

export default withRouter(PaymentReceiptsTable);
