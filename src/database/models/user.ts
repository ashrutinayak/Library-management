import { Unique } from "sequelize-typescript"

const UserModel = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        Code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        FirstName: {
            allowNull: false,
            type: DataTypes.STRING
          },
          LastName: {
            allowNull: false,
            type: DataTypes.STRING
          },
          Email: {
            allowNull: false,
            type: DataTypes.STRING,
            Unique: true
          },
          Password: {
            allowNull: false,
            type: DataTypes.STRING
          },
          ProfileImage: {
            type: DataTypes.STRING
          },
          RoleID: {
            type: DataTypes.SMALLINT,
            comment: '1:Customer, 2:Librarian, 3:ADMIN'
          },
          Status: {
            type: DataTypes.SMALLINT,
            comment: '0:Inactive, 1:Active, 2:Block'
          },
          Note: {
            type: DataTypes.STRING
          },
          Token: {
            type: DataTypes.STRING
          },
          UpdateUserID: {
            type: DataTypes.INTEGER
          },
          LastLoginAt: {
            type: DataTypes.DATE
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          deletedAt: {
            allowNull: true,
            type: DataTypes.DATE
        }
      },
      {
        timestamps: true,
        paranoid: true
      }
    )
    return User
  }
  
  export default UserModel