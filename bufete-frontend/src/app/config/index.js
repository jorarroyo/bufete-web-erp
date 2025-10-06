const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./${env}`);

config.projectName = process.env.PROJECT_NAME;
config.env = env;
module.exports = config;
