import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const initialOptions = {
  name: 'Editar',
  link: '/apps/file-records/proctor-agenda/:id',
  auth: ['USUARIO_ADMIN', 'AGENDA_PROCURADOR_EDITA'],
};

const settleOption = {
    name: 'Liquidar',
    link: '/apps/file-records/proctor-agenda/:id',
    auth: ['USUARIO_ADMIN', 'AGENDA_PROCURADOR_LIQUIDA'],
  };
const reportOption = {
    name: 'Reporte de Actividades',
    link: '#2',
    auth: ['USUARIO_ADMIN', 'AGENDA_PROCURADOR_REPORTE'],
  };
const statusChange = {
  name: 'Cambio de Estado',
  link: '#1',
  auth: ['USUARIO_ADMIN', 'AGENDA_PROCURADOR_CAMBIO_ESTADO'],
};

const ProctorAgendaInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ABIERTO: {
      return <InnerMenu id={item.id} status={item.status} options={[ initialOptions, statusChange]} onMenuClick={handleClickMenu} />;
    }
    case statusName.PROCESO: {
      return (
        <InnerMenu
          id={item.id}
          status={item.status}
          options={[settleOption, reportOption, { ...statusChange, auth: ['USUARIO_ADMIN', 'AGENDA_PROCURADOR_AUTORIZA'] }]}
          onMenuClick={handleClickMenu}
        />
      );
    }
    case statusName.CERRADO: {
      return (
        <InnerMenu
          id={item.id}
          status={item.status}
          options={[reportOption]}
          onMenuClick={handleClickMenu}
        />
      );
    }
    default:
      return <div />;
  }
};

export default ProctorAgendaInnerMenu;
