import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import privileges from 'app/services/map/privileges';
import React, { useCallback, useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const defaultFormState = {
  id: '',
  name: '',
  options: [],
};

const RoleDialog = () => {
  const dispatch = useDispatch();
  const roleDialog = useSelector(({ roleApp }) => roleApp.role.roleDialog);
  const roleSelected = useSelector(({ roleApp }) => roleApp.role.selectedRole);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (roleDialog.type === 'edit' && roleSelected) {
      setForm({ ...roleSelected });
      setChecked(roleSelected.options);
    }
    if (roleDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...roleDialog.data,
      });
      setChecked([]);
    }
  }, [roleDialog.data, roleDialog.type, setForm, roleSelected]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (roleDialog.props.open) {
      initDialog();
    }
  }, [roleDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.removeRoleSelected());
    roleDialog.type === 'edit' ? dispatch(Actions.closeEditRoleDialog()) : dispatch(Actions.closeNewRoleDialog());
  }

  function canBeSubmitted() {
    return form.name.length > 0 && form.options.length > 0;
  }

  function checkOption(optionList) {
    setChecked(optionList);
    form.options = optionList;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (roleDialog.type === 'new') {
      dispatch(Actions.addRole(form));
    } else {
      dispatch(Actions.updateRole(form));
    }
    closeComposeDialog();
  }

  function handleRemove() {
    dispatch(Actions.removeRole(form.id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...roleDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {roleDialog.type === 'new' ? 'Nuevo Rol' : 'Editar Rol'}
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
              <Icon color="action">featured_play_list</Icon>
            </div>
            <CheckboxTree
              id="options"
              name="options"
              nodes={privileges}
              checked={checked}
              expanded={expanded}
              onCheck={checkOption}
              onExpand={expand => setExpanded(expand)}
              optimisticToggle={false}
              showExpandAll
              icons={{
                check: <Icon style={{ fontSize: '1.5rem' }}>check_box</Icon>,
                uncheck: <Icon style={{ fontSize: '1.5rem' }}>check_box_outline_blank</Icon>,
                halfCheck: <Icon style={{ fontSize: '1.5rem' }}>indeterminate_check_box</Icon>,
                expandClose: <Icon style={{ fontSize: '1.5rem' }}>expand_less</Icon>,
                expandOpen: <Icon style={{ fontSize: '1.5rem' }}>expand_more</Icon>,
                expandAll: <Icon style={{ fontSize: '1.5rem' }}>add</Icon>,
                collapseAll: <Icon style={{ fontSize: '1.5rem' }}>remove</Icon>,
                parentClose: <Icon style={{ fontSize: '1.5rem' }}>ballot</Icon>,
                parentOpen: <Icon style={{ fontSize: '1.5rem' }}>ballot</Icon>,
                leaf: <Icon style={{ fontSize: '1.5rem' }}>ballot</Icon>,
              }}
            />
          </div>
        </DialogContent>

        {roleDialog.type === 'new' ? (
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

export default RoleDialog;
