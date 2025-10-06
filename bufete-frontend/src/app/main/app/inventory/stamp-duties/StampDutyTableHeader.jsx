import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'stamp_type_name',
    align: 'left',
    disabledPadding: false,
    label: 'Tipo de Timbre',
    sort: true,
  },
  {
    id: 'designation_type_name',
    align: 'left',
    disabledPadding: false,
    label: 'Denominación',
    sort: true,
  },
  {
    id: 'year',
    align: 'left',
    disabledPadding: false,
    label: 'Año',
    sort: true,
  },
  {
    id: 'total_stamp_number',
    align: 'left',
    disabledPadding: false,
    label: 'Cantidad',
    sort: false,
  },
];

function StampDutyTableHead(props) {
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

export default StampDutyTableHead;
