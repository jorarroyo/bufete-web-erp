import React, { useEffect, useCallback, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, MenuItem } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { dialogConstants } from 'app/constants/appConstant';
import authService from 'app/services/authService';
import * as Actions from './store/actions';

const defaultFormState = {
  id: '',
  name: '',
  short_name: '',
  exchange_value: '',
  company_id: '',
};

const CurrencyDialog = () => {
  const dispatch = useDispatch();
  const currencyDialog = useSelector(({ currencyApp }) => currencyApp.currency.currDialog);
  const currencySelected = useSelector(({ currencyApp }) => currencyApp.currency.selectedCurrency);

  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [companyList, setCompaniesList] = useState([]);

  const initDialog = useCallback(() => {
    if (currencyDialog.type === 'edit' && currencySelected) {
      setForm({ ...defaultFormState, ...currencySelected });
    }
    if (currencyDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...currencyDialog.data,
      });
    }
  }, [currencyDialog.data, currencyDialog.type, setForm, currencySelected]);

  useEffect(() => {
    async function fetchData() {
      const response = await authService.getActiveCompanies();
      setCompaniesList(response.map(company => ({ id: company.id, name: company.name })));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currencyDialog.type === 'edit' && currencySelected === null && currencyDialog.data !== null) {
      dispatch(Actions.getCurrencyById(currencyDialog.data.id));
    }
  }, [dispatch, currencyDialog.data, currencyDialog.type, currencySelected]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (currencyDialog.props.open) {
      initDialog();
    }
  }, [currencyDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.removeCurrencySelected());
    currencyDialog.type === 'edit' ? dispatch(Actions.closeEditCurrencyDialog()) : dispatch(Actions.closeNewCurrencyDialog());
  }

  function canBeSubmitted() {
    return form.name.length > 0 && form.short_name.length > 0 && form.exchange_value.length > 0 && form.company_id !== '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (currencyDialog.type === 'new') {
      dispatch(Actions.addCurrency(form));
    } else {
      dispatch(Actions.updateCurrency(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeCurrency(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...currencyDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {currencyDialog.type === 'new' ? 'Nuevo Usuario' : 'Editar Usuario'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">view_headline</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Nombre"
              autoFocus
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">view_headline</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Nombre Corto"
              id="short_name"
              name="short_name"
              value={form.short_name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">monetization_on</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Cambio"
              id="exchange_value"
              name="exchange_value"
              value={form.exchange_value}
              onChange={handleChange}
              variant="outlined"
              type="number"
              required
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business_center</Icon>
            </div>
            <TextField
              id="company_id"
              name="company_id"
              select
              label="Empresa"
              className="mb-24"
              value={form.company_id}
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
              {companyList.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        {currencyDialog.type === 'new' ? (
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
    </Dialog>
  );
};

export default CurrencyDialog;
