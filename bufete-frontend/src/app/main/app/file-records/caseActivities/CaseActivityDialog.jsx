import { useForm } from '@fuse/hooks';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { CaseActivityType, dialogConstants, EmployeesConstants, statusName } from 'app/constants/appConstant';
import DatePicker from 'app/main/shared/DatePicker';
import SearchRecordFileDialog from 'app/main/shared/recordSearch/SearchRecordFileDialog';
import ActivityServices from 'app/services/catalogs/activitiesService';
import InstitutionServices from 'app/services/catalogs/institutionsService';
import EmployeeServices from 'app/services/file-records/employeesService';
import RecordServices from 'app/services/file-records/recordsService';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormatCustom from 'app/main/shared/NumberFormatCustom';
import DateRangePicker from 'app/main/shared/DateRangePicker';
import VirtualSearch from 'app/main/shared/VirtualSearch';
import TimeInput from 'app/main/shared/TimeInput';
import helperFunctions from 'app/utils/helperFunc';
import * as Actions from '../store/actions/case-activities';

const defaultFormState = {
  id: '',
  activity_id: '',
  institution_id: '',
  assign_date: new Date(),
  comment: '',
  activity_time: 0,
  activity_start_date: new Date(),
  activity_end_date: new Date(),
  recordId: '',
  employee_id: '',
  activity_cost: 0,
  currency_type: 1,
  check_number: '',
  check_amount: '',
  case_activity_type: EmployeesConstants.LAWYER,
  activity_name: '',
  employee_list_ids: [],
};

// TODO: validar los otros puestos a utilizar para honorarios ... abogados y asistentes?
const selectEmployeeType = caseActivityType => {
  if (caseActivityType === CaseActivityType.HONORARIOS || caseActivityType === CaseActivityType.REUNION) {
    return [EmployeesConstants.LAWYER];
  }
  return [EmployeesConstants.ADMON];
};

const CaseActivityDialog = () => {
  const dispatch = useDispatch();
  const caseActivityDialog = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.caseActivityDialog);
  const recordId = useSelector(({ caseActivitiesApp }) => caseActivitiesApp.caseActivities.recordId);

  const [activities, setActivities] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [records, setRecords] = useState([]);
  const [employeeFilter, setEmployeeFilter] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('rango');

  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (caseActivityDialog.type === 'edit' && caseActivityDialog.data) {
      setForm({
        ...caseActivityDialog.data,
        recordId: caseActivityDialog.data.file_record_id,
        activity_time:
          selectedValue === 'total' ? helperFunctions.calcDateDiff(caseActivityDialog.data.activity_time) : caseActivityDialog.data.activity_time,
      });
      setEmployeeFilter(selectEmployeeType(caseActivityDialog.data.case_activity_type));
    }
    if (caseActivityDialog.type === 'new' || caseActivityDialog.type === 'recordActivity') {
      setForm({
        ...defaultFormState,
        ...caseActivityDialog.data,
        case_activity_type: caseActivityDialog.type === 'new' ? CaseActivityType.PROCURACION : CaseActivityType.HONORARIOS,
        recordId,
      });
      setEmployeeFilter(selectEmployeeType(caseActivityDialog.type === 'new' ? CaseActivityType.PROCURACION : CaseActivityType.HONORARIOS));
    }
  }, [caseActivityDialog.data, caseActivityDialog.type, setForm, recordId]);

  useEffect(() => {
    async function fetchData() {
      if (activities.length === 0) {
        const response = await ActivityServices.activitiesByStatus(statusName.ACTIVO);
        setActivities(response.map(activity => ({ id: activity.id, name: activity.name })));
      }
      if (institutions.length === 0) {
        const instResponse = await InstitutionServices.institutionsByStatus(statusName.ACTIVO);
        setInstitutions(instResponse.map(inst => ({ id: inst.id, name: inst.name })));
      }
      if (/* employees.length === 0 && */ employeeFilter.length !== 0) {
        const employeeResponse = await EmployeeServices.getEmployeesByPosition(employeeFilter);
        setEmployees(employeeResponse.map(emp => ({ id: emp.id, name: emp.name })));
      }
      if (records.length === 0) {
        const recordsResponse = await RecordServices.getActiveRecordFiles();
        setRecords(recordsResponse.map(recr => ({ id: recr.id, name: recr.name })));
      }
      if (lawyers.length === 0) {
        const lawyerResponse = await EmployeeServices.getEmployeesByPosition(EmployeesConstants.LAWYER);
        setLawyers(lawyerResponse.map(law => ({ value: law.id, label: law.name })));
      }
    }

    fetchData();
  }, [activities.length, institutions.length, employees.length, records.length, lawyers.length, employeeFilter]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (caseActivityDialog.props.open) {
      initDialog();
    }
  }, [caseActivityDialog.props.open, initDialog]);

  function closeComposeDialog() {
    // eslint-disable-next-line no-unused-expressions
    caseActivityDialog.type === 'edit' ? dispatch(Actions.closeEditCaseActivityDialog()) : dispatch(Actions.closeNewCaseActivityDialog());
  }

  function canBeSubmitted() {
    if (form.id === 0 || form.id === '') {
      if (caseActivityDialog.type === 'recordActivity' && form.case_activity_type === CaseActivityType.HONORARIOS) {
        return form.activity_name !== '' && form.recordId !== '' && form.employee_id !== '' && form.activity_time !== 0;
      }
      if (caseActivityDialog.type === 'recordActivity' && form.case_activity_type === CaseActivityType.REUNION) {
        return form.activity_name !== '' && form.recordId !== '' && form.activity_time !== 0;
      }
      return (
        form.institution_id !== '' && form.recordId !== '' && form.employee_id !== '' && form.assign_date !== ''
        // form.activity_cost !== ''
      );
    }
    if (!caseActivityDialog.data) return false;
    return (
      form.activity_name !== caseActivityDialog.data.activity_name ||
      form.institution_id !== caseActivityDialog.data.institution_id ||
      form.assign_date !== caseActivityDialog.data.assign_date ||
      form.comment !== caseActivityDialog.data.comment ||
      form.employee_id !== caseActivityDialog.data.employee_id ||
      // form.activity_cost !== caseActivityDialog.data.activity_cost ||
      form.activity_time !== caseActivityDialog.data.activity_time ||
      form.currency_type !== caseActivityDialog.data.currency_type ||
      form.check_number !== caseActivityDialog.data.check_number ||
      form.check_amount !== caseActivityDialog.data.check_amount
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createCaseActivity(form));
    closeComposeDialog();
  }

  const handleDateChange = date => {
    setInForm('assign_date', date);
  };

  const handleSelect = itemId => {
    setInForm('recordId', itemId);
  };

  function handleMultiSelect(type, value) {
    if (value) {
      setInForm(
        type,
        value.map(val => val.value)
      );
    } else {
      setInForm(type, []);
    }
  }

  const onActivityTimeChange = (timeDiff, startDate, endDate) => {
    setInForm('activity_time', timeDiff);
    setInForm('activity_start_date', startDate);
    setInForm('activity_end_date', endDate);
  };

  const showCaseActivityFields = () => {
    if (recordId === '' && caseActivityDialog.type === 'new') return true;
    if (recordId !== '' && caseActivityDialog.type === 'recordActivity') {
      if (form && form.case_activity_type === CaseActivityType.PROCURACION) {
        return true;
      }
      return false;
    }
    if (recordId !== '' && caseActivityDialog.type === 'edit') {
      if (form && form.case_activity_type === CaseActivityType.PROCURACION) {
        return true;
      }
      return false;
    }
    return true;
  };

  const handleCaseTypeChange = caseType => {
    setInForm('case_activity_type', caseType.target.value);
    setEmployeeFilter(selectEmployeeType(caseType.target.value));
  };

  const handleChangeOption = event => {
    if (event.target.value === 'total') {
      setInForm('activity_time', '0:00');
    }
    setSelectedValue(event.target.value);
  };

  const options = () => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Ingreso de tiempo</FormLabel>
        <RadioGroup row aria-label="position" name="position" value={selectedValue} defaultValue="rango" onChange={handleChangeOption}>
          <FormControlLabel value="rango" control={<Radio color="primary" />} label="Rango" labelPlacement="top" />
          <FormControlLabel value="total" control={<Radio color="primary" />} label="Total (min)" labelPlacement="top" />
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...caseActivityDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {caseActivityDialog.type === 'new' ? 'Nueva Actividad de Expediente' : 'Editar Actividad de Expediente'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          {caseActivityDialog.type === 'recordActivity' && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">toc</Icon>
              </div>
              <TextField
                id="case_activity_type"
                name="case_activity_type"
                select
                label="Tipo"
                className="mb-24"
                value={form.case_activity_type}
                onChange={handleCaseTypeChange}
                SelectProps={{
                  MenuProps: {
                    className: { width: '200' },
                  },
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                <MenuItem key="1" value={CaseActivityType.HONORARIOS}>
                  {CaseActivityType.HONORARIOS}
                </MenuItem>
                <MenuItem key="2" value={CaseActivityType.PROCURACION}>
                  {CaseActivityType.PROCURACION}
                </MenuItem>
                <MenuItem key="3" value={CaseActivityType.REUNION}>
                  {CaseActivityType.REUNION}
                </MenuItem>
              </TextField>
            </div>
          )}
          {showCaseActivityFields() && recordId === '' && (
            <div className="flex">
              <div className="min-w-48 pt-20">
                <Icon color="action">list_alt</Icon>
              </div>
              <SearchRecordFileDialog handleSelect={handleSelect} labelName={form.file_num || ''} />
            </div>
          )}
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">supervised_user_circle</Icon>
            </div>
            {form.case_activity_type !== CaseActivityType.REUNION && (
              <TextField
                id="employee_id"
                name="employee_id"
                select
                label="Responsable"
                className="mb-24"
                value={form.employee_id}
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
                autoFocus={recordId !== 0}
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
            )}
            {form.case_activity_type === CaseActivityType.REUNION && (
              <>
                <VirtualSearch
                  initialState={lawyers.filter(cli => form.employee_list_ids.includes(cli.value))}
                  handleChangeExt={handleMultiSelect}
                  suggestions={lawyers}
                  inputName="Responsables"
                  inputId="employee_list_ids"
                  // disabled={readOnly}
                />
                <br />
              </>
            )}
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">toc</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Actividad"
              value={form.activity_name}
              onChange={handleChange}
              name="activity_name"
              id="activity_name"
              variant="outlined"
              fullWidth
            />
          </div>
          {showCaseActivityFields() && (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">location_city</Icon>
                </div>
                <TextField
                  id="institution_id"
                  name="institution_id"
                  select
                  label="Institución"
                  className="mb-24"
                  value={form.institution_id}
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
                >
                  {institutions.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">date_range</Icon>
                </div>
                <DatePicker
                  className="mb-24"
                  id="assign_date"
                  name="assign_date"
                  label="Fecha"
                  value={form.assign_date}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
              </div>
            </>
          )}
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
          {!showCaseActivityFields() && (
            <>
              <div className="flex" style={{ justifyContent: 'center', itemAlign: 'center' }}>
                {options()}
              </div>
              {selectedValue === 'rango' && (
                <div className="flex">
                  <div className="min-w-48 pt-20">
                    <Icon color="action">timer</Icon>
                  </div>
                  <DateRangePicker
                    title="Seleccionar"
                    startDate={form.activity_start_date}
                    endDate={form.activity_end_date}
                    timeDiff={form.activity_time}
                    handleChoice={onActivityTimeChange}
                  />
                </div>
              )}
              {selectedValue === 'total' && (
                <div className="flex">
                  <div className="min-w-48 pt-20">
                    <Icon color="action">timer</Icon>
                  </div>
                  <TimeInput
                    className="mb-24"
                    label="Tiempo (min)"
                    value={form.activity_time}
                    setValue={handleChange}
                    name="activity_time"
                    id="activity_time"
                    variant="outlined"
                    fullWidth
                  />
                </div>
              )}
            </>
          )}
          {showCaseActivityFields() && (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">monetization_on</Icon>
                </div>
                <TextField
                  id="currency_type"
                  name="currency_type"
                  select
                  label="Moneda"
                  className="mb-24"
                  value={form.currency_type}
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
                  <MenuItem key="1" value="1">
                    Quetzales
                  </MenuItem>
                  <MenuItem key="2" value="2">
                    Dolares
                  </MenuItem>
                </TextField>
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">money</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Monto"
                  value={form.activity_cost}
                  onChange={handleChange}
                  name="activity_cost"
                  id="activity_cost"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                  fullWidth
                />
              </div>

              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">crop_7_5</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="No. de Cheque"
                  id="check_number"
                  name="check_number"
                  value={form.check_number}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">local_atm</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Monto de Cheque"
                  id="check_amount"
                  name="check_amount"
                  value={form.check_amount}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  type="Number"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </div>
            </>
          )}
        </DialogContent>

        {caseActivityDialog.type === 'new' ? (
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

export default CaseActivityDialog;
