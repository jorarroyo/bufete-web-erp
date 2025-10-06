import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions/contacts';
import { dialogConstants, statusName } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import CodeRain from 'coderain';

const defaultFormState = {
  id: '',
  contact_name: '',
  contact_address: '',
  contact_email: '',
  contact_phone: '',
  contact_type: '',
  status: statusName.ACTIVO,
};

const ContactDialog = () => {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactApp }) => contactApp.contacts.contactsDialog);
  const cr = new CodeRain('#####');
  const newId = cr.next();
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (contactDialog.type === 'edit' && contactDialog.data) {
      setForm({ ...contactDialog.data });
    }
    if (contactDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...contactDialog.data,
        id: newId,
      });
    }
  }, [contactDialog.data, contactDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeContactDialog());
  }

  function canBeSubmitted() {
    return (
      form.contact_name.length > 0 &&
      form.contact_address.length > 0 &&
      form.contact_email.length > 0 &&
      form.contact_phone.length > 0 &&
      form.contact_type.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createContact(form));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'new' ? 'Nueva Contacto' : 'Editar Contacto'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">supervised_user_circle</Icon>
            </div>
            <TextField
              className="mt-8 mb-16"
              error={form.contact_name === ''}
              required
              label="Nombre del Contacto"
              id="contact_name"
              autoFocus
              name="contact_name"
              value={form.contact_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">location_on</Icon>
            </div>
            <TextField
              className="mt-8 mb-16"
              error={form.contact_address === ''}
              required
              label="Dirección Fiscal"
              id="contact_address"
              name="contact_address"
              value={form.contact_address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">contact_phone</Icon>
            </div>
            <TextField
              id="contact_phone"
              name="contact_phone"
              className="mt-8 mb-16"
              error={form.contact_phone === ''}
              required
              label="Teléfono"
              type="tel"
              value={form.contact_phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">contact_mail</Icon>
            </div>
            <TextField
              id="contact_email"
              name="contact_email"
              className="mt-8 mb-16"
              error={form.contact_email === ''}
              required
              label="Correo"
              type="email"
              value={form.contact_email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">assignment</Icon>
            </div>
            <TextField
              id="contact_type"
              name="contact_type"
              error={form.contact_type === ''}
              required
              select
              label="Tipo"
              className="mb-24"
              value={form.contact_type}
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
                Legal
              </MenuItem>
              <MenuItem key="2" value="2">
                Retenciones
              </MenuItem>
            </TextField>
          </div>
        </DialogContent>

        {contactDialog.type === 'new' ? (
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

export default ContactDialog;
