const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Contact = sequelize.define(
  "Contact", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reportingManagerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  contactTimeZone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  phone1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alternateEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endClient: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  skillsSupported: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  standardComment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  leadStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "New Lead"
  },
  leadSource: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedInProfile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ownershipId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
  {
    // Other model options go here
  }
);

module.exports = Contact;