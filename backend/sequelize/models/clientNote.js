const { Sequelize } = require('sequelize')
const sequelize = require("../config/sequelize");

const ClientNote = sequelize.define(
    "ClientNotes",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        clientId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        note: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }
) 

module.exports = ClientNote;    