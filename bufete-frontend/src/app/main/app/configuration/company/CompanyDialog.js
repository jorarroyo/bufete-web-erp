import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { dialogConstants } from 'app/constants/appConstant';
import * as Actions from './store/actions';

const defaultFormState = {
  id: '',
  name: '',
};

const CompanyDialog = () => {
  const dispatch = useDispatch();
  const companyDialog = useSelector(({ companyApp }) => companyApp.company.companyDialog);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (companyDialog.type === 'edit' && companyDialog.data) {
      setForm({ ...companyDialog.data });
    }
    if (companyDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...companyDialog.data,
        // id: FuseUtils.generateGUID(),
      });
    }
  }, [companyDialog.data, companyDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (companyDialog.props.open) {
      initDialog();
    }
  }, [companyDialog.props.open, initDialog]);

  function closeComposeDialog() {
    companyDialog.type === 'edit' ? dispatch(Actions.closeEditCompanyDialog()) : dispatch(Actions.closeNewCompanyDialog());
  }

  function canBeSubmitted() {
    return form.name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (companyDialog.type === 'new') {
      dispatch(Actions.addCompany(form));
    } else {
      dispatch(Actions.updateCompany(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeCompany(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...companyDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {companyDialog.type === 'new' ? 'Nueva Empresa' : 'Editar Empresa'}
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
        </DialogContent>

        {companyDialog.type === 'new' ? (
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

export default CompanyDialog;
