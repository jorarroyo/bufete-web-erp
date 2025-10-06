import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Icon,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { dialogConstants, statusName } from 'app/constants/appConstant';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import CodeRain from 'coderain';
import * as Actions from '../store/actions/receipts';

const defaultFormState = {
  id: '',
  description: '',
  line_amount: 0,
  line_discount: 0,
  line_total: 0,
  use_isr: false,
  use_iva: false,
  status: statusName.ACTIVO,
};

const NewReceiptDialog = () => {
  const dispatch = useDispatch();
  const receiptLineDialog = useSelector(({ receiptApp }) => receiptApp.receipt.receiptDialog);
  const cr = new CodeRain('#####');
  const newId = cr.next();
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (receiptLineDialog.type === 'edit' && receiptLineDialog.data) {
      setForm({ ...receiptLineDialog.data });
    }
    if (receiptLineDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...receiptLineDialog.data,
        id: newId,
      });
    }
  }, [receiptLineDialog.data, receiptLineDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (receiptLineDialog.props.open) {
      initDialog();
    }
  }, [receiptLineDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeReceiptLineDialog());
  }

  function canBeSubmitted() {
    return form.description.length > 0 && form.line_amount > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createReceiptLine(form, receiptLineDialog.isFreeReceipt));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...receiptLineDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {receiptLineDialog.type === 'new' ? 'Nueva Línea' : 'Editar Línea'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">supervised_user_circle</Icon>
            </div>
            <TextField
              className="mt-8 mb-16"
              error={form.description === ''}
              required
              label="Descripción"
              id="description"
              autoFocus
              name="description"
              value={form.description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          {!receiptLineDialog.isFreeReceipt && receiptLineDialog.type === 'edit' && typeof form.id !== 'string' ? (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Monto"
                  value={form.line_total}
                  onChange={handleChange}
                  name="line_total"
                  id="line_total"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
                  disabled={receiptLineDialog.isFreeReceipt}
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Descuento"
                  value={form.line_discount}
                  onChange={handleChange}
                  name="line_discount"
                  id="line_discount"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
                  disabled={receiptLineDialog.isFreeReceipt}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Monto"
                  value={form.line_amount}
                  onChange={handleChange}
                  name="line_amount"
                  id="line_amount"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
                  // disabled={receiptLineDialog.isFreeReceipt}
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Descuento"
                  value={form.line_discount}
                  onChange={handleChange}
                  name="line_discount"
                  id="line_discount"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
                  // disabled={receiptLineDialog.isFreeReceipt}
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">account_balance</Icon>
                </div>
                <FormControlLabel
                  value={form.use_isr}
                  control={<Checkbox defaultChecked={form.use_isr} color="primary" />}
                  name="use_isr"
                  id="use_isr"
                  label="¿usa ISR?"
                  labelPlacement="start"
                  onChange={handleChange}
                  disabled={receiptLineDialog.isFreeReceipt}
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">account_balance</Icon>
                </div>
                <FormControlLabel
                  value={form.use_iva}
                  control={<Checkbox defaultChecked={form.use_iva} color="primary" />}
                  name="use_iva"
                  id="use_iva"
                  label="¿usa IVA?"
                  labelPlacement="start"
                  onChange={handleChange}
                  disabled={receiptLineDialog.isFreeReceipt}
                />
              </div>
            </>
          )}
        </DialogContent>
        {receiptLineDialog.type === 'new' ? (
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

export default NewReceiptDialog;
