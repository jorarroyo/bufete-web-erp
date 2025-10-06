import { useForm } from '@fuse/hooks';
import { Button, Icon, IconButton, MenuItem, Tab, Tabs, TextField, Typography, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { EmployeesConstants, statusName, RequestType } from 'app/constants/appConstant';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import EmployeeServices from 'app/services/file-records/employeesService';
import RecordServices from 'app/services/file-records/recordsService';
import ProductServices from 'app/services/inventory/productService';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomGroupButton from 'app/main/shared/CustomGroupButton';
import DatePicker from 'app/main/shared/DatePicker';
import SearchRecordFileDialog from 'app/main/shared/recordSearch/SearchRecordFileDialog';
import _ from '@lodash';
import { FuseAnimate, FusePageCarded } from '@fuse';
import * as Actions from '../store/actions/stamp-inv';
import reducer from '../store/reducers/stamp-inv';
import StampInvAddDialog from './StampInvAddDialog';

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

function NewStampInv(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const record = useSelector(({ stampInvApp }) => stampInvApp.newStampInv.data);
  const loading = useSelector(({ stampInvApp }) => stampInvApp.newStampInv.loading);
  const productList = useSelector(({ stampInvApp }) => stampInvApp.newStampInv.product_list);
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm, setInForm } = useForm(null);
  const { match } = props;

  useEffect(() => {
    if (form) {
      form.detail_list = productList.map(prod => ({
        id: prod.id,
        product_id: prod.product_id,
        quantity_request: prod.quantity,
        status: prod.status,
      }));
      const newTotal = productList
        .filter(prd => prd.status === statusName.ACTIVO)
        .reduce((accumulator, currentValue) => accumulator + currentValue.unit_value * currentValue.quantity, 0);
      setTotalValue(newTotal);
      form.total = newTotal;
    }
  }, [form, record, productList]);

  useEffect(() => {
    function updateNewStampInvState() {
      const { params } = match;
      const { stampInvId } = params;

      if (stampInvId === 'new') {
        dispatch(Actions.newNewStampInv());
      } else {
        dispatch(Actions.getStampInv(stampInvId));
      }
    }

    updateNewStampInvState();
  }, [dispatch, match]);

  useEffect(() => {
    if ((record && !form) || (record && form && (record.status !== form.status || record.id !== form.id))) {
      setForm(record);
    }
  }, [form, record, setForm, records.length, employees.length, products.length]);

  useEffect(() => {
    async function fetchData() {
      if (records.length === 0) {
        const recordsResponse = await RecordServices.getActiveRecordFiles();
        setRecords(recordsResponse.map(recr => ({ id: recr.id, name: recr.name })));
      }
      if (employees.length === 0) {
        const employeeResponse = await EmployeeServices.getEmployeesByPosition([EmployeesConstants.ADMON, EmployeesConstants.LAWYER]);
        setEmployees(employeeResponse.map(emp => ({ id: emp.id, name: emp.name })));
      }
      if (products.length === 0) {
        const productResponse = await ProductServices.getStampList();
        setProducts(productResponse.map(prod => ({ value: prod.id, label: prod.name })));
      }
    }
    fetchData();
  }, [records.length, employees.length, products.length]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    if (form.status === statusName.AUTORIZADO) {
      return false;
    }
    if (form.status === statusName.PENDIENTE) {
      return true;
    }
    if (form.id !== null) {
      return !_.isEqual(record, form);
    }
    if (form.id === null && Number(form.request_type) === RequestType.ENTRADA) {
      return !_.isEqual(record, form) && form.request_type !== -1 && form.request_date !== '' && form.detail_list.length > 0;
    }
    return (
      !_.isEqual(record, form) && form.request_type !== -1 && form.requester_id !== -1 && form.request_date !== '' && form.detail_list.length > 0
    );
  }

  function handleSubmit(newStamp) {
    dispatch(Actions.createStampInv(newStamp));
  }

  function handleOption(rejectStamp) {
    if (rejectStamp === 'Rechazar') {
      const rejectForm = {
        id: form.id,
        comment: '',
        next_status: statusName.RECHAZADO,
      };
      dispatch(Actions.updateStampInvState(rejectForm));
    } else {
      dispatch(
        Actions.createStampInv({
          ...form,
          status: statusName.FINALIZADO,
        })
      );
    }
    dispatch(Actions.getStampInv(form.id));
  }

  function validateStatus() {
    return form.status === statusName.AUTORIZADO || form.status === statusName.RECHAZADO || form.status === statusName.FINALIZADO;
  }

  const handleDateChange = date => {
    setInForm('request_date', date);
  };

  const handleSelect = itemId => {
    setInForm('file_record_id', itemId);
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
                    to="/apps/inventory/stamp-inv"
                    color="inherit"
                  >
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Nueva Entrada
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">Nueva Solicitud</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Nueva Solicitud</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              {form.status !== statusName.PENDIENTE && (
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Button className="whitespace-no-wrap" variant="contained" disabled={!canBeSubmitted()} onClick={() => handleSubmit(form)}>
                    Guardar
                  </Button>
                </FuseAnimate>
              )}
              {form.status === statusName.PENDIENTE && (
                <CustomGroupButton options={['Autorizar', 'Rechazar']} handleOption={handleOption} disabled={validateStatus()} />
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
            <Tab className="h-64 normal-case" label="Solicitud" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <>
                  <div>
                    <div className="pb-48">
                      <TextField
                        id="request_type"
                        select
                        label="Tipo"
                        name="request_type"
                        className="mt-8 mb-16"
                        value={form.request_type}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        autoFocus
                        style={{ width: '50%', paddingRight: '5px' }}
                        required
                        disabled={form.id !== null || validateStatus()}
                      >
                        <MenuItem key="solicitud" value={RequestType.SOLICITUD}>
                          1 - Solicitud
                        </MenuItem>
                        <MenuItem key="salida" value={RequestType.SALIDA}>
                          2 - Entrega/Salida
                        </MenuItem>
                        <MenuItem key="entrada" value={RequestType.ENTRADA}>
                          3 - Compra/Entrada
                        </MenuItem>
                      </TextField>
                      <DatePicker
                        className="mt-8 mb-16"
                        label="Fecha"
                        id="request_date"
                        name="request_date"
                        value={form.request_date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: '50%' }}
                        required
                        error={form.request_date === ''}
                        disabled={form.id !== null || validateStatus()}
                        disablePast
                      />
                      <TextField
                        id="requester_id"
                        name="requester_id"
                        select
                        label="Solicitante"
                        className="mt-8 mb-16"
                        value={form.requester_id}
                        onChange={handleChange}
                        SelectProps={{
                          MenuProps: {
                            className: { width: '200' },
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                        required={Number(form.request_type) !== RequestType.ENTRADA}
                        error={Number(form.request_type) !== RequestType.ENTRADA && form.requester_id === ''}
                        fullWidth
                        disabled={validateStatus()}
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
                      <TextField
                        className="mt-8 mb-16"
                        label="Comentario"
                        id="reference"
                        name="reference"
                        value={form.reference}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        disabled={validateStatus()}
                      />
                      <SearchRecordFileDialog
                        handleSelect={handleSelect}
                        labelName={form.file_num || ''}
                        disabled={form.status !== statusName.ELABORADO}
                      />
                      <TextField
                        className="mt-8 mb-16"
                        label="No. Formulario o Recibo"
                        id="receipt_number"
                        name="receipt_number"
                        value={form.receipt_number}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        disabled={validateStatus()}
                        InputLabelProps={{
                          shrink: form.receipt_number !== '',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="pb-48">
                      <div className="pb-16 flex items-center">
                        <Icon className="mr-16" color="action">
                          add_shopping_cart
                        </Icon>
                        <Typography className="h2" color="textSecondary">
                          Detalles de Timbre
                        </Typography>
                      </div>
                      <div className="mb-24">
                        <div className="table-responsive">
                          <table className="simple">
                            <thead>
                              <tr>
                                <th>Codigo</th>
                                <th>Descripcion</th>
                                <th>Existencia</th>
                                <th>Cantidad</th>
                                <th>Importe</th>
                                {!validateStatus() && <th>...</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {productList
                                .filter(prd => prd.status === statusName.ACTIVO)
                                .map(product => (
                                  <tr key={product.product_id}>
                                    <td>
                                      <span className="truncate">{product.product_code}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{product.product_name}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{product.product_existence}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{product.quantity}</span>
                                    </td>
                                    <td>
                                      <span className="truncate">{product.unit_value}</span>
                                    </td>
                                    {!validateStatus() && (
                                      <td>
                                        <div className="flex items-center">
                                          <IconButton
                                            onClick={ev => {
                                              ev.stopPropagation();
                                              dispatch(Actions.removeProduct(product.product_id));
                                            }}
                                          >
                                            <Icon>delete</Icon>
                                          </IconButton>
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                            </tbody>
                            {totalValue !== 0 && (
                              <tfoot>
                                <tr>
                                  <th id="total" colSpan="4">
                                    <strong>Total</strong>
                                  </th>
                                  <td>{totalValue}</td>
                                </tr>
                              </tfoot>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                    {form.request_type !== '' && form.status === statusName.ELABORADO && (
                      <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab
                          color="primary"
                          aria-label="add"
                          className={classes.addButton}
                          onClick={() => dispatch(Actions.openAddStampInvDialog(form.request_type))}
                        >
                          <Icon>add</Icon>
                        </Fab>
                      </FuseAnimate>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        }
        innerScroll
      />
      <LoadingComponent loadingRecord={loading} />
      <StampInvAddDialog />
    </>
  );
}

export default withReducer('stampInvApp', reducer)(NewStampInv);
