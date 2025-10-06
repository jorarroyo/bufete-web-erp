import React, { useEffect, useCallback } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { dialogConstants } from 'app/constants/appConstant';
import * as Actions from '../store/actions/activities';

const defaultFormState = {
  id: '',
  name: '',
};

const ActivityDialog = () => {
  const dispatch = useDispatch();
  const activityDialog = useSelector(({ activityApp }) => activityApp.activity.activityDialog);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (activityDialog.type === 'edit' && activityDialog.data) {
      setForm({ ...activityDialog.data });
    }
    if (activityDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...activityDialog.data,
        // id: FuseUtils.generateGUID(),
      });
    }
  }, [activityDialog.data, activityDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (activityDialog.props.open) {
      initDialog();
    }
  }, [activityDialog.props.open, initDialog]);

  function closeComposeDialog() {
    activityDialog.type === 'edit' ? dispatch(Actions.closeEditActivityDialog()) : dispatch(Actions.closeNewActivityDialog());
  }

  function canBeSubmitted() {
    return form.name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (activityDialog.type === 'new') {
      dispatch(Actions.addActivity(form));
    } else {
      dispatch(Actions.updateActivity(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeActivity(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...activityDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {activityDialog.type === 'new' ? 'Nueva Actividad' : 'Editar Actividad'}
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

        {activityDialog.type === 'new' ? (
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

export default ActivityDialog;
