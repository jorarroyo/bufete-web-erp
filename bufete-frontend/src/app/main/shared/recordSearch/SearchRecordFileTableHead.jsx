import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import React from 'react';

const rows = [
  {
    id: 'type',
    align: 'left',
    disabledPadding: false,
    label: 'Tipo',
    sort: true,
  },
  {
    id: 'file_num',
    align: 'left',
    disabledPadding: false,
    label: 'No. Exp.',
    sort: false,
  },
  {
    id: 'opening_date',
    align: 'left',
    disabledPadding: false,
    label: 'Apertura',
    sort: false,
  },
];

function SearchRecordFilesTableHead(props) {
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

export default SearchRecordFilesTableHead;
