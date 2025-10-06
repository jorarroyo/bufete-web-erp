import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell, TablePagination } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import StampDutyService from 'app/services/inventory/stampDutyService';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import { FuseScrollbars } from '@fuse';
import StampDutyTableHeader from './StampDutyTableHeader';
import StampDutyAddDialog from './StampDutyAddDialog';
import * as Actions from '../store/actions/stamp-duty';
import StampDutyInnerMenu from './StampDutyInnerMenu';

function StampDutiesTable(props) {
  const dispatch = useDispatch();
  const stampDuty = useSelector(({ stampDutyApp }) => stampDutyApp.stampDuty.data);
  const searchText = useSelector(({ stampDutyApp }) => stampDutyApp.stampDuty.searchText);
  const loadingRecord = useSelector(({ stampDutyApp }) => stampDutyApp.stampDuty.loadingRecord);
  const stampDutyDialog = useSelector(({ stampDutyApp }) => stampDutyApp.stampDuty.reload);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(stampDuty);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  async function fetchData(pageNo, pageSize, searchTxt, orderCol) {
    const response = await StampDutyService.getAllStampDuty(pageNo, pageSize, searchTxt, orderCol);
    setData(response);
  }

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText.toLowerCase(), order);
    dispatch(Actions.success());
  }, [dispatch, page, rowsPerPage, searchText, order, stampDutyDialog]);

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

  async function handleDelete() {
    await StampDutyService.deleteEmployee(selected).then(() => {
      setData(stampDuty);
      setSelected([]);
      fetchData(page, rowsPerPage, searchText.toLowerCase(), order);
    });
  }

  function handleClickMenu(id, status, link) {
    if (link !== '#') {
      props.history.push(link.replace(':id', id));
    } else {
      // dispatch(Actions.openEditRecordDialog(id, status));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <StampDutyTableHeader
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
                return (
                  <TableRow className="h-64 cursor-pointer" hover role="checkbox" tabIndex={-1} key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.stamp_type_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.designation_type_name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.year}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.total_stamp_number}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {StampDutyInnerMenu(n, handleClickMenu)}
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
      <LoadingComponent loadingRecord={loadingRecord} />
      <StampDutyAddDialog />
    </div>
  );
}

export default withRouter(StampDutiesTable);
