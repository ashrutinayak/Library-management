
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          id:1,
          Code:'ADM001',
          FirstName:'ABC',
          LastName:'XYZ',
          Email:'tank.meena8@gmail.com',
          Password:'ADMIN12345',
          ProfileImage:'hfdfkj',
          RoleID:3,
          Status:1,
          UpdateUserID:3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
