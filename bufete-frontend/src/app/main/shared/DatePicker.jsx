import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/es';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = props => {
  return (
    <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
      <KeyboardDatePicker
        allowKeyboardControl={false}
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        margin="normal"
        format="dd/MM/yyyy"
        KeyboardButtonProps={{
          'aria-label': 'cambiar fecha',
        }}
        invalidDateMessage="Formato inválido"
        InputProps={{
          inputProps: {
            readOnly: true,
            mask: '__/__/____',
          },
        }}
        autoOk
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
