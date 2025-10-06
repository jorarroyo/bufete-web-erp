export const dialogConstants = {
  XS_WIDTH: 'xs',
  SM_WIDTH: 'sm',
  MD_WIDTH: 'md',
  LG_WIDTH: 'lg',
  XL_WIDTH: 'xl',
};

export const statusName = {
  ACTIVO: 'ACTIVO',
  DELETED: 'DELETED',
  PENDIENTE: 'PENDIENTE',
  ELABORADO: 'ELABORADO',
  AUTORIZADO: 'AUTORIZADO',
  RECHAZADO: 'RECHAZADO',
  TERMINADO: 'TERMINADO',
  ABIERTO: 'ABIERTO',
  CERRADO: 'CERRADO',
  PROCESO: 'PROCESO',
  SIN_MOVIMIENTO: 'SIN_MOVIMIENTO',
  RECALENDARIZAR: 'RECALENDARIZAR',
  FINALIZADO: 'FINALIZADO',
  ELIMINADO: 'ELIMINADO',
  FACTURADO: 'FACTURADO',
  IMPRESO: 'IMPRESO',
  ANULADO: 'ANULADO',
  REVISION: 'REVISION',
  APLICADO: 'APLICADO',
  EN_EDICION: 'EN_EDICION',
  GENERADA: 'GENERADA',
};

export const actionsName = {
  ENTRADA: 'ENTRADA',
  SALIDA: 'SALIDA',
};

export const productType = {
  TIMBRES: 'TIMBRES',
};

export const viewPermissions = ['readOnly'];
export const viewPermissionsName = {
  READ_ONLY: 'readOnly',
};

export const valueType = {
  CHAR: 'CHAR',
  INT: 'INT',
  LIST: 'LIST',
  URL: 'URL',
  YEAR: 'YEAR',
  DESIGNATION: 'DESIGNATION',
};

export const tableConstants = {
  DEFAULT_PAGE_SIZE: 50,
  DEFAULT_LOCALIZATION: {
    body: {
      emptyDataSourceMessage: 'No existen datos',
      addTooltip: 'Agregar',
      deleteTooltip: 'Eliminar',
      editRow: {
        cancelTooltip: 'Cancelar',
        saveTooltip: 'Guardar',
        deleteText: '¿Está seguro de eliminar el registro?',
      },
    },
    toolbar: {
      searchTooltip: 'Buscar....',
      searchPlaceholder: 'Buscar...',
    },
    header: {
      actions: 'Acciones',
    },
    pagination: {
      labelDisplayedRows: ' {from}-{to} de {count}',
      firstTooltip: 'Primera Página',
      previousTooltip: 'Página Anterior',
      nextTooltip: 'Siguiente Página',
      lastTooltip: 'Última Página',
      labelRowsSelect: 'filas',
    },
  },
};

export const loginConstant = {
  DEFAULT_COMPANY: 1,
};

export const RecordFileConstants = {
  RECORD_TYPE: 3,
  RECORD_SUBTYPE: 4,
};

export const EmployeesConstants = {
  LAWYER: 1,
  ADMON: 2,
};

export const AppId = {
  CLIENTES: 1,
  EMPLEADOS: 2,
  EXPEDIENTES: 3,
  AGENDA: 4,
  AGENDA_DETAIL: 5,
  INVENTARIO_TIMBRES: 6,
  LIQUIDACION_FACTURA: 7,
  DOCUMENTO_GASTO: 8,
  FACTURACION: 9,
  RECIBO_FACTURA: 10,
};

export const RequestType = {
  SOLICITUD: 21,
  SALIDA: 22,
  ENTRADA: 23,
};

export const StampType = {
  FISCAL: 7,
  NOTARIAL: 8,
  FORENSE: 9,
};

export const CaseActivityType = {
  HONORARIOS: 'HONORARIOS',
  PROCURACION: 'PROCURACION',
  REUNION: 'REUNION',
};

export const ReceiptSettlementType = {
  HONORARIOS: 'HONORARIOS',
  PROCURACION: 'PROCURACION',
  TIMBRES: 'TIMBRES',
  GASTOS: 'GASTOS',
  NO_AFECTOS: 'NO_AFECTOS',
  LIBRE: 'LIBRE',
  ANTICIPO: 'ANTICIPO',
  ISR: 'ISR',
};

export const ReceiptSettleEnumType = {
  LIQUIDACION: 'LIQUIDACION',
  LIBRE: 'LIBRE',
};
