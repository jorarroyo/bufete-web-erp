import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { statusName } from 'app/constants/appConstant';
import helperFunctions from 'app/utils/helperFunc';
import AddIcon from '@material-ui/icons/Add';
import * as Actions from '../store/actions/payment-receipts';

function NewPaymentTransDetail(props) {
  const dispatch = useDispatch();
  const { readOnly } = props;
  const paymentTransactionDetail = useSelector(({ paymentReceiptApp }) => paymentReceiptApp.paymentReceipt.transDetails);

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon className="mr-16" color="action">
            chrome_reader_mode
          </Icon>
          <Typography className="h2" color="textSecondary">
            Transacciones
          </Typography>
        </div>
        <div className="mb-24">
          <div>
            <Button variant="contained" disabled={readOnly} endIcon={<AddIcon />} onClick={() => dispatch(Actions.openTransDetailsPaymentDialog())}>
              Agregar
            </Button>
          </div>
          <div className="table-responsive">
            <table className="simple">
              <thead>
                <tr>
                  <th>Tipo Transación</th>
                  <th>Banco</th>
                  <th>No. Documento</th>
                  <th>Total</th>
                  {!readOnly && <th>...</th>}
                </tr>
              </thead>
              <tbody>
                {paymentTransactionDetail &&
                  paymentTransactionDetail
                    .filter(s => s.status === statusName.ACTIVO)
                    .sort(helperFunctions.compareValues('id', 'asc'))
                    .map(detail => (
                      <tr key={detail.id}>
                        <td>
                          <span>{detail.transaction_type_name}</span>
                        </td>
                        <td>
                          <span className="truncate">{detail.bank_name}</span>
                        </td>
                        <td>
                          <span className="truncate">{detail.doc_number}</span>
                        </td>
                        <td>
                          <span className="truncate">{helperFunctions.formatNumber2(detail.total_transaction)}</span>
                        </td>
                        {!readOnly && (
                          <td>
                            <div className="flex items-center">
                              <Tooltip title="Editar">
                                <IconButton
                                  onClick={ev => {
                                    ev.stopPropagation();
                                    dispatch(Actions.editTransDetailsPaymentDialog(detail));
                                  }}
                                >
                                  <Icon>edit</Icon>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar">
                                <IconButton
                                  onClick={ev => {
                                    ev.stopPropagation();
                                    dispatch(Actions.deleteTransDetail(detail.id));
                                  }}
                                >
                                  <Icon>delete</Icon>
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

export default NewPaymentTransDetail;
