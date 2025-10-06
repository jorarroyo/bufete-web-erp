import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { statusName } from 'app/constants/appConstant';
import helperFunctions from 'app/utils/helperFunc';
import * as Actions from '../store/actions/receipts';

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

function NewReceiptSummary(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const receiptDetail = useSelector(({ receiptApp }) => receiptApp.receipt.receiptDetail);
  const { isFreeReceipt, currency } = props;

  const currencyShowed = currency === 1 || currency === '1' ? 'GTQ' : 'USD';

  return (
    <div>
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
                  <th>Monto</th>
                  <th>Descuento</th>
                  <th>ISR</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {receiptDetail &&
                  receiptDetail
                    .filter(s => s.status === statusName.ACTIVO)
                    .sort(helperFunctions.compareValues('id', 'asc'))
                    .map(detail => (
                      <tr key={detail.id}>
                        <td>
                          <span>{detail.description}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.line_amount)}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.line_discount)}</span>
                        </td>
                        <td className={classes.columnHeader}>
                          <span className="truncate">{detail.use_isr ? 'Si' : 'No'}</span>
                        </td>
                        <td className={classes.columnHeader}>
                          <span className="truncate">{detail.use_iva ? 'Si' : 'No'}</span>
                        </td>
                        <td className={classes.columnNumber}>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.line_total)}</span>
                        </td>

                        <td>
                          <div className="flex items-center">
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openEditReceiptLineDialog(detail.id, isFreeReceipt));
                                }}
                              >
                                <Icon>edit</Icon>
                              </IconButton>
                            </Tooltip>
                            {isFreeReceipt && (
                              <Tooltip title="Eliminar">
                                <IconButton
                                  onClick={ev => {
                                    ev.stopPropagation();
                                    dispatch(Actions.deleteReceiptLine(detail.id));
                                  }}
                                >
                                  <Icon>delete</Icon>
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
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

export default NewReceiptSummary;
