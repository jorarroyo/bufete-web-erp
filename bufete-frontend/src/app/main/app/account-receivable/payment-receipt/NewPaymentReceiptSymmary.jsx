import React from 'react';
import { Icon, TableCell, TableRow, Typography } from '@material-ui/core';
import { statusName } from 'app/constants/appConstant';
import helperFunctions from 'app/utils/helperFunc';
import EditableTableCell from 'app/main/shared/EditableTableCell';
import SearchTable from 'app/main/shared/SearchTable';

const headCells = [
  { id: 'serial_number', numeric: false, disablePadding: false, label: 'Documento' },
  { id: 'series_value', numeric: false, disablePadding: false, label: 'Serie No.' },
  { id: 'balance', numeric: false, disablePadding: false, label: 'Saldo' },
  { id: 'receipt_total', numeric: false, disablePadding: false, label: 'Pago' },
];

const NewPaymentReceiptSummary = props => {
  const { paymentReceiptDetail, setPaymentReceiptDetail, status, currency } = props;

  const currencyShowed = currency === 1 || currency === '1' ? 'GTQ' : 'USD';

  function handleTextFieldChange(rowIndex) {
    if (paymentReceiptDetail.find(x => x.id === rowIndex.id)) {
      setPaymentReceiptDetail(
        paymentReceiptDetail.map(item => {
          if (item.id === rowIndex.id) {
            return {
              ...item,
              receipt_total: Number(rowIndex.fieldValue),
              status: Number(rowIndex.fieldValue) === 0 ? statusName.DELETED : statusName.ACTIVO,
            };
          }
          return item;
        })
      );
    } else {
      setPaymentReceiptDetail([
        ...paymentReceiptDetail,
        {
          id: rowIndex.id,
          receipt_total: Number(rowIndex.fieldValue),
          status: Number(rowIndex.fieldValue) === 0 ? statusName.DELETED : statusName.ACTIVO,
        },
      ]);
    }
  }

  function createTableRow(handleClick, row, isItemSelected, labelId) {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell component="th" id={labelId} scope="row" padding="default">
          {row.serial_number}
        </TableCell>
        <TableCell>{row.series_value}</TableCell>
        <TableCell>{helperFunctions.numberFormat('en-US', 'currency', currencyShowed, row.balance)}</TableCell>
        <EditableTableCell
          row={row}
          fieldName="receipt_total"
          onCellValueChange={handleTextFieldChange}
          type="input"
          props={{
            type: 'number',
            inputProps: {
              min: 0,
            },
          }}
        />
      </TableRow>
    );
  }

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
      </div>
      <div className="mb-24">
        <div className="table-responsive">
          {status === statusName.ELABORADO && (
            <SearchTable
              data={paymentReceiptDetail}
              title="Facturas"
              setSelectedActivities={() => {}}
              headCells={headCells}
              tableRow={createTableRow}
              useCheckBox={false}
            />
          )}
          {status !== statusName.ELABORADO && (
            <table className="simple">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Serie No.</th>
                  <th>Saldo</th>
                  <th>Pago</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {paymentReceiptDetail &&
                  paymentReceiptDetail
                    .filter(s => s.status === statusName.ACTIVO)
                    .sort(helperFunctions.compareValues('id', 'asc'))
                    .map(detail => (
                      <tr key={detail.id}>
                        <td>
                          <span>{detail.serial_number}</span>
                        </td>
                        <td>
                          <span>{detail.series_value}</span>
                        </td>
                        <td>
                          <span className="truncate">
                            {helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.balance)}
                          </span>
                        </td>
                        <td>
                          <span className="truncate">{helperFunctions.numberFormat('en-US', 'currency', currencyShowed, detail.receipt_total)}</span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPaymentReceiptSummary;
