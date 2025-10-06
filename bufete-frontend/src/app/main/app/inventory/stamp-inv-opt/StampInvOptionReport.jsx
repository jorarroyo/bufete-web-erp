import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, AppBar, Toolbar, Typography, DialogContent, Icon, DialogActions } from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as Actions from '../store/actions/stamp-inv-opt';
import PdfDocument from './PdfDocument';

const StampInvOptionReport = () => {
  const dispatch = useDispatch();
  const reportDialog = useSelector(({ stampInvOptApp }) => stampInvOptApp.stampInvOpt.reportDialog);
  const [totales, setTotales] = useState([0]);

  const initDialog = useCallback(() => {
    if (reportDialog.headers) {
      const newTotals = totales;
      reportDialog.headers.forEach(header => {
        newTotals.push(0);
      });
      reportDialog.data.forEach(row => {
        const newRow = Object.values(row);
        newRow.splice(0, 6);
        newRow.forEach((value, index) => {
          newTotals[index] += value;
        });
      });
      setTotales(newTotals);
    }
  }, [reportDialog.headers, reportDialog.data, totales]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (reportDialog.props.open) {
      initDialog();
    }
  }, [reportDialog.props.open, initDialog]);

  function renderTableHeader() {
    const header = reportDialog.headers;
    return header.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }

  function renderTableRow(Row) {
    const newRow = Object.values(Row);
    newRow.splice(0, 7);
    return newRow.map((row, index) => {
      return (
        <td key={index}>
          <span className="truncate">{row}</span>
        </td>
      );
    });
  }

  function renderTableFooter(Row) {
    return Row.map((row, index) => {
      return (
        <td key={index}>
          <span className="truncate">{row}</span>
        </td>
      );
    });
  }

  function closeComposeDialog() {
    dispatch(Actions.closeStampReportDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...reportDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Lista de solicitudes de Timbre
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: 'p-24' }}>
        <div className="printableContent">
          <div className="pb-48">
            <div className="mb-24 items-center">
              <Typography variant="h4" gutterBottom>
                Lista de solicitudes de timbres
              </Typography>
              {/* <Typography variant="h6" gutterBottom>
                {`Fecha: ${proctorHeader.assignDate}   Empleado: ${proctorHeader.employeeName}`}
              </Typography> */}
            </div>
            <div className="pb-16 flex items-center">
              <Icon className="mr-16" color="action">
                assignment
              </Icon>
              <Typography className="h2" color="textSecondary">
                Timbres
              </Typography>
            </div>
            <div className="mb-24">
              <div className="table-responsive">
                <table className="simple">
                  <thead>
                    <tr>
                      <th>No. Trx</th>
                      <th>Fecha</th>
                      <th>Solicitante</th>
                      <th>No. Exp</th>
                      <th>Total Qtz</th>
                      {renderTableHeader()}
                    </tr>
                  </thead>
                  <tbody>
                    {reportDialog.data.map(report => (
                      <tr key={report.id}>
                        <td>
                          <span className="truncate">{report.id}</span>
                        </td>
                        <td>
                          <span className="truncate">{report.request_date}</span>
                        </td>
                        <td>
                          <span className="truncate">{report.requester_name}</span>
                        </td>
                        <td>
                          <span className="truncate">{report.file_num}</span>
                        </td>
                        <td>
                          <span className="truncate">{report.total}</span>
                        </td>
                        {renderTableRow(report)}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'right' }}>
                        <span className="truncate">Total</span>
                      </td>
                      {renderTableFooter(totales)}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="justify-between pl-16">
        <PDFDownloadLink
          document={<PdfDocument dataHeader={reportDialog.headers} dataList={reportDialog.data} totales={totales} />}
          fileName="listaDeSolicitudesTimbres.pdf"
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

export default StampInvOptionReport;
