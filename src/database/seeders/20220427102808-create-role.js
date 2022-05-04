'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Role',
      [
        {
          id:1,
          Name: 'Customer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:2,
          Name: 'Librarian',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:3,
          Name: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
