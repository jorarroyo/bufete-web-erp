import { AppBar, Button, Checkbox, Dialog, DialogActions, DialogContent, TableCell, TableRow, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import EditableTableCell from 'app/main/shared/EditableTableCell';
import SearchTable from 'app/main/shared/SearchTable';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/proctor-agenda';

const headCells = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'activity_name', numeric: false, disablePadding: false, label: 'Actividad' },
  { id: 'institution_name', numeric: false, disablePadding: false, label: 'Institucion' },
  { id: 'invoice_currency', numeric: false, disablePadding: false, label: 'Moneda' },
  { id: 'cost_detail', numeric: false, disablePadding: false, label: 'Monto' },
];

const optionList = [{ id: 1, name: 'Quetzales' }, { id: 2, name: 'Dolares' }];

const AssignActivitiesDialog = () => {
  const dispatch = useDispatch();
  const caseActivityDialog = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.caseActivityDialog);
  const [assignedActivities, setAssignedActivities] = useState([]);
  const [settleActivities, setSettleActivities] = useState([]);

  const initDialog = useCallback(() => {
    if (caseActivityDialog.type === 'edit' && caseActivityDialog.data) {
      setAssignedActivities([...caseActivityDialog.data]);
    }
  }, [caseActivityDialog.data, caseActivityDialog.type, setAssignedActivities]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (caseActivityDialog.props.open) {
      initDialog();
    }
  }, [caseActivityDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeAddCaseActivityDialog());
  }

  function canBeSubmitted() {
    return !isEmpty(assignedActivities);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newList = settleActivities
      .filter(item => assignedActivities.includes(item.id))
      .map(item => ({
        id: item.id,
        fieldValue: item.fieldValue,
        type: item.currencyType,
      }));
    dispatch(Actions.assignCaseActivities(newList));
    closeComposeDialog();
  }

  function setSelectedActivities(ids) {
    setAssignedActivities(ids);
  }

  function handleTextFieldChange(rowIndex) {
    if (settleActivities.find(x => x.id === rowIndex.id)) {
      setSettleActivities(
        settleActivities.map(item => {
          if (item.id === rowIndex.id) {
            if (rowIndex.fieldName === 'cost_detail') {
              return { id: item.id, fieldValue: Number(rowIndex.fieldValue), currencyType: item.currencyType };
            }
            return { id: item.id, fieldValue: item.fieldValue, currencyType: rowIndex.fieldValue };
          }
          return item;
        })
      );
    } else if (rowIndex.fieldName === 'cost_detail') {
      setSettleActivities([...settleActivities, { id: rowIndex.id, fieldValue: Number(rowIndex.fieldValue), currencyType: 1 }]);
    } else {
      setSettleActivities([...settleActivities, { id: rowIndex.id, fieldValue: 0, currencyType: rowIndex.fieldValue }]);
    }
  }

  function createTableRow(handleClick, row, isItemSelected, labelId) {
    return (
      <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleClick(event, row.id)} />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.file_num}
        </TableCell>
        <TableCell align="right">{row.activity_name}</TableCell>
        <TableCell align="right">{row.institution_name}</TableCell>
        <EditableTableCell row={row} fieldName="invoice_currency" onCellValueChange={handleTextFieldChange} type="select" options={optionList} />
        <EditableTableCell 
          row={row}
          fieldName="cost_detail"
          onCellValueChange={handleTextFieldChange}
          type="input"
          props={{ 
            type: 'number',
            inputProps: {
              min: 0,
            },
          }}
        />
      </TableRow>
    );
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...caseActivityDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Asignar Actividades a procurador
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <SearchTable
            data={caseActivityDialog.data}
            title="Actividades"
            setSelectedActivities={setSelectedActivities}
            headCells={headCells}
            tableRow={createTableRow}
            useCheckBox
          />
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Asignar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AssignActivitiesDialog;
