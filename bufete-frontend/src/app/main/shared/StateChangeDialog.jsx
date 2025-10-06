import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  DialogContent,
  Icon,
  TextField,
  MenuItem,
  Card,
  List,
  ListItem,
  Avatar,
  ListItemText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import { useForm } from '@fuse/hooks';
import StatusService from 'app/services/shared/statusService';

const defaultFormState = {
  comment: '',
  next_status: '',
  assign_date: '',
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function StateChangeDialog(props) {
  const { stateChangeDialog, closeComposeDialog, dialogTitle, handleSubmitDialog, appId, alert, preventSubmit, excludeList } = props;
  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [statusFlowList, setStatusFlowList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const classes = useStyles();

  const initDialog = useCallback(() => {
    if (stateChangeDialog.type === 'edit' && stateChangeDialog.data) {
      setForm({ ...stateChangeDialog.data, ...defaultFormState });
    }
    async function fetchData() {
      if (stateChangeDialog.data.id) {
        const flowResponse = await StatusService.getStatusFlow(appId);
        let newList = flowResponse.filter(st => st.prev_status === stateChangeDialog.data.prevStatus);
        if (excludeList) {
          newList = newList.filter(s => !excludeList.includes(s.next_status));
        }
        setStatusFlowList(newList);
        const response = await StatusService.getStatusHistory(stateChangeDialog.data.id, appId, excludeList);
        setHistoryList(response);
      }
    }
    fetchData();
  }, [stateChangeDialog.data, stateChangeDialog.type, setForm, appId, excludeList]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (stateChangeDialog.props.open) {
      initDialog();
    }
  }, [stateChangeDialog.props.open, initDialog]);

  function canBeSubmitted() {
    if (preventSubmit !== undefined) return !preventSubmit && form.next_status !== '';
    return form.next_status !== '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleSubmitDialog(form);
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...stateChangeDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {dialogTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      {alert !== undefined && alert.hasOwnProperty('severity') && (
        <div className={classes.root}>
          <Alert severity={alert.severity}>
            <AlertTitle>{alert.title}</AlertTitle>
            {alert.message} {!!preventSubmit && <strong>si</strong>}
          </Alert>
        </div>
      )}
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">list_alt</Icon>
            </div>
            <TextField
              id="next_status"
              name="next_status"
              select
              label="Estado Siguiente"
              className="mb-24"
              value={form.next_status}
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
              autoFocus
            >
              {statusFlowList ? (
                statusFlowList.map(stat => (
                  <MenuItem key={stat.id} value={stat.next_status}>
                    {stat.next_status}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="none">Sin registros....</MenuItem>
              )}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Comentarios"
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
          {historyList && historyList.length > 0 && (
            <Card>
              <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
                <div className="">
                  <div className="flex items-center">
                    <Typography>Historial</Typography>
                    <Icon className="text-16 ml-4" color="action">
                      keyboard_arrow_down
                    </Icon>
                  </div>

                  <List>
                    {historyList.map(comment => (
                      <div key={comment.id}>
                        <ListItem className="px-0">
                          <Avatar alt={comment.status} src="assets/images/avatars/profile.jpg" className="mr-16" />
                          <ListItemText
                            primary={
                              <div>
                                <Typography className="inline font-medium" color="initial" paragraph={false}>
                                  {comment.status}
                                </Typography>
                                <Typography className="inline ml-4" variant="caption">
                                  {comment.created}
                                </Typography>
                              </div>
                            }
                            secondary={comment.comment}
                          />
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </div>
              </AppBar>
            </Card>
          )}
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!canBeSubmitted()}>
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={closeComposeDialog}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
