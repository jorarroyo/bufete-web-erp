import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogConstants } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import { PDFDownloadLink } from '@react-pdf/renderer';
import helperFunctions from 'app/utils/helperFunc';
import * as Actions from '../store/actions/receipt-settlements';
import ReceiptSettlementReport from './reports/ReceiptSettlementReport';

const useStyles = makeStyles({
  columnHeader: {
    textAlign: 'center',
  },
  columnNumber: {
    textAlign: 'right',
  },
});

const defaultFormState = {
  id: null,
  receipt_settlement_id: null,
  client_name: '',
  document_date: '',
  file_num: '',
  header_text: '',
  footer_text: '',
  total: 0,
  details: [],
};

const ReceiptSettlementReportDialog = props => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const reportDialog = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlements.reportDialog);
  const { form, handleChange, setForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (reportDialog.data) {
      setForm({
        ...defaultFormState,
        ...reportDialog.data,
      });
    }
  }, [reportDialog.data, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (reportDialog.props.open) {
      initDialog();
    }
  }, [reportDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeReportReceiptSettleDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(Actions.getReceiptSettleReport(form));
  }

  function canBeSubmitted() {
    return true;
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
            Reporte de Liquidación de Facturas
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">assignment_ind</Icon>
            </div>
            <TextField
              id="client_name"
              name="client_name"
              label="Cliente"
              className="mb-24"
              value={form.client_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              disabled
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">class</Icon>
            </div>
            <TextField
              id="file_num"
              name="file_num"
              label="Folio"
              className="mb-24"
              value={form.file_num}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Encabezado"
              id="header_text"
              name="header_text"
              value={form.header_text}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Pie de página"
              id="footer_text"
              name="footer_text"
              value={form.footer_text}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">monetization_on</Icon>
            </div>
            <TextField
              id="total"
              name="total"
              label="Total"
              className="mb-24"
              value={helperFunctions.numberFormat('en-US', 'currency', 'GTQ', form.total)}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              disabled
            />
          </div>
          <div className="pb-48">
            <div className="pb-16 flex items-center">
              <Icon className="mr-16" color="action">
                chrome_reader_mode
              </Icon>
              <Typography className="h2" color="textSecondary">
                Detalle
              </Typography>
            </div>
            <div className="mb-24">
              <div className="table-responsive">
                <table className="simple">
                  <thead>
                    <tr className={classes.columnHeader}>
                      <th>Descripción</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportDialog.data &&
                      reportDialog.data.details.map(detail => (
                        <tr key={detail.id}>
                          <td>
                            <span>{detail.description}</span>
                          </td>
                          <td className={classes.columnNumber}>
                            <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', detail.detail_total)}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <PDFDownloadLink
            document={<ReceiptSettlementReport data={form} />}
            fileName="reporteLiquidacionFactura.pdf"
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
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Generar
          </Button>
        </DialogActions>
        <LoadingComponent loadingRecord={reportDialog.loadingDialog} />
      </form>
    </Dialog>
  );
};

export default ReceiptSettlementReportDialog;
