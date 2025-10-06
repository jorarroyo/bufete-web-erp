const baseUrl = process.env.REACT_APP_API_BASE_URL;
const baseUrlFEL = process.env.REACT_APP_API_BASE_URL_FEL;

module.exports = {
  basePath: '/',
  cors: {
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Correlation-Id, T-Session-Token',
    credentials: true,
  },
  getActiveCompanies: {
    baseUrl,
    endpoint: '/auth/companies',
  },
  getCompaniesList: {
    baseUrl,
    endpoint: '/company/list',
  },
  createCompany: {
    baseUrl,
    endpoint: '/company',
  },
  getRoles: {
    baseUrl,
    endpoint: '/roles',
  },
  getUsers: {
    baseUrl,
    endpoint: '/user',
  },
  getCurrency: {
    baseUrl,
    endpoint: '/currency',
  },
  authSignIn: {
    baseUrl,
    endpoint: '/auth/signin',
  },
  validateToken: {
    baseUrl,
    endpoint: '/auth/access-token',
  },
  getClients: {
    baseUrl,
    endpoint: '/clients',
  },
  getDeptoList: {
    baseUrl,
    endpoint: '/shared/deptos',
  },
  getCountryList: {
    baseUrl,
    endpoint: '/shared/countries',
  },
  getEmployees: {
    baseUrl,
    endpoint: '/employees',
  },
  getSharedCatList: {
    baseUrl,
    endpoint: '/shared/catalogs',
  },
  getRecordFiles: {
    baseUrl,
    endpoint: '/records',
  },
  getActivities: {
    baseUrl,
    endpoint: '/activity',
  },
  getInstitutions: {
    baseUrl,
    endpoint: '/institution',
  },
  getFiles: {
    baseUrl,
    endpoint: '/file-manager',
  },
  getCaseActivities: {
    baseUrl,
    endpoint: '/case_activity',
  },
  getStatus: {
    baseUrl,
    endpoint: '/status',
  },
  getProctorAgenda: {
    baseUrl,
    endpoint: '/proctor_agenda',
  },
  getActivitySettle: {
    baseUrl,
    endpoint: '/activity_settle',
  },
  getStampDuty: {
    baseUrl,
    endpoint: '/stamp_duty',
  },
  getProducts: {
    baseUrl,
    endpoint: '/product',
  },
  getStampInv: {
    baseUrl,
    endpoint: '/stamp_inv',
  },
  getRecordType: {
    baseUrl,
    endpoint: '/record_type',
  },
  getRecordSubType: {
    baseUrl,
    endpoint: '/record_subtype',
  },
  getProvider: {
    baseUrl,
    endpoint: '/provider',
  },
  getConcept: {
    baseUrl,
    endpoint: '/concept',
  },
  getExpense: {
    baseUrl,
    endpoint: '/expenses',
  },
  getReceiptSettlement: {
    baseUrl,
    endpoint: '/receipt_settlement',
  },
  getReceipts: {
    baseUrl,
    endpoint: '/receipt',
  },
  getClientAddressList: {
    baseUrl,
    endpoint: '/shared/addresses',
  },
  getInvoiceSeries: {
    baseUrl,
    endpoint: '/series',
  },
  getFELDocuments: {
    baseUrlFEL,
    endpoint: '/fel',
  },
  getNomenclature: {
    baseUrl,
    endpoint: '/nomenclatures',
  },
  getPaymentReceipts: {
    baseUrl,
    endpoint: '/payment_receipt',
  },
  getBanks: {
    baseUrl,
    endpoint: '/banks',
  },
  getTransactionTypes: {
    baseUrl,
    endpoint: '/trans_types',
  },
  logging: {
    prettyPrint: false,
    level: 'debug',
    stringify: false,
    humanReadableUnhandledException: false,
    json: true,
    colorize: false,
    timestamp: true,
  },
  debug: true,
};
