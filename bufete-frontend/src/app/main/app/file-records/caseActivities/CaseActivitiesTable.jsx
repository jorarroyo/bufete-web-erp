import { Table, TableBody, TableCell, TablePagination, TableRow, makeStyles, Icon, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CaseActivityType, tableConstants } from 'app/constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions/case-activities';
import CaseActivitiesTableHead from './CaseActivitiesTableHead';
import CaseActivitiesInnerMenu from './CaseActivitiesInnerMenu';
import { FuseScrollbars } from '@fuse';
import CaseActivityDialog from './CaseActivityDialog';
import CaseActRecordUpdate from './CaseActRecordUpdate';

const initialData = {
  totalElements: 1,
  content: null,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'justify',
    color: theme.palette.text.secondary,
  },
}));

function CaseActivitiesTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cases = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.data);
  const searchText = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.searchText);
  const loading = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.loading);

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableConstants.DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'file_num',
  });
  const [expandedRows, setExpandedRows] = useState([]);

  function handleRowClick(rowId) {
    const currentExpandedRows = expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ? currentExpandedRows.filter(id => id !== rowId) : currentExpandedRows.concat(rowId);

    setExpandedRows(newExpandedRows);
  }

  useEffect(() => {
    setData(cases);
  }, [cases]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  useEffect(() => {
    dispatch(Actions.getAllCaseActivities(page, rowsPerPage, searchText.toLowerCase(), order));
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
      dispatch(Actions.openEditCaseActivityDialog(id));
    } else if (link === '#2') {
      dispatch(Actions.removeCaseActivity(id));
    } else if (link === '#3') {
      dispatch(Actions.openChangeRecordActivityDialog(id, CaseActivityType.PROCURACION));
    }
  }

  function renderItemCaret(rowId) {
    const currentExpandedRows = expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    if (isRowCurrentlyExpanded) {
      return <Icon>keyboard_arrow_down</Icon>;
    }
    return <Icon>keyboard_arrow_up</Icon>;
  }

  function renderItemDetails(item) {
    return (
      <div className={classes.root}>
        <Grid container spacing={1} direction="row" justify="space-around" alignItems="center">
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <p className={classes.paper}>Institucion: {item.institution_name}</p>
            </Grid>
            <Grid item xs={4}>
              <p className={classes.paper}>Comentario: {item.comment}</p>
            </Grid>
            <Grid item xs={4}>
              <p className={classes.paper}>
                Cheque: {item.check_number}
                <br />
                Monto: {item.check_amount}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  function renderItem(item, index) {
    const clickCallback = () => handleRowClick(index);
    const itemRows = [
      <TableRow key={`row-data-${index}`}>
        <TableCell onClick={clickCallback}>{renderItemCaret(index)}</TableCell>
        <TableCell component="th" scope="row">
          {item.activity_name}
        </TableCell>

        <TableCell component="th" scope="row">
          {item.file_num}
        </TableCell>

        <TableCell component="th" scope="row">
          {item.assign_date}
        </TableCell>

        <TableCell component="th" scope="row">
          {item.employee_name}
        </TableCell>

        <TableCell component="th" scope="row">
          {item.status}
        </TableCell>

        <TableCell component="th" scope="row">
          {item.created}
        </TableCell>

        <TableCell component="th" scope="row">
          {CaseActivitiesInnerMenu(item, handleClickMenu)}
        </TableCell>
      </TableRow>,
    ];

    if (expandedRows.includes(index)) {
      itemRows.push(
        <TableRow key={`row-expanded-${index}`}>
          <TableCell colSpan="7">{renderItemDetails(item)}</TableCell>
        </TableRow>
      );
    }

    return itemRows;
  }

  let allItemRows = [];

  data.content &&
    data.content.forEach((item, index) => {
      const perItemRows = renderItem(item, index);
      allItemRows = allItemRows.concat(perItemRows);
    });

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle" stickyHeader>
          <CaseActivitiesTableHead order={order} onRequestSort={handleRequestSort} rowCount="1" />
          <TableBody>{allItemRows}</TableBody>
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
      <CaseActivityDialog />
      <CaseActRecordUpdate />
    </div>
  );
}

export default withRouter(CaseActivitiesTable);
