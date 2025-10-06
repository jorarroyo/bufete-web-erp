import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants, statusName } from 'app/constants/appConstant';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import CodeRain from 'coderain';
import BankServices from 'app/services/catalogs/banksServices';
import TransactionTypeServices from 'app/services/catalogs/transactionTypesServices';
import * as Actions from '../store/actions/payment-receipts';

const defaultFormState = {
  id: '',
  bank_id: '',
  bank_name: '',
  transaction_type_id: '',
  transaction_type_name: '',
  status: statusName.ACTIVO,
  total_transaction: 0,
};

const NewPaymentTransDetailDialog = () => {
  const dispatch = useDispatch();
  const transactionDetailDialog = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.transactionDetailDialog);
  const cr = new CodeRain('#####');
  const newId = cr.next();
  const { form, handleChange, setInForm, setForm } = useForm(defaultFormState);
  const [banks, setBanks] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);

  const initDialog = useCallback(() => {
    if (transactionDetailDialog.type === 'edit' && transactionDetailDialog.data) {
      setForm({ ...transactionDetailDialog.data });
    }
    if (transactionDetailDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...transactionDetailDialog.data,
        id: newId,
      });
    }
  }, [transactionDetailDialog.data, transactionDetailDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (transactionDetailDialog.props.open) {
      initDialog();
    }
  }, [transactionDetailDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeTransDetailsPaymentDialog());
  }

  useEffect(() => {
    async function fetchData() {
      if (banks.length === 0) {
        const banksResponse = await BankServices.getBankCatalog('/catalog', '');
        setBanks(banksResponse);
      }
      if (transactionTypes.length === 0) {
        const transTypeResponse = await TransactionTypeServices.getTransactionTypeCatalog('/catalog', '');
        setTransactionTypes(transTypeResponse);
      }
    }
    fetchData();
  }, [banks.length, transactionTypes.length]);

  function canBeSubmitted() {
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createTransDetail(form));
    closeComposeDialog();
  }

  function handleSelectChange(type, value) {
    setInForm(type.target.name, type.target.value);
    setInForm(type.target.name.replace('id', 'name'), value.props.children);
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...transactionDetailDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {transactionDetailDialog.type === 'new' ? 'Nueva Transacción' : 'Editar Transacción'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">view_list</Icon>
            </div>
            <TextField
              id="transaction_type_id"
              name="transaction_type_id"
              select
              label="Tipo de Transacción"
              className="mb-24"
              value={form.transaction_type_id}
              onChange={handleSelectChange}
              error={form.transaction_type_id === '' || form.transaction_type_id === 'none'}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            >
              {transactionTypes ? (
                transactionTypes.map(emp => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="none">Sin registros....</MenuItem>
              )}
            </TextField>
          </div>
          {form && form.transaction_type_id !== 4 && (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">bank</Icon>
                </div>
                <TextField
                  id="bank_id"
                  name="bank_id"
                  select
                  label="Banco"
                  className="mb-24"
                  value={form.bank_id}
                  onChange={handleSelectChange}
                  error={form.bank_id === '' || form.bank_id === 'none'}
                  variant="outlined"
                  fullWidth
                  required
                >
                  {banks ? (
                    banks.map(emp => (
                      <MenuItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="none">Sin registros....</MenuItem>
                  )}
                </TextField>
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">supervised_user_circle</Icon>
                </div>
                <TextField
                  className="mt-8 mb-16"
                  label="No. Documento"
                  id="doc_number"
                  name="doc_number"
                  value={form.doc_number}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </>
          )}
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">money</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Total"
              value={form.total_transaction}
              onChange={handleChange}
              name="total_transaction"
              id="total_transaction"
              variant="outlined"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
              fullWidth
              required
            />
          </div>
        </DialogContent>
        {transactionDetailDialog.type === 'new' ? (
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

export default NewPaymentTransDetailDialog;
