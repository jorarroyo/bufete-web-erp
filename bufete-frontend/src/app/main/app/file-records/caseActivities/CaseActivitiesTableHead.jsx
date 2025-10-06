import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'activity_name',
    align: 'left',
    disabledPadding: false,
    label: 'Actividad',
    sort: true,
  },
  {
    id: 'file_num',
    align: 'left',
    disabledPadding: false,
    label: 'No. Exp.',
    sort: true,
  },
  {
    id: 'assign_date',
    align: 'left',
    disabledPadding: false,
    label: 'Asignación',
    sort: true,
  },
  {
    id: 'employee_name',
    align: 'left',
    disabledPadding: false,
    label: 'Procurador',
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
    id: 'created',
    align: 'left',
    disabledPadding: false,
    label: 'Grabación',
    sort: false,
  },
];

function CaseActivitiesTableHead(props) {
  const { order } = props;

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
      <TableCell/>
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

export default CaseActivitiesTableHead;
