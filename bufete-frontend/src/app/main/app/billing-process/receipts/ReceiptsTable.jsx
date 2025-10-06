import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import helperFunctions from 'app/utils/helperFunc';
import { FuseScrollbars } from '@fuse';
import * as Actions from '../store/actions/receipts';
import ReceiptsTableHead from './ReceiptsTableHead';
import ReceiptsInnerMenu from './ReceiptsInnerMenu';
import ReceiptSettlementStatusChange from './ReceiptsStateChange';
import ReceiptDocPreviewDialog from './ReceiptDocPreviewDialog';
import GenerateReceiptDialog from '../receipt-options/GenerateReceiptDialog';
import PreviewReceiptDialog from '../receipt-options/PreviewReceiptDialog';

const initialData = {
  totalElements: 1,
  content: null,
};

function ReceiptsTable(props) {
  const dispatch = useDispatch();
  const records = useSelector(({ receiptsApp }) => receiptsApp.receipts.data);
  const searchText = useSelector(({ receiptsApp }) => receiptsApp.receipts.searchText);
  const loading = useSelector(({ receiptsApp }) => receiptsApp.receipts.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'receipt_date',
  });

  useEffect(() => {
    setData(records);
  }, [records]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getPagedReceipts(page, rowsPerPage, searchText.toLowerCase(), order));
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
      dispatch(Actions.openChangeStatusReceiptDialog(id, status));
    } else if (link === 'consultar') {
      dispatch(Actions.openPreviewReceiptDocDialog(id));
    } else if (link === 'generaFac') {
      dispatch(Actions.openInvoiceSeriesDialog(id));
    } else if (link === 'preview') {
      dispatch(Actions.openPreviewReceiptDialog(id));
    } else {
      props.history.push(link.replace(':id', id));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <ReceiptsTableHead order={order} onRequestSort={handleRequestSort} rowCount="1" />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.serial_number}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.series_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.client_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.nit}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {helperFunctions.numberFormat('en-US', 'currency', n.currency_name, n.receipt_total)}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.created}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.modified}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {ReceiptsInnerMenu(n, handleClickMenu)}
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
      <ReceiptSettlementStatusChange />
      <ReceiptDocPreviewDialog />
      <GenerateReceiptDialog />
      <PreviewReceiptDialog />
      <LoadingComponent loadingRecord={loading} />
    </div>
  );
}

export default withRouter(ReceiptsTable);
