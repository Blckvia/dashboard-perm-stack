const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Books = sequelize.define(
  'book',
  {
    book_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    originally_published: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    isbn: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    raiting: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Books;
