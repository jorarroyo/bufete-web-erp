import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { dialogConstants } from 'app/constants/appConstant';
import * as Actions from '../store/actions/institutions';

const defaultFormState = {
  id: '',
  name: '',
  short_name: '',
};

const InstitutionDialog = () => {
  const dispatch = useDispatch();
  const institutionDialog = useSelector(({ institutionApp }) => institutionApp.institution.institutionDialog);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (institutionDialog.type === 'edit' && institutionDialog.data) {
      setForm({ ...institutionDialog.data });
    }
    if (institutionDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...institutionDialog.data,
        // id: FuseUtils.generateGUID(),
      });
    }
  }, [institutionDialog.data, institutionDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (institutionDialog.props.open) {
      initDialog();
    }
  }, [institutionDialog.props.open, initDialog]);

  function closeComposeDialog() {
    institutionDialog.type === 'edit' ? dispatch(Actions.closeEditInstitutionDialog()) : dispatch(Actions.closeNewInstitutionDialog());
  }

  function canBeSubmitted() {
    return form.name.length > 0 && form.short_name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (institutionDialog.type === 'new') {
      dispatch(Actions.addInstitution(form));
    } else {
      dispatch(Actions.updateInstitution(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeInstitution(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...institutionDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {institutionDialog.type === 'new' ? 'Nueva Institución' : 'Editar Institución'}
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
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
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
        </DialogContent>

        {institutionDialog.type === 'new' ? (
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

export default InstitutionDialog;
