const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const NotificationStatus = sequelize.define('NotificationStatus', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    noti_status: { type: DataTypes.STRING, allowNull: false },
    lang_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'lkp_noti_status',
    timestamps: false
});

module.exports = NotificationStatus;
