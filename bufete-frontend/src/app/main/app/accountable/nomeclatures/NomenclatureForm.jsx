import React, { useEffect, useRef } from 'react';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import NomenclatureServices from 'app/services/accountable/nomenclatureServices';
import AsyncSelectComponent from 'app/main/shared/AsyncSelect';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions/nomenclatures';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const initForm = {
  id: null,
  parent_id: '',
  code: '',
  name: '',
  type: 1,
  parent: null,
};

const NomenclatureForm = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dataId, refresh } = props;
  const { form, handleChange, setForm, setInForm } = useForm(initForm);

  const inputRef = useRef();

  useEffect(() => {
    async function fetchData() {
      if (form.id !== dataId && !Array.isArray(dataId)) {
        const entityResponse = await NomenclatureServices.getNomenclatures('/get/', dataId);
        setForm({ ...entityResponse, parent: { id: entityResponse.parent_id, name: entityResponse.parent_name } });
      }
    }
    fetchData();
  }, [dataId]);

  const fetchData = inputValue => {
    return NomenclatureServices.searchNomenclatures(inputValue);
  };

  async function handleSelectChange(type, value) {
    setInForm(type, value);
  }

  function clearInput() {
    setForm(initForm);
    if (inputRef) {
      inputRef.current.clearValue();
    }
  }

  function canBeSubmitted() {
    return form && form.code.length > 0 && form.name.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.createNomenclature(form));
    refresh();
  }

  function deleteNomenclature() {
    dispatch(Actions.deleteNomenclature(form.id));
    clearInput();
  }

  return (
    <div className="p-16 sm:p-24 max-w-2xl">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        {form.id ? (
          <TextField
            label="Nomenclatura Padre"
            className="mt-8 mb-16"
            variant="outlined"
            value={`${form.parent_name}` || 'SIN DATOS'}
            fullWidth
            disabled
          />
        ) : (
          <AsyncSelectComponent
            inputId="parent_id"
            inputName="Nomenclatura Padre"
            placeHolder="Seleccionar una nomenclatura..."
            initialState={form.parent}
            handleChange={handleSelectChange}
            suggestions={fetchData}
            autoFocus
            ref={inputRef}
          />
        )}
        <TextField
          id="code"
          name="code"
          label="Código Nomenclatura"
          className="mt-8 mb-16"
          variant="outlined"
          value={form.code}
          onChange={handleChange}
          error={form.code === ''}
          required
          fullWidth
          autoFocus
        />
        <TextField
          className="mt-8 mb-16"
          error={form.name === ''}
          required
          label="Nombre"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          id="type"
          select
          error={form.type === -1}
          required
          label="Tipo"
          name="type"
          className="mt-8 mb-16"
          value={form.type}
          onChange={handleChange}
          helperText="Seleccione un tipo de Nomenclatura"
          variant="outlined"
          fullWidth
        >
          <MenuItem key="deudor" value="1">
            Deudor
          </MenuItem>
          <MenuItem key="acreedor" value="2">
            Acreedor
          </MenuItem>
        </TextField>
        <div className={classes.root}>
          <Button variant="contained" onClick={clearInput}>
            Limpiar
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted()}>
            Guardar
          </Button>
          <Button style={{ backgroundColor: '#f44336', color: 'white' }} variant="contained" disabled={!form.id} onClick={deleteNomenclature}>
            Eliminar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NomenclatureForm;
