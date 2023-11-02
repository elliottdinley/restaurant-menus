const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN
});

module.exports = {
    Item
};