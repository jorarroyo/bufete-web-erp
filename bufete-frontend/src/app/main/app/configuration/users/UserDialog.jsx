import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const defaultFormState = {
  id: '',
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  employee_id: '',
};

const UserDialog = () => {
  const dispatch = useDispatch();
  const userDialog = useSelector(({ userApp }) => userApp.user.userDialog);
  const userSelected = useSelector(({ userApp }) => userApp.user.selectedUser);
  const [validateUsername, setValidateUsername] = useState({ valid: true, message: '' });
  const [validateEmail, setValidateEmail] = useState({ valid: true, message: '' });
  const [employees, setEmployees] = useState([]);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (userDialog.type === 'edit' && userSelected) {
      setForm({ ...defaultFormState, ...userSelected });
    }
    if (userDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...userDialog.data,
      });
    }
  }, [userDialog.data, userDialog.type, setForm, userSelected]);

  useEffect(() => {
    if (userDialog.type === 'edit' && userSelected === null && userDialog.data !== null) {
      dispatch(Actions.getUserById(userDialog.data.id));
    }
  }, [dispatch, userDialog.data, userDialog.type, userSelected]);

  useEffect(() => {
    async function fetchData() {
      if (employees.length === 0) {
        const employeeResponse = await Actions.obtainEmployees();
        setEmployees(employeeResponse.map(emp => ({ id: emp.id, name: emp.name })));
      }
    }
    fetchData();
  }, [employees.length]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (userDialog.props.open) {
      initDialog();
    }
  }, [userDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.removeUserSelected());
    userDialog.type === 'edit' ? dispatch(Actions.closeEditUserDialog()) : dispatch(Actions.closeNewUserDialog());
  }

  function canBeSubmitted() {
    if (userDialog.type === 'edit') {
      return form.name.length > 0 && form.username.length > 0 && form.email.length > 0;
    }
    return (
      form.name.length > 3 &&
      form.name.length < 41 &&
      validateUsername.valid &&
      form.username.length > 2 &&
      form.username.length < 16 &&
      form.email.length > 0 &&
      form.email.length < 41 &&
      validateEmail.valid &&
      form.password.length > 5 &&
      form.password.length < 21 &&
      form.password === form.passwordConfirm &&
      form.employee_id !== ''
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (userDialog.type === 'new') {
      dispatch(Actions.addUser(form));
    } else {
      dispatch(Actions.updateUser(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeUser(form.id));
    closeComposeDialog();
  }

  function validateUsernameAvailability() {
    Actions.checkUsernameAvailability(form.username).then(response => {
      if (response) {
        setValidateUsername({
          valid: true,
          message: '',
        });
      } else {
        setValidateUsername({
          valid: false,
          message: 'El usuario no esta disponible',
        });
      }
    });
  }

  function validateEmailAvailability() {
    Actions.checkEmailAvailability(form.email).then(response => {
      if (response) {
        setValidateEmail({
          valid: true,
          message: '',
        });
      } else {
        setValidateEmail({
          valid: false,
          message: 'El usuario no esta disponible',
        });
      }
    });
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...userDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {userDialog.type === 'new' ? 'Nuevo Usuario' : 'Editar Usuario'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_box</Icon>
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
              <Icon color="action">card_travel</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Usuario"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              onBlur={validateUsernameAvailability}
              error={!validateUsername.valid}
              helperText={validateUsername.message}
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>

            <TextField
              className="mb-24"
              label="Correo"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              onBlur={validateEmailAvailability}
              error={!validateEmail.valid}
              helperText={validateEmail.message}
            />
          </div>
          {userDialog.type !== 'edit' && (
            <>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">vpn_key</Icon>
                </div>

                <TextField
                  className="mb-24"
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">vpn_key</Icon>
                </div>
                <TextField
                  className="mb-24"
                  label="Password (Confirmación)"
                  type="password"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  variant="outlined"
                  required
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
                  required
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
            </>
          )}
        </DialogContent>
        {userDialog.type === 'new' ? (
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

export default UserDialog;
