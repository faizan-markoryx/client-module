const { Sequelize } = require("sequelize")
const sequelize = require("../config/sequelize")

const Client = sequelize.define(
    "Client",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        clientName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        websiteUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ownership: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        state: {
            type: Sequelize.STRING,
            allowNull: true
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true
        },
        industry: {
            type: Sequelize.STRING,
            allowNull: true
        },
        paymentTerm: {
            type: Sequelize.STRING,
            allowNull: true
        },
        category: {
            type: Sequelize.STRING,
            allowNull: true
        },
        clientStatus: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: "0: Negotiating, 1: Active, 2:In Active, 3:Add Additional"
        },
        document: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isContact: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    }
)

module.exports = Client;