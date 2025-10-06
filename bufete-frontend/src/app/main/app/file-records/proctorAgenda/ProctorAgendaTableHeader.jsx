import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'assign_date',
    align: 'left',
    disabledPadding: false,
    label: 'Fecha Asig.',
    sort: true,
  },
  {
    id: 'employee_name',
    align: 'left',
    disabledPadding: false,
    label: 'Procurador',
    sort: false,
  },
  {
    id: 'comment',
    align: 'left',
    disabledPadding: false,
    label: 'Comentario',
    sort: true,
  },
  {
    id: 'proctor_agenda_cost_local',
    align: 'left',
    disabledPadding: false,
    label: 'Costo Local',
    sort: false,
  },
  {
    id: 'proctor_agenda_cost_outer',
    align: 'left',
    disabledPadding: false,
    label: 'Costo Externo',
    sort: false,
  },
  {
    id: 'status',
    align: 'left',
    disabledPadding: false,
    label: 'Estado',
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

function ProctorAgendaTableHead(props) {
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

export default ProctorAgendaTableHead;
