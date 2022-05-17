'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('issuedBook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      renewIssuedBookID: {
        type: Sequelize.INTEGER
      },
      bookID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Book',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      customerUserID: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'User',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      librarianUserID: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'User',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      startDateTime: {
        type: Sequelize.DATE
      },
      endDateTime: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.SMALLINT,
        comment: '1:Issued, 2:Renew, 3:Submitted, 4:Lost'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('issuedBook');
  }
};