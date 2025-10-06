import React from 'react';
import { statusName, RequestType } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const Autorizar = [
  {
    name: 'Autorizar',
    link: '/apps/inventory/stamp-inv/:id',
    auth: ['USUARIO_ADMIN', 'TIMBRE_FISCAL_INVENTARIO_AUTORIZA'],
  },
];

const Ver = [
  {
    name: 'Ver',
    link: '/apps/inventory/stamp-inv/:id',
    auth: ['USUARIO_ADMIN', 'TIMBRE_FISCAL_INVENTARIO_LECTURA'],
  },
];

const reIngreso = {
  name: 'Ajustar movimiento',
  link: 'reingreso',
  auth: ['USUARIO_ADMIN', 'TIMBRE_FISCAL_INVENTARIO_AUTORIZA'],
};

const menuListElaborado = [
  {
    name: 'Editar',
    link: '/apps/inventory/stamp-inv/:id',
    auth: ['USUARIO_ADMIN', 'TIMBRE_FISCAL_INVENTARIO_EDITA'],
  },
  {
    name: 'Cambio de Estado',
    link: '#',
    auth: ['USUARIO_ADMIN', 'TIMBRE_FISCAL_INVENTARIO_CAMBIA_ESTADO'],
  },
];

const StampInvInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ELABORADO: {
      return <InnerMenu id={item.id} status={item.status} options={menuListElaborado} onMenuClick={handleClickMenu} />;
    }
    case statusName.PENDIENTE: {
      return <InnerMenu id={item.id} status={item.status} options={Autorizar} onMenuClick={handleClickMenu} />;
    }
    case statusName.AUTORIZADO: {
      if (item.request_type === RequestType.SALIDA) {
        return <InnerMenu id={item.id} status={item.status} options={[...Ver, reIngreso]} onMenuClick={handleClickMenu} />;
      }
      return <InnerMenu id={item.id} status={item.status} options={Ver} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default StampInvInnerMenu;
