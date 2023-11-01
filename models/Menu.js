const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Menu = sequelize.define('Menu', {
    title: DataTypes.STRING
})

module.exports = {
    Menu
};