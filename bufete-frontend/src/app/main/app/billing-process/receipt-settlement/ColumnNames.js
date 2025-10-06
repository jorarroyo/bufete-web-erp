import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import helperFunctions from 'app/utils/helperFunc';

export const feesColumnName = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'employee_name', numeric: false, disablePadding: false, label: 'Encargado' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Descripción' },
  { id: 'activity_name', numeric: false, disablePadding: false, label: 'Actividad' },
  { id: 'activity_time', numeric: false, disablePadding: false, label: 'Tiempo' },
];

export function feesTableRow(handleClick, row, isItemSelected, labelId) {
  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleClick(event, row.id)} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.file_num}
      </TableCell>
      <TableCell align="left">{row.employee_name}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="left">{row.activity_name}</TableCell>
      <TableCell align="right">{helperFunctions.calcDateDiff(row.activity_time)}</TableCell>
    </TableRow>
  );
}

export const activitiesColumnName = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'employee_name', numeric: false, disablePadding: false, label: 'Encargado' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Descripción' },
  { id: 'activity_name', numeric: false, disablePadding: false, label: 'Actividad' },
  { id: 'institution_name', numeric: false, disablePadding: false, label: 'Institución' },
  { id: 'currency', numeric: false, disablePadding: false, label: 'Moneda' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Monto' },
];

export function activitiesTableRow(handleClick, row, isItemSelected, labelId) {
  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleClick(event, row.id)} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.file_num}
      </TableCell>
      <TableCell align="left">{row.employee_name}</TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="left">{row.activity_name}</TableCell>
      <TableCell align="left">{row.institution_name}</TableCell>
      <TableCell align="right">{row.currency}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
    </TableRow>
  );
}

export const stampsColumnName = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Descripción' },
  { id: 'currency', numeric: false, disablePadding: false, label: 'Moneda' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Monto' },
];

export function stampsTableRow(handleClick, row, isItemSelected, labelId) {
  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleClick(event, row.id)} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.file_num}
      </TableCell>
      <TableCell align="left">{row.description}</TableCell>
      <TableCell align="right">{row.currency}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
    </TableRow>
  );
}

export const expensesColumnName = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'expenses_num', numeric: false, disablePadding: true, label: 'No. Expediente' },
  { id: 'provider_name', numeric: false, disablePadding: false, label: 'Proveedor' },
  { id: 'concept_name', numeric: false, disablePadding: false, label: 'Concepto' },
  { id: 'currency_name', numeric: false, disablePadding: false, label: 'Moneda' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Monto' },
];

export function expensesTableRow(handleClick, row, isItemSelected, labelId) {
  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleClick(event, row.id)} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.file_num}
      </TableCell>
      <TableCell align="left">{row.expenses_num}</TableCell>
      <TableCell align="left">{row.provider_name}</TableCell>
      <TableCell align="left">{row.concept_name}</TableCell>
      <TableCell align="right">{row.currency_name}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
    </TableRow>
  );
}

export const summaryColumnName = [
  { id: 'comment', numeric: false, disablePadding: false, label: 'Descripción' },
  { id: 'cost_per_hour', numeric: true, disablePadding: false, label: 'Costo Hora' },
  { id: 'exchange_value', numeric: true, disablePadding: false, label: 'Tipo Cambio' },
  { id: 'cost_detail', numeric: true, disablePadding: false, label: 'a Cobrar' },
  { id: 'discount', numeric: true, disablePadding: false, label: 'Descuento' },
  { id: 'discount_tye', numeric: false, disablePadding: false, label: 'Solicitado?' },
  { id: 'use_isr', numeric: false, disablePadding: false, label: 'ISR' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Monto' },
];
