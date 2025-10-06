import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Icon,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';
import clsx from 'clsx';

const rows = [
  {
    id: 'invoice_num',
    align: 'left',
    disabledPadding: false,
    label: 'No. Factura',
    sort: true,
  },
  {
    id: 'invoice_name',
    align: 'left',
    disabledPadding: false,
    label: 'Nombre',
    sort: true,
  },
  {
    id: 'invoice_total',
    align: 'left',
    disabledPadding: false,
    label: 'Total',
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
    id: 'assign_date',
    align: 'left',
    disabledPadding: false,
    label: 'Fecha',
    sort: false,
  },
];

const useStyles = makeStyles(theme => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function ActivitySettleTableHead(props) {
  const classes = useStyles(props);
  const [selectedActivitySettleMenu, setSelectedActivitySettleMenu] = useState(null);
  const { numSelected, rowCount, onSelectAllClick, order, onDeleteSelected } = props;

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  function openSelectedActivitySettleMenu(event) {
    setSelectedActivitySettleMenu(event.currentTarget);
  }

  function closeSelectedActivitySettleMenu() {
    setSelectedActivitySettleMenu(null);
    onDeleteSelected();
  }

  return (
    <TableHead>
      <TableRow className="h-64">
        <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
          <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick} />
          {numSelected > 0 && (
            <div className={clsx('flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10', classes.actionsButtonWrapper)}>
              <IconButton
                aria-owns={selectedActivitySettleMenu ? 'selectedActivitySettleMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedActivitySettleMenu}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedActivitySettleMenu"
                anchorEl={selectedActivitySettleMenu}
                open={Boolean(selectedActivitySettleMenu)}
                onClose={closeSelectedActivitySettleMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      closeSelectedActivitySettleMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Eliminar" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </TableCell>
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

export default ActivitySettleTableHead;
