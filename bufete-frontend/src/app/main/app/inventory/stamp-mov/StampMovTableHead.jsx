import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'id',
    align: 'left',
    disabledPadding: false,
    label: 'Tx.',
    sort: true,
  },
  {
    id: 'request_date',
    align: 'left',
    disabledPadding: false,
    label: 'Fecha',
    sort: true,
  },
  {
    id: 'file_num',
    align: 'left',
    disabledPadding: false,
    label: 'Expediente',
    sort: true,
  },
  {
    id: 'requester_name',
    align: 'left',
    disabledPadding: false,
    label: 'Solicte./Resp.',
    sort: true,
  },
  {
    id: 'action',
    align: 'left',
    disabledPadding: false,
    label: 'Acción',
    sort: false,
  },
  {
    id: 'quantity',
    align: 'left',
    disabledPadding: false,
    label: 'Cantidad',
    sort: false,
  },
];

function StampMovTableHead(props) {
  const { order } = props;

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={order.id === row.id ? order.direction : false}
            >
              {row.sort ? (
                <Tooltip title="Ordernar" placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <TableSortLabel active={order.id === row.id} direction={order.direction} onClick={createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                <>{row.label}</>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default StampMovTableHead;
