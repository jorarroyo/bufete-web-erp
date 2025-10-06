import React from 'react';
import clsx from 'clsx';
import { statusName } from 'app/constants/appConstant';
import _ from '@lodash';

export const orderStatuses = [
  {
    id: 1,
    name: statusName.ELABORADO,
    color: 'bg-blue text-white',
  },
  {
    id: 2,
    name: statusName.ACTIVO,
    color: 'bg-green text-white',
  },
  {
    id: 3,
    name: statusName.PENDIENTE,
    color: 'bg-orange text-black',
  },
  {
    id: 4,
    name: statusName.RECHAZADO,
    color: 'bg-purple text-white',
  },
  {
    id: 5,
    name: statusName.AUTORIZADO,
    color: 'bg-green-700 text-white',
  },
  {
    id: 6,
    name: 'Canceled',
    color: 'bg-pink text-white',
  },
  {
    id: 7,
    name: statusName.DELETED,
    color: 'bg-red text-white',
  },
  {
    id: 8,
    name: 'Payment error',
    color: 'bg-red-700 text-white',
  },
  {
    id: 9,
    name: statusName.RECALENDARIZAR,
    color: 'bg-purple-300 text-white',
  },
  {
    id: 10,
    name: statusName.ABIERTO,
    color: 'bg-blue text-white',
  },
  {
    id: 11,
    name: statusName.CERRADO,
    color: 'bg-blue-700 text-white',
  },
  {
    id: 12,
    name: statusName.TERMINADO,
    color: 'bg-green-800 text-white',
  },
  {
    id: 13,
    name: statusName.PROCESO,
    color: 'bg-purple-700 text-white',
  },
  {
    id: 14,
    name: statusName.SIN_MOVIMIENTO,
    color: 'bg-blue-800 text-white',
  },
  {
    id: 15,
    name: statusName.ELIMINADO,
    color: 'bg-gray-800 text-white',
  },
  {
    id: 16,
    name: statusName.IMPRESO,
    color: 'bg-blue-800 text-white',
  },
  {
    id: 17,
    name: statusName.FACTURADO,
    color: 'bg-blue-800 text-white',
  },
  {
    id: 18,
    name: statusName.REVISION,
    color: 'bg-green text-white',
  },
  {
    id: 19,
    name: statusName.ANULADO,
    color: 'bg-red text-white',
  },
  {
    id: 5,
    name: statusName.APLICADO,
    color: 'bg-green-700 text-white',
  },
  {
    id: 20,
    name: statusName.GENERADA,
    color: 'bg-blue-800 text-white',
  },
  {
    id: 21,
    name: statusName.EN_EDICION,
    color: 'bg-blue text-white',
  },
];

function StatusName({ name }) {
  return <div className={clsx('inline text-12 p-4 rounded truncate', _.find(orderStatuses, { name }).color)}>{name}</div>;
}

export default StatusName;
