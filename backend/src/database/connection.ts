import knex from 'knex';

const configuration = require('../../knexfile');

const getConfig = (env: string | undefined) => {
  switch (env) {
    case 'test':
      return configuration.test;
    case 'production':
      return configuration.production;
    default:
      return configuration.development;
  }
};

let config = getConfig(process.env.NODE_ENV);

const connection = knex(config);

export default connection;
