import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const menuListActivo = [
  {
    name: 'Asignar roles',
    link: '#Edit',
  },
  {
    name: 'Cambiar Clave',
    link: '#Reset',
  },
  {
    name: 'Eliminar',
    link: '#Delete',
  },
];

const UsersInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
      case statusName.ACTIVO: {
        return <InnerMenu id={item.id} status={item.status} options={menuListActivo} onMenuClick={handleClickMenu} />;
      }
      default:
        return <div />;
    }
};

export default UsersInnerMenu;
