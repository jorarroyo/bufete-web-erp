import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import { Typography, Icon, Button, Tabs, Tab, TextField, MenuItem } from '@material-ui/core';
import _ from '@lodash';
import { FusePageCarded, FuseAnimate } from '@fuse';
import DatePicker from 'app/main/shared/DatePicker';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import * as Actions from '../store/actions/employees';
import reducer from '../store/reducers/employees';

function Employee(props) {
  const dispatch = useDispatch();
  const employee = useSelector(({ employeesApp }) => employeesApp.employee.data);
  const loading = useSelector(({ employeesApp }) => employeesApp.employee.loading);
  const deptos = useSelector(({ employeesApp }) => employeesApp.employee.departments);
  const countries = useSelector(({ employeesApp }) => employeesApp.employee.countries);

  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm, setInForm } = useForm(null);
  const { match } = props;

  useEffect(() => {
    function updateEmployeeState() {
      const { params } = match;
      const { employeeId } = params;

      if (employeeId === 'new') {
        dispatch(Actions.newEmployee());
      } else {
        dispatch(Actions.getEmployee(employeeId));
      }
    }

    updateEmployeeState();
  }, [dispatch, match]);

  useEffect(() => {
    if (
      (employee && !form) ||
      (employee &&
        form &&
        (employee.id !== form.id || employee.employee_info_id !== form.employee_info_id || employee.contact_id !== form.contact_id))
    ) {
      setForm(employee);
    }
  }, [form, employee, setForm]);

  useEffect(() => {
    if (deptos && deptos.length === 0) {
      dispatch(Actions.getDepartmentsEmp());
    }

    if (countries && countries.length === 0) {
      dispatch(Actions.getCountriesEmp());
    }
  }, [deptos, countries, dispatch]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    return !_.isEqual(employee, form);
  }

  const handleDateChange = date => {
    setInForm('employee_adminission', date);
  };

  const handleDateBDayChange = date => {
    setInForm('employee_bday', date);
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
                    to="/apps/file-records/employees"
                    color="inherit"
                  >
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Empleados
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">
                        {form.name ? `${form.name} ${form.last_name}` : 'Nuevo Empleado'}
                      </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles del Empleado</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(Actions.saveEmployee(form))}
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
            <Tab className="h-64 normal-case" label="Info. Básica" />
            <Tab className="h-64 normal-case" label="Info. General" />
            <Tab className="h-64 normal-case" label="Personales" />
            <Tab className="h-64 normal-case" label="Nivel académico" />
            <Tab className="h-64 normal-case" label="Contacto de Emergencia" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <div>
                  <input type="hidden" value={form.id} id="id" name="id" />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    error={form.name === ''}
                    required
                    label="Nombres"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    autoFocus
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    error={form.last_name === ''}
                    required
                    label="Apellidos"
                    id="last_name"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    id="civil_status"
                    select
                    style={{ width: '50%', paddingRight: '5px' }}
                    label="Estado Civil"
                    name="civil_status"
                    className="mt-8 mb-16"
                    value={form.civil_status}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem key="soltero" value="1">
                      Soltero
                    </MenuItem>
                    <MenuItem key="casado" value="2">
                      Casado
                    </MenuItem>
                  </TextField>
                  <TextField
                    id="position"
                    style={{ width: '50%' }}
                    select
                    error={form.position === ''}
                    required
                    label="Puesto"
                    name="position"
                    className="mt-8 mb-16"
                    value={form.position}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem key="abogado" value="1">
                      Abogado
                    </MenuItem>
                    <MenuItem key="asistente" value="2">
                      Asistente/Admin
                    </MenuItem>
                    <MenuItem key="contable" value="3">
                      Asistente Contable
                    </MenuItem>
                    <MenuItem key="recepcionista" value="4">
                      Recepcionista
                    </MenuItem>
                    <MenuItem key="conserje" value="5">
                      Conserje
                    </MenuItem>
                    <MenuItem key="piloto" value="6">
                      Piloto/Mensajero
                    </MenuItem>
                  </TextField>
                  <DatePicker
                    id="employee_adminission"
                    style={{ width: '50%' }}
                    name="employee_adminission"
                    label="Fecha de ingreso"
                    className="mt-8 mb-16"
                    value={form.employee_adminission || null}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disableFuture
                    disableToolbar={false}
                  />
                </div>
              )}
              {tabValue === 1 && (
                <div>
                  <TextField
                    className="mt-8 mb-16"
                    error={form.address === ''}
                    required
                    label="Dirección"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    autoFocus
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    error={form.home_phone === ''}
                    required
                    label="Telefono de casa"
                    id="home_phone"
                    name="home_phone"
                    value={form.home_phone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%' }}
                    error={form.cel_phone === ''}
                    required
                    label="Celular"
                    id="cel_phone"
                    name="cel_phone"
                    value={form.cel_phone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    error={form.nit === ''}
                    required
                    label="NIT"
                    id="nit"
                    name="nit"
                    value={form.nit}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%' }}
                    label="IGSS"
                    id="igss"
                    name="igss"
                    value={form.igss}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    label="Cantidad de hijos"
                    id="child_no"
                    name="child_no"
                    value={form.child_no}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                  />
                </div>
              )}
              {tabValue === 2 && (
                <div>
                  <input type="hidden" value={form.employee_info_id} id="employee_info_id" name="employee_info_id" />
                  <TextField
                    id="employee_sex_type"
                    style={{ width: '50%', paddingRight: '5px' }}
                    select
                    autoFocus
                    label="Sexo"
                    name="employee_sex_type"
                    className="mt-8 mb-16"
                    value={form.employee_sex_type}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem key="masculino" value="1">
                      Masculino
                    </MenuItem>
                    <MenuItem key="femenino" value="2">
                      Femenino
                    </MenuItem>
                  </TextField>
                  <DatePicker
                    id="employee_bday"
                    style={{ width: '50%' }}
                    name="employee_bday"
                    label="Fecha de nacimiento"
                    className="mt-8 mb-16"
                    value={form.employee_bday || null}
                    onChange={handleDateBDayChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disableFuture
                    disableToolbar={false}
                  />
                  <div className="pb-16 flex items-center">
                    <Icon className="mr-16" color="action">
                      ballot
                    </Icon>
                    <Typography className="h2" color="textSecondary">
                      Documento de identidad
                    </Typography>
                  </div>
                  <TextField
                    id="employee_doc_type"
                    style={{ width: '50%', paddingRight: '5px' }}
                    select
                    label="Tipo Documento"
                    name="employee_doc_type"
                    className="mt-8 mb-16"
                    value={form.employee_doc_type}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem key="dpi" value="1">
                      DPI
                    </MenuItem>
                    <MenuItem key="pasaporte" value="2">
                      Pasaporte
                    </MenuItem>
                  </TextField>
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%' }}
                    label="Número de documento"
                    id="employee_doc_num"
                    name="employee_doc_num"
                    value={form.employee_doc_num}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  {(form.employee_doc_type === 1 || form.employee_doc_type === '1') && (
                    <TextField
                      id="employee_doc_emmit"
                      style={{ width: '50%', paddingRight: '5px' }}
                      select
                      label="Emitido en"
                      name="employee_doc_emmit"
                      className="mt-8 mb-16"
                      value={form.employee_doc_emmit}
                      onChange={handleChange}
                      variant="outlined"
                    >
                      {deptos ? (
                        deptos.map(dep => (
                          <MenuItem key={dep.id} value={dep.id}>
                            {dep.label}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="none">Sin registros....</MenuItem>
                      )}
                    </TextField>
                  )}
                  {(form.employee_doc_type === 2 || form.employee_doc_type === '2') && (
                    <TextField
                      id="employee_doc_emmit"
                      style={{ width: '50%', paddingRight: '5px' }}
                      select
                      label="Emitido en"
                      name="employee_doc_emmit"
                      className="mt-8 mb-16"
                      value={form.employee_doc_emmit}
                      onChange={handleChange}
                      variant="outlined"
                    >
                      {countries ? (
                        countries.map(dep => (
                          <MenuItem key={dep.id} value={dep.id}>
                            {dep.label}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="none">Sin registros....</MenuItem>
                      )}
                    </TextField>
                  )}
                </div>
              )}
              {tabValue === 3 && (
                <div>
                  <TextField
                    className="mt-8 mb-16"
                    label="Nivel Académico"
                    id="academic_level"
                    name="academic_level"
                    value={form.academic_level}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    label="Título o diploma"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    label="Pueblo de pertenencia"
                    id="village"
                    name="village"
                    value={form.village}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    label="Idiomas que domina"
                    id="languages"
                    name="languages"
                    value={form.languages}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              )}
              {tabValue === 4 && (
                <div>
                  <input type="hidden" value={form.contact_id} id="contact_id" name="contact_id" />
                  <TextField
                    className="mt-8 mb-16"
                    error={form.contact_name === ''}
                    required
                    label="Nombre"
                    id="contact_name"
                    autoFocus
                    name="contact_name"
                    value={form.contact_name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    error={form.contact_address === ''}
                    required
                    label="Dirección"
                    id="contact_address"
                    name="contact_address"
                    value={form.contact_address}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    error={form.contact_phone === ''}
                    required
                    label="Teléfono"
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    value={form.contact_phone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    error={form.contact_email === ''}
                    required
                    label="Correo"
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    value={form.contact_email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
              )}
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
}

export default withReducer('employeesApp', reducer)(Employee);
