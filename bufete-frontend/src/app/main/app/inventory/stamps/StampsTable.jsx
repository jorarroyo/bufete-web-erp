import { FuseScrollbars } from '@fuse';
import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions/stamps';
import StampMovDialog from './StampMovDialog';
import StampsAddDialog from './StampsAddDialog';
import StampsInnerMenu from './StampsInnerMenu';
import StampsTableHeader from './StampsTableHeader';

const initialData = {
  totalElements: 1,
  content: null,
};

function StampsTable(props) {
  const dispatch = useDispatch();
  const stamps = useSelector(({ stampsApp }) => stampsApp.stamps.data);
  const searchText = useSelector(({ stampsApp }) => stampsApp.stamps.searchText);
  const loading = useSelector(({ stampsApp }) => stampsApp.stamps.loading);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(stamps);
  }, [stamps])

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getStamps(page, rowsPerPage, searchText.toLowerCase(), order));
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
    switch (link) {
      case 'editar':
        dispatch(Actions.openEditStampsDialog(id));
        break;
      case 'movimiento':
        dispatch(Actions.openStampMovDialog(id));
        break;
      default:
        break;
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <StampsTableHeader
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
                      {n.product_code}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.product_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.unit_value}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.min_quantity}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.product_existence}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {StampsInnerMenu(n, handleClickMenu)}
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
      <StampsAddDialog />
      <StampMovDialog />
    </div>
  );
}

export default withRouter(StampsTable);
