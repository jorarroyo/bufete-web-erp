import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const cambioEstado = {
  name: 'Cambio de Estado',
  link: '#1',
  auth: ['USUARIO_ADMIN', 'LIQUIDACION_FACTURA_CAMBIA_ESTADO'],
};

const menuListElaborado = [
  {
    name: 'Editar',
    link: '/apps/billing-process/receipt-settlements/:id/1',
    auth: ['USUARIO_ADMIN', 'LIQUIDACION_FACTURA_MODIFICA'],
  },
];

const menuListVer = [
  {
    name: 'Ver',
    link: '/apps/billing-process/receipt-settlements/:id',
    auth: ['USUARIO_ADMIN', 'LIQUIDACION_FACTURA_LECTURA'],
  },
];

const menuListReporte = {
  name: 'Generar Reporte',
  link: 'reporte',
  auth: ['USUARIO_ADMIN', 'LIQUIDACION_FACTURA_GENERAR_REPORTE'],
};

const ReceiptSettlementsInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ELABORADO: {
      return (
        <InnerMenu id={item.id} status={item.status} options={[...menuListElaborado, cambioEstado, menuListReporte]} onMenuClick={handleClickMenu} />
      );
    }
    case statusName.PENDIENTE: {
      return <InnerMenu id={item.id} status={item.status} options={[...menuListVer, cambioEstado, menuListReporte]} onMenuClick={handleClickMenu} />;
    }
    case statusName.REVISION: {
      return (
        <InnerMenu
          id={item.id}
          status={item.status}
          options={[...menuListVer, { ...cambioEstado, auth: ['USUARIO_ADMIN', 'LIQUIDACION_FACTURA_AUTORIZA'] }, menuListReporte]}
          onMenuClick={handleClickMenu}
        />
      );
    }
    case statusName.AUTORIZADO: {
      return (
        <InnerMenu
          id={item.id}
          status={item.status}
          options={[...menuListVer, { ...cambioEstado, auth: ['USUARIO_ADMIN', 'LIQUIDACION_FACTURA_GENERAR_FACTURA'] }, menuListReporte]}
          onMenuClick={handleClickMenu}
        />
      );
    }
    case statusName.RECHAZADO: {
      return <InnerMenu id={item.id} status={item.status} options={[...menuListVer, cambioEstado]} onMenuClick={handleClickMenu} />;
    }
    case statusName.FACTURADO: {
      // TODO: agregar listado de menu en rechazado ...generar reporte, Imprimir, etc.
      return <InnerMenu id={item.id} status={item.status} options={[...menuListVer, menuListReporte]} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default ReceiptSettlementsInnerMenu;
