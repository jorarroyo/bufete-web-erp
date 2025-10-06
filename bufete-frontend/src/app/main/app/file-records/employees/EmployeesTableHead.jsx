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
    id: 'name',
    align: 'left',
    disabledPadding: false,
    label: 'Nombres',
    sort: true,
  },
  {
    id: 'nit',
    align: 'left',
    disabledPadding: false,
    label: 'NIT',
    sort: false,
  },
  {
    id: 'igss',
    align: 'left',
    disabledPadding: false,
    label: 'IGSS',
    sort: true,
  },
  {
    id: 'status',
    align: 'left',
    disabledPadding: false,
    label: 'Estado',
    sort: false,
  },
  {
    id: 'created_at',
    align: 'left',
    disabledPadding: false,
    label: 'Grabación',
    sort: false,
  },
  {
    id: 'modified_at',
    align: 'left',
    disabledPadding: false,
    label: 'Modificado',
    sort: false,
  },
];

const useStyles = makeStyles(theme => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function EmployeesTableHead(props) {
  const classes = useStyles(props);
  const [selectedEmployeesMenu, setSelectedEmployeesMenu] = useState(null);
  const { numSelected, rowCount, onSelectAllClick, order, onDeleteSelected } = props;

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  function openSelectedEmployeesMenu(event) {
    setSelectedEmployeesMenu(event.currentTarget);
  }

  function closeSelectedEmployeesMenu() {
    setSelectedEmployeesMenu(null);
    onDeleteSelected();
  }

  return (
    <TableHead>
      <TableRow className="h-64">
        <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
          <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick} />
          {numSelected > 0 && (
            <div className={clsx('flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10', classes.actionsButtonWrapper)}>
              <IconButton aria-owns={selectedEmployeesMenu ? 'selectedEmployeesMenu' : null} aria-haspopup="true" onClick={openSelectedEmployeesMenu}>
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedEmployeesMenu"
                anchorEl={selectedEmployeesMenu}
                open={Boolean(selectedEmployeesMenu)}
                onClose={closeSelectedEmployeesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      closeSelectedEmployeesMenu();
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
      </TableRow>
    </TableHead>
  );
}

export default EmployeesTableHead;
