const privileges = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    children: [
      {
        value: 'dashboard_inicial',
        label: 'Dashboard',
        children: [
          {
            value: '2',
            label: 'DASHBOARD_MENU',
          },
        ],
      },
    ],
  },
  {
    value: 'config',
    label: 'Configuración',
    children: [
      {
        value: 'usuarios',
        label: 'Usuarios',
        children: [
          {
            value: '4',
            label: 'USUARIO_MENU',
          },
          {
            value: '5',
            label: 'USUARIO_LECTURA',
          },
          {
            value: '6',
            label: 'USUARIO_CREA',
          },
          {
            value: '7',
            label: 'USUARIO_MODIFICA',
          },
          {
            value: '8',
            label: 'USUARIO_ELIMINA',
          },
          {
            value: '9',
            label: 'USUARIO_ASIGNA_ROL',
          },
          {
            value: '10',
            label: 'USUARIO_ASIGNA',
          },
          {
            value: '79',
            label: 'USUARIO_RESETEA',
          },
          {
            value: '99',
            label: 'USUARIO_LISTADO_EMPLEADOS',
          },
        ],
      },
      {
        value: 'roles',
        label: 'Roles',
        children: [
          {
            value: '11',
            label: 'ROL_MENU',
          },
          {
            value: '12',
            label: 'ROL_LECTURA',
          },
          {
            value: '13',
            label: 'ROL_CREA',
          },
          {
            value: '14',
            label: 'ROL_MODIFICA',
          },
          {
            value: '15',
            label: 'ROL_ELIMINA',
          },
        ],
      },
    ],
  },
  {
    value: 'file-records',
    label: 'Expedientes',
    children: [
      {
        value: 'clientes',
        label: 'Clientes',
        children: [
          {
            value: '31',
            label: 'CLIENTE_MENU',
          },
          {
            value: '32',
            label: 'CLIENTE_LECTURA',
          },
          {
            value: '33',
            label: 'CLIENTE_CREA',
          },
          {
            value: '34',
            label: 'CLIENTE_ELIMINA',
          },
        ],
      },
      {
        value: 'empleados',
        label: 'Empleados',
        children: [
          {
            value: '35',
            label: 'EMPLEADO_MENU',
          },
          {
            value: '36',
            label: 'EMPLEADO_LECTURA',
          },
          {
            value: '37',
            label: 'EMPLEADO_CREA',
          },
          {
            value: '38',
            label: 'EMPLEADO_ELIMINA',
          },
        ],
      },
      {
        value: 'expedientes',
        label: 'Expedientes',
        children: [
          {
            value: '39',
            label: 'EXPEDIENTE_MENU',
          },
          {
            value: '40',
            label: 'EXPEDIENTE_LECTURA',
          },
          {
            value: '41',
            label: 'EXPEDIENTE_CREA',
          },
          {
            value: '84',
            label: 'EXPEDIENTE_EDITA',
          },
          {
            value: '42',
            label: 'EXPEDIENTE_CAMBIA_ESTADO',
          },
          {
            value: '43',
            label: 'EXPEDIENTE_AUTORIZA_RECHAZA',
          },
          {
            value: '87',
            label: 'EXPEDIENTE_TIPO_LISTA',
          },
          {
            value: '88',
            label: 'EXPEDIENTE_SUBTIPO_LISTA',
          },
          {
            value: '100',
            label: 'EXPEDIENTE_LISTADO_CLIENTES',
          },
          {
            value: '101',
            label: 'EXPEDIENTE_LISTADO_EMPLEADOS',
          },
        ],
      },
      {
        value: 'documentos',
        label: 'Documentos',
        children: [
          {
            value: '54',
            label: 'DOCUMENTO_MENU',
          },
          {
            value: '55',
            label: 'DOCUMENTO_LECTURA',
          },
          {
            value: '56',
            label: 'DOCUMENTO_CREA',
          },
          {
            value: '57',
            label: 'DOCUMENTO_ELIMINA',
          },
        ],
      },
      {
        value: 'expediente_actividad',
        label: 'Actividades de Expedientes',
        children: [
          {
            value: '58',
            label: 'EXPEDIENTE_ACTIVIDAD_MENU',
          },
          {
            value: '59',
            label: 'EXPEDIENTE_ACTIVIDAD_LECTURA',
          },
          {
            value: '60',
            label: 'EXPEDIENTE_ACTIVIDAD_CREA',
          },
          {
            value: '61',
            label: 'EXPEDIENTE_ACTIVIDAD_ELIMINA',
          },
          {
            value: '102',
            label: 'EXPEDIENTE_ACTIVIDAD_LISTADO',
          },
          {
            value: '103',
            label: 'EXPEDIENTE_ACTIVIDAD_LISTADO_INSTITUCION',
          },
          {
            value: '104',
            label: 'EXPEDIENTE_ACTIVIDAD_LISTADO_EMPLEADOS',
          },
          {
            value: '105',
            label: 'EXPEDIENTE_ACTIVIDAD_LISTADO_EXPEDIENTES',
          },
        ],
      },
      {
        value: 'agenda_procurador',
        label: 'Agenda de procurador',
        children: [
          {
            value: '62',
            label: 'AGENDA_PROCURADOR_MENU',
          },
          {
            value: '63',
            label: 'AGENDA_PROCURADOR_LECTURA',
          },
          {
            value: '64',
            label: 'AGENDA_PROCURADOR_CREA',
          },
          {
            value: '80',
            label: 'AGENDA_PROCURADOR_EDITA',
          },
          {
            value: '65',
            label: 'AGENDA_PROCURADOR_ELIMINA',
          },
          {
            value: '81',
            label: 'AGENDA_PROCURADOR_LIQUIDA',
          },
          {
            value: '82',
            label: 'AGENDA_PROCURADOR_CAMBIO_ESTADO',
          },
          {
            value: '83',
            label: 'AGENDA_PROCURADOR_AUTORIZA',
          },
        ],
      },
      {
        value: 'agenda_liquidacion',
        label: 'Liquidación de Agenda',
        children: [
          {
            value: '66',
            label: 'AGENDA_LIQUIDACION_MENU',
          },
          {
            value: '67',
            label: 'AGENDA_LIQUIDACION_LECTURA',
          },
          {
            value: '68',
            label: 'AGENDA_LIQUIDACION_CREA',
          },
          {
            value: '69',
            label: 'AGENDA_LIQUIDACION_ELIMINA',
          },
        ],
      },
    ],
  },
  {
    value: 'inventory',
    label: 'Inventario',
    children: [
      {
        value: 'timbre_fiscal',
        label: 'Timbre Fiscal',
        children: [
          {
            value: '75',
            label: 'PRODUCTO_MENU',
          },
          {
            value: '76',
            label: 'PRODUCTO_LECTURA',
          },
          {
            value: '77',
            label: 'PRODUCTO_CREA',
          },
          {
            value: '78',
            label: 'PRODUCTO_ELIMINA',
          },
        ],
      },
      {
        value: 'timbre_fiscal_inv',
        label: 'Inventario Timbre Fiscal',
        children: [
          {
            value: '70',
            label: 'TIMBRE_FISCAL_INVENTARIO_MENU',
          },
          {
            value: '71',
            label: 'TIMBRE_FISCAL_INVENTARIO_LECTURA',
          },
          {
            value: '72',
            label: 'TIMBRE_FISCAL_INVENTARIO_CREA',
          },
          {
            value: '73',
            label: 'TIMBRE_FISCAL_INVENTARIO_ELIMINA',
          },
          {
            value: '74',
            label: 'TIMBRE_FISCAL_INVENTARIO_CAMBIA_ESTADO',
          },
          {
            value: '85',
            label: 'TIMBRE_FISCAL_INVENTARIO_AUTORIZA',
          },
          {
            value: '106',
            label: 'TIMBRE_FISCAL_INVENTARIO_LISTADO_EXPEDIENTES',
          },
          {
            value: '107',
            label: 'TIMBRE_FISCAL_INVENTARIO_LISTADO_PRODUCTO',
          },
          {
            value: '108',
            label: 'TIMBRE_FISCAL_INVENTARIO_LISTADO_EMPLEADOS',
          },
        ],
      },
    ],
  },
  {
    value: 'receipts',
    label: 'Facturación',
    children: [
      {
        value: 'expenses',
        label: 'Documento de Gastos',
        children: [
          {
            value: '119',
            label: 'DOCUMENTOS_GASTOS_MENU',
          },
          {
            value: '120',
            label: 'DOCUMENTOS_GASTOS_LECTURA',
          },
          {
            value: '121',
            label: 'DOCUMENTOS_GASTOS_CREA',
          },
          {
            value: '122',
            label: 'DOCUMENTOS_GASTOS_CAMBIA_ESTADO',
          },
          {
            value: '123',
            label: 'DOCUMENTOS_GASTOS_PROVEEDORES',
          },
          {
            value: '124',
            label: 'DOCUMENTOS_GASTOS_CONCEPTOS',
          },
          {
            value: '125',
            label: 'DOCUMENTOS_GASTOS_LISTADO_EXPEDIENTES',
          },
        ],
      },
      {
        value: 'receipt-settlements',
        label: 'Liquidación de Facturas',
        children: [
          {
            value: '126',
            label: 'LIQUIDACION_FACTURA_MENU',
          },
          {
            value: '127',
            label: 'LIQUIDACION_FACTURA_LECTURA',
          },
          {
            value: '128',
            label: 'LIQUIDACION_FACTURA_CREA',
          },
          {
            value: '129',
            label: 'LIQUIDACION_FACTURA_CAMBIA_ESTADO',
          },
          {
            value: '130',
            label: 'LIQUIDACION_FACTURA_AUTORIZA',
          },
          {
            value: '131',
            label: 'LIQUIDACION_FACTURA_GENERAR_REPORTE',
          },
          {
            value: '132',
            label: 'LIQUIDACION_FACTURA_GENERAR_FACTURA',
          },
          {
            value: '133',
            label: 'LIQUIDACION_FACTURA_LISTADO_CLIENTES',
          },
        ],
      },
      {
        value: 'receipt',
        label: 'Facturación',
        children: [
          {
            value: '134',
            label: 'FACTURA_MENU',
          },
          {
            value: '135',
            label: 'FACTURA_LECTURA',
          },
          {
            value: '136',
            label: 'FACTURA_CREA',
          },
          {
            value: '137',
            label: 'FACTURA_CAMBIA_ESTADO',
          },
          {
            value: '138',
            label: 'FACTURA_AUTORIZA',
          },
          {
            value: '139',
            label: 'FACTURA_GENERAR_REPORTE',
          },
          {
            value: '140',
            label: 'FACTURA_GENERAR_FACTURA',
          },
          {
            value: '141',
            label: 'FACTURA_LISTADO_CLIENTES',
          },
          {
            value: '142',
            label: 'FACTURA_LISTADO_DIRECCIONES',
          },
          {
            value: '148',
            label: 'REPORTES_FACTURA_MENU',
          },
          {
            value: '149',
            label: 'LISTADO_FACTURA_MENU',
          },
        ],
      },
    ],
  },
  {
    value: 'catalogs',
    label: 'Catálogos',
    children: [
      {
        value: 'actividades',
        label: 'Actividades',
        children: [
          {
            value: '44',
            label: 'ACTIVIDAD_MENU',
          },
          {
            value: '45',
            label: 'ACTIVIDAD_LECTURA',
          },
          {
            value: '46',
            label: 'ACTIVIDAD_CREA',
          },
          {
            value: '47',
            label: 'ACTIVIDAD_MODIFICA',
          },
          {
            value: '48',
            label: 'ACTIVIDAD_ELIMINA',
          },
        ],
      },
      {
        value: 'instituciones',
        label: 'Instituciones',
        children: [
          {
            value: '49',
            label: 'INSTITUTION_MENU',
          },
          {
            value: '50',
            label: 'INSTITUTION_LECTURA',
          },
          {
            value: '51',
            label: 'INSTITUTION_CREA',
          },
          {
            value: '52',
            label: 'INSTITUTION_MODIFICA',
          },
          {
            value: '53',
            label: 'INSTITUTION_ELIMINA',
          },
        ],
      },
      {
        value: 'provider',
        label: 'Proveedores',
        children: [
          {
            value: '109',
            label: 'PROVEEDOR_MENU',
          },
          {
            value: '110',
            label: 'PROVEEDOR_LECTURA',
          },
          {
            value: '111',
            label: 'PROVEEDOR_CREA',
          },
          {
            value: '112',
            label: 'PROVEEDOR_MODIFICA',
          },
          {
            value: '113',
            label: 'PROVEEDOR_ELIMINA',
          },
        ],
      },
      {
        value: 'concepts',
        label: 'Concepto',
        children: [
          {
            value: '114',
            label: 'CONCEPTO_MENU',
          },
          {
            value: '115',
            label: 'CONCEPTO_LECTURA',
          },
          {
            value: '116',
            label: 'CONCEPTO_CREA',
          },
          {
            value: '117',
            label: 'CONCEPTO_MODIFICA',
          },
          {
            value: '118',
            label: 'CONCEPTO_ELIMINA',
          },
        ],
      },
    ],
  },
];

export default privileges;
