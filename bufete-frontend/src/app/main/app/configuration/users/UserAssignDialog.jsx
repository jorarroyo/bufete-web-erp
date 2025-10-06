import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { dialogConstants } from 'app/constants/appConstant';
import authService from 'app/services/authService';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: '350px',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const UserAssignDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userAssignDialog = useSelector(({ userApp }) => userApp.user.userAssignDialog);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (roles.length === 0) {
        const roleResponse = await authService.getActiveRoles();
        setRoles(roleResponse.map(rol => ({ id: rol.id, label: rol.name })));
      }
      if (roles.length > 0 && userAssignDialog.data) {
        setSelectedRoles(userAssignDialog.data);
      }
    }
    fetchData();
  }, [roles.length, userAssignDialog.data]);

  function closeComposeDialog() {
    dispatch(Actions.closeEditUserAssignDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.addUserAssign(userAssignDialog.userId, selectedRoles));

    closeComposeDialog();
  }

  function canBeSubmitted() {
    return userAssignDialog.data && selectedRoles.length >= 1;
  }

  const handleToggle = value => () => {
    const currentIndex = selectedRoles.indexOf(value);
    const newChecked = [...selectedRoles];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedRoles(newChecked);
  };

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      open={userAssignDialog.props.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Asignacion de Roles
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">format_align_center</Icon>
            </div>
            <List className={classes.root}>
              {roles.map(rol => {
                const labelId = `checkbox-list-label-${rol.id}`;

                return (
                  <ListItem key={rol.id} role={undefined} dense button onClick={handleToggle(rol.id)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedRoles.indexOf(rol.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={rol.label} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default withReducer('userApp', reducer)(UserAssignDialog);
