import { useForm } from '@fuse/hooks';
import { Button, FormControlLabel, Icon, MenuItem, Switch, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientServices from 'app/services/file-records/clientsService';
import AsyncSelectComponent from 'app/main/shared/AsyncSelect';
import { FuseAnimate, FusePageCarded } from '@fuse';
import isEqual from 'lodash/isEqual';
import CommonServices from 'app/services/shared';
import { AppId, ReceiptSettleEnumType, statusName } from 'app/constants/appConstant';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import SideButtonBar from 'app/main/shared/SideButtonBar';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import FELDocumentServices from 'app/services/fel/felDocumentServices';
import * as Actions from '../store/actions/receipts/receipt.actions';
import * as receiptActions from '../store/actions/receipts';
import reducer from '../store/reducers/receipts';
import NewReceiptDialog from './NewReceiptDialog';
import NewReceiptSummary from './NewReceiptSummary';
import GenerateReceiptDialog from '../receipt-options/GenerateReceiptDialog';
import PreviewReceiptDialog from '../receipt-options/PreviewReceiptDialog';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  warningMessage: {
    width: '100%',
  },
  addButton: {
    position: 'absolute',
    right: 35,
    zIndex: 99,
  },
});

function NewReceipt(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const receiptData = useSelector(({ receiptApp }) => receiptApp.receipt.data);
  const loading = useSelector(({ receiptApp }) => receiptApp.receipt.loading);
  const receiptDetail = useSelector(({ receiptApp }) => receiptApp.receipt.receiptDetail);
  const [addresses, setAddresses] = useState([]);
  const [originalReceipt, setOriginalReceipt] = useState({});
  const [receiptTotal, setReceiptTotal] = useState({
    total: 0,
    discount: 0,
  });

  const [tabValue, setTabValue] = useState(0);

  const { form, setForm, setInForm, handleChange } = useForm(null);
  const { match } = props;

  useEffect(() => {
    function updateReceipt() {
      const { params } = match;
      const { receiptId } = params;

      if (receiptId === 'new') {
        dispatch(Actions.newReceipt());
      } else {
        dispatch(Actions.getReceipt(receiptId));
      }
    }

    updateReceipt();
  }, [dispatch, match]);

  async function loadAddresses(id) {
    setAddresses(await CommonServices.getClientAddresses(id, AppId.CLIENTES));
  }

  const fetchData = inputValue => {
    return ClientServices.searchClient(inputValue);
  };

  useEffect(() => {
    if ((receiptData && !form) || (receiptData && form && receiptData.id !== form.id)) {
      if (receiptData.status) {
        setForm(receiptData);
        setOriginalReceipt(JSON.parse(JSON.stringify(receiptData)));
      }
      if (receiptData.client && receiptData.client.id) {
        loadAddresses(receiptData.client.id);
      }
    }
    if (form && receiptData && !isEqual(originalReceipt.details, receiptData.details)) {
      setInForm('details', receiptData.details);
    }
  }, [form, receiptData, originalReceipt, setForm, setInForm, dispatch]);

  useEffect(() => {
    if (form && receiptDetail.length > 0) {
      const receiptTotalAmounts = receiptDetail
        .filter(f => f.status === statusName.ACTIVO)
        .reduce(
          (total, curr) => ({
            amount: total.amount + curr.line_amount,
            discount: total.discount + curr.line_discount,
            total: total.total + curr.line_total,
          }),
          {
            amount: 0,
            discount: 0,
            total: 0,
          }
        );
      setReceiptTotal({
        total: receiptTotalAmounts.total,
        discount: receiptTotalAmounts.discount,
      });
    }
  }, [form, receiptDetail, setReceiptTotal]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    if (!receiptData) return true;
    if (form.id === null && form.is_one_time_client) {
      return (
        form.client_name !== '' &&
        form.client_address !== '' &&
        form.client_nit !== '' &&
        receiptDetail.filter(item => item.status === statusName.ACTIVO).length > 0
      );
    }
    if (form.id === null && !form.is_one_time_client) {
      return form.client_id !== '' && form.receipt_address_id !== '' && receiptDetail.filter(item => item.status === statusName.ACTIVO).length > 0;
    }
    if (form.id && form.is_one_time_client) {
      return (
        form.client_name !== receiptData.client_name ||
        form.client_address !== receiptData.client_address ||
        form.client_nit !== receiptData.client_nit ||
        (!isEqual(form.details, receiptDetail) && receiptDetail.filter(item => item.status === statusName.ACTIVO).length > 0)
      );
    }
    return (
      form.client_id !== receiptData.client_id ||
      form.receipt_address_id !== receiptData.receipt_address_id ||
      (!isEqual(form.details, receiptDetail) && receiptDetail.filter(item => item.status === statusName.ACTIVO).length > 0)
    );
  }

  function goBack() {
    dispatch(Actions.newReceipt());
    props.history.replace('/apps/billing-process/receipts');
  }

  async function handleSelectChange(type, value) {
    setInForm(type, value);
    await loadAddresses(value);
  }

  function showTitle() {
    if (form.client && form.client.id) {
      return form.client.name;
    }
    if (form.is_one_time_client) {
      return form.client_name;
    }
    return 'Nuevo Documento';
  }

  async function validateName() {
    if (form.client_nit) {
      const newNIT = form.client_nit.replace(' ', '').replace('-', '');
      const clientName = await FELDocumentServices.checkClientNameByNIT(newNIT);
      setInForm('client_name', clientName || '**** No encontrado ****');
    }
  }

  return (
    <>
      <SideButtonBar>
        <BottomNavigationAction
          label="Agregar detalle"
          icon={<AddIcon />}
          className="Mui-selected"
          onClick={() => dispatch(Actions.openReceiptLineDialog(form && form.is_one_time_client))}
        />
        <BottomNavigationAction
          label="Vista Previea"
          icon={<AddIcon />}
          className="Mui-selected"
          disabled={form && form.id === null}
          onClick={() => dispatch(receiptActions.openPreviewReceiptDialog(form.id))}
        />
        <BottomNavigationAction
          label="Generar Factura"
          icon={<AddIcon />}
          className="Mui-selected"
          disabled={form && form.id === null}
          onClick={() => dispatch(receiptActions.openInvoiceSeriesDialog(form.id, form.client?.id, receiptData.object_type))}
        />
      </SideButtonBar>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={
          form && (
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Typography className="normal-case flex items-center sm:mb-12" role="button" color="inherit" onClick={goBack}>
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Factura
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">{showTitle()}</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles de factura</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(Actions.createReceipt(form, receiptDetail))}
                >
                  Guardar
                </Button>
              </FuseAnimate>
            </div>
          )
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64 normal-case" label="General" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {receiptData && receiptData.message && (
                <MySnackbarContentWrapper variant="warning" className={classes.warningMessage} message={receiptData.message || ''} />
              )}
              {tabValue === 0 && (
                <>
                  {form.object_type === ReceiptSettleEnumType.LIBRE && (
                    <FormControlLabel
                      disabled={form.id !== null}
                      control={
                        <Switch checked={form.is_one_time_client} value={form.is_one_time_client} onChange={handleChange} name="is_one_time_client" />
                      }
                      label="Cliente Temporal"
                    />
                  )}
                  {!form.is_one_time_client ? (
                    <>
                      <AsyncSelectComponent
                        inputId="client_id"
                        inputName="Cliente"
                        placeHolder="Seleccionar un cliente..."
                        initialState={form.client}
                        handleChange={handleSelectChange}
                        suggestions={fetchData}
                        disabled={form.id}
                      />
                      <TextField
                        id="receipt_address_id"
                        name="receipt_address_id"
                        select
                        label="Dirección"
                        className="mb-24"
                        value={form.receipt_address_id}
                        onChange={handleChange}
                        error={form.receipt_address_id === '' || form.receipt_address_id === 'none'}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        required
                      >
                        {addresses ? (
                          addresses.map(emp => (
                            <MenuItem key={emp.id} value={emp.id}>
                              {emp.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="none">Sin registros....</MenuItem>
                        )}
                      </TextField>
                    </>
                  ) : (
                    <>
                      <TextField
                        className="mt-8 mb-16"
                        error={form.client_nit === ''}
                        required
                        label="NIT"
                        id="client_nit"
                        name="client_nit"
                        value={form.client_nit}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        autoFocus
                        onBlur={validateName}
                      />
                      <TextField
                        className="mt-8 mb-16"
                        error={form.client_name === ''}
                        required
                        label="Nombre"
                        id="client_name"
                        name="client_name"
                        value={form.client_name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8 mb-16"
                        error={form.client_address === ''}
                        required
                        label="Dirección"
                        id="client_address"
                        name="client_address"
                        value={form.client_address}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                    </>
                  )}
                  <TextField
                    id="currency_id"
                    name="currency_id"
                    label="Moneda"
                    variant="outlined"
                    className="mt-8 mb-16"
                    value={form.currency_id}
                    onChange={handleChange}
                    error={form.currency_id === ''}
                    style={{ display: 'inline-flex', width: '49%' }}
                    disabled={form.id === ''}
                    select
                    required
                  >
                    <MenuItem key="quetzal" value="1">
                      Quetzal
                    </MenuItem>
                    <MenuItem key="dolar" value="2">
                      Dolar
                    </MenuItem>
                  </TextField>
                  <TextField
                    id="exchange_rate"
                    name="exchange_rate"
                    label="Tipo de Cambio"
                    className="mt-8 mb-16"
                    variant="outlined"
                    value={form.currency_id === '2' ? 7.6 : 1}
                    onChange={handleChange}
                    style={{ display: 'inline-flex', width: '50%', marginLeft: '1%' }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      inputProps: { min: 0 },
                    }}
                    fullWidth
                  />
                  <TextField
                    id="receipt_total"
                    name="receipt_total"
                    label="Total Factura"
                    className="mt-8 mb-16"
                    variant="outlined"
                    value={(receiptTotal.total * form.exchange_rate).toFixed(2) || 0}
                    onChange={handleChange}
                    style={{ display: 'inline-flex', width: '49%' }}
                    disabled={form.id !== ''}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      inputProps: { min: 0 },
                    }}
                    fullWidth
                  />
                  <TextField
                    id="receipt_total_discount"
                    name="receipt_total_discount"
                    label="Total Descuento"
                    className="mt-8 mb-16"
                    variant="outlined"
                    value={receiptTotal.discount.toFixed(2)}
                    onChange={handleChange}
                    style={{ display: 'inline-flex', width: '50%', marginLeft: '1%' }}
                    disabled={form.id !== ''}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      inputProps: { min: 0 },
                    }}
                    fullWidth
                  />
                  <br />
                  <NewReceiptSummary
                    currency={form.currency_id}
                    isFreeReceipt={receiptData && receiptData.object_type === ReceiptSettleEnumType.LIBRE}
                  />
                </>
              )}
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent loadingRecord={loading} />
      <NewReceiptDialog />
      <GenerateReceiptDialog />
      <PreviewReceiptDialog />
    </>
  );
}

export default withReducer('receiptApp', reducer)(NewReceipt);
