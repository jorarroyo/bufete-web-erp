import { FuseScrollbars } from '@fuse';
import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions/stamp-mov';
import StampMovTableHead from './StampMovTableHead';
import LoadingComponent from 'app/main/shared/LoadingComponent';

function StampMovTable(props) {
  const dispatch = useDispatch();
  const stampMov = useSelector(({ stampMovApp }) => stampMovApp.stampMov.data);
  const searchText = useSelector(({ stampMovApp }) => stampMovApp.stampMov.searchText);
  const loading = useSelector(({ stampMovApp }) => stampMovApp.stampMov.loading);

  const { productId } = props;

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(stampMov);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(stampMov);
  }, [stampMov])

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    if (productId) {
      dispatch(Actions.getStampMovs(productId, page, rowsPerPage, searchText.toLowerCase(), order));
    }
  }, [dispatch, page, rowsPerPage, searchText, order, productId]);

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

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <StampMovTableHead
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
                      {n.id}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.request_date}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.file_num}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.requester_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.action}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.quantity}
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
      />
      <LoadingComponent loadingRecord={loading} />
    </div>
  );
}

export default withRouter(StampMovTable);
