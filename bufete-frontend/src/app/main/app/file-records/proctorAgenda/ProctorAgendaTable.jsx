import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import * as Actions from '../store/actions/proctor-agenda';
import ProctorAgendaInnerMenu from './ProctorAgendaInnerMenu';
import ProctorAgendaStateChange from './ProctorAgendaStateChange';
import ProctorAgendaTableHeader from './ProctorAgendaTableHeader';
import AssignedActivityList from './AssignedActivityList';

const initialData = {
  totalElements: 1,
  content: null,
};

function ProctorAgendaTable(props) {
  const dispatch = useDispatch();
  const proctorAgenda = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.proctorAgenda.data);
  const searchText = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.proctorAgenda.searchText);
  const loading = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.proctorAgenda.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(proctorAgenda);
  }, [proctorAgenda]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getAllProctorAgenda(page, rowsPerPage, searchText, order));
  }, [dispatch, page, rowsPerPage, searchText, order]);

  function handleRequestSort(property) {
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
      dispatch(Actions.openEditProctorAgendaDialog(id, status));
      return;
    }
    if (link === '#2') {
      dispatch(Actions.openGetAssignedActivitiesDialog(id));
      return;
    }
    props.history.push(link.replace(':id', id));
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <ProctorAgendaTableHeader order={order} onRequestSort={handleRequestSort} rowCount="1" />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.assign_date}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.employee_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.comment}
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {n.proctor_agenda_cost_local}
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {n.proctor_agenda_cost_outer}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.modified}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {ProctorAgendaInnerMenu(n, handleClickMenu)}
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
      <ProctorAgendaStateChange />
      <LoadingComponent loadingRecord={loading} />
      <AssignedActivityList />
    </div>
  );
}

export default withRouter(ProctorAgendaTable);
