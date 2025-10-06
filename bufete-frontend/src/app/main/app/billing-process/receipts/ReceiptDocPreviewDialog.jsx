import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dialogConstants } from 'app/constants/appConstant';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Toolbar, Typography } from '@material-ui/core';
import helperFunctions from 'app/utils/helperFunc';
import * as Actions from '../store/actions/receipts';

const defaultData = {
  TipoRespuesta: '',
  DetalleRespuesta: '',
  objectURL: '',
};

const ReceiptDocPreviewDialog = () => {
  const dispatch = useDispatch();
  const previewDocDialog = useSelector(({ receiptsApp }) => receiptsApp.receipts.previewDocDialog);

  const [base64Doc, setBase64Doc] = useState(defaultData);

  const initDialog = useCallback(() => {
    if (previewDocDialog.data && base64Doc.DetalleRespuesta === '') {
      const buffer = helperFunctions.base64ToArrayBuffer(previewDocDialog.data.DetalleRespuesta);
      const blob = new Blob([buffer], {
        type: 'application/pdf',
      });
      const objectURL = URL.createObjectURL(blob);
      setBase64Doc({ ...previewDocDialog.data, objectURL });
    }
  }, [previewDocDialog, base64Doc, setBase64Doc]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (previewDocDialog.props.open) {
      initDialog();
    }
  }, [previewDocDialog.props.open, initDialog]);

  function closeComposeDialog() {
    setBase64Doc(defaultData);
    dispatch(Actions.closePreviewReceiptDocDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...previewDocDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.LG_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Documento Electronico
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: 'p-24' }}>
        {base64Doc.TipoRespuesta === '' && <h3>Cargando....</h3>}
        {base64Doc.TipoRespuesta === 'ERROR' ? (
          <h3>{base64Doc.DetalleRespuesta}</h3>
        ) : (
          <iframe title="Factura Electrónica" src={base64Doc.objectURL} width="100%" height="500px" />
        )}
      </DialogContent>
      <DialogActions className="justify-between pl-16">
        <Button
          variant="contained"
          color="primary"
          href={base64Doc.objectURL}
          disabled={base64Doc.TipoRespuesta === 'ERROR' || base64Doc.TipoRespuesta === ''}
          download={`facturaElectronica_${previewDocDialog.id}.pdf`}
        >
          Descargar
        </Button>
        <Button variant="contained" color="secondary" type="input" onClick={closeComposeDialog}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceiptDocPreviewDialog;
