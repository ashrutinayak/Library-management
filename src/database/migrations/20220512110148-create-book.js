'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      inStock: {
        type: Sequelize.INTEGER
      },
      bookAuthorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'bookAuthor',
          key:'id'
        },
      },
      bookCategoryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'bookCategory',
          key:'id'
        },
      },
      createdUserID: {
        type: Sequelize.INTEGER
      },
      updatedUserID: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Book');
  }
};