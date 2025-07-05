const { Sequelize } = require('sequelize')
const sequelize = require("../config/sequelize");

const ContactNoteRead = sequelize.define(
    "ContactNoteRead",
    {
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        createdBy:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        updatedBy:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        contactNoteId:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        isDone:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt:{
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt:{
            type: Sequelize.DATE,
            allowNull: false
        }
    }
)

module.exports = ContactNoteRead;