import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple } from '@fuse';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import DatePicker from 'app/main/shared/DatePicker';
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import InvoiceSeriesServices from 'app/services/billing-process/invoiceSeriesServices';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import LoadingComponent from 'app/main/shared/LoadingComponent';
import withReducer from 'app/store/withReducer';
import PDFDocument from './Reportes/PDFDocument';
import * as Actions from '../store/actions/receipts';
import reducer from '../store/reducers/receipts';

const useStyles = makeStyles({
  layoutRoot: {},
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  centerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewer: {
    width: '100%',
    height: '700px',
  },
});

const defaultFormState = {
  invoiceId: '',
  startDate: new Date(),
  endDate: new Date(),
};

const ReceiptList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const receiptReportList = useSelector(({ receiptsApp }) => receiptsApp.receiptsReports.receiptReportList);
  const loading = useSelector(({ receiptsApp }) => receiptsApp.receiptsReports.loading);

  const { form, handleChange, setInForm } = useForm(defaultFormState);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (seriesList.length === 0) {
        const response = await InvoiceSeriesServices.getInvoiceSeries('/list', '');
        setSeriesList([
          {
            id: 0,
            series_name: 'Todos',
          },
          ...response,
        ]);
      }
    }

    fetchData();
  }, [seriesList.length]);

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.requestReceiptReport(form));
  }

  const handleStartDateChange = date => {
    setInForm('startDate', date);
  };

  const handleEndDateChange = date => {
    setInForm('endDate', date);
  };

  function canBeSubmitted() {
    return form.invoiceId !== '';
  }

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      content={
        <>
          <div className="p-24">
            <h1>Listado de Facturas</h1>
            <form noValidate onSubmit={handleSubmit} className={classes.root}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item sm xs={6}>
                    <DatePicker
                      id="startDate"
                      name="startDate"
                      label="Fecha Inicio"
                      value={form.startDate}
                      onChange={handleStartDateChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item sm xs={6}>
                    <DatePicker
                      id="endDate"
                      name="endDate"
                      label="Fecha Final"
                      value={form.endDate}
                      onChange={handleEndDateChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item sm xs={6}>
                    <TextField
                      id="invoiceId"
                      name="invoiceId"
                      select
                      label="Serie"
                      value={form.invoiceId}
                      onChange={handleChange}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      required
                    >
                      {seriesList ? (
                        seriesList.map(emp => (
                          <MenuItem key={emp.id} value={emp.id}>
                            {emp.series_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="none">Sin registros....</MenuItem>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item sm xs={6} className={classes.centerButton}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
                      Generar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <br />
            <div>
              {receiptReportList && (
                <PDFViewer className={classes.viewer}>
                  <PDFDocument dataList={receiptReportList} />
                </PDFViewer>
              )}
            </div>
          </div>
          <LoadingComponent loadingRecord={loading} />
        </>
      }
    />
  );
};

export default withReducer('receiptsApp', reducer)(ReceiptList);
