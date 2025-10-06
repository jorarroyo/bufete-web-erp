import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { useForm } from '@fuse/hooks';
import { Typography, Icon, Button, Tabs, Tab, TextField, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Addresses from 'app/main/shared/Addresses';
import Phones from 'app/main/shared/Phones';
import * as ContactActions from 'app/main/shared/store/actions/contacts';
import _ from '@lodash';
import { FusePageCarded, FuseAnimate } from '@fuse';
import DatePicker from 'app/main/shared/DatePicker';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import EmployeeServices from 'app/services/file-records/employeesService';
import { EmployeesConstants } from 'app/constants/appConstant';
import ContactList from 'app/main/shared/contacts/ContactList';
import FELDocumentServices from 'app/services/fel/felDocumentServices';
import reducer from '../store/reducers/clients';
import * as Actions from '../store/actions/clients';
import ClientGroupDetail from './ClientGroupDetail';

function Client(props) {
  const dispatch = useDispatch();
  const client = useSelector(({ clientsApp }) => clientsApp.client.data);
  const loading = useSelector(({ clientsApp }) => clientsApp.client.loading);
  const deptos = useSelector(({ clientsApp }) => clientsApp.client.departments);
  const countries = useSelector(({ clientsApp }) => clientsApp.client.countries);
  const reload = useSelector(({ clientsApp }) => clientsApp.client.reload);

  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm, setInForm } = useForm(null);
  const [addressData, setAddressData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [admons, setAdmons] = useState([]);
  const [childClientList, setChildClientList] = useState([]);
  const { match } = props;

  useEffect(() => {
    function updateClientState() {
      const { params } = match;
      const { clientId } = params;

      if (clientId === 'new') {
        dispatch(ContactActions.setInitialData([]));
        dispatch(Actions.newClient());
      } else {
        dispatch(Actions.getClient(clientId));
        setChildClientList([]);
      }
    }

    updateClientState();
  }, [dispatch, match]);

  useEffect(() => {
    if ((client && !form) || (client && form && client.id !== form.id) || reload) {
      setForm(client);
      setAddressData(client.addresses);
      setPhoneData(client.phones);
      setContactData(client.contacts);
      setChildClientList(client.child_list);
      dispatch(Actions.reloadData(false));
    }
  }, [form, client, reload, setForm, dispatch]);

  useEffect(() => {
    if (deptos && deptos.length === 0) {
      dispatch(Actions.getDepartments());
    }

    if (countries && countries.length === 0) {
      dispatch(Actions.getCountries());
    }
  }, [deptos, countries, dispatch]);

  useEffect(() => {
    async function fetchData() {
      if (lawyers.length === 0) {
        const lawyerResponse = await EmployeeServices.getEmployeesByPosition(EmployeesConstants.LAWYER);
        setLawyers(lawyerResponse);
      }
      if (admons.length === 0) {
        const admonResponse = await EmployeeServices.getEmployeesByPosition(EmployeesConstants.ADMON);
        setAdmons(admonResponse);
      }
    }
    fetchData();
  }, [lawyers.length, admons.length]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    if (form.id === '') {
      return (
        !_.isEqual(client, form) && form.addresses.length > 0 // &&
        // form.phones.length > 0 &&
        // form.contacts.length > 0
      );
    }
    if (!client) {
      return true;
    }
    return (
      form.name !== client.name ||
      form.last_name !== client.last_name ||
      form.acronym !== client.acronym ||
      form.nit !== client.nit ||
      form.addresses.length !== client.addresses.length ||
      form.phones.length !== client.phones.length ||
      form.contacts.length !== client.contacts.length ||
      form.client_sex_type !== client.client_sex_type ||
      form.client_bday !== client.client_bday ||
      form.client_doc_type !== client.client_doc_type ||
      form.client_doc_num !== client.client_doc_num ||
      form.client_doc_emmit !== client.client_doc_emmit ||
      form.client_lawyer !== client.client_lawyer ||
      form.client_lawyer_jr !== client.client_lawyer_jr ||
      form.client_lawyer_assistant !== client.client_lawyer_assistant ||
      form.client_observation !== client.client_observation ||
      form.child_list.length !== client.child_list
    );
  }

  function handleAddressChange(action, data) {
    form.addresses = data;
    setAddressData(data);
  }

  function handlePhoneChange(action, data) {
    form.phones = data;
    setPhoneData(data);
  }

  function handleContactChange(data) {
    form.contacts = data;
    setContactData(data);
  }

  function handleChildClient(data) {
    form.child_list = data;
    setChildClientList(data);
  }

  const handleDateChange = date => {
    setInForm('client_bday', date);
  };

  async function validateName() {
    if (form.nit) {
      const newNIT = form.nit.replace(' ', '').replace('-', '');
      const clientName = await FELDocumentServices.checkClientNameByNIT(newNIT);
      setInForm('name', clientName || '**** No encontrado ****');
    }
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
                  <Typography
                    className="normal-case flex items-center sm:mb-12"
                    component={Link}
                    role="button"
                    to="/apps/file-records/clients"
                    color="inherit"
                  >
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Clientes
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">
                        {form.name ? `${form.name} ${form.client_type === 2 ? form.last_name || '' : ''}` : 'Nuevo Cliente'}
                      </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles del Cliente</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(Actions.saveClient(form))}
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
            <Tab className="h-64 normal-case" label="Dirección(es)" />
            <Tab className="h-64 normal-case" label="Teléfono(s)" />
            <Tab className="h-64 normal-case" label="Personales" />
            <Tab className="h-64 normal-case" label="Datos Admin." />
            <Tab className="h-64 normal-case" label="Contacto(s)" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <div>
                  <input type="hidden" value={form.id} id="id" name="id" />
                  <TextField
                    id="client_type"
                    select
                    error={form.client_type === -1}
                    required
                    autoFocus
                    label="Tipo"
                    name="client_type"
                    className="mt-8 mb-16"
                    value={form.client_type}
                    onChange={handleChange}
                    helperText="Seleccione un tipo de Cliente"
                    variant="outlined"
                    fullWidth
                    disabled={form.id !== ''}
                  >
                    <MenuItem key="entidad" value="1">
                      Empresa/Entidad
                    </MenuItem>
                    <MenuItem key="individual" value="2">
                      Persona Individual
                    </MenuItem>
                    <MenuItem key="grupo" value="3">
                      Grupo
                    </MenuItem>
                  </TextField>
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '30%', paddingRight: '5px' }}
                    required
                    error={form.nit === ''}
                    label="NIT"
                    id="nit"
                    name="nit"
                    value={form.nit}
                    onChange={handleChange}
                    variant="outlined"
                    onBlur={validateName}
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '70%' }}
                    error={form.name === ''}
                    required
                    label="Nombre"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  {(form.client_type === 1 || form.client_type === '1') && (
                    <TextField
                      className="mt-8 mb-16"
                      style={{ width: '50%', paddingRight: '5px' }}
                      label="Siglas"
                      id="acronym"
                      name="acronym"
                      value={form.acronym}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  )}
                  {form.client_type === 3 && <ClientGroupDetail clientList={childClientList} setClientList={handleChildClient} />}
                </div>
              )}
              {tabValue === 1 && (
                <div>
                  <Addresses handleAction={handleAddressChange} addressData={addressData} />
                </div>
              )}
              {tabValue === 2 && (
                <div>
                  <Phones handleAction={handlePhoneChange} phoneData={phoneData} />
                </div>
              )}
              {tabValue === 3 && (
                <div>
                  <input type="hidden" value={form.client_info_id} id="client_info_id" name="client_info_id" />
                  <DatePicker
                    id="client_bday"
                    name="client_bday"
                    label="Fecha de nacimiento"
                    className="mt-8 mb-16"
                    value={form.client_bday || null}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disableFuture
                    disableToolbar={false}
                    fullWidth
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
                    id="client_doc_type"
                    style={{ width: '50%', paddingRight: '5px' }}
                    select
                    label="Tipo Documento"
                    name="client_doc_type"
                    className="mt-8 mb-16"
                    value={form.client_doc_type}
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
                    id="client_doc_num"
                    name="client_doc_num"
                    value={form.client_doc_num}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  {(form.client_doc_type === 1 || form.client_doc_type === '1') && (
                    <TextField
                      id="client_doc_emmit"
                      style={{ width: '50%', paddingRight: '5px' }}
                      select
                      label="Emitido en"
                      name="client_doc_emmit"
                      className="mt-8 mb-16"
                      value={form.client_doc_emmit}
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
                  {(form.client_doc_type === 2 || form.client_doc_type === '2') && (
                    <TextField
                      id="client_doc_emmit"
                      style={{ width: '50%', paddingRight: '5px' }}
                      select
                      label="Emitido en"
                      name="client_doc_emmit"
                      className="mt-8 mb-16"
                      value={form.client_doc_emmit}
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
              {tabValue === 4 && (
                <div>
                  <TextField
                    id="client_lawyer"
                    select
                    className="mt-8 mb-16"
                    label="Abogado Senior"
                    name="client_lawyer"
                    value={form.client_lawyer}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    {lawyers ? (
                      lawyers.map(law => (
                        <MenuItem key={law.id} value={law.id}>
                          {law.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="none">Sin Registros</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="client_lawyer_jr"
                    select
                    className="mt-8 mb-16"
                    label="Abogado Junior"
                    name="client_lawyer_jr"
                    value={form.client_lawyer_jr}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    {lawyers ? (
                      lawyers.map(law => (
                        <MenuItem key={law.id} value={law.id}>
                          {law.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="none">Sin Registros</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="client_lawyer_assistant"
                    select
                    className="mt-8 mb-16"
                    label="Asistente(s)"
                    name="client_lawyer_assistant"
                    value={form.client_lawyer_assistant}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  >
                    {admons ? (
                      admons.map(adm => (
                        <MenuItem key={adm.id} value={adm.id}>
                          {adm.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="-1">Sin Registros</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    className="mt-8 mb-16"
                    label="Observaciones"
                    id="client_observation"
                    name="client_observation"
                    value={form.client_observation}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rowsMax="4"
                    fullWidth
                  />
                </div>
              )}
              {tabValue === 5 && (
                <div>
                  <ContactList handleAction={handleContactChange} contactData={contactData} />
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

export default withReducer('clientsApp', reducer)(Client);
