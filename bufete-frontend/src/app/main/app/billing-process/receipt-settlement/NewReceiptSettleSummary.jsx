import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { ReceiptSettlementType, statusName } from 'app/constants/appConstant';
import helperFunctions from 'app/utils/helperFunc';
import MySnackbarContentWrapper from 'app/main/shared/MySnackbarContentWrapper';
import * as Actions from '../store/actions/receipt-settlements';

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

function NewReceiptSettleSummary(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { showRowOptions } = props;
  const receiptSettlementDetail = useSelector(({ receiptSettleApp }) => receiptSettleApp.receiptSettlement.receiptSettlementDetail);

  return (
    <div>
      {showRowOptions && (
        <>
          <MySnackbarContentWrapper
            variant="warning"
            className={classes.warningMessage}
            message="Para almancenar la información de esta pantalla, debe presionar el botón de Grabar!"
          />
          <br />
        </>
      )}
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon className="mr-16" color="action">
            chrome_reader_mode
          </Icon>
          <Typography className="h2" color="textSecondary">
            Resumen
          </Typography>
        </div>
        <div className="mb-24">
          <div className="table-responsive">
            <table className="simple">
              <thead>
                <tr className={classes.columnHeader}>
                  <th>Descripción</th>
                  <th>Costo Hora</th>
                  <th>Tipo Cambio</th>
                  <th>Monto</th>
                  <th>Descuento</th>
                  <th>¿Solicitado?</th>
                  <th>ISR</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {receiptSettlementDetail &&
                  receiptSettlementDetail
                    .filter(s => s.status === statusName.ACTIVO)
                    .sort(helperFunctions.compareValues('id', 'asc'))
                    .map(detail => (
                      <tr key={detail.id}>
                        <td>
                          <span>{detail.comment}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', detail.cost_per_hour)}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', detail.exchange_value)}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', detail.cost_detail)}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', detail.discount)}</span>
                        </td>
                        <td className={classes.columnHeader}>
                          <span className="truncate">{detail.discount_type ? 'Si' : 'No'}</span>
                        </td>
                        <td className={classes.columnHeader}>
                          <span className="truncate">{detail.use_isr ? 'Si' : 'No'}</span>
                        </td>
                        <td className={classes.columnHeader}>
                          <span className="truncate">{detail.use_iva ? 'Si' : 'No'}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', 'GTQ', detail.total)}</span>
                        </td>
                        <td>
                          {showRowOptions && (
                            <div className="flex items-center">
                              <Tooltip title="Editar">
                                <IconButton
                                  onClick={ev => {
                                    ev.stopPropagation();
                                    dispatch(Actions.openEditReceiptSettleLineDialog(detail.id));
                                  }}
                                >
                                  <Icon>edit</Icon>
                                </IconButton>
                              </Tooltip>
                              {detail.object_type === ReceiptSettlementType.LIBRE && (
                                <Tooltip title="Eliminar">
                                  <IconButton
                                    onClick={ev => {
                                      ev.stopPropagation();
                                      dispatch(Actions.deleteReceiptSettleLine(detail.id));
                                    }}
                                  >
                                    <Icon>delete</Icon>
                                  </IconButton>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReceiptSettleSummary;
