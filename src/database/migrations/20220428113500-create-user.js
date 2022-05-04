'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      Code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      FirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING,
        Unique: true
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ProfileImage: {
        type: Sequelize.STRING
      },
      RoleID: {
        type: Sequelize.SMALLINT,
        defaultValue: 1,
        comment: '1:Customer, 2:Librarian, 3:ADMIN'
      },
      Status: {
        type: Sequelize.SMALLINT,
        defaultValue: 0,
        comment: '0:Inactive, 1:Active, 2:Block'
      },
      Note: {
        type: Sequelize.STRING
      },
      Token: {
        type: Sequelize.STRING
      },
      UpdateUserID: {
        type: Sequelize.INTEGER
      },
      LastLoginAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
    }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};