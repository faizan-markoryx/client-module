const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ContactNote = sequelize.define(
  "ContactNote", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  contactId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  noteSource: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "0: Incoming, 1: Outgoing",
    // get() {
    //   const noteSource = this.getDataValue('noteSource');
    //   return noteSource == 0 ? "Incoming" : noteSource == 1 ? "Outgoing" : "";
    // } // Currently Not required
  },
  nextFollowUpDateTime: {
    type: DataTypes.STRING,
    defaultValue: "",
    allowNull: true,
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedBy: {
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
    // Other model options go here
  }
);

module.exports = ContactNote;
