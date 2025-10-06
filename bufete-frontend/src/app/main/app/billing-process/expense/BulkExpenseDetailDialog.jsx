import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { dialogConstants } from 'app/constants/appConstant';
import CodeRain from 'coderain';
import * as Actions from 'app/main/app/billing-process/store/actions/expenses';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent, makeStyles, MenuItem, TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  hidden: {
    display: 'none'
  },
});

const defaultFormState = {
  id: '',
  file_records:[],
  time_frame: '',
};

const BulkExpenseDetailDialog = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const expenseDetailsDialog = useSelector(({ expensesApp }) => expensesApp.expense.bulkExpenseDetailsDialog);
  const cr = new CodeRain('999999');
  const { form, handleChange } = useForm(defaultFormState);


  const getFileRecordsCallbackHandler = useCallback( (fileRecordsData) => {
    fileRecordsData.forEach( (item) => {
      const newId = cr.next();
      const payload = {
        id: newId,
        file_record_id: item.id,
        record_file_name: item.file_num,
        record_client_name: item.client_name,
        expense_value: 0,
      }
      dispatch(Actions.createExpenseDetails(payload));
    });
    closeComposeDialog();
  },[]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (expenseDetailsDialog.hasOwnProperty("file_records") && expenseDetailsDialog.file_records.length >= 0) {
      getFileRecordsCallbackHandler(expenseDetailsDialog.file_records);
    }
  }, [expenseDetailsDialog, getFileRecordsCallbackHandler]);

  function closeComposeDialog() {
    dispatch(Actions.closeBulkExpenseDetailsDialog());
  }

  function canBeSubmitted() {
    return form.time_frame !== '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    const spinner = document.getElementById("spinner");
    const addButton = document.getElementById("addButton");

    spinner.classList.forEach(( className) => {
      if (className.match (/(^|\s)makeStyles-hidden-\S+/g)) spinner.classList.remove(className);
    });
    addButton.classList.add("Mui-disabled");

    dispatch(Actions.getFileRecordsByTimeFrame(form.time_frame));
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...expenseDetailsDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
             Agregar Varios Detalles de Gasto
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <TextField
            id="time_frame"
            name="time_frame"
            label="Con Actividad de Procuraci&oacute;n en:"
            variant="outlined"
            className="mt-8 mb-16"
            value={form.time_frame}
            onChange={handleChange}
            select
            required
            fullWidth
          >
            <MenuItem key="todos" value="24">
              Todos
            </MenuItem>
            <MenuItem key="hoy" value="25">
              Hoy
            </MenuItem>
            <MenuItem key="ayer" value="26">
              Ayer
            </MenuItem>
            <MenuItem key="anteayer" value="27">
              Anteayer
            </MenuItem>
            <MenuItem key="semana-actual" value="28">
              Semana actual
            </MenuItem>
            <MenuItem key="semana-pasada" value="29">
              Semana pasada
            </MenuItem>
            <MenuItem key="semana-antepasada" value="30">
              Semana antepasada
            </MenuItem>
            <MenuItem key="mes-actual" value="31">
              Mes actual
            </MenuItem>
            <MenuItem key="mes-pasado" value="32">
              Mes pasado
            </MenuItem>
            <MenuItem key="mes-antepasado" value="33">
              Mes antepasado
            </MenuItem>
            <MenuItem key="año-actual" value="34">
              Año actual
            </MenuItem>
            <MenuItem key="año-pasado" value="35">
              Año pasado
            </MenuItem>
            <MenuItem key="año-antepasado" value="36">
              Año antepasado
            </MenuItem>
          </TextField>
        </DialogContent>
          <DialogActions className="justify-between pl-16">
            <Button id={"addButton"} variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
              Agregar
            </Button>
            <CircularProgress id={"spinner"} className={classes.hidden}/>
        </DialogActions>

      </form>
    </Dialog>
  );
};

export default BulkExpenseDetailDialog;
