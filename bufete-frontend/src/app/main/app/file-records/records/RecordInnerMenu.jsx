import React from 'react';
import { statusName } from 'app/constants/appConstant';
import InnerMenu from 'app/main/shared/InnerMenu';

const cambioEstado = {
  name: 'Cambio de Estado',
  link: '#1',
  auth: ['USUARIO_ADMIN', 'EXPEDIENTE_CAMBIA_ESTADO'],
};

const menuVer = {
  name: 'Ver',
  link: '/apps/file-records/records/:id',
  auth: ['USUARIO_ADMIN', 'EXPEDIENTE_LECTURA'],
};

const menuListElaborado = [
  {
    name: 'Editar',
    link: '/apps/file-records/records/:id',
    auth: ['USUARIO_ADMIN', 'EXPEDIENTE_EDITA'],
  },
];

const menuCombinado = [
  {
    name: 'Combinar Expediente',
    link: 'mergeRecordFile',
    auth: ['USUARIO_ADMIN'],
  },
];

const menuListAutorizado = [
  {
    name: 'Documentos',
    link: '#2',
    auth: ['USUARIO_ADMIN', 'DOCUMENTO_LECTURA'],
  },
];

const RecordInnerMenu = (item, handleClickMenu) => {
  switch (item.status) {
    case statusName.ELABORADO: {
      return (
        <InnerMenu id={item.id} status={item.status} options={[...menuListElaborado, ...menuCombinado, cambioEstado]} onMenuClick={handleClickMenu} />
      );
    }
    case statusName.PENDIENTE: {
      return (
        <InnerMenu
          id={item.id}
          status={item.status}
          options={[...menuCombinado, { ...cambioEstado, auth: ['USUARIO_ADMIN', 'EXPEDIENTE_AUTORIZA_RECHAZA'] }]}
          onMenuClick={handleClickMenu}
        />
      );
    }
    case statusName.AUTORIZADO: {
      return (
        <InnerMenu
          id={item.id}
          status={item.status}
          options={[menuVer, ...menuListAutorizado, ...menuCombinado, { ...cambioEstado, auth: ['USUARIO_ADMIN', 'EXPEDIENTE_AUTORIZA_RECHAZA'] }]}
          onMenuClick={handleClickMenu}
        />
      );
    }
    case statusName.CERRADO: {
      return <InnerMenu id={item.id} status={item.status} options={[menuVer, ...menuListAutorizado]} onMenuClick={handleClickMenu} />;
    }
    default:
      return <div />;
  }
};

export default RecordInnerMenu;
