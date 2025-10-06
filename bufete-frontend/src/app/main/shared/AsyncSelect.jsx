import React, { forwardRef, useImperativeHandle } from 'react';
import AsyncSelect from 'react-select/async';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  asyncSelectWrapper: {
    marginBottom: '1.6rem',
    marginTop: '-0.8rem',
    '& div[class*="menu"]': {
      zIndex: 3,
    },
    '& input[type="text"]': {
      height: 46,
    },
    '& div[class*="control"]:hover': {
      borderColor: 'black',
      boxShadow: '0 0 0 1px black',
    },
    '& div[class*="control"]:active': {
      borderColor: 'black',
      boxShadow: '0 0 0 1px black',
    },
  },
  root: {
    flexGrow: 1,
    height: 70,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  asyncSelectLabel: {
    background: 'white',
    transform: 'translate(0, 10px) scale(0.75)',
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    padding: '0 5px',
  },
  asyncSelectLabelDisabled: {
    transform: 'translate(0, 10px) scale(0.75)',
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
    padding: '0 5px',
    background: 'linear-gradient( white 50%, #f2f2f2 50%) ',
    color: 'hsl(0,0%,50%)',
  },
}));

const AsyncSelectComponent = forwardRef((props, ref) => {
  const theme = useTheme();
  const classes = useStyles();
  const { initialState, handleChange, suggestions, inputName, inputId, placeHolder, disabled } = props;
  const [innerValue, setInnerValue] = React.useState(initialState);

  function handleChangeValue(value) {
    setInnerValue(value);
    handleChange(inputId, value.id);
  }

  useImperativeHandle(ref, () => ({
    clearValue: () => {
      setInnerValue(null);
      handleChange(inputId, null);
    },
  }));

  const selectStyles = {
    input: base => ({
      ...base,
      height: 46,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <>
      <div className={classes.asyncSelectWrapper}>
        <label className={disabled ? classes.asyncSelectLabelDisabled : classes.asyncSelectLabel} htmlFor={inputId}>
          {inputName}
        </label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={suggestions}
          classes={classes}
          styles={selectStyles}
          inputId={inputId}
          TextFieldProps={{
            label: inputName,
            InputLabelProps: {
              htmlFor: inputId,
              shrink: true,
            },
          }}
          name={inputName}
          placeholder={placeHolder || 'Seleccionar...'}
          value={innerValue}
          onChange={handleChangeValue}
          getOptionLabel={e => e.name}
          getOptionValue={e => e.id}
          isDisabled={disabled || false}
        />
      </div>
    </>
  );
});

export default AsyncSelectComponent;
