import { useForm } from '@fuse/hooks';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Icon, MenuItem, TextField, Toolbar, Typography } from '@material-ui/core';
import { dialogConstants, statusName, RequestType } from 'app/constants/appConstant';
import ProductServices from 'app/services/inventory/productService';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions/stamp-inv';

const defaultFormState = {
  product_id: '',
  quantity: 0,
  status: statusName.ACTIVO,
};

const StampInvAddDialog = () => {
  const dispatch = useDispatch();
  const stampInvDialog = useSelector(({ stampInvApp }) => stampInvApp.newStampInv.stampInvDialog);
  const [products, setProducts] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [productDetail, setProductDetail] = useState(null);
  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const initDialog = useCallback(() => {
    if (stampInvDialog.type === 'edit' && stampInvDialog.data) {
      setForm({ ...stampInvDialog.data });
    }
    if (stampInvDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...stampInvDialog.data,
      });
    }
  }, [stampInvDialog.data, stampInvDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (stampInvDialog.props.open) {
      initDialog();
    }
  }, [stampInvDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeAddStampInvDialog());
  }

  function canBeSubmitted() {
    if (form.request_type === RequestType.ENTRADA) {
      return form.product_id !== '' && form.quantity > 0;
    }
    return form.product_id !== '' && form.quantity < maxQuantity;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newData = {
      ...productDetail,
      quantity: Number(form.quantity),
      id: null,
      product_id: productDetail.id,
      status: statusName.ACTIVO,
    };
    dispatch(Actions.addProduct(newData));
    closeComposeDialog();
  }

  useEffect(() => {
    async function fetchData() {
      if (products.length === 0) {
        const productResponse = await ProductServices.getStampList();
        setProducts(productResponse);
      }
    }
    fetchData();
  }, [products.length]);

  async function getProductDetail(id) {
    const detail = await ProductServices.getStampDetailById(id);
    setProductDetail(detail);
    setMaxQuantity(detail.product_existence);
  }

  const handleSelect = ev => {
    setInForm(ev.target.name, ev.target.value);
    getProductDetail(ev.target.value);
  };

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...stampInvDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth={dialogConstants.SM_WIDTH}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Nueva Entrada a Inventario
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            {/* <SearchPopUp title="Seleccionar Producto" list={products} handleChoice={handleSelect} /> */}
            <TextField
              id="product_id"
              name="product_id"
              select
              label="Producto"
              className="mb-24"
              value={form.product_id}
              onChange={handleSelect}
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
              {products.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Cantidad"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              fullWidth
            />
          </div>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">business</Icon>
            </div>
            <TextField
              className="mb-24"
              label="Existencia"
              value={productDetail ? productDetail.product_existence : ''}
              variant="outlined"
              style={{ width: '50%' }}
              disabled
            />
            <TextField
              className="mb-24"
              label="Importe"
              value={productDetail ? productDetail.unit_value : ''}
              variant="outlined"
              style={{ width: '50%', paddingLeft: '5px' }}
              disabled
            />
          </div>
        </DialogContent>

        <DialogActions className="justify-between pl-16">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" disabled={!canBeSubmitted()}>
            Agregar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StampInvAddDialog;
