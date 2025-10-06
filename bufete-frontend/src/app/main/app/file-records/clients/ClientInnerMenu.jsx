import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const menuList = [
  {
    name: 'Editar',
    link: '/apps/file-records/clients/:id',
  },
  {
    name: 'Eliminar',
    link: '#1',
  },
  {
    name: 'Documentos',
    link: '#2',
  },
];

const ClientInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ACTIVO: {
      return <InnerMenu id={item.id} status={item.status} options={menuList} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default ClientInnerMenu;
