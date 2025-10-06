import { useForm } from '@fuse/hooks';
import { Button, Icon, MenuItem, Tab, Tabs, TextField, Typography } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@material-ui/styles';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProviderServices from 'app/services/catalogs/providerService';
import ConceptServices from 'app/services/catalogs/conceptServices';
import * as Actions from 'app/main/app/billing-process/store/actions/expenses';
import * as ExpenseDetailsActions from 'app/main/app/billing-process/store/actions/expenses';
import reducer from 'app/main/app/billing-process/store/reducers/expenses';
import DatePicker from 'app/main/shared/DatePicker';
import BottomBar from 'app/main/shared/SideButtonBar';
import AsyncSelectComponent from 'app/main/shared/AsyncSelect';
import ExpenseDetails from 'app/main/app/billing-process/expense/ExpenseDetails';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { isEqual, indexOf, sortBy } from 'lodash';
import { statusName, viewPermissions, viewPermissionsName } from 'app/constants/appConstant';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import MoneyIcon from '@material-ui/icons/MoneyOutlined';
import BulkExpenseDetailDialog from './BulkExpenseDetailDialog';

const useStyles = makeStyles({
  warningMessage: {
    width: '100%',
  },
});

function NewExpense(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const expenses = useSelector(({ expensesApp }) => expensesApp.expense.data);
  const loading = useSelector(({ expensesApp }) => expensesApp.expense.loading);

  const [expenseDetailsData, setExpenseDetailsData] = useState([]);
  const [originalExpense, setOriginalExpense] = useState([]);
  const [currentPermissions, setCurrentPermissions] = useState('write');
  const [tabValue, setTabValue] = useState(0);

  const { form, handleChange, setForm, setInForm } = useForm(null);
  const { match } = props;
  const handleDateChange = date => {
    setInForm('expenses_date', date);
  };
  const fetchProviderData = inputValue => {
    return ProviderServices.searchProvider(inputValue);
  };
  const fetchConceptData = inputValue => {
    return ConceptServices.searchConcept(inputValue);
  };

  useEffect(() => {
    function updateExpensesState() {
      const { params } = match;
      const { expenseId, permissions } = params;
      if (permissions !== undefined) {
        if (indexOf(viewPermissions, permissions) < 0) return;
        setCurrentPermissions(permissions);
      }
      if (expenseId === 'new') {
        dispatch(ExpenseDetailsActions.setInitialData([]));
        dispatch(Actions.newExpense());
      } else {
        dispatch(Actions.getExpense(expenseId));
      }
    }

    updateExpensesState();
  }, [dispatch, match, viewPermissions]);

  useEffect(() => {
    if ((expenses && !form) || (expenses && form && expenses.id !== form.id)) {
      setForm(expenses);
      setExpenseDetailsData(sortBy(expenses.details, o => o.id));
      setOriginalExpense(JSON.parse(JSON.stringify(expenses)));
    }
    if (form && expenses && !isEqual(originalExpense.details, expenses.details)) {
      setExpenseDetailsData(sortBy(expenses.details, o => o.id));
    }
  }, [form, expenses, setForm, setInForm, setExpenseDetailsData]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }
  // header actions
  function goBack() {
    dispatch(Actions.newExpense());
    props.history.replace('/apps/billing-process/expenses');
  }

  function canBeSubmitted() {
    if (form.id === '') {
      return (
        form.expenses_date !== '' &&
        form.expenses_type !== '' &&
        form.expenses_num !== '' &&
        form.provider_id !== '' &&
        form.concept_id !== '' &&
        form.expenses_currency !== '' &&
        form.expenses_total !== '' &&
        expenses.details.filter(item => item.status !== statusName.ELIMINADO).length > 0
      );
    }
    if (!expenses) {
      return true;
    }
    return (
      form.expenses_date !== originalExpense.expenses_date ||
      form.expenses_type !== originalExpense.expenses_type ||
      form.expenses_num !== originalExpense.expenses_num ||
      form.provider_id !== originalExpense.provider_id ||
      form.concept_id !== originalExpense.concept_id ||
      form.exchange_rate !== originalExpense.exchange_rate ||
      form.expenses_currency !== originalExpense.expenses_currency ||
      parseInt(form.expenses_total.toString()) !== parseInt(originalExpense.expenses_total.toString()) ||
      (!isEqual(expenses.details, originalExpense.details) && expenses.details.filter(item => item.status !== statusName.ELIMINADO).length > 0)
    );
  }

  function handleSelectChange(type, value) {
    setInForm(type, value);
  }

  function getDocumentType(documentTypeId) {
    switch (documentTypeId) {
      case 1:
        return 'Factura';
      case 2:
        return 'Recibo';
      case 3:
        return 'Comprobante';
      default:
        return 'Factura';
    }
  }

  // BottomBar actions
  const calculateExpenses = () => {
    let calculateTotal = form.expenses_total;
    let calculateLength = expenseDetailsData.length;
    // eslint-disable-next-line array-callback-return
    expenseDetailsData.map(expenseDetail => {
      if (expenseDetail.status === statusName.FINALIZADO) {
        // eslint-disable-next-line no-plusplus
        calculateLength--;
        calculateTotal -= expenseDetail.expense_value;
      }
    });
    // eslint-disable-next-line array-callback-return
    expenseDetailsData.map(expenseDetail => {
      if (expenseDetail.status !== statusName.ELIMINADO && expenseDetail.status !== statusName.FINALIZADO)
        dispatch(
          Actions.createExpenseDetails({
            ...expenseDetail,
            expense_value: Math.round((calculateTotal / calculateLength + Number.EPSILON) * 100) / 100,
          })
        );
    });
  };
  const openDialog = () => dispatch(Actions.openExpenseDetailsDialog());
  const openBulkDialog = () => dispatch(Actions.openBulkExpenseDetailsDialog());
  const calculateExpensesValueButtonEnabled = () => {
    if (form && expenseDetailsData) {
      return expenseDetailsData.filter(item => item.status !== statusName.ELIMINADO).length > 0 && parseInt(form.expenses_total) > 0;
    }
    if (!expenses) {
      return false;
    }
    return false;
  };
  return (
    <>
      <BulkExpenseDetailDialog />
      {currentPermissions !== viewPermissionsName.READ_ONLY && (
        <BottomBar>
          <BottomNavigationAction label="Agregar detalle " icon={<AddIcon />} className="Mui-selected" onClick={openDialog} />
          <BottomNavigationAction label="Agregar varios detalles" icon={<PlaylistAdd />} className="Mui-selected" onClick={openBulkDialog} />
          <BottomNavigationAction
            disabled={!calculateExpensesValueButtonEnabled()}
            label="Calcular Gastos"
            icon={<MoneyIcon />}
            className={!calculateExpensesValueButtonEnabled() ? '' : 'Mui-selected'}
            onClick={calculateExpenses}
          />
        </BottomBar>
      )}
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
                    Documento de Gasto
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">
                        {form.id ? `${getDocumentType(form.expenses_type)}: ${form.expenses_num}` : `Nuevo Documento`}
                      </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles del Gasto</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              {currentPermissions !== viewPermissionsName.READ_ONLY && (
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Button
                    className="whitespace-no-wrap"
                    variant="contained"
                    disabled={!canBeSubmitted()}
                    onClick={() => {
                      setOriginalExpense(JSON.parse(JSON.stringify({ ...form, details: sortBy(expenses.details, o => o.id) })));
                      dispatch(Actions.createExpense(form, expenses.details));
                    }}
                  >
                    Guardar
                  </Button>
                </FuseAnimate>
              )}
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
              {expenses && expenses.message && (
                <MySnackbarContentWrapper variant="warning" className={classes.warningMessage} message={expenses.message || ''} />
              )}
              {tabValue === 0 && (
                <div>
                  <input type="hidden" value={form.id} id="id" name="id" />
                  <DatePicker
                    id="expenses_date"
                    name="expenses_date"
                    label="Fecha"
                    className="mt-8 mb-16"
                    value={form.expenses_date || null}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disableFuture
                    disableToolbar={false}
                    error={form.expenses_date === ''}
                    style={{ display: 'inline-flex', width: '30%' }}
                    disabled={currentPermissions === viewPermissionsName.READ_ONLY}
                    required
                    autoFocus
                    fullWidth
                  />
                  <TextField
                    id="expenses_type"
                    name="expenses_type"
                    label="Tipo"
                    variant="outlined"
                    className="mt-8 mb-16"
                    value={form.expenses_type}
                    onChange={handleChange}
                    error={form.expenses_type === ''}
                    style={{ display: 'inline-flex', width: '30%', marginLeft: '1%' }}
                    disabled={form.id !== '' && currentPermissions === viewPermissionsName.READ_ONLY}
                    select
                    required
                    fullWidth
                  >
                    <MenuItem key="factura" value="1">
                      Factura
                    </MenuItem>
                    <MenuItem key="recibo" value="2">
                      Recibo
                    </MenuItem>
                    <MenuItem key="comprobante" value="3">
                      Comprobante
                    </MenuItem>
                  </TextField>
                  <TextField
                    id="expenses_num"
                    name="expenses_num"
                    label="Número de documento"
                    className="mt-8 mb-16"
                    variant="outlined"
                    value={form.expenses_num}
                    onChange={handleChange}
                    error={form.expenses_num === ''}
                    style={{ display: 'inline-flex', width: '38%', marginLeft: '1%' }}
                    InputProps={{ inputProps: { min: 0 } }}
                    disabled={form.id !== '' && currentPermissions === viewPermissionsName.READ_ONLY}
                    type="Number"
                    required
                    fullWidth
                  />
                  <AsyncSelectComponent
                    inputId="provider_id"
                    inputName="Proveedor"
                    placeHolder="Seleccione un Proveedor..."
                    className="asyncSelectControl"
                    disabled={currentPermissions === viewPermissionsName.READ_ONLY}
                    initialState={form.provider}
                    handleChange={handleSelectChange}
                    suggestions={fetchProviderData}
                  />
                  <AsyncSelectComponent
                    inputId="concept_id"
                    inputName="Concepto"
                    placeHolder="Seleccione un Concepto..."
                    className="asyncSelectControl"
                    initialState={form.concept}
                    disabled={currentPermissions === viewPermissionsName.READ_ONLY}
                    handleChange={handleSelectChange}
                    suggestions={fetchConceptData}
                  />
                  <TextField
                    id="expenses_currency"
                    name="expenses_currency"
                    label="Moneda"
                    variant="outlined"
                    className="mt-8 mb-16"
                    value={form.expenses_currency}
                    onChange={handleChange}
                    error={form.expenses_currency === ''}
                    style={{ display: 'inline-flex', width: '30%' }}
                    disabled={currentPermissions === viewPermissionsName.READ_ONLY}
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
                  {(form.expenses_currency === 1 || form.expenses_currency === '1') && (
                    <TextField
                      id="expenses_total"
                      name="expenses_total"
                      label="Total de gatos"
                      className="mt-8 mb-16 "
                      variant="outlined"
                      value={form.expenses_total}
                      onChange={handleChange}
                      error={form.expenses_total === ''}
                      style={{ display: 'inline-flex', width: '69%', marginLeft: '1%' }}
                      InputProps={{ inputProps: { min: 0 } }}
                      disabled={currentPermissions === viewPermissionsName.READ_ONLY}
                      type="Number"
                      required
                    />
                  )}
                  {(form.expenses_currency === 2 || form.expenses_currency === '2') && (
                    <TextField
                      id="expenses_total"
                      name="expenses_total"
                      label="Total de gatos"
                      className="mt-8 mb-16 "
                      variant="outlined"
                      value={form.expenses_total}
                      onChange={handleChange}
                      error={form.expenses_total === ''}
                      style={{ display: 'inline-flex', width: '48%', marginLeft: '1%' }}
                      InputProps={{ inputProps: { min: 0 } }}
                      disabled={currentPermissions === viewPermissionsName.READ_ONLY}
                      type="Number"
                      required
                    />
                  )}
                  {(form.expenses_currency === 2 || form.expenses_currency === '2') && (
                    <TextField
                      id="exchange_rate"
                      name="exchange_rate"
                      label="Tipo de cambio"
                      className="mt-8 mb-16"
                      value={form.exchange_rate || '1'}
                      onChange={handleChange}
                      style={{ display: 'inline-flex', width: '20%', marginLeft: '1%' }}
                      InputProps={{ inputProps: { min: 0 } }}
                      disabled={currentPermissions === viewPermissionsName.READ_ONLY}
                      variant="outlined"
                      type="Number"
                    />
                  )}
                  <div>
                    <ExpenseDetails expenseDetailsData={expenseDetailsData} disabled={currentPermissions === viewPermissionsName.READ_ONLY} />
                  </div>
                </div>
              )}
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent LoadingRecord={loading} />
    </>
  );
}

export default withReducer('expensesApp', reducer)(NewExpense);
