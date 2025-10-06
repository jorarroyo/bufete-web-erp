import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { dialogConstants } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TextField, Toolbar, Typography } from '@material-ui/core';
import CodeRain from 'coderain';
import * as Actions from 'app/main/app/billing-process/store/actions/expenses';
import SearchRecordFileDialog from 'app/main/shared/recordSearch/SearchRecordFileDialog';
import RecordServices from 'app/services/file-records/recordsService';

const defaultFormState = {
  id: '',
  file_record_id: '',
  record_file_name: '',
  record_client_name: '',
  expense_value: 0,
};

const ExpenseDetailsDialog = () => {
  const dispatch = useDispatch();
  const expenseDetailsDialog = useSelector(({ expensesApp }) => expensesApp.expense.expenseDetailsDialog);
  const cr = new CodeRain('999999');
  const newId = cr.next();
  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (expenseDetailsDialog.type === 'edit' && expenseDetailsDialog.data) {
      setForm({ ...expenseDetailsDialog.data });
    }
    if (expenseDetailsDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...expenseDetailsDialog.data,
        id: newId,
      });
    }
  }, [expenseDetailsDialog.data, expenseDetailsDialog.type, setForm]);
  const handleNameSelect = async (itemId, itemName) => {
    setInForm('file_record_id', itemId);
    setInForm('record_file_name', itemName);
    const response = await RecordServices.getClientNameByRecordId(itemId);
    setInForm('record_client_name', response);
  };
  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (expenseDetailsDialog.props.open) {
      initDialog();
    }
  }, [expenseDetailsDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeExpenseDetailsDialog());
  }

  function canBeSubmitted() {
    if (expenseDetailsDialog.type === 'edit') {
      return (
        (form.file_record_id !== '' && form.file_record_id !== defaultFormState.file_record_id) ||
        (form.expense_value !== '' && form.expense_value !== defaultFormState.expense_value)
      );
    }
    return form.file_record_id !== '' && form.expense_value !== '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createExpenseDetails({ ...form, expense_value: parseInt(form.expense_value) }));
    closeComposeDialog();
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
            {expenseDetailsDialog.type === 'new' ? 'Nuevo Detalle de Gasto' : 'Editar Detalle de Gasto'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">list_alt</Icon>
            </div>
            <SearchRecordFileDialog handleNameSelect={handleNameSelect} labelName={form.record_file_name || ''} />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">contacts</Icon>
            </div>
            <TextField
              id="record_client_name"
              name="record_client_name"
              label="Nombre del Cliente"
              className="mt-8 mb-16"
              value={form.record_client_name}
              onChange={handleChange}
              variant="outlined"
              disabled
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">payments</Icon>
            </div>
            <TextField
              id="expense_value"
              name="expense_value"
              label="Valor del gasto"
              className="mt-8 mb-16"
              value={form.expense_value}
              error={form.expense_value === ''}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
              type="Number"
              required
              fullWidth
            />
          </div>
        </DialogContent>

        {expenseDetailsDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
              Agregar
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} disabled={!canBeSubmitted()}>
              Guardar
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default ExpenseDetailsDialog;
