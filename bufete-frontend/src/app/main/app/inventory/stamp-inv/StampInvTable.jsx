import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import * as Actions from '../store/actions/stamp-inv';
import StampInvInnerMenu from './StampInvInnerMenu';
import StampInvStateChange from './StampInvStateChange';
import StampInvTableHeader from './StampInvTableHeader';
import ReturnStampInvDialog from './ReturnStampInvDialog';

const initialData = {
  totalElements: 0,
  content: null,
};

function StampInvTable(props) {
  const dispatch = useDispatch();
  const stampInv = useSelector(({ stampInvApp }) => stampInvApp.stampInv.data);
  const loading = useSelector(({ stampInvApp }) => stampInvApp.stampInv.loading);
  const searchText = useSelector(({ stampInvApp }) => stampInvApp.stampInv.searchText);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'request_date',
  });

  useEffect(() => {
    setData(stampInv);
  }, [stampInv]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getStampsInv(page, rowsPerPage, searchText.toLowerCase(), order));
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

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.content.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleClickMenu(id, status, link) {
    if (link === 'reingreso') {
      dispatch(Actions.openReturnStampOptionsDialog(id));
    } else if (link === '#') {
      dispatch(Actions.openChangeStatusDialog(id, status));
    } else {
      props.history.push(link.replace(':id', id));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <StampInvTableHeader
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.totalElements}
          />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.inventory_type_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.request_date}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.requester_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.file_num}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.total}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.created}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.status}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {StampInvInnerMenu(n, handleClickMenu)}
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
      <StampInvStateChange />
      <LoadingComponent loadingRecord={loading} />
      <ReturnStampInvDialog />
    </div>
  );
}

export default withRouter(StampInvTable);
