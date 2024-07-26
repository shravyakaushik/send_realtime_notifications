const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const NotificationType = sequelize.define('NotificationType', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    noti_type: { type: DataTypes.STRING, allowNull: false },
    lang_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'lkp_noti_type',
    timestamps: false
});

module.exports = NotificationType;
