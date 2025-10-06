import { FuseScrollbars } from '@fuse';
import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { tableConstants } from 'app/constants/appConstant';
import RecordServices from 'app/services/file-records/recordsService';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchRecordFilesTableHead from './SearchRecordFileTableHead';

function SearchRecordFileTable(props) {
  const dispatch = useDispatch();
  const { handleSelect, searchAll } = props;
  const records = useSelector(({ searchRecordsApp }) => searchRecordsApp.searchRecords.data);
  const searchText = useSelector(({ searchRecordsApp }) => searchRecordsApp.searchRecords.searchText);

  const [data, setData] = useState(records);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'id',
  });
  const [selected, setSelected] = useState(-1);

  async function fetchData(pageNo, pageSize, searchTxt, orderCol) {
    const response = await RecordServices.getRecordFilesSearch(pageNo, pageSize, searchTxt, orderCol, searchAll);
    setData(response);
  }

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    fetchData(page, rowsPerPage, searchText.toLowerCase(), order);
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

  function handleClick(item) {
    handleSelect(item);
    setSelected(item.id);
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <SearchRecordFilesTableHead order={order} onRequestSort={handleRequestSort} rowCount="1" />

          <TableBody>
            {data.content &&
              data.content.map(n => {
                const isSelected = selected === n.id;
                return (
                  <TableRow className="h-64 cursor-pointer" hover tabIndex={-1} key={n.id} selected={isSelected} onClick={event => handleClick(n)}>
                    <TableCell component="th" scope="row">
                      {n.type}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.file_num}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.opening_date}
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
    </div>
  );
}

export default withRouter(SearchRecordFileTable);
