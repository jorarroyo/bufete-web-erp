import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TextField, Toolbar, Typography, MenuItem } from '@material-ui/core';
import { dialogConstants, actionsName, EmployeesConstants } from 'app/constants/appConstant';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonServices from 'app/services/shared';
import helperFunctions from 'app/utils/helperFunc';
import EmployeeServices from 'app/services/file-records/employeesService';
import * as Actions from '../store/actions/stamp-duty';
import DatePicker from 'app/main/shared/DatePicker';

const defaultFormState = {
  stamp_type: 0,
  designation_type: 0,
  year: 0,
  comment: '',
  stamp_number: 0,
  purchase_date: '',
  employee_id: 0,
  form_number: '',
  form_range: '',
  action: actionsName.ENTRADA,
  activity_id: null,
};

const StampDutyAddDialog = () => {
  const dispatch = useDispatch();
  const stampDutyDialog = useSelector(({ stampDutyApp }) => stampDutyApp.stampDuty.stampDutyDialog);
  const [stampTypeList, setStampTypeList] = useState([]);
  const [designationTypeList, setDesignationTypeList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [employees, setEmployees] = useState([]);

  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (stampDutyDialog.type === 'edit' && stampDutyDialog.data) {
      setForm({ ...stampDutyDialog.data });
    }
    if (stampDutyDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...stampDutyDialog.data,
        // id: FuseUtils.generateGUID(),
      });
    }
    setYearList(helperFunctions.yearList(new Date().getFullYear() - 5));
  }, [stampDutyDialog.data, stampDutyDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (stampDutyDialog.props.open) {
      initDialog();
    }
  }, [stampDutyDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeAddStampDutyDialog());
  }

  function canBeSubmitted() {
    return form.stamp_type !== 0 && form.designation_type !== 0 && form.year !== 0 && form.stamp_number > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createStampDuty(form));
    dispatch(Actions.initRequest());
    closeComposeDialog();
  }

  useEffect(() => {
    async function fetchData() {
      if (stampTypeList.length === 0) {
        const response = await CommonServices.getCatalogs(5, 0);
        setStampTypeList(response.map(sType => ({ id: sType.id, name: sType.name })));
      }
      if (designationTypeList.length === 0) {
        const desResponse = await CommonServices.getCatalogs(6, 0);
        setDesignationTypeList(desResponse.map(des => ({ id: des.id, name: des.name })));
      }
      if (employees.length === 0) {
        const employeeResponse = await EmployeeServices.getEmployeesByPosition([EmployeesConstants.ADMON]);
        setEmployees(employeeResponse.map(emp => ({ id: emp.id, name: emp.name })));
      }
    }
    fetchData();
  }, [stampTypeList.length, designationTypeList.length, employees.length]);

  const handleDateChange = date => {
    setInForm('purchase_date', date);
  };

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...stampDutyDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Nueva Entrada a Inventario
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              id="stamp_type"
              select
              label="Tipo de Timbre"
              name="stamp_type"
              className="mb-24"
              value={form.stamp_type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              autoFocus
              required
            >
              {stampTypeList ? (
                stampTypeList.map(com => (
                  <MenuItem key={com.id} value={com.id}>
                    {com.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="none">Sin registros....</MenuItem>
              )}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              id="designation_type"
              select
              label="Denominacion"
              name="designation_type"
              className="mb-24"
              value={form.designation_type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            >
              {designationTypeList ? (
                designationTypeList.map(com => (
                  <MenuItem key={com.id} value={com.id}>
                    {com.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="none">Sin registros....</MenuItem>
              )}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Año"
              id="year"
              name="year"
              select
              value={form.year}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            >
              {yearList ? (
                yearList.map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="none">Sin registros....</MenuItem>
              )}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Cantidad"
              id="stamp_number"
              name="stamp_number"
              value={form.stamp_number}
              onChange={handleChange}
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              required
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <DatePicker
              className="mb-24"
              label="Fecha de compra"
              id="purchase_date"
              name="purchase_date"
              value={form.purchase_date || null}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              disableFuture={true}
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
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
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">list_alt</Icon>
            </div>
            <TextField
              id="employee_id"
              name="employee_id"
              select
              label="Empleado"
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
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Numero de formulario SAT"
              id="form_number"
              name="form_number"
              value={form.form_number}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Rango del registro de la SAT"
              id="form_range"
              name="form_range"
              value={form.form_range}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Agregar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StampDutyAddDialog;
