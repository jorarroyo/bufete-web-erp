import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import helperFunctions from 'app/utils/helperFunc';
import * as Actions from '../store/actions/payment-receipts';

function NewPaymentBalanceSummary(props) {
  const dispatch = useDispatch();
  const paymentBalanceDetail = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.paymentBalanceDetail);
  const { currency, readOnly } = props;

  const currencyShowed = currency === 1 || currency === '1' ? 'GTO' : 'USD';

  return (
    <div>
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
                <tr>
                  <th>Documento</th>
                  <th>Serie No.</th>
                  <th>Fecha</th>
                  <th>Saldo</th>
                  <th>Pago</th>
                  {!readOnly && <th>...</th>}
                </tr>
              </thead>
              <tbody>
                {paymentBalanceDetail &&
                  paymentBalanceDetail.sort(helperFunctions.compareValues('id', 'asc')).map(detail => (
                    <tr key={detail.id}>
                      <td>
                        <span>{detail.serial_number}</span>
                      </td>
                      <td>
                        <span className="truncate">{detail.series_value}</span>
                      </td>
                      <td>
                        <span className="truncate">{helperFunctions.formatDate(detail.receipt_date)}</span>
                      </td>
                      <td>
                        <span className="truncate">
                          {helperFunctions.numberFormat('en-US', 'currency', detail.currency_name || 'GTO', detail.balance)}
                        </span>
                      </td>
                      <td>
                        <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.to_pay || 0)}</span>
                      </td>
                      {!readOnly && (
                        <td>
                          <div className="flex items-center">
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={ev => {
                                  ev.stopPropagation();
                                  dispatch(Actions.openBalanceDetailsPaymentDialog(detail));
                                }}
                              >
                                <Icon>edit</Icon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      )}
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

export default NewPaymentBalanceSummary;
