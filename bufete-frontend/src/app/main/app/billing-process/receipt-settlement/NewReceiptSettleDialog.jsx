import React, { useCallback, useEffect, useState } from 'react';
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
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { dialogConstants, ReceiptSettlementType, statusName } from 'app/constants/appConstant';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import CodeRain from 'coderain';
import * as Actions from '../store/actions/receipt-settlements';
import receiptSettlementServices from '../../../../services/billing-process/receiptSettlementServices';
import helperFunctions from '../../../../utils/helperFunc';

const defaultFormState = {
  id: '',
  comment: '',
  object_type: ReceiptSettlementType.LIBRE,
  cost_per_hour: 0,
  exchange_value: 1,
  cost_detail: 0,
  discount: 0,
  discount_type: false,
  use_isr: false,
  use_iva: false,
  use_billing: true,
  total: 0,
  status: statusName.ACTIVO,
  advance_balance: '',
};

const NewReceiptSettleDialog = () => {
  const dispatch = useDispatch();
  const receiptSettleLineDialog = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlement.receiptSettleDialog);
  const cr = new CodeRain('#####');
  const newId = cr.next();
  const { form, setInForm, handleChange, setForm } = useForm(defaultFormState);
  const [advanceBalanceList, setAdvanceBalanceList] = useState([]);

  const initDialog = useCallback(() => {
    if (receiptSettleLineDialog.type === 'edit' && receiptSettleLineDialog.data) {
      setForm({ ...receiptSettleLineDialog.data });
    }
    if (receiptSettleLineDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...receiptSettleLineDialog.data,
        id: newId,
      });
    }
  }, [receiptSettleLineDialog.data, receiptSettleLineDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (receiptSettleLineDialog.props.open) {
      initDialog();
    }
  }, [receiptSettleLineDialog.props.open, initDialog]);

  useEffect(() => {
    async function fetchData() {
      if (advanceBalanceList.length === 0 && form.clientId) {
        const response = await receiptSettlementServices.getAdvanceBalanceList(form.clientId);
        setAdvanceBalanceList(response);
      }
    }
    fetchData();
  }, [advanceBalanceList, form]);

  function closeComposeDialog() {
    dispatch(Actions.closeReceiptSettleLineDialog());
  }

  function canBeSubmitted() {
    return form.comment.length > 0 && form.cost_detail > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createReceiptSettlementLine(form));
    closeComposeDialog();
  }

  function handleCalc(e) {
    const { name, value } = e.target;
    setInForm(name, Number(value));
    switch (name) {
      case 'cost_per_hour':
        setInForm('cost_detail', (Number(value) * Number(form.exchange_value) * Number(form.activity_time)) / 60);
        break;
      case 'exchange_value':
        setInForm('cost_detail', (Number(value) * Number(form.cost_per_hour) * Number(form.activity_time)) / 60);
        break;
      case 'advance_balance': {
        const selected = advanceBalanceList.find(s => s.id === value);
        setInForm('cost_detail', Number(selected.value));
        setInForm('comment', `Anticipo Recibo #${selected.receipt}`);
        break;
      }
      default:
    }
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...receiptSettleLineDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {receiptSettleLineDialog.type === 'new' ? 'Nueva Línea' : 'Editar Línea'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          {[ReceiptSettlementType.LIBRE, ReceiptSettlementType.ISR, ReceiptSettlementType.ANTICIPO].includes(form.object_type) && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">supervised_user_circle</Icon>
              </div>
              <TextField
                id="object_type"
                name="object_type"
                label="Tipo de Detalle"
                variant="outlined"
                className="mt-8 mb-16"
                value={form.object_type}
                onChange={handleChange}
                error={form.object_type === ''}
                disabled={receiptSettleLineDialog.type === 'edit'}
                select
                fullWidth
                required
              >
                <MenuItem key="libre" value={ReceiptSettlementType.LIBRE}>
                  Linea Detalle
                </MenuItem>
                <MenuItem key="anticipo" value={ReceiptSettlementType.ANTICIPO}>
                  Anticipo
                </MenuItem>
                <MenuItem key="isr" value={ReceiptSettlementType.ISR}>
                  ISR
                </MenuItem>
              </TextField>
            </div>
          )}
          {form.object_type !== ReceiptSettlementType.ANTICIPO && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">supervised_user_circle</Icon>
              </div>
              <TextField
                className="mt-8 mb-16"
                error={form.comment === ''}
                required
                label="Descripción"
                id="comment"
                autoFocus
                name="comment"
                value={form.comment}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </div>
          )}
          {form.object_type === ReceiptSettlementType.ANTICIPO && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">supervised_user_circle</Icon>
              </div>
              <TextField
                id="advance_balance"
                name="advance_balance"
                label="Lista de anticipos"
                variant="outlined"
                className="mt-8 mb-16"
                value={form.advance_balance}
                onChange={handleCalc}
                error={form.advance_balance === ''}
                select
                fullWidth
                required
              >
                {advanceBalanceList ? (
                  advanceBalanceList.map(ab => (
                    <MenuItem key={ab.id} value={ab.id}>
                      {`Recibo #${ab.receipt} ${helperFunctions.numberFormat('en-US', 'currency', ab.currency, ab.value)}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="none">Sin registros....</MenuItem>
                )}
              </TextField>
            </div>
          )}
          {form.object_type === ReceiptSettlementType.HONORARIOS && (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">hourglass_empty</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Costo Hora"
                  value={form.cost_per_hour}
                  onChange={handleCalc}
                  name="cost_per_hour"
                  id="cost_per_hour"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">shuffle</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Tipo Cambio"
                  value={form.exchange_value}
                  onChange={handleCalc}
                  name="exchange_value"
                  id="exchange_value"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
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
              label="Monto"
              value={form.cost_detail}
              onChange={handleChange}
              name="cost_detail"
              id="cost_detail"
              variant="outlined"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
              fullWidth
              required
              disabled={[ReceiptSettlementType.HONORARIOS, ReceiptSettlementType.TIMBRES, ReceiptSettlementType.GASTOS, ReceiptSettlementType.ANTICIPO].includes(form.object_type)}
            />
          </div>
          {![ReceiptSettlementType.ISR, ReceiptSettlementType.ANTICIPO].includes(form.object_type) && (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Descuento"
                  value={form.discount}
                  onChange={handleChange}
                  name="discount"
                  id="discount"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                  required
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money_off</Icon>
                </div>
                <FormControlLabel
                  value={form.discount_type}
                  control={<Checkbox defaultChecked={form.discount_type} color="primary" />}
                  name="discount_type"
                  id="discount_type"
                  label="¿Descuento Solicitado?"
                  labelPlacement="start"
                  onChange={handleChange}
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
                />
              </div>
            </>
          )}
          {form.object_type === ReceiptSettlementType.LIBRE && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">account_balance</Icon>
              </div>
              <FormControlLabel
                value={form.use_billing}
                control={<Checkbox defaultChecked={form.use_billing} color="primary" />}
                name="use_billing"
                id="use_billing"
                label="¿Afecta Facturación?"
                labelPlacement="start"
                onChange={handleChange}
              />
            </div>
          )}
        </DialogContent>
        {receiptSettleLineDialog.type === 'new' ? (
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

export default NewReceiptSettleDialog;
