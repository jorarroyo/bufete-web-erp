import { FuseScrollbars } from '@fuse';
import { Checkbox, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { statusName, tableConstants } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import StatusName from 'app/main/shared/StatusName';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions/employees';
import EmployeesTableHead from './EmployeesTableHead';

const initialData = {
  totalElements: 0,
  content: null,
};

function EmployeesTable(props) {
  const dispatch = useDispatch();
  const employees = useSelector(({ employeesApp }) => employeesApp.employees.data);
  const searchText = useSelector(({ employeesApp }) => employeesApp.employees.searchText);
  const loading = useSelector(({ employeesApp }) => employeesApp.employees.loading);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'id',
  });

  useEffect(() => {
    setData(employees);
  }, [employees]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getEmployees(page, rowsPerPage, searchText.toLowerCase(), order));
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

  function handleClick(item) {
    if (item.status === statusName.ACTIVO) {
      props.history.push(`/apps/file-records/employees/${item.id}`);
    }
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
    dispatch(Actions.deleteEmployee(selected));
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <EmployeesTableHead
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
                    onClick={() => handleClick(n)}
                  >
                    <TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
                      <Checkbox checked={isSelected} onClick={event => event.stopPropagation()} onChange={() => handleCheck(n.id)} />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.nit}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.igss}
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
    </div>
  );
}

export default withRouter(EmployeesTable);
