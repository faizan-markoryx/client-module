'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Clients", {
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
      note: {
        type: Sequelize.STRING,
        allowNull: true
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Clients")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
