import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'provider_name',
    align: 'left',
    disabledPadding: false,
    label: 'Proveedor',
    sort: true,
  },
  {
    id: 'concept_name',
    align: 'left',
    disabledPadding: false,
    label: 'Concepto',
    sort: true,
  },
  {
    id: 'expenses_num',
    align: 'left',
    disabledPadding: false,
    label: 'Apertura',
    sort: true,
  },
  {
    id: 'status',
    align: 'left',
    disabledPadding: false,
    label: 'Estado',
    sort: true,
  },
  {
    id: 'expenses_total',
    align: 'left',
    disabledPadding: false,
    label: 'Total',
    sort: false,
  },
  {
    id: 'created',
    align: 'left',
    disabledPadding: false,
    label: 'Grabación',
    sort: false,
  },
  {
    id: 'modified',
    align: 'left',
    disabledPadding: false,
    label: 'Modificado',
    sort: false,
  },
];

function ExpensesTableHead(props) {
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

export default ExpensesTableHead;
