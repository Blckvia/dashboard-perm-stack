const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'test_db',
  'postgres',
  `${process.env.PSQL_PASSWORD}`,
  { dialect: 'postgres', host: 'localhost' }
);

module.exports = sequelize;
