import { useForm } from '@fuse/hooks';
import { Icon, Step, StepLabel, Stepper, Tab, Tabs, Typography, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientServices from 'app/services/file-records/clientsService';
import AsyncSelectComponent from 'app/main/shared/AsyncSelect';
import SearchTable from 'app/main/shared/SearchTable';
import ConfirmationButton from 'app/main/shared/ConfirmationButton';
import isEqual from 'lodash/isEqual';
import { FuseAnimate, FusePageCarded } from '@fuse';
import _ from '@lodash';
import AddIcon from '@material-ui/icons/Add';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import SideButtonBar from 'app/main/shared/SideButtonBar';
import { statusName } from 'app/constants/appConstant';
import * as Actions from '../store/actions/receipt-settlements';
import reducer from '../store/reducers/receipt-settlements';
import {
  activitiesColumnName,
  activitiesTableRow,
  expensesColumnName,
  expensesTableRow,
  feesColumnName,
  feesTableRow,
  stampsColumnName,
  stampsTableRow,
} from './ColumnNames';
import NewReceiptSettleSummary from './NewReceiptSettleSummary';
import NewReceiptSettleDialog from './NewReceiptSettleDialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  warningMessage: {
    width: '100%',
  },
  columnNumber: {
    textAlign: 'right',
  },
  columnHeader: {
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 35,
    zIndex: 99,
  },
}));

function getSteps() {
  return ['Seleccionar Rubros', 'Desglose'];
}

function NewReceiptSettlement(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const settlement = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlement.data);
  const feesData = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlement.fees);
  const loading = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlement.loading);
  const receiptSettlementDetail = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlement.receiptSettlementDetail);

  const [tabValue, setTabValue] = useState(0);

  const { form, setForm, setInForm } = useForm(null);
  const { match } = props;

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function handleNext() {
    dispatch(Actions.createReceiptSettlement(form, receiptSettlementDetail, activeStep === 0 ? '' : '/detail'));
    if (form.client_id !== '') {
      if (form && !_.isEqual(form.receipt_settlement_detail, receiptSettlementDetail)) {
        setInForm('receipt_settlement_detail', receiptSettlementDetail);
      }
      if (activeStep === 0) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  useEffect(() => {
    function updateReceiptSettlement() {
      const { params } = match;
      const { receiptSettlementId } = params;

      if (receiptSettlementId === 'new') {
        dispatch(Actions.newReceiptSettlement());
      } else {
        dispatch(Actions.getReceiptSettlement(receiptSettlementId));
        setActiveStep(1);
      }
    }

    updateReceiptSettlement();
  }, [dispatch, match]);

  const fetchData = inputValue => {
    return ClientServices.searchClient(inputValue);
  };

  useEffect(() => {
    if ((settlement && !form) || (settlement && form && settlement.id !== form.id)) {
      setForm(settlement);
      if (settlement.client_id) {
        dispatch(Actions.getFeesReceiptSettlement(settlement.client_id, settlement.id));
      }
    }
    if (
      form &&
      settlement &&
      !isEqual(
        settlement.receipt_settlement_detail.map(s => s.id),
        form.receipt_settlement_detail.map(s => s.id)
      )
    ) {
      setInForm('receipt_settlement_detail', settlement.receipt_settlement_detail);
    }
  }, [form, settlement, setForm, setInForm, dispatch]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    return (
      form.client_id !== '' &&
      (form.attorney_fees_list.length !== 0 ||
        form.activity_fees_list.length !== 0 ||
        form.stamps_fees_list.length !== 0 ||
        form.expenses_fees_list.length !== 0)
    );
  }

  function goBack() {
    dispatch(Actions.newReceiptSettlement());
    props.history.replace('/apps/billing-process/receipt-settlements');
  }

  function handleSelectChange(type, value) {
    setInForm(type, value);
    dispatch(Actions.getFeesReceiptSettlement(value, form.id));
  }

  function setSelectedAttorneys(ids) {
    form.attorney_fees_list = ids;
    canBeSubmitted();
  }

  function setSelectedActivities(ids) {
    form.activity_fees_list = ids;
    canBeSubmitted();
  }

  function setSelectedStamps(ids) {
    form.stamps_fees_list = ids;
    canBeSubmitted();
  }

  function setSelectedExpenses(ids) {
    form.expenses_fees_list = ids;
    canBeSubmitted();
  }

  return (
    <>
      {settlement && settlement.status === statusName.ELABORADO && (
        <SideButtonBar>
          <ConfirmationButton
            title="¿En realidad desea regresar?"
            content="Si regresa en este paso, perderá la información"
            agreeButtonText="Si"
            disagreeButtonText="No"
            handleAction={handleBack}
            isDialogShow={activeStep === 1}
            isDisabled={activeStep === 0}
            label="Atrás"
            icon={<NavigateBefore />}
          />
          <BottomNavigationAction
            label={activeStep === steps.length - 1 ? 'Grabar' : 'Siguiente'}
            className="Mui-selected"
            onClick={handleNext}
            icon={<NavigateNext />}
          />
          {activeStep === 1 && (
            <BottomNavigationAction
              label="Agregar detalle"
              icon={<AddIcon />}
              className="Mui-selected"
              onClick={() => dispatch(Actions.openReceiptSettleLineDialog(form.client.id))}
            />
          )}
        </SideButtonBar>
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
                    Liquidación de Factura
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">{form.client ? form.client.name : 'Nuevo Documento'}</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles de liquidación</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {settlement && settlement.message && (
                <MySnackbarContentWrapper variant="warning" className={classes.warningMessage} message={settlement.message || ''} />
              )}
              <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === 0 && (
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

                    <Tabs
                      value={tabValue}
                      onChange={handleChangeTab}
                      indicatorColor="secondary"
                      textColor="secondary"
                      variant="scrollable"
                      scrollButtons="auto"
                      classes={{ root: 'w-full h-64' }}
                    >
                      <Tab className="h-64 normal-case" label="Honorarios" />
                      <Tab className="h-64 normal-case" label="Procuración" />
                      <Tab className="h-64 normal-case" label="Timbres" />
                      <Tab className="h-64 normal-case" label="Gastos" />
                    </Tabs>
                    {tabValue === 0 && (
                      <SearchTable
                        data={feesData.attorneys || []}
                        title="Honorarios"
                        setSelectedActivities={setSelectedAttorneys}
                        selectedItems={form.attorney_fees_list}
                        headCells={feesColumnName}
                        tableRow={feesTableRow}
                        useCheckBox
                      />
                    )}
                    {tabValue === 1 && (
                      <SearchTable
                        data={feesData.activities || []}
                        title="Procuración"
                        setSelectedActivities={setSelectedActivities}
                        selectedItems={form.activity_fees_list}
                        headCells={activitiesColumnName}
                        tableRow={activitiesTableRow}
                        useCheckBox
                      />
                    )}
                    {tabValue === 2 && (
                      <SearchTable
                        data={feesData.stamps || []}
                        title="Timbres"
                        setSelectedActivities={setSelectedStamps}
                        selectedItems={form.stamps_fees_list}
                        headCells={stampsColumnName}
                        tableRow={stampsTableRow}
                        useCheckBox
                      />
                    )}
                    {tabValue === 3 && (
                      <SearchTable
                        data={feesData.expenses || []}
                        title="Gastos"
                        setSelectedActivities={setSelectedExpenses}
                        selectedItems={form.expenses_fees_list}
                        headCells={expensesColumnName}
                        tableRow={expensesTableRow}
                        useCheckBox
                      />
                    )}
                  </>
                )}
                {activeStep === 1 && <NewReceiptSettleSummary showRowOptions={settlement && settlement.status === statusName.ELABORADO} />}
              </div>
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent loadingRecord={loading} />
      <NewReceiptSettleDialog />
    </>
  );
}

export default withReducer('receiptSettleApp', reducer)(NewReceiptSettlement);
