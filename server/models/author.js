const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Author = sequelize.define('author', {
    author_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    death_age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rating: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Author;