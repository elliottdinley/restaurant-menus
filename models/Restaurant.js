const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
// const { Model } = require('sequelize');

const Restaurant = sequelize.define("Restaurant", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
});

// class Restaurant extends Model {};

// Restaurant.init({
//     name: DataTypes.STRING,
//     location: DataTypes.STRING,
//     cuisine: DataTypes.STRING
// }, {
//     sequelize,
//     modelName: 'Restaurant'
// });

module.exports = {
    Restaurant
};