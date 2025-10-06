import React, { useState } from 'react';
import { TableCell, TextField, MenuItem, Checkbox } from '@material-ui/core';

const EditableTableCell = ({ row, fieldName, onCellValueChange, type = 'input', options = [], props = { type: 'text' }, disabled = false }) => {
  const [currencyType, setCurrencyType] = useState(1);

  const handleTextFieldChange = e => {
    onCellValueChange({
      id: row.id,
      fieldValue: e.target.value,
      fieldName,
    });
  };

  const handleChange = event => {
    setCurrencyType(event.target.value);
    handleTextFieldChange(event);
  };

  const handleChecked = e => {
    onCellValueChange({
      id: row.id,
      fieldValue: e.target.checked,
      fieldName,
    });
  };

  const renderInput = (inputType, optionList, inputProps) => {
    switch (inputType) {
      case 'input':
        return (
          <TextField
            onChange={handleTextFieldChange}
            id={fieldName}
            defaultValue={row[fieldName]}
            margin="normal"
            type={inputProps.type}
            inputProps={inputProps.inputProps}
            disabled={disabled}
          />
        );
      case 'select':
        return (
          <TextField id={fieldName} defaultValue={row[fieldName]} select value={currencyType} onChange={handleChange} margin="normal">
            {optionList ? (
              optionList.map(opt => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="none">Sin registros....</MenuItem>
            )}
          </TextField>
        );
      case 'checkbox':
        return (
          <Checkbox
            checked={row[fieldName]}
            id={fieldName}
            color="primary"
            onChange={handleChecked}
            inputProps={inputProps.inputProps}
            disabled={disabled}
          />
        );
      default:
        return <div />;
    }
  };

  return <TableCell key={row.id}>{renderInput(type, options, props)}</TableCell>;
};

export default EditableTableCell;
