const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ContactNoteLabel = sequelize.define(
  "ContactNoteLabel", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  contactNoteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ContactNoteId'
  },
  contactLabelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
},
  {
    tableName: "ContactNoteLabel"
    // Other model options go here
  }
);

module.exports = ContactNoteLabel;
