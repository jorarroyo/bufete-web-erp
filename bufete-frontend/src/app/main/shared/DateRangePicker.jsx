import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/es';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { Divider, Icon, IconButton, InputBase, Paper } from '@material-ui/core';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useForm } from '@fuse/hooks';
import { dialogConstants } from 'app/constants/appConstant';
import helperFunctions from 'app/utils/helperFunc';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: 56,
    marginBottom: '2.4rem',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const DateRangePicker = props => {
  const classes = useStyles();
  const { title, startDate, endDate, timeDiff, handleChoice } = props;
  const [open, setOpen] = React.useState(false);
  const [timeValue, setTimeValue] = React.useState(helperFunctions.calcDateDiff(timeDiff));
  const [errorMessage, setErrorMessage] = React.useState('');

  const { form, setInForm } = useForm({
    startDateTime: startDate || new Date(),
    endDateTime: endDate || new Date(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    let diff = (new Date(form.endDateTime).getTime() - new Date(form.startDateTime).getTime()) / 1000;
    if (diff < 0) {
      setErrorMessage('La fecha final debe ser mayor a la fecha inicial');
      return;
    }
    setErrorMessage('');

    diff /= 60;
    diff = Math.abs(Math.round(diff));
    setTimeValue(helperFunctions.timeConvert(diff));
    handleChoice(Math.abs(Math.round(diff)), form.startDateTime, form.endDateTime);
    setOpen(false);
  };

  const handleStartDateChange = date => {
    setInForm('startDateTime', date);
  };

  const handleEndDateChange = date => {
    setInForm('endDateTime', date);
  };

  return (
    <div style={{ width: '100%' }}>
      <>
        <Paper component="form" className={classes.root}>
          <InputBase className={classes.input} placeholder="Seleccionar..." inputProps={{ 'aria-label': 'Buscar' }} value={timeValue} disabled />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleClickOpen}>
            <DateRangeOutlinedIcon />
          </IconButton>
        </Paper>
      </>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose} fullWidth maxWidth={dialogConstants.SM_WIDTH}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent classes={{ root: 'p-24' }}>
          {errorMessage && <MySnackbarContentWrapper variant="error" className={classes.warningMessage} message={errorMessage} />}
          <form noValidate className="flex flex-col overflow-hidden">
            <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">date_range</Icon>
                </div>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  label="Inicial"
                  name="startDateTime"
                  id="startDateTime"
                  value={form.startDateTime}
                  onChange={handleStartDateChange}
                  onError={console.log}
                  format="dd/MM/yyyy HH:mm"
                  autoOk
                  className="mb-24"
                  inputVariant="outlined"
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="flex">
                <div className="min-w-48 pt-20">
                  <Icon color="action">date_range</Icon>
                </div>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  label="Final"
                  name="endDateTime"
                  id="endDateTime"
                  value={form.endDateTime}
                  onChange={handleEndDateChange}
                  onError={console.log}
                  format="dd/MM/yyyy HH:mm"
                  autoOk
                  minDate={form.startDateTime}
                  className="mb-24"
                  inputVariant="outlined"
                  margin="normal"
                  fullWidth
                />
              </div>
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DateRangePicker;
