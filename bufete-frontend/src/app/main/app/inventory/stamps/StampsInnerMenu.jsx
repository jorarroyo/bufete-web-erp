import React from 'react';
import InnerMenu from 'app/main/shared/InnerMenu';
import { statusName } from 'app/constants/appConstant';

const movimientos = [
  {
    name: 'Editar',
    link: 'editar',
  },
  {
    name: 'Movimientos',
    link: 'movimiento',
  },
];

const StampsInnerMenu = (item, handleClickMenu) => {
  return <InnerMenu id={item.id} status={statusName.ACTIVO} options={movimientos} onMenuClick={handleClickMenu} />;
};

export default StampsInnerMenu;
