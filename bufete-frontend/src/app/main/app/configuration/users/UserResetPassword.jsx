import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const defaultFormState = {
  password: '',
  passwordConfirm: '',
  user_id: '',
};

const UserResetPassword = () => {
  const dispatch = useDispatch();
  const userDialog = useSelector(({ userApp }) => userApp.user.userResetPassDialog);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(
    () => {
      setForm({ ...defaultFormState, user_id: userDialog.userId });
    },
    [userDialog.userId,
    setForm]
  );

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (userDialog.props.open) {
      initDialog();
    }
  }, [userDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeResetPasswordDialog());
  }

  function canBeSubmitted() {
    return form.password.length > 5 && form.password.length < 21 && form.password === form.passwordConfirm && form.user_id !== '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(Actions.resetPassword(form));
    closeComposeDialog();
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
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Resetear
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserResetPassword;
