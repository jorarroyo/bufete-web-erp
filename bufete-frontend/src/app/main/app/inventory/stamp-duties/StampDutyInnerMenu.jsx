import React from 'react';
import InnerMenu from 'app/main/shared/InnerMenu';

const menuListElaborado = [
  {
    name: 'Asignar',
    link: '#',
  },
];

const StampDutyInnerMenu = (item, handleClickMenu) => {
  return <InnerMenu id={item.id} status="" options={[...menuListElaborado]} onMenuClick={handleClickMenu} />;
};

export default StampDutyInnerMenu;
