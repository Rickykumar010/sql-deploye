const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'nem104_b37',
  'root', 
  '123456', 
  {
    host: 'localhost', // Database host
    dialect: 'mysql', // Database dialect
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
