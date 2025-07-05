const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ContactLabel = sequelize.define(
  "ContactLabel", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  labelName: {
    type: DataTypes.STRING,
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
    tableName: "ContactLabels"
    // Other model options go here
  }
);

module.exports = ContactLabel;
