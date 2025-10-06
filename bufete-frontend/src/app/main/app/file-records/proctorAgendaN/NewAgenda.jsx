import { useForm } from '@fuse/hooks';
import { Button, Fab, Icon, IconButton, InputAdornment, MenuItem, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { EmployeesConstants, statusName } from 'app/constants/appConstant';
import DatePicker from 'app/main/shared/DatePicker';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import CaseActivityServices from 'app/services/file-records/caseActivityService';
import EmployeeServices from 'app/services/file-records/employeesService';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { FuseAnimate, FusePageCarded } from '@fuse';
import * as Actions from '../store/actions/proctor-agenda';
import reducer from '../store/reducers/proctor-agenda';
import AssignActivitiesDialog from './AssignActivitiesDialog';
import NewAgendaStateChange from './NewAgendaStateChange';
import NewSettlementDialog from './NewSettlementDialog';
import ActivityExpandTable from './ActivityExpandTable';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    zIndex: 99,
  },
  warningMessage: {
    width: '80%',
  },
});

function NewAgenda(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const record = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.data);
  const updateSelectedActivities = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.selectedActivities);
  const selectedReceipts = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.selectedReceipts);
  const loading = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.loading);
  const reload = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.reload);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [totalInvoiceOuter, setTotalInvoiceOuter] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedParams, setSelectedParams] = useState({
    empId: '',
    assgn: new Date(),
  });

  const [employees, setEmployees] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const { form, handleChange, setForm, setInForm } = useForm(null);
  const { match } = props;

  const clearState = () => {
    setTotalInvoice(0);
    setTotalInvoiceOuter(0);
    setSelectedActivities([]);
    setSelectedParams({
      empId: '',
      assgn: new Date(),
    });
    setEmployees([]);
    setInvoiceList([]);
  };

  useEffect(() => {
    if (form) {
      form.activity_list = selectedActivities;
    }
  }, [form, selectedActivities, dispatch]);

  useEffect(() => {
    if (form) {
      setInvoiceList(selectedReceipts);
      setTotalInvoice(
        selectedReceipts
          // .map(x => Number(x.invoice_total))
          .filter(x => x.invoice_currency === 1)
          .reduce((accumulator, currentValue) => accumulator + currentValue.invoice_total, 0)
      );
      setTotalInvoiceOuter(
        selectedReceipts
          // .map(x => Number(x.invoice_total))
          .filter(x => x.invoice_currency === 2)
          .reduce((accumulator, currentValue) => accumulator + currentValue.invoice_total, 0)
      );
    }
  }, [form, selectedReceipts, dispatch]);

  useEffect(() => {
    function updateProctorAgendaState() {
      const { params } = match;
      const { proctorAgenda } = params;

      clearState();
      dispatch(Actions.newProctorAgenda());

      if (proctorAgenda !== 'new') {
        dispatch(Actions.getProctorAgenda(proctorAgenda));
        dispatch(Actions.getInvoiceList(proctorAgenda));
      }
    }

    updateProctorAgendaState();
  }, [dispatch, match]);

  useEffect(() => {
    if ((record && !form) || (record && form && (record.id !== form.id || record.status !== form.status)) || reload) {
      setForm(record);
      dispatch(Actions.reloadData(false));
    }
  }, [form, record, reload, setForm, dispatch]);

  useEffect(() => {
    async function fetchData() {
      if (employees.length === 0) {
        const employeeResponse = await EmployeeServices.getEmployeesByPosition([EmployeesConstants.ADMON]);
        setEmployees(employeeResponse.map(emp => ({ id: emp.id, name: emp.name })));
      }
    }
    fetchData();
  }, [employees.length]);

  useEffect(() => {
    async function fetchData() {
      if (form && (form.employee_id !== selectedParams.empId || form.assign_date !== selectedParams.assgn)) {
        const response = await CaseActivityServices.getAvailableActivities(form.employee_id, form.assign_date);
        setSelectedActivities(response);
        setSelectedParams({
          empId: form.employee_id,
          assgn: form.assign_date,
        });
      } else if (!_.isEmpty(updateSelectedActivities)) {
        setSelectedActivities(updateSelectedActivities);
      }
    }
    fetchData();
  }, [form, selectedParams, updateSelectedActivities]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    if (record && form.id !== '' && form.status === statusName.ABIERTO) {
      if (
        form.employee_id !== record.employee_id ||
        form.assign_date !== record.assign_date ||
        Number(form.proctor_agenda_cost_local) !== record.proctor_agenda_cost_local ||
        Number(form.proctor_agenda_cost_outer) !== record.proctor_agenda_cost_outer
      ) {
        return true;
      }
      return false;
    }
    if (form.id !== '' && form.status === statusName.PROCESO) {
      return selectedReceipts.length > 0;
    }
    return (
      !_.isEqual(record, form) &&
      form.employee_id !== '' &&
      form.assign_date !== '' &&
      (form.proctor_agenda_cost_local >= 0 || form.proctor_agenda_cost_outer >= 0)
    );
  }

  const handleDateChange = date => {
    setInForm('assign_date', date);
  };

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
                  <Typography
                    className="normal-case flex items-center sm:mb-12"
                    component={Link}
                    role="button"
                    to="/apps/file-records/proctor-agenda"
                    color="inherit"
                  >
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Nueva Agenda
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">{form.employee_name ? form.employee_name : 'Nueva Agenda'}</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles de la Agenda</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(Actions.saveProctorAgenda(form))}
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
            <Tab className="h-64 normal-case" label="Datos Agenda" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <>
                  <div>
                    <div className="pb-48">
                      <input type="hidden" value={form.id} id="id" name="id" />
                      <TextField
                        id="employee_id"
                        name="employee_id"
                        select
                        label="Empleado"
                        className="mt-8 mb-16"
                        value={form.employee_id}
                        onChange={handleChange}
                        SelectProps={{
                          MenuProps: {
                            className: { width: '200' },
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                        required
                        error={form.employee_id === ''}
                        autoFocus
                        style={{ width: '50%', paddingRight: '5px' }}
                        disabled={form.status !== statusName.ABIERTO || form.id !== ''}
                      >
                        {employees ? (
                          employees.map(emp => (
                            <MenuItem key={emp.id} value={emp.id}>
                              {emp.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="none">Sin registros....</MenuItem>
                        )}
                      </TextField>
                      <DatePicker
                        className="mt-8 mb-16"
                        label="Fecha"
                        id="assign_date"
                        name="assign_date"
                        value={form.assign_date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disablePast
                        style={{ width: '50%' }}
                        disabled={form.status !== statusName.ABIERTO || form.id !== ''}
                        required
                        error={form.assign_date === ''}
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Comentarios"
                        id="comment"
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        disabled={form.status !== statusName.ABIERTO}
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Monto"
                        id="proctor_agenda_cost_local"
                        name="proctor_agenda_cost_local"
                        value={form.proctor_agenda_cost_local}
                        onChange={handleChange}
                        variant="outlined"
                        type="Number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">QTZ</InputAdornment>,
                          inputProps: { min: 0 },
                        }}
                        style={{ width: '35%', paddingRight: '5px' }}
                        disabled={form.status !== statusName.ABIERTO}
                        required
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Monto facturado"
                        id="totalInvoice"
                        name="totalInvoice"
                        value={totalInvoice}
                        variant="outlined"
                        type="Number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">QTZ</InputAdornment>,
                          inputProps: { min: 0 },
                        }}
                        style={{ width: '35%', paddingRight: '5px' }}
                        disabled
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Monto a devolver"
                        id="agenda_return_amount_local"
                        name="agenda_return_amount_local"
                        value={form.agenda_return_amount_local}
                        onChange={handleChange}
                        variant="outlined"
                        type="Number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">QTZ</InputAdornment>,
                          inputProps: { min: 0 },
                        }}
                        style={{ width: '30%' }}
                        disabled={form.status !== statusName.PROCESO}
                        required={form.status === statusName.PROCESO}
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Monto"
                        id="proctor_agenda_cost_outer"
                        name="proctor_agenda_cost_outer"
                        value={form.proctor_agenda_cost_outer}
                        onChange={handleChange}
                        variant="outlined"
                        type="Number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                          inputProps: { min: 0 },
                        }}
                        style={{ width: '35%', paddingRight: '5px' }}
                        disabled={form.status !== statusName.ABIERTO}
                        required
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Monto facturado"
                        id="totalInvoiceOuter"
                        name="totalInvoiceOuter"
                        value={totalInvoiceOuter}
                        variant="outlined"
                        type="Number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                          inputProps: { min: 0 },
                        }}
                        style={{ width: '35%', paddingRight: '5px' }}
                        disabled
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="Monto a devolver"
                        id="agenda_return_amount_outer"
                        name="agenda_return_amount_outer"
                        value={form.agenda_return_amount_outer}
                        onChange={handleChange}
                        variant="outlined"
                        type="Number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">USD</InputAdornment>,
                          inputProps: { min: 0 },
                        }}
                        style={{ width: '30%' }}
                        disabled={form.status !== statusName.PROCESO}
                        required={form.status === statusName.PROCESO}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="pb-48">
                      <div className="pb-16 flex items-center">
                        <Icon className="mr-16" color="action">
                          assignment
                        </Icon>
                        <Typography className="h2" color="textSecondary">
                          Actividades
                        </Typography>
                      </div>

                      <div className="mb-24">
                        <div className="table-responsive">
                          <ActivityExpandTable
                            data={selectedActivities}
                            showButton={form.status === statusName.PROCESO}
                            dispatchFunction={(id, status) => dispatch(Actions.openEditAgendaDetailDialog(id, status))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {form && form.status === statusName.PROCESO && (
                    <div>
                      <div className="pb-48">
                        <div className="pb-16 flex items-center">
                          <Icon className="mr-16" color="action">
                            receipt
                          </Icon>
                          <Typography className="h2" color="textSecondary">
                            Facturas
                          </Typography>
                        </div>

                        <div className="mb-24">
                          <div className="table-responsive">
                            <table className="simple">
                              <thead>
                                <tr>
                                  <th>Tipo</th>
                                  <th>Rango</th>
                                  <th>No. Factura</th>
                                  <th>Fecha</th>
                                  <th>Total QTZ</th>
                                  <th>Total USD</th>
                                  <th>...</th>
                                </tr>
                              </thead>
                              <tbody>
                                {invoiceList.map(activity => (
                                  <tr key={activity.id}>
                                    <td>
                                      <span className="truncate">{`${activity.invoice_type === 1 ? 'Recibo' : 'Factura'}`}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{activity.invoice_range}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{activity.invoice_num}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{activity.assign_date}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{activity.invoice_currency === 1 ? activity.invoice_total : 0}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{activity.invoice_currency === 2 ? activity.invoice_total : 0}</span>
                                    </td>
                                    <td>
                                      <div className="flex items-center">
                                        {form.status === statusName.PROCESO && activity.status === statusName.ABIERTO && (
                                          <IconButton
                                            onClick={ev => {
                                              ev.stopPropagation();
                                              dispatch(Actions.deleteActivitySettle(activity.id, form.id));
                                            }}
                                          >
                                            <Icon>delete</Icon>
                                          </IconButton>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              {(totalInvoice !== 0 || totalInvoiceOuter !== 0) && (
                                <tfoot>
                                  <tr>
                                    <th id="total" colSpan="4">
                                      <strong>Total</strong>
                                    </th>
                                    <td>{totalInvoice}</td>
                                    <td>{totalInvoiceOuter}</td>
                                  </tr>
                                </tfoot>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                      {form && form.status === statusName.PROCESO && (
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                          <Fab
                            color="primary"
                            aria-label="add"
                            className={classes.addButton}
                            onClick={() => dispatch(Actions.openAddActivitySettleDialog(form.id))}
                          >
                            <Icon>add</Icon>
                          </Fab>
                        </FuseAnimate>
                      )}
                      <MySnackbarContentWrapper
                        variant="warning"
                        className={classes.warningMessage}
                        message="Para cerrar la liquidación, el total debe ser menor o igual al monto asignado al procurador!"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )
        }
        innerScroll
      />
      <AssignActivitiesDialog />
      <NewAgendaStateChange />
      <NewSettlementDialog />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
}

export default withReducer('proctorAgendaApp', reducer)(NewAgenda);
