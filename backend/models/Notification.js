const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Notification = sequelize.define('Notification', {
    noti_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cust_id: DataTypes.INTEGER,
    noti_type_id: DataTypes.INTEGER,
    noti_message: DataTypes.STRING,
    updated_date: DataTypes.DATE,
    noti_status_id: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN
}, {
    tableName: 'txn_noti',
    timestamps: false
});

module.exports = Notification;
