import { useForm } from '@fuse/hooks';
import { Button, Fab, Icon, IconButton, InputAdornment, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { FuseAnimate, FusePageCarded } from '@fuse';
import * as Actions from '../store/actions/activity-settle';
import reducer from '../store/reducers/activity-settle';
import AssignActivitiesDialog from './AssignActivitiesDialog';
import DatePicker from 'app/main/shared/DatePicker';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99,
  },
});

function NewActivitySettle(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const record = useSelector(({ activitySettleApp }) => activitySettleApp.newSettle.data);
  const selectedActivities = useSelector(({ activitySettleApp }) => activitySettleApp.newSettle.selectedActivities);

  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm, setInForm } = useForm(null);
  const { match } = props;

  useEffect(() => {
    if (form) {
      form.activity_list = selectedActivities.map(assgn => assgn.id);
    }
  }, [form, selectedActivities]);

  useEffect(() => {
    function updateActivitySettleState() {
      const { params } = match;
      const { proctorAgendaId, id } = params;

      if (id === 'new') {
        dispatch(Actions.newActivitySettle(proctorAgendaId));
      } else {
        dispatch(Actions.getActivitySettle(id));
      }
    }

    updateActivitySettleState();
  }, [dispatch, match]);

  useEffect(() => {
    if ((record && !form) || (record && form && record.id !== form.id)) {
      setForm(record);
    }
  }, [form, record, setForm]);

  function handleChangeTab(event, tabValueSelect) {
    setTabValue(tabValueSelect);
  }

  function canBeSubmitted() {
    return (
      !_.isEqual(record, form) &&
      form.assign_date !== '' &&
      form.invoice_num !== '' &&
      form.invoice_name !== '' &&
      form.activity_list.length !== selectedActivities.length // record.activity_list.length
    );
  }

  const handleDateChange = date => {
    setInForm('assign_date', date);
  };

  return (
    <>
      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={
          form && (
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Typography
                    className="normal-case flex items-center sm:mb-12"
                    component={Link}
                    role="button"
                    to={`/apps/file-records/activity-settle/${match.params.proctorAgendaId}`}
                    color="inherit"
                  >
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Nueva Liquidacion
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">{form.invoice_num ? form.invoice_num : 'Nueva Liquidacion'}</Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Detalles de la Liquidacion</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => dispatch(Actions.saveActivitySettle(form))}
                >
                  Guardar
                </Button>
              </FuseAnimate>
            </div>
          )
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64 normal-case" label="General" />
            <Tab className="h-64 normal-case" label="Acciones" />
          </Tabs>
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <div>
                  <div className="pb-48">
                    <input type="hidden" value={form.id} id="id" name="id" />
                    <TextField
                      error={form.invoice_num === ''}
                      required
                      id="invoice_num"
                      name="invoice_num"
                      label="No. Factura"
                      className="mt-8 mb-16"
                      style={{ width: '50%', paddingRight: '5px' }}
                      value={form.invoice_num}
                      onChange={handleChange}
                      variant="outlined"
                      autoFocus
                    />
                    <TextField
                      id="invoice_name"
                      name="invoice_name"
                      label="Nombre Factura"
                      className="mt-8 mb-16"
                      style={{ width: '50%' }}
                      value={form.invoice_name}
                      onChange={handleChange}
                      variant="outlined"
                      error={form.invoice_name === ''}
                      required
                    />
                    <TextField
                      id="invoice_description"
                      name="invoice_description"
                      label="Descripcion Factura"
                      className="mt-8 mb-16"
                      style={{ width: '50%', paddingRight: '5px' }}
                      value={form.invoice_description}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <DatePicker
                      className="mt-8 mb-16"
                      label="Fecha"
                      id="assign_date"
                      name="assign_date"
                      style={{ width: '50%' }}
                      value={form.assign_date || null}
                      onChange={handleDateChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={form.assign_date === ''}
                      required
                    />
                    <TextField
                      className="mt-8 mb-16"
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
                    <TextField
                      className="mt-8 mb-16"
                      label="Costo"
                      id="invoice_total"
                      name="invoice_total"
                      value={form.invoice_total}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      type="Number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                        inputProps: { min: 0 },
                      }}
                    />
                  </div>
                </div>
              )}
              {tabValue === 1 && (
                <>
                  <div>
                    <div className="pb-48">
                      <div className="table-responsive">
                        <table className="simple">
                          <thead>
                            <tr>
                              <th>Expediente</th>
                              <th>Actividad</th>
                              <th>Institucion</th>
                              <th>Tiempo</th>
                              <th>...</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedActivities.map(activity => (
                              <tr key={activity.date}>
                                <td>
                                  <span className="truncate">{activity.file_num}</span>
                                </td>
                                <td>
                                  <span className="truncate">{activity.activity_name}</span>
                                </td>
                                <td>
                                  <span className="truncate">{activity.institution_name}</span>
                                </td>
                                <td>
                                  <span className="truncate">{activity.activity_time}</span>
                                </td>
                                <td>
                                  <div className="flex items-center">
                                    <IconButton
                                      onClick={ev => {
                                        ev.stopPropagation();
                                        dispatch(Actions.removeCaseActivity(activity.id));
                                      }}
                                    >
                                      <Icon>delete</Icon>
                                    </IconButton>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                      color="primary"
                      aria-label="add"
                      className={classes.addButton}
                      onClick={() => dispatch(Actions.openAddCaseActivityDialog(match.params.proctorAgendaId))}
                    >
                      <Icon>add</Icon>
                    </Fab>
                  </FuseAnimate>
                </>
              )}
            </div>
          )
        }
        innerScroll
      />
      <AssignActivitiesDialog />
    </>
  );
}

export default withReducer('activitySettleApp', reducer)(NewActivitySettle);
