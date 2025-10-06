import { Checkbox, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import StatusName from 'app/main/shared/StatusName';
import ActivitySettleServices from 'app/services/file-records/activitySettleService';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import ActivitySettleInnerMenu from './ActivitySettleInnerMenu';
import ActivitySettleTableHeader from './ActivitySettleTableHeader';

function ActivitySettleTable(props) {
  const dispatch = useDispatch();
  const activitySettle = useSelector(({ activitySettleApp }) => activitySettleApp.activitySettle.data);
  const searchText = useSelector(({ activitySettleApp }) => activitySettleApp.activitySettle.searchText);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(activitySettle);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });
  const { proctorAgendaId } = props;

  async function fetchData(pageNo, pageSize, id, searchTxt, orderCol) {
    const response = await ActivitySettleServices.getAllActivitySettle(pageNo, pageSize, id, searchTxt, orderCol);
    setData(response);
  }

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    fetchData(page, rowsPerPage, proctorAgendaId, searchText, order);
  }, [dispatch, page, rowsPerPage, searchText, order, proctorAgendaId]);

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
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  function handleCheck(id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  }

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  async function handleDelete() {
    await ActivitySettleServices.deleteActivitySettle(selected).then(() => {
      setData(activitySettle);
      setSelected([]);
      fetchData(page, rowsPerPage, searchText, order);
    });
  }

  function handleClickMenu(id, status, link) {
    // if (link !== '#') {
    props.history.push(link.replace(':proctorAgendaId', proctorAgendaId).replace(':id', id));
    // } else {
    //   dispatch(Actions.openEditRecordDialog(id, status));
    // }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <ActivitySettleTableHeader
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            onDeleteSelected={handleDelete}
            rowCount={data.totalElements}
          />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={() => handleClick(n)}
                  >
                    <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                      <Checkbox checked={isSelected} onClick={event => event.stopPropagation()} onChange={() => handleCheck(n.id)} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.invoice_num}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.invoice_name}
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {n.invoice_total}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <StatusName name={n.status} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.assign_date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {ActivitySettleInnerMenu(n, handleClickMenu)}
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
    </div>
  );
}

export default withRouter(ActivitySettleTable);
