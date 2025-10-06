import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const cambioEstado = {
  name: 'Cambio de Estado',
  link: 'cambioEstado',
  auth: ['USUARIO_ADMIN', 'FACTURA_CAMBIA_ESTADO'],
};

const generaFactura = {
  name: 'Generar Factura',
  link: 'generaFac',
  auth: ['USUARIO_ADMIN', 'FACTURA_GENERAR_FACTURA'],
};

const consultarDoc = {
  name: 'Consultar Documento',
  link: 'consultar',
  auth: ['USUARIO_ADMIN', 'FACTURA_GENERAR_REPORTE'],
};

const menuListElaborado = [
  {
    name: 'Editar',
    link: '/apps/billing-process/receipts/:id',
    auth: ['USUARIO_ADMIN', 'FACTURA_MODIFICA'],
  },
  {
    name: 'Vista Previa',
    link: 'preview',
    auth: ['USUARIO_ADMIN', 'FACTURA_LECTURA'],
  },
];

const ReceiptsInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.EN_EDICION: {
      return <InnerMenu id={item.id} status={item.status} options={[...menuListElaborado, cambioEstado]} onMenuClick={handleClickMenu} />;
    }
    case statusName.GENERADA: {
      return <InnerMenu id={item.id} status={item.status} options={[consultarDoc, cambioEstado]} onMenuClick={handleClickMenu} />;
    }
    case statusName.ANULADO: {
      return <InnerMenu id={item.id} status={item.status} options={[consultarDoc]} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default ReceiptsInnerMenu;
