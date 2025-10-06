import React, { useCallback, useEffect, useState } from 'react';
import { dialogConstants, ReceiptSettleEnumType, statusName } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import Tooltip from '@material-ui/core/Tooltip';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/receipts/receipt-options.actions';
import * as ReceiptActions from '../store/actions/receipts/receipts.actions';
import reducer from '../store/reducers/receipts';
import ClientServices from '../../../../services/file-records/clientsService';

const defaultFormState = {
  id: '',
  comment: '',
  invoiceId: '',
  invoiceValue: '',
  newAddress: '',
  clientId: null,
  subClientId: '',
  next_status: statusName.GENERADA,
  object_type: ReceiptSettleEnumType.LIBRE,
};

const GenerateReceiptDialog = () => {
  const dispatch = useDispatch();
  const invoiceSeriesDialog = useSelector(({ receiptOptionsApp }) => receiptOptionsApp.receiptOptions.invoiceSeriesDialog);

  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [seriesList, setSeriesList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const initDialog = useCallback(() => {
    if (invoiceSeriesDialog.type === 'edit') {
      setForm({
        ...defaultFormState,
        id: invoiceSeriesDialog.id,
        comment: '',
        invoiceId: '',
        clientId: invoiceSeriesDialog.clientId,
        object_type: invoiceSeriesDialog.object_type,
      });
      if (seriesList.length === 0) {
        setSeriesList(invoiceSeriesDialog.data);
      }
    }
  }, [invoiceSeriesDialog.data, seriesList, setSeriesList, invoiceSeriesDialog.id, invoiceSeriesDialog.type, setForm]);

  useEffect(() => {
    async function fetchData() {
      if (employeeList.length === 0 && form.clientId) {
        const response = await ClientServices.getClientChildren(form.clientId);
        setEmployeeList(response);
      }
    }
    fetchData();
  }, [employeeList, form]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (invoiceSeriesDialog.props.open) {
      initDialog();
    }
  }, [invoiceSeriesDialog.props.open, initDialog]);

  function canBeSubmitted() {
    return form.id !== '' && form.invoiceId !== '';
  }

  function closeComposeDialog() {
    dispatch(Actions.closeInvoiceSeriesInnerDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newForm = {
      ...form,
      invoiceValue: seriesList.find(i => i.id === form.invoiceId).series_value,
      selectedChild: employeeList.find(i => i.id === form.subClientId),
    };

    dispatch(ReceiptActions.updateReceiptState(newForm));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...invoiceSeriesDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Generar Documento Electronico
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">supervised_user_circle</Icon>
            </div>
            <TextField
              id="invoiceId"
              name="invoiceId"
              select
              label="Serie"
              className="mb-24"
              value={form.invoiceId}
              onChange={handleChange}
              SelectProps={{
                MenuProps: {
                  className: { width: '200' },
                },
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              required
              autoFocus
            >
              {seriesList ? (
                seriesList.map(emp => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.series_name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="none">Sin registros....</MenuItem>
              )}
            </TextField>
          </div>
          {form.object_type === ReceiptSettleEnumType.LIQUIDACION && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">supervised_user_circle</Icon>
              </div>
              <TextField
                id="subClientId"
                name="subClientId"
                select
                label="Cliente Asociado (opcional)"
                className="mb-24"
                value={form.subClientId}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    className: { width: '200' },
                  },
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {employeeList ? (
                  employeeList.map(emp => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {`${emp.nit} ${emp.name}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="none">Sin registros....</MenuItem>
                )}
              </TextField>
            </div>
          )}
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Tooltip disableFocusListener title="Al ingresar esta dirección se sobreescribe la dirección asociada a la factura.">
              <TextField
                className="mb-24"
                label="Dirección (opcional)"
                id="newAddress"
                name="newAddress"
                value={form.newAddress}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Tooltip>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Comentarios"
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Generar
          </Button>
          <Button variant="contained" color="secondary" onClick={closeComposeDialog} type="input">
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default withReducer('receiptOptionsApp', reducer)(GenerateReceiptDialog);
