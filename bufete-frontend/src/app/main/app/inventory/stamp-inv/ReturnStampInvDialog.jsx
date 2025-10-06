import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, TableCell, TableRow, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants, RequestType, statusName } from 'app/constants/appConstant';
import EditableTableCell from 'app/main/shared/EditableTableCell';
import SearchTable from 'app/main/shared/SearchTable';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/stamp-inv';

const defaultFormState = {
  id: null,
  request_type: RequestType.SOLICITUD,
  requester_id: null,
  request_date: new Date(),
  reference: '',
  file_record_id: -1,
  total: 0,
  status: statusName.ELABORADO,
  detail_list: [],
};

const headCells = [
  { id: 'product_code', numeric: false, disablePadding: false, label: 'Codigo' },
  { id: 'product_name', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'unit_value', numeric: false, disablePadding: false, label: 'Valor' },
  { id: 'product_existence', numeric: false, disablePadding: false, label: 'Existencia' },
  { id: 'quantity_request', numeric: false, disablePadding: false, label: 'Cantidad' },
];

const ReturnStampInvDialog = () => {
  const dispatch = useDispatch();
  const stampReturnDialog = useSelector(({ stampInvApp }) => stampInvApp.stampInv.stampReturnDialog);
  const [stampList, setStampList] = useState([]);
  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (stampReturnDialog.type === 'new' && stampReturnDialog.data) {
      setForm(defaultFormState);
      setStampList([...stampReturnDialog.data]);
    }
    if (stampReturnDialog.type === 'edit' && stampReturnDialog.data) {
      setForm({
        ...defaultFormState,
        ...stampReturnDialog.data,
      });
      setStampList([...stampReturnDialog.data.detail_list]);
    }
    setInForm('file_record_id', stampReturnDialog.data.file_record_id);
  }, [stampReturnDialog.data, stampReturnDialog.type, setForm, setInForm, setStampList]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (stampReturnDialog.props.open) {
      initDialog();
    }
  }, [stampReturnDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeReturnStampOptionsDialog());
  }

  function handleTextFieldChange(rowIndex) {
    if (stampList.find(x => x.product_id === rowIndex.id)) {
      setStampList(
        stampList.map(item => {
          if (item.product_id === rowIndex.id) {
            return {
              ...item,
              quantity_request: Number(rowIndex.fieldValue),
              status: Number(rowIndex.fieldValue) === 0 ? statusName.DELETED : statusName.ACTIVO,
            };
          }
          return item;
        })
      );
    } else {
      setStampList([
        ...stampList,
        {
          id: null,
          product_id: rowIndex.id,
          quantity_request: Number(rowIndex.fieldValue),
          status: Number(rowIndex.fieldValue) === 0 ? statusName.DELETED : statusName.ACTIVO,
        },
      ]);
    }
  }

  useEffect(() => {
    const newTotal = stampList
      .filter(prd => prd.status === statusName.ACTIVO)
      .reduce((accumulator, currentValue) => accumulator + currentValue.unit_value * currentValue.quantity_request, 0);
    setInForm('total', newTotal);
  }, [stampList, setInForm]);

  function canBeSubmitted() {
    return form.requester_id !== -1 && !isEmpty(stampList.filter(stmp => stmp.quantity_request > 0));
  }

  function handleSubmit(event) {
    event.preventDefault();
    form.detail_list = stampList.filter(stmp => (stmp.id !== null && stmp.quantity_request === 0) || stmp.quantity_request > 0);
    dispatch(Actions.createReEntryStampInvOpt(form));
  }

  function createTableRow(handleClick, row, isItemSelected, labelId) {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell component="th" id={labelId} scope="row" padding="default">
          {row.product_code}
        </TableCell>
        <TableCell>{row.product_name}</TableCell>
        <TableCell>{row.unit_value}</TableCell>
        <TableCell>{row.product_existence}</TableCell>
        <EditableTableCell
          row={row}
          fieldName="quantity_request"
          onCellValueChange={handleTextFieldChange}
          type="input"
          props={{
            type: 'number',
            inputProps: {
              min: 0,
              max: row.limit,
            },
          }}
        />
      </TableRow>
    );
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...stampReturnDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Ajuste de movimiento
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Comentario"
              id="reference"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              disabled={form.status === statusName.PENDIENTE}
            />
          </div>
          <SearchTable
            data={stampReturnDialog.productList}
            title="Timbres"
            setSelectedActivities={() => {}}
            headCells={headCells}
            tableRow={createTableRow}
            useCheckBox={false}
          />
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Ajustar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReturnStampInvDialog;
