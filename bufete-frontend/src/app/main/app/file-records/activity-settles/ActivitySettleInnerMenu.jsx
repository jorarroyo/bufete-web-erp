import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const options = [
  {
    name: 'Editar',
    link: '/apps/file-records/activity-settle/:proctorAgendaId/:id',
  },
  {
    name: 'Cambio de Estado',
    link: '#',
  },
];

const ActivitySettleInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ABIERTO: {
      return <InnerMenu id={item.id} status={item.status} options={options} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default ActivitySettleInnerMenu;
