import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const cambioEstado = {
  name: 'Cambio de Estado',
  link: '#1',
  auth: ['USUARIO_ADMIN', 'DOCUMENTOS_GASTOS_CAMBIA_ESTADO'],
};

const menuListElaborado = [
  {
    name: 'Editar',
    link: '/apps/billing-process/expenses/:id',
    auth: ['USUARIO_ADMIN', 'DOCUMENTOS_GASTOS_CREA'],
  },
];

const menuListActivo = [
  {
    name: 'Ver',
    link: '/apps/billing-process/expenses/readOnly/:id',
    auth: ['USUARIO_ADMIN', 'DOCUMENTOS_GASTOS_LECTURA'],
  },
];

const ExpensesInnerMenu = (item, handleClickMenu) => {
    switch (item.status) {
      case statusName.ELABORADO: {
        return <InnerMenu
          id={item.id}
          status={item.status}
          options={[...menuListElaborado, cambioEstado]}
          onMenuClick={handleClickMenu} />;
      }
      case statusName.ACTIVO: {
        return <InnerMenu
          id={item.id}
          status={item.status}
          options={[...menuListActivo]}
          onMenuClick={handleClickMenu} />;
      }
    default:
      return <div />;
  }
};

export default ExpensesInnerMenu;