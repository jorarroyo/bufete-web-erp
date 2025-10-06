import { useForm } from '@fuse/hooks';
import { Button, Chip, Icon, MenuItem, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { EmployeesConstants, statusName } from 'app/constants/appConstant';
import Autocomplete from 'app/main/shared/Autocomplete';
import DatePicker from 'app/main/shared/DatePicker';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import VirtualSearch from 'app/main/shared/VirtualSearch';
import ClientServices from 'app/services/file-records/clientsService';
import EmployeeServices from 'app/services/file-records/employeesService';
import withReducer from 'app/store/withReducer';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { FuseAnimate, FusePageCarded } from '@fuse';
import FaceIcon from '@material-ui/icons/Face';
import * as Actions from '../store/actions/records';
import reducer from '../store/reducers/records';
import CaseActivityRecordFile from 'app/main/app/file-records/caseActivities/CaseActivityRecordFile';
import StampInvOptions from 'app/main/app/inventory/stamp-inv-opt/StampInvOptions';

const useStyles = makeStyles(theme => ({
  warningMessage: {
    width: '100%',
  },
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function RecordFile(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const record = useSelector(({ recordsApp }) => recordsApp.record.data);
  const loading = useSelector(({ recordsApp }) => recordsApp.record.loading);
  const recordType = useSelector(({ recordsApp }) => recordsApp.record.types);
  const recordSubtype = useSelector(({ recordsApp }) => recordsApp.record.subtypes);
  const readOnly = record && (record.status === statusName.CERRADO || record.status === statusName.AUTORIZADO);

  const [clients, setClients] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [admons, setAdmons] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    clientId: 0,
    lawyerId: 0,
    admonId: 0,
  });
  const { form, handleChange, setForm, setInForm } = useForm(null);
  const { match } = props;

  useEffect(() => {
    function updateRecordFileState() {
      const { params } = match;
      const { recordId } = params;

      if (recordId === 'new') {
        dispatch(Actions.newRecordFile());
      } else {
        dispatch(Actions.getRecordFile(recordId));
      }
    }

    updateRecordFileState();
  }, [dispatch, match]);

  useEffect(() => {
    const { params } = match;
    const { recordId } = params;

    if (recordId === 'new' && record && record.id !== '') {
      props.history.replace('/apps/file-records/records/' + record.id);
    }
  }, [record, match])

  useEffect(() => {
    if ((record && !form) || (record && form && record.id !== form.id)) {
      setForm(record);
      if (record && record.type !== -1) {
        dispatch(Actions.getSubTypeRecord(record.type));
      }
    }
  }, [form, record, setForm, dispatch]);

  useEffect(() => {
    if (recordType && recordType.length === 0) {
      dispatch(Actions.getTypeRecord());
    }
  }, [form, recordType, dispatch]);

  useEffect(() => {
    if (form && record && form.type !== -1 && form.type !== record.type) {
      dispatch(Actions.getSubTypeRecord(form.type));
      record.type = form.type;
    }
  }, [form, record, dispatch]);

  useEffect(() => {
    async function fetchData() {
      if (clients.length === 0) {
        const response = await ClientServices.clientByStatus(statusName.ACTIVO);
        setClients(response.map(client => ({ value: client.id, label: client.name })));
      }
      if (lawyers.length === 0) {
        const lawyerResponse = await EmployeeServices.getEmployeesByPosition(EmployeesConstants.LAWYER);
        setLawyers(lawyerResponse.map(law => ({ value: law.id, label: law.name })));
      }
      if (admons.length === 0) {
        const admonResponse = await EmployeeServices.getEmployeesByPosition(EmployeesConstants.ADMON);
        setAdmons(admonResponse.map(adm => ({ value: adm.id, label: adm.name })));
      }
    }
    fetchData();
  }, [clients.length, lawyers.length, admons.length]);

  useEffect(() => {
    async function selectData() {
      if (form && personalInfo.clientId !== form.client_id[0] && isEmpty(form.lawyer_id)) {
        const response = await ClientServices.personalInfoByClient(form.client_id[0]);
        if (response) {
          setPersonalInfo({
            clientId: form.client_id[0],
            lawyerId: response.lawyer,
            admonId: response.lawyer_assistant,
          });
          setInForm('lawyer_id', [response.lawyer]);
          setInForm('admon_id', [response.lawyer_assistant]);
        }
      }
    }
    selectData();
  }, [form, personalInfo, setInForm]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    if (form.id !== '') {
      return !_.isEqual(record, form);
    }
    return (
      !_.isEqual(record, form) &&
      form.type !== -1 &&
      form.sub_type !== -1 &&
      !isEmpty(form.client_id) &&
      !isEmpty(form.lawyer_id) &&
      !isEmpty(form.admon_id) &&
      !isEmpty(form.priority) &&
      form.opening_date !== ''
    );
  }

  function handleSelect(type, value) {
    if (value) {
      setInForm(
        type,
        value.map(val => val.value)
      );
    } else {
      setInForm(type, []);
    }
  }

  const handleDateChange = date => {
    setInForm('opening_date', date);
  };

  function goBack() {
    dispatch(Actions.newRecordFile());
    props.history.replace('/apps/file-records/records');
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
                    Expedientes
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">{form.file_num ? form.file_num : 'Nuevo Expediente'}</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles del Expediente</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(Actions.createRecordFile(form))}
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
            <Tab className="h-64 normal-case" label="Carátula" />
            <Tab className="h-64 normal-case" label="Propio" />
            <Tab className="h-64 normal-case" label="Actividades" />
            <Tab className="h-64 normal-case" label="Timbres" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {record && record.message && record.status !== statusName.CERRADO && (
                <>
                  <MySnackbarContentWrapper variant="warning" className={classes.warningMessage} message={record.message || ''} />
                  <br />
                </>
              )}
              {tabValue === 0 && (
                <div>
                  <input type="hidden" value={form.id} id="id" name="id" />
                  <TextField
                    id="type"
                    select
                    error={form.type === -1}
                    required
                    autoFocus
                    label="Tipo"
                    name="type"
                    className="mt-8 mb-16"
                    value={form.type}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={form.id !== '' || readOnly}
                    style={{ width: '50%', paddingRight: '5px' }}
                  >
                    {recordType ? (
                      recordType.map(pos => (
                        <MenuItem key={pos.id} value={pos.id}>
                          {pos.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="none">Sin registros....</MenuItem>
                    )}
                  </TextField>
                  <TextField
                    id="sub_type"
                    select
                    error={form.sub_type === -1}
                    required
                    label="Sub Tipo"
                    name="sub_type"
                    className="mt-8 mb-16"
                    value={form.sub_type}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={form.id !== '' || readOnly}
                    style={{ width: '50%' }}
                  >
                    {recordSubtype ? (
                      recordSubtype.map(pos => (
                        <MenuItem key={pos.id} value={pos.id}>
                          {pos.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="none">Sin registros....</MenuItem>
                    )}
                  </TextField>
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
                    id="opening_date"
                    label="Apertura"
                    value={form.opening_date || null}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={readOnly}
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    label="Cierre"
                    id="closing_date"
                    name="closing_date"
                    value={form.closing_date || ''}
                    onChange={handleChange}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    id="priority"
                    error={form.priority === ''}
                    required
                    select
                    style={{ width: '50%' }}
                    label="Prioridad"
                    name="priority"
                    className="mt-8 mb-16"
                    value={form.priority}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={readOnly}
                  >
                    <MenuItem key="baja" value="Baja">
                      Baja
                    </MenuItem>
                    <MenuItem key="casado" value="Media">
                      Media
                    </MenuItem>
                    <MenuItem key="alta" value="Alta">
                      Alta
                    </MenuItem>
                    <MenuItem key="critica" value="Critica">
                      Critica
                    </MenuItem>
                  </TextField>
                  <TextField
                    className="mt-8 mb-16"
                    id="subject"
                    name="subject"
                    label="Asunto"
                    multiline
                    rows="4"
                    value={form.subject}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                  <TextField
                    className="mt-8 mb-16"
                    id="observations"
                    name="observations"
                    label="Observaciones"
                    multiline
                    rows="4"
                    value={form.observations}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    disabled={readOnly}
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%', paddingRight: '5px' }}
                    label="Ubicación"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={readOnly}
                  />
                  <TextField
                    className="mt-8 mb-16"
                    style={{ width: '50%' }}
                    label="Juicio No."
                    id="judgement_no"
                    name="judgement_no"
                    value={form.judgement_no}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={readOnly}
                  />
                </div>
              )}
              {tabValue === 1 && readOnly && (
                <>
                  <div className={classes.root}>
                    <span>Clientes:</span>
                    {clients
                      .filter(cli => form.client_id.includes(cli.value))
                      .map(c => (
                        <Chip key={c.id} variant="outlined" size="small" icon={<FaceIcon />} label={c.label} />
                      ))}
                  </div>
                  <div className={classes.root}>
                    <span>Abogado:</span>
                    {lawyers
                      .filter(cli => form.lawyer_id.includes(cli.value))
                      .map(c => (
                        <Chip variant="outlined" size="small" icon={<FaceIcon />} label={c.label} />
                      ))}
                  </div>
                  <div className={classes.root}>
                    <span>Administrativo:</span>
                    {admons
                      .filter(cli => form.admon_id.includes(cli.value))
                      .map(c => (
                        <Chip variant="outlined" size="small" icon={<FaceIcon />} label={c.label} />
                      ))}
                  </div>
                </>
              )}
              {tabValue === 1 && !readOnly && (
                <div>
                  <VirtualSearch
                    initialState={clients.filter(cli => form.client_id.includes(cli.value))}
                    handleChangeExt={handleSelect}
                    suggestions={clients}
                    inputName="Cliente"
                    inputId="client_id"
                    disabled={readOnly}
                  />
                  <Autocomplete
                    initialState={lawyers.filter(cli => form.lawyer_id.includes(cli.value))}
                    handleChange={handleSelect}
                    suggestions={lawyers}
                    inputName="Abogado"
                    inputId="lawyer_id"
                    disabled={readOnly}
                  />
                  <Autocomplete
                    initialState={admons.filter(cli => form.admon_id.includes(cli.value))}
                    handleChange={handleSelect}
                    suggestions={admons}
                    inputName="Administrativo"
                    inputId="admon_id"
                    disabled={readOnly}
                  />
                </div>
              )}
              {tabValue === 2 && record?.id && <CaseActivityRecordFile recordId={record.id} readOnly={readOnly} />}
              {tabValue === 2 && record?.id === "" && <h1>Debe almacenar el expediente para agregar Actividades</h1>}
              {tabValue === 3 && record?.id && <StampInvOptions recordId={record.id} readOnly={readOnly} />}
              {tabValue === 3 && record?.id === "" && <h1>Debe almacenar el expediente para agregar Timbres</h1>}
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent loadingRecord={loading} />
    </>
  );
}

export default withReducer("recordsApp", reducer)(RecordFile);
