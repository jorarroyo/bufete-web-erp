import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogConstants } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import helperFunctions from 'app/utils/helperFunc';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/receipts/receipt-options.actions';
import reducer from '../store/reducers/receipts';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 35,
    zIndex: 99,
  },
  warningMessage: {
    width: '80%',
  },
});

const PreviewReceiptDialog = props => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const previewReceiptDialog = useSelector(({ receiptOptionsApp }) => receiptOptionsApp.receiptOptions.previewReceiptDialog);

  const [receiptData, setReceiptData] = useState({});
  const [currencyShowed, setCurrencyShowed] = useState('GTQ');

  const initDialog = useCallback(() => {
    setReceiptData(previewReceiptDialog.data);
    setCurrencyShowed(previewReceiptDialog.data.currency);
  }, [previewReceiptDialog.data, setReceiptData]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (previewReceiptDialog.props.open) {
      initDialog();
    }
  }, [previewReceiptDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closePreviewReceiptDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...previewReceiptDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Vista Previa de Documento
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: 'p-24' }}>
        <>
          <div className="flex">
            <TextField className="mb-24" label="Nombre" value={receiptData.client_name} variant="outlined" fullWidth disabled />
          </div>
          <div className="flex">
            <TextField className="mb-24" label="Direccion" value={receiptData.client_direction} variant="outlined" fullWidth disabled />
          </div>
          <div className="flex">
            <TextField className="mb-24" label="NIT" value={receiptData.client_nit} variant="outlined" fullWidth disabled />
          </div>
          <div className="flex">
            <TextField className="mb-24" label="Fecha" value={receiptData.receipt_date} variant="outlined" fullWidth disabled />
          </div>
          <div className="flex">
            <TextField className="mb-24" label="Impuesto" value={receiptData.iva} variant="outlined" fullWidth disabled />
          </div>
          <div className="flex">
            <TextField className="mb-24" label="Total" value={receiptData.total} variant="outlined" fullWidth disabled />
          </div>
          <div className="mb-24">
            <div className="table-responsive">
              <table className="simple">
                <thead>
                  <tr className={classes.columnHeader}>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.details &&
                    receiptData.details.map(detail => (
                      <tr key={detail.id}>
                        <td className={classes.columnNumber}>
                          <span>{detail.quantity}</span>
                        </td>
                        <td className={classes.columnHeader}>
                          <span>{detail.description}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">
                            {helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.line_unit_price)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </DialogContent>
      <DialogActions className="justify-between pl-16">
        <Button variant="contained" color="secondary" onClick={closeComposeDialog} type="input">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withReducer('receiptOptionsApp', reducer)(PreviewReceiptDialog);
