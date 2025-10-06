import { useForm } from '@fuse/hooks';
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  InputAdornment,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { dialogConstants } from 'app/constants/appConstant';
import SearchTable from 'app/main/shared/SearchTable';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableTableCell from 'app/main/shared/EditableTableCell';
import DatePicker from 'app/main/shared/DatePicker';
import * as Actions from '../store/actions/proctor-agenda';

const headCells = [
  { id: 'file_num', numeric: false, disablePadding: true, label: 'Expediente' },
  { id: 'activity_name', numeric: false, disablePadding: false, label: 'Actividad' },
  { id: 'institution_name', numeric: false, disablePadding: false, label: 'Institucion' },
  { id: 'cost_detail', numeric: false, disablePadding: false, label: 'Monto' },
];

const defaultFormState = {
  id: '',
  invoice_num: '',
  invoice_range: '',
  invoice_name: '',
  invocie_description: '',
  comment: '',
  assign_date: '',
  invoice_total: 0,
  invoice_type: '',
  activity_list: [],
  assignedActivities: [],
  proctor_agenda_id: '',
  invoice_currency: 1,
};

const NewSettlementDialog = () => {
  const dispatch = useDispatch();
  const activitySettleDialog = useSelector(({ proctorAgendaApp }) => proctorAgendaApp.newAgenda.activitySettleDialog);
  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
  const [settleActivities, setSettleActivities] = useState([]);

  const initDialog = useCallback(() => {
    if (activitySettleDialog.type === 'edit' && activitySettleDialog.data) {
      setForm({
        ...defaultFormState,
        assignedActivities: activitySettleDialog.data,
        proctor_agenda_id: activitySettleDialog.proctorAgendaId,
      });
    }
  }, [activitySettleDialog.data, activitySettleDialog.type, setForm, activitySettleDialog.proctorAgendaId]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (activitySettleDialog.props.open) {
      initDialog();
    }
  }, [activitySettleDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeAddActivitySettleDialog());
  }

  function canBeSubmitted() {
    if (form.invoice_type === '1') {
      return (
        form.assign_date !== '' &&
        form.invoice_num !== '' &&
        form.invoice_type !== '' &&
        Number(form.invoice_total) > 0 &&
        form.activity_list.length > 0 &&
        validateAmmount()
      );
    }
    return (
      form.assign_date !== '' &&
      form.invoice_num !== '' &&
      form.invoice_range !== '' &&
      form.invoice_type !== '' &&
      Number(form.invoice_total) > 0 &&
      form.activity_list.length > 0 &&
      validateAmmount()
    );
  }

  function validateAmmount() {
    const compareList = settleActivities.filter(item => form.activity_list.includes(item.id));
    const reducer = (accumulator, currentValue) => accumulator + currentValue.fieldValue;
    return Number(form.invoice_total) === compareList.reduce(reducer, 0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newList = [...form.activity_list];
    form.activity_list = settleActivities.filter(item => newList.includes(item.id));
    dispatch(Actions.saveActivitySettle(form));
    closeComposeDialog();
  }

  function setSelectedActivities(ids) {
    form.activity_list = ids;
    canBeSubmitted();
  }

  function handleTextFieldChange(rowIndex) {
    if (settleActivities.find(x => x.id === rowIndex.id)) {
      setSettleActivities(
        settleActivities.map(item => {
          if (item.id === rowIndex.id) {
            return { id: item.id, fieldValue: Number(rowIndex.fieldValue) };
          }
          return item;
        })
      );
    } else {
      setSettleActivities([...settleActivities, { id: rowIndex.id, fieldValue: Number(rowIndex.fieldValue) }]);
    }
  }

  const handleDateChange = date => {
    setInForm('assign_date', date);
  };

  function createTableRow(handleClick, row, isItemSelected, labelId) {
    return (
      <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={event => handleClick(event, row.id)} />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.file_num}
        </TableCell>
        <TableCell align="left">{row.activity_name}</TableCell>
        <TableCell align="left">{row.institution_name}</TableCell>
        <EditableTableCell
          row={row}
          fieldName="cost_detail"
          onCellValueChange={handleTextFieldChange}
          type="input"
          props={{
            type: 'number',
            inputProps: {
              min: 0,
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
      {...activitySettleDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.MD_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Asignar Actividades a liquidacion
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">list_alt</Icon>
            </div>
            <TextField
              id="invoice_type"
              name="invoice_type"
              select
              label="Tipo de Documento"
              className="mb-24"
              value={form.invoice_type}
              onChange={handleChange}
              SelectProps={{
                MenuProps: {
                  className: { width: '200' },
                },
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              required
              autoFocus
            >
              <MenuItem key="1" value="1">
                Recibo
              </MenuItem>
              <MenuItem key="2" value="2">
                Factura
              </MenuItem>
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">confirmation_number</Icon>
            </div>
            <TextField
              error={form.invoice_num === ''}
              required
              id="invoice_num"
              name="invoice_num"
              label="No. Documento"
              className="mb-24"
              value={form.invoice_num}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">calendar_view_day</Icon>
            </div>
            <TextField
              error={form.invoice_type === '2' && form.invoice_range === ''}
              required={form.invoice_type === '2'}
              id="invoice_range"
              name="invoice_range"
              label="Serie"
              className="mb-24"
              value={form.invoice_range}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">contacts</Icon>
            </div>
            <TextField
              id="invoice_name"
              name="invoice_name"
              label="Nombre Factura"
              className="mb-24"
              value={form.invoice_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">chrome_reader_mode</Icon>
            </div>
            <TextField
              id="invoice_description"
              name="invoice_description"
              label="Descripcion Factura"
              className="mb-24"
              value={form.invoice_description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">date_range</Icon>
            </div>
            <DatePicker
              className="mb-24"
              id="assign_date"
              name="assign_date"
              label="Fecha"
              value={form.assign_date || null}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Comentarios"
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">attach_money</Icon>
            </div>
            <TextField
              id="invoice_currency"
              name="invoice_currency"
              select
              label="Tipo de Moneda"
              className="mb-24"
              value={form.invoice_currency || ''}
              onChange={handleChange}
              SelectProps={{
                MenuProps: {
                  className: { width: '200' },
                },
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem key="1" value="1">
                Quetzales
              </MenuItem>
              <MenuItem key="2" value="2">
                Dolares
              </MenuItem>
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">monetization_on</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Monto"
              id="invoice_total"
              name="invoice_total"
              value={form.invoice_total}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              type="Number"
              InputProps={{
                startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                inputProps: { min: 0 },
              }}
            />
          </div>
          <SearchTable
            data={form.assignedActivities || []}
            title="Actividades"
            setSelectedActivities={setSelectedActivities}
            headCells={headCells}
            tableRow={createTableRow}
            useCheckBox
          />
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Asignar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewSettlementDialog;
