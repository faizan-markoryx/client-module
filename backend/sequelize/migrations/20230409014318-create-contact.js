"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Contacts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reportingManagerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      contactTimeZone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alternateEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endClient: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      skillsSupported: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      standardComment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      leadStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      leadSource: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedInProfile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ownershipId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Contacts");
  },
};
