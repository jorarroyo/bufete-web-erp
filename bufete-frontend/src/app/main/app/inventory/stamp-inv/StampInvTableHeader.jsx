import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'inventory_type_name',
    align: 'left',
    disabledPadding: false,
    label: 'Tipo',
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
    id: 'requester_name',
    align: 'left',
    disabledPadding: false,
    label: 'Solicitante/Responsable',
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
    id: 'total',
    align: 'left',
    disabledPadding: false,
    label: 'Monto Total',
    sort: true,
  },
  {
    id: 'created',
    align: 'left',
    disabledPadding: false,
    label: 'Grabado',
    sort: true,
  },
  {
    id: 'status',
    align: 'left',
    disabledPadding: false,
    label: 'Estado',
    sort: true,
  },
];

function StampInvTableHead(props) {
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
        <TableCell>...</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default StampInvTableHead;
