import { AppBar, Button, Dialog, DialogActions, DialogContent, Toolbar, Typography, TableRow, TableCell, Checkbox } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import SearchTable from 'app/main/shared/SearchTable';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import * as Actions from '../store/actions/activity-settle';

const headCells = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'activity_name', numeric: false, disablePadding: false, label: 'Actividad' },
  { id: 'institution_name', numeric: false, disablePadding: false, label: 'Institucion' },
  { id: 'activity_time', numeric: true, disablePadding: false, label: 'Tiempo' },
];

const AssignActivitiesDialog = () => {
  const dispatch = useDispatch();
  const caseActivityDialog = useSelector(({ activitySettleApp }) => activitySettleApp.newSettle.caseActivityDialog);
  const [assignedActivities, setAssignedActivities] = useState([]);

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
    dispatch(Actions.assignCaseActivities(assignedActivities));
    closeComposeDialog();
  }

  function setSelectedActivities(ids) {
    setAssignedActivities(ids);
  }

  function createTableRow(handleClick, row, isItemSelected, labelId) {
    return (
      <TableRow
        hover
        onClick={event => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.file_num}
        </TableCell>
        <TableCell align="right">{row.activity_name}</TableCell>
        <TableCell align="right">{row.institution_name}</TableCell>
        <TableCell align="right">{row.activity_time}</TableCell>
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
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Asignar Actividades a liquidacion
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
