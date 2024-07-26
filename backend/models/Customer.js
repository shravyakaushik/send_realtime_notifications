const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Customer = sequelize.define('Customer', {
    cust_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    pri_email: { type: DataTypes.STRING, allowNull: false },
    pri_phone: { type: DataTypes.STRING, allowNull: false },
    reg_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    address: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'mst_cust',
    timestamps: false
});

module.exports = Customer;
