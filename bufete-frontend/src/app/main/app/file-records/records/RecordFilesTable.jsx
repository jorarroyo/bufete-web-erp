import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { AppId } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import FileManagerDialog from '../../file-manager/FileManagerDialog';
import * as fileActions from '../../file-manager/store/actions';
import * as Actions from '../store/actions/records';
import RecordFilesTableHead from './RecordFilesTableHead';
import RecordFileStateChange from './RecordFileStateChange';
import RecordInnerMenu from './RecordInnerMenu';
import RecordFilesMerge from './RecordFilesMerge';

const initialData = {
  totalElements: 1,
  content: null,
};

function RecordFilesTable(props) {
  const dispatch = useDispatch();
  const records = useSelector(({ recordsApp }) => recordsApp.records.data);
  const searchText = useSelector(({ recordsApp }) => recordsApp.records.searchText);
  const loading = useSelector(({ recordsApp }) => recordsApp.records.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
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
    dispatch(Actions.getRecords(page, rowsPerPage, searchText.toLowerCase(), order));
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
      dispatch(Actions.openChangeStatusRecordDialog(id, status));
    } else if (link === '#2') {
      dispatch(fileActions.openFileManagerDialog(id, AppId.EXPEDIENTES, status));
    } else if (link === 'mergeRecordFile') {
      dispatch(Actions.openMergeRecordFileDialog(id));
    } else {
      props.history.push(link.replace(':id', id));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <RecordFilesTableHead order={order} onRequestSort={handleRequestSort} rowCount="1" />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.client_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.file_num}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.subject}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.opening_date}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.type}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.updated_by}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {RecordInnerMenu(n, handleClickMenu)}
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
      <RecordFileStateChange />
      <LoadingComponent loadingRecord={loading} />
      <FileManagerDialog />
      <RecordFilesMerge />
    </div>
  );
}

export default withRouter(RecordFilesTable);
