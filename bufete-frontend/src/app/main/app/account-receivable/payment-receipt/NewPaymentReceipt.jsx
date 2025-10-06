import { Button, Icon, MenuItem, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientServices from 'app/services/file-records/clientsService';
import AsyncSelectComponent from 'app/main/shared/AsyncSelect';
import { FuseAnimate, FusePageCarded } from '@fuse';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import { useForm } from '@fuse/hooks';
import DatePicker from 'app/main/shared/DatePicker';
import isEmpty from 'lodash/isEmpty';
import _ from '@lodash';
import { statusName } from 'app/constants/appConstant';
import reducer from '../store/reducers/payment-receipts';
import * as Actions from '../store/actions/payment-receipts/payment-receipt.actions';
import NewPaymentTransDetailDialog from './NewPaymentTransDetailDialog';
import NewPaymentTransDetail from './NewPaymentTransDetail';
import NewPaymentBalanceSummary from './NewPaymentBalanceSummary';
import NewPaymentBalanceDetailDialog from './NewPaymentBalanceDetailDialog';

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

function NewPaymentReceipt(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const paymentReceiptData = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.data);
  const transDetails = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.transDetails);
  const loading = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.loading);
  const paymentBalanceDetail = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.paymentBalanceDetail);

  const [tabValue, setTabValue] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');

  const { form, setForm, setInForm, handleChange } = useForm(null);
  const { match } = props;

  useEffect(() => {
    function updatePaymentReceipt() {
      const { params } = match;
      const { paymentReceiptId } = params;

      if (paymentReceiptId === 'new') {
        dispatch(Actions.newPaymentReceipt());
      } else {
        dispatch(Actions.getPaymentReceipt(paymentReceiptId));
      }
    }

    updatePaymentReceipt();
  }, [dispatch, match]);

  useEffect(() => {
    const { params } = match;
    const { paymentReceiptId } = params;

    if (paymentReceiptId === 'new' && paymentReceiptData && paymentReceiptData.id !== null) {
      props.history.replace(`/apps/account-receivable/payment-receipts/${paymentReceiptData.id}`);
    }
  }, [paymentReceiptData, match]);

  useEffect(() => {
    if ((paymentReceiptData && !form) || (paymentReceiptData && form && paymentReceiptData.id !== form.id)) {
      setForm(paymentReceiptData);
      if (paymentReceiptData && paymentReceiptData.id !== null && paymentReceiptData.client_id !== null) {
        // if (paymentReceiptData.status === statusName.APLICADO) {
        loadReceiptByClientId(paymentReceiptData.client_id, paymentReceiptData.currency_id, paymentReceiptData.id);
        // } else {
        //   loadReceiptByClientId(paymentReceiptData.client_id, paymentReceiptData.currency_id);
        // }
      }
    }
  }, [paymentReceiptData, form]);

  useEffect(() => {
    if (transDetails) {
      const totalPayment = transDetails.reduce((prev, cur) => prev + Number(cur.total_transaction), 0);
      setInForm('total_payment', totalPayment);
      if (form && !form.id) {
        dispatch(Actions.createBalanceDetailsBulk(totalPayment, paymentBalanceDetail));
      }
    }
  }, [transDetails]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function goBack() {
    dispatch(Actions.newPaymentReceipt());
    props.history.replace('/apps/account-receivable/payment-receipts');
  }

  function showTitle() {
    if (form.client && form.client.id) {
      return form.client.name;
    }
    return 'Nuevo Documento';
  }

  function loadReceiptByClientId(id, currencyId, paymentId) {
    if (id) {
      dispatch(Actions.getBalanceDetail(id, currencyId, paymentId));
    }
  }

  function handleSelectChange(type, value) {
    setInForm(type, value);
    loadReceiptByClientId(value, form.currency_id);
  }

  function handleCurrencyChange(e) {
    const { name, value } = e.target;
    setInForm(name, value);
    loadReceiptByClientId(form.client_id, value);
  }

  const handleDateChange = date => {
    setInForm('payment_date', date);
  };

  const fetchDataClient = inputValue => {
    return ClientServices.searchClient(inputValue);
  };

  const onSubmit = () => {
    dispatch(Actions.createPaymentReceipt(form, paymentBalanceDetail, transDetails));
  };

  function canBeSubmitted() {
    if (!paymentReceiptData) return true;
    if (form.id !== null) {
      return !_.isEqual(paymentReceiptData, form);
    }
    return isEmpty(form.client_id) && isEmpty(form.bank_id) && isEmpty(form.transaction_type_id) && Number(form.total_payment) > 0;
  }

  return (
    <>
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
                    Recibo de Pago
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">{showTitle()}</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles de recibo</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button className="whitespace-no-wrap" variant="contained" disabled={!canBeSubmitted()} onClick={onSubmit}>
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
              {warningMessage && <MySnackbarContentWrapper variant="warning" className={classes.warningMessage} message={warningMessage || ''} />}
              {tabValue === 0 && (
                <>
                  <input type="hidden" value={form.id} id="id" name="id" />
                  <AsyncSelectComponent
                    inputId="client_id"
                    inputName="Cliente"
                    placeHolder="Seleccionar un cliente..."
                    initialState={form.client}
                    handleChange={handleSelectChange}
                    suggestions={fetchDataClient}
                    disabled={form.id}
                  />
                  <NewPaymentTransDetail readOnly={form.client_id === null || form.status === statusName.APLICADO} />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    label="Estado"
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    variant="outlined"
                    disabled
                  />
                  <DatePicker
                    className="mt-8 mb-16"
                    style={{ width: '50%' }}
                    id="payment_date"
                    label="Fecha Transacción"
                    value={form.payment_date || null}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={form.status !== statusName.ELABORADO}
                  />
                  <TextField
                    id="currency_id"
                    name="currency_id"
                    label="Moneda"
                    variant="outlined"
                    className="mt-8 mb-16"
                    value={form.currency_id}
                    onChange={handleCurrencyChange}
                    error={form.currency_id === ''}
                    style={{ display: 'inline-flex', width: '49%' }}
                    disabled={form.status !== statusName.ELABORADO}
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
                    disabled={form.status !== statusName.ELABORADO}
                  />
                  <TextField
                    id="total_payment"
                    name="total_payment"
                    label="Total"
                    className="mt-8 mb-16"
                    variant="outlined"
                    value={form.total_payment || 0}
                    onChange={handleChange}
                    style={{ display: 'inline-flex', width: '49%' }}
                    disabled
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      inputProps: { min: 0 },
                    }}
                    error={Number(form.total_payment) === 0}
                    fullWidth
                    required
                  />
                  <TextField
                    className="mt-8 mb-16"
                    id="comments"
                    name="comments"
                    label="Comentarios"
                    multiline
                    rows="4"
                    value={form.comments}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    disabled={form.status !== statusName.ELABORADO}
                  />
                  <br />
                  <NewPaymentBalanceSummary currency={form.currency_id} readOnly={form.client_id === null || form.status === statusName.APLICADO} />
                </>
              )}
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent loadingRecord={loading} />
      <NewPaymentTransDetailDialog />
      <NewPaymentBalanceDetailDialog />
    </>
  );
}

export default withReducer('paymentReceiptApp', reducer)(NewPaymentReceipt);
