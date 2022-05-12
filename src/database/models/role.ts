// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Role extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Role.init({
//     Name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Role',
//   });
//   return Role;
// };
const RoleModel = (sequelize: any, DataTypes: any) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  )
  return Role
}

export default RoleModel
