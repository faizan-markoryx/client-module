const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        if (password) {
          const hashedPassword = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(Number(process.env.SALT))
          );
          this.setDataValue("password", hashedPassword);
        }
      },
    },
    role: {
      type: DataTypes.INTEGER,
      comment: "0: Admin, 1: Account Manager",
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      comment: "0: Deactive, 1: Active",
      defaultValue: false,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

// Define hooks to convert email to lowercase
User.beforeCreate((user) => {
  user.email = user.email.toLowerCase();
});

User.beforeFind((options) => {
  if (options.where && options.where.email) {
    options.where.email = options.where.email.toLowerCase();
  }
});

module.exports = User;
