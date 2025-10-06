import { FuseScrollbars } from '@fuse';
import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { AppId, tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FileManagerDialog from '../../file-manager/FileManagerDialog';
import * as FileActions from '../../file-manager/store/actions';
import * as Actions from '../store/actions/clients';
import ClientInnerMenu from './ClientInnerMenu';
import ClientsTableHead from './ClientsTableHead';

const initialData = {
  totalElements: 0,
  content: null,
};

function ClientsTable(props) {
  const dispatch = useDispatch();
  const clients = useSelector(({ clientsApp }) => clientsApp.clients.data);
  const searchText = useSelector(({ clientsApp }) => clientsApp.clients.searchText);
  const loading = useSelector(({ clientsApp }) => clientsApp.clients.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(clients);
  }, [clients]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getClients(page, rowsPerPage, searchText.toLowerCase(), order));
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

  async function handleDelete(id) {
    dispatch(Actions.deleteClient(id));
  }

  function handleClickMenu(id, status, link) {
    if (link === '#1') {
      handleDelete(id);
    } else if (link === '#2') {
      dispatch(FileActions.openFileManagerDialog(id, AppId.CLIENTES));
    } else {
      props.history.push(link.replace(':id', id));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <ClientsTableHead numSelected={0} order={order} onRequestSort={handleRequestSort} rowCount={data.totalElements} />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.nit}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.client_type}
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.created_by}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.updated_by}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {ClientInnerMenu(n, handleClickMenu)}
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
      <FileManagerDialog />
      <LoadingComponent loadingRecord={loading} />
    </div>
  );
}

export default withRouter(ClientsTable);
