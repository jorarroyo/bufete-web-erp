import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const menuListElaborado = [
  {
    name: 'Editar',
    link: '/apps/account-receivable/payment-receipts/:id',
    auth: ['USUARIO_ADMIN', 'RECIBO_FACTURA_MODIFICA'],
  },
  {
    name: 'Cambio de Estado',
    link: 'cambioEstado',
    auth: ['USUARIO_ADMIN', 'RECIBO_FACTURA_CAMBIA_ESTADO'],
  },
];

const menuListAplicado = [
  {
    name: 'Ver',
    link: '/apps/account-receivable/payment-receipts/:id',
    auth: ['USUARIO_ADMIN', 'RECIBO_FACTURA_LECTURA'],
  },
];

const PaymentReceiptsInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ELABORADO: {
      return <InnerMenu id={item.id} status={item.status} options={[...menuListElaborado]} onMenuClick={handleClickMenu} />;
    }
    case statusName.APLICADO: {
      return <InnerMenu id={item.id} status={item.status} options={[...menuListAplicado]} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default PaymentReceiptsInnerMenu;
