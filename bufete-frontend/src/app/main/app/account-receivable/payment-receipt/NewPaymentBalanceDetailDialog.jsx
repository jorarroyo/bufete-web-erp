import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants, statusName } from 'app/constants/appConstant';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import CodeRain from 'coderain';
import * as Actions from '../store/actions/payment-receipts';
import MySnackbarContentWrapper from '../../../shared/MySnackbarContentWrapper';

const defaultFormState = {
  id: '',
  detail_id: '',
  balance_status: statusName.ELABORADO,
  to_pay: 0,
};

const NewPaymentBalanceDetailDialog = () => {
  const dispatch = useDispatch();
  const balanceDetailDialog = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.balanceDetailDialog);
  const cr = new CodeRain('#####');
  const newId = cr.next();
  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [warningMessage, setWarningMessage] = useState('');

  const initDialog = useCallback(() => {
    if (balanceDetailDialog.data && balanceDetailDialog.data.detail_id === null) {
      setForm({
        ...defaultFormState,
        ...balanceDetailDialog.data,
        detail_id: newId,
      });
    } else {
      setForm({
        ...defaultFormState,
        ...balanceDetailDialog.data,
      });
    }
  }, [balanceDetailDialog.data, balanceDetailDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (balanceDetailDialog.props.open) {
      initDialog();
    }
  }, [balanceDetailDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeBalanceDetailsPaymentDialog());
  }

  function canBeSubmitted() {
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (Number(form.to_pay) > Number(form.balance)) {
      setWarningMessage('El pago debe ser menor al saldo');
    } else {
      setWarningMessage('');
      dispatch(Actions.createBalanceDetail(form));
      closeComposeDialog();
    }
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...balanceDetailDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Pago
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          {warningMessage && <MySnackbarContentWrapper variant="warning" style={{ width: '100%' }} message={warningMessage || ''} />}
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">view_list</Icon>
            </div>
            <TextField
              id="serial_number"
              name="serial_number"
              label="Documento"
              className="mb-24"
              value={form.serial_number}
              margin="normal"
              variant="outlined"
              fullWidth
              disabled
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">view_list</Icon>
            </div>
            <TextField
              id="series_value"
              name="series_value"
              label="Serie No."
              className="mb-24"
              value={form.series_value}
              variant="outlined"
              fullWidth
              disabled
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">money</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Total"
              value={form.balance}
              name="balance"
              id="balance"
              variant="outlined"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
              fullWidth
              disabled
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">money</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Pago"
              value={form.to_pay}
              onChange={handleChange}
              name="to_pay"
              id="to_pay"
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
        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} disabled={!canBeSubmitted()}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewPaymentBalanceDetailDialog;
