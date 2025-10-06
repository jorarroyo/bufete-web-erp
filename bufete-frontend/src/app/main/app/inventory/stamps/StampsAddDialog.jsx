import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TextField, Toolbar, Typography, MenuItem, IconButton } from '@material-ui/core';
import { dialogConstants, productType, statusName } from 'app/constants/appConstant';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonServices from 'app/services/shared';
import helperFunctions from 'app/utils/helperFunc';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import * as Actions from '../store/actions/stamps';

const defaultFormState = {
  id: '',
  product_code: '',
  product_name: '',
  product_type: '',
  designation_type: '',
  year: 0,
  product_inv_type: productType.TIMBRES,
  status: statusName.ACTIVO,
  unit_value: 0,
  min_quantity: 0,
};

const StampDutyAddDialog = () => {
  const dispatch = useDispatch();
  const stampsDialog = useSelector(({ stampsApp }) => stampsApp.stamps.stampsDialog);
  const [stampTypeList, setStampTypeList] = useState([]);
  const [designationTypeList, setDesignationTypeList] = useState([]);
  const [yearList, setYearList] = useState([]);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (stampsDialog.type === 'edit' && stampsDialog.data) {
      setForm(stampsDialog.data);
    }
    if (stampsDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...stampsDialog.data,
      });
    }
    setYearList(helperFunctions.yearList(new Date().getFullYear() - 5));
  }, [stampsDialog.data, stampsDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (stampsDialog.props.open) {
      initDialog();
    }
  }, [stampsDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeAddStampsDialog());
  }

  function canBeSubmitted() {
    if (!form.id || form.id === 0 || form.id === '') {
      return form.product_type !== '' && form.product_code !== '' && form.product_name !== '' && form.designation_type !== '' && form.year !== 0;
    }
    if (!stampsDialog.data) return false;
    return (
      form.product_code !== stampsDialog.data.product_code ||
      form.product_name !== stampsDialog.data.product_name ||
      form.product_type !== stampsDialog.data.product_type ||
      form.designation_type !== stampsDialog.data.designation_type ||
      form.year !== stampsDialog.data.year ||
      form.unit_value !== stampsDialog.data.unit_value ||
      form.min_quantity !== stampsDialog.data.min_quantity
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createStamps(form));
    // closeComposeDialog();
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
    }
    fetchData();
  }, [stampTypeList.length, designationTypeList.length]);

  function handleRemove() {
    dispatch(Actions.removeStamp(form));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...stampsDialog.props}
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
              <Icon color="action">vpn_key</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Código"
              id="product_code"
              name="product_code"
              value={form.product_code}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled={form.id !== ''}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">subject</Icon>
            </div>
            <TextField
              id="product_type"
              select
              label="Tipo de Timbre"
              name="product_type"
              className="mb-24"
              value={form.product_type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            >
              {stampTypeList.map(com => (
                <MenuItem key={com.id} value={com.id}>
                  {com.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">subtitles</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Descripción"
              id="product_name"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              id="designation_type"
              select
              label="Denominación"
              name="designation_type"
              className="mb-24"
              value={form.designation_type}
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
              {yearList.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">local_atm</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Valor unitario"
              id="unit_value"
              name="unit_value"
              value={form.unit_value}
              onChange={handleChange}
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { min: 0, step: 0.1 },
              }}
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">exposure_plus_1</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Cantidad Mínima"
              id="min_quantity"
              name="min_quantity"
              value={form.min_quantity}
              onChange={handleChange}
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              fullWidth
            />
          </div>
        </DialogContent>

        {stampsDialog.type === 'new' ? (
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
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
      <LoadingComponent loadingRecord={stampsDialog.loading || false} />
    </Dialog>
  );
};

export default StampDutyAddDialog;
