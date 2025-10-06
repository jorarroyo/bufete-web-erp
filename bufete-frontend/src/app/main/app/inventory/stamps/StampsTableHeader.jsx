import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'product_code',
    align: 'left',
    disabledPadding: false,
    label: 'Código',
    sort: true,
  },
  {
    id: 'product_name',
    align: 'left',
    disabledPadding: false,
    label: 'Descripción',
    sort: true,
  },
  {
    id: 'unit_value',
    align: 'left',
    disabledPadding: false,
    label: 'Valor unitario',
    sort: true,
  },
  {
    id: 'min_quantity',
    align: 'left',
    disabledPadding: false,
    label: 'cantidad min.',
    sort: true,
  },
  {
    id: 'product_existence',
    align: 'left',
    disabledPadding: false,
    label: 'Existencia',
    sort: true,
  },
];

function StampsTableHead(props) {
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

export default StampsTableHead;
