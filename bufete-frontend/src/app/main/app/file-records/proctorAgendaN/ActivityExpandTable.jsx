import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Icon, Grid, makeStyles, IconButton } from '@material-ui/core';
import { statusName } from 'app/constants/appConstant';

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

const ActivityExpandTable = ({ data, showButton, dispatchFunction }) => {
  const classes = useStyles();
  const [expandedRows, setExpandedRows] = useState([]);

  function handleRowClick(rowId) {
    const currentExpandedRows = expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ? currentExpandedRows.filter(id => id !== rowId) : currentExpandedRows.concat(rowId);

    setExpandedRows(newExpandedRows);
  }

  function renderItemCaret(rowId) {
    const currentExpandedRows = expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    if (isRowCurrentlyExpanded) {
      return <Icon>keyboard_arrow_down</Icon>;
    } else {
      return <Icon>keyboard_arrow_up</Icon>;
    }
  }

  function renderButton(id, status) {
    return (
      <div className="flex items-center">
        {showButton  && status === statusName.ABIERTO && (
          <IconButton
            onClick={ev => {
              ev.stopPropagation();
              dispatchFunction(id, status);
            }}
          >
            <Icon>compare_arrows</Icon>
          </IconButton>
        )}
      </div>
    );
  }

  function renderItemDetails(item) {
    return (
      <div className={classes.root}>
        <Grid 
          container
          spacing={1}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
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
      <TableRow key={'row-data-' + index}>
        <TableCell onClick={clickCallback}>{renderItemCaret(index)}</TableCell>
        <TableCell>{item.file_num}</TableCell>
        <TableCell>{item.activity_name}</TableCell>
        <TableCell>{item.assign_date}</TableCell>
        <TableCell>{item.status}</TableCell>
        <TableCell>{`${item.currency_type === 1 ? 'QTZ' : 'USD'} ${item.activity_cost}`}</TableCell>
        <TableCell>{renderButton(item.id, item.status)}</TableCell>
      </TableRow>,
    ];

    if (expandedRows.includes(index)) {
      itemRows.push(
        <TableRow key={'row-expanded-' + index}>
          <TableCell colSpan="7">{renderItemDetails(item)}</TableCell>
        </TableRow>
      );
    }

    return itemRows;
  }

  let allItemRows = [];

  data.forEach((item, index) => {
    const perItemRows = renderItem(item, index);
    allItemRows = allItemRows.concat(perItemRows);
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Expediente</TableCell>
          <TableCell>Actividad</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Monto</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>{allItemRows}</TableBody>
    </Table>
  );
};

export default ActivityExpandTable;
