import { AppBar, Dialog, DialogActions, DialogContent, Icon, Toolbar, Typography } from '@material-ui/core';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { dialogConstants } from 'app/constants/appConstant';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/proctor-agenda';
import PdfDocument from './PdfDocument';

const initialState = {
  id: '',
  assignDate: '',
  comment: '',
  status: '',
  employeeId: '',
  employeeName: '',
  proctorAgendaCostLocal: 0,
  proctorAgendaCostOuter: 0,
  agendaReturnAmountLocal: 0,
  agendaReturnAmountOuter: 0,
  invoiceAmountLocal: 0,
  invoiceAmountOuter: 0,
};

const AssignedActivityList = () => {
  const dispatch = useDispatch();
  const assignedActivitiesDialog = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.proctorAgenda.assignedActivitiesDialog);
  const [assignedActivities, setAssignedActivities] = useState([]);
  const [assignedInvoices, setAssignedInvoices] = useState([]);
  const [proctorHeader, setProctorHeader] = useState(initialState);

  const initDialog = useCallback(() => {
    if (assignedActivitiesDialog.type === 'edit' && assignedActivitiesDialog.data) {
      const {
        selectedActivities,
        assignDate,
        status,
        employeeName,
        proctorAgendaCostLocal,
        proctorAgendaCostOuter,
        agendaReturnAmountLocal,
        agendaReturnAmountOuter,
        selectedInovices,
      } = assignedActivitiesDialog.data;
      setAssignedActivities(selectedActivities);
      setAssignedInvoices(selectedInovices);
      const totalLocal = selectedInovices
        .filter(x => x.invoice_currency === 1)
        .reduce((accumulator, currentValue) => accumulator + currentValue.invoice_total, 0);
      const totalOuter = selectedInovices
        .filter(x => x.invoice_currency === 2)
        .reduce((accumulator, currentValue) => accumulator + currentValue.invoice_total, 0);
      setProctorHeader({
        ...initialState,
        assignDate,
        status,
        employeeName,
        proctorAgendaCostLocal,
        proctorAgendaCostOuter,
        agendaReturnAmountLocal,
        agendaReturnAmountOuter,
        invoiceAmountLocal: totalLocal,
        invoiceAmountOuter: totalOuter,
      });
    }
  }, [assignedActivitiesDialog.data, assignedActivitiesDialog.type]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (assignedActivitiesDialog.props.open) {
      initDialog();
    }
  }, [assignedActivitiesDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeGetAssignedActivitiesDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...assignedActivitiesDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Lista de pendientes de Procuración
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: 'p-24' }}>
        <div id="printableContent">
          <div className="pb-48">
            <div className="mb-24 items-center">
              <Typography variant="h4" gutterBottom>
                Lista de pendientes de Procuración
              </Typography>
              <Typography variant="h6" gutterBottom>
                {`Fecha: ${proctorHeader.assignDate}   Empleado: ${proctorHeader.employeeName}`}
              </Typography>
            </div>
            <div className="pb-16 flex items-center">
              <Icon className="mr-16" color="action">
                assignment
              </Icon>
              <Typography className="h2" color="textSecondary">
                Actividades
              </Typography>
            </div>

            <div className="mb-24">
              <div className="table-responsive">
                <table className="simple">
                  <thead>
                    <tr>
                      <th>Expediente</th>
                      <th>Actividad</th>
                      <th>Institucion</th>
                      <th>Prioridad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedActivities.map(activity => (
                      <tr key={activity.id}>
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
                          <span className="truncate">{activity.priority}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="justify-between pl-16">
        <PDFDownloadLink
          document={<PdfDocument dataHeader={proctorHeader} dataList={assignedActivities} invoiceList={assignedInvoices} />}
          fileName={`listaDeActividades${proctorHeader.employeeName.replace(' ', '')}${proctorHeader.assignDate.replace(/-/g, '')}.pdf`}
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
          }}
        >
          Descargar el Pdf
        </PDFDownloadLink>
      </DialogActions>
    </Dialog>
  );
};

export default AssignedActivityList;
