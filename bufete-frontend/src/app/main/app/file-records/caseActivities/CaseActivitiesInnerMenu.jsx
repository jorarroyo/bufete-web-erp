import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const menuListActivo = [
  {
    name: 'Editar',
    link: '#1',
    auth: ['USUARIO_ADMIN', 'EXPEDIENTE_ACTIVIDAD_CREA'],
  },
  {
    name: 'Eliminar',
    link: '#2',
    auth: ['USUARIO_ADMIN', 'EXPEDIENTE_ACTIVIDAD_ELIMINA'],
  },
];

const menuReasigna = {
  name: 'Reasignar Actividad',
  link: '#3',
  auth: ['USUARIO_ADMIN', 'EXPEDIENTE_ACTIVIDAD_CREA'],
};

const CaseActivitiesInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ACTIVO: {
      return <InnerMenu id={item.id} status={statusName.ACTIVO} options={menuListActivo} onMenuClick={handleClickMenu} />;
    }
    case statusName.FINALIZADO: {
      return <InnerMenu id={item.id} status={statusName.FINALIZADO} options={[menuReasigna]} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default CaseActivitiesInnerMenu;
