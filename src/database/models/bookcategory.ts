import { Unique } from "sequelize-typescript"

const bookCategoryModel = (sequelize: any, DataTypes: any) => {
    const bookCategory = sequelize.define(
      'bookCategory',
      {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
          },
          name: {
            allowNull: false,
            type: DataTypes.STRING
          },
          description: {
            type: DataTypes.STRING
          },
          createdUserID: {
            type: DataTypes.INTEGER
          },
          updateUserID: {
            type: DataTypes.INTEGER
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
            type: DataTypes.DATE
        }
      },
      {
        timestamps: true,
        paranoid: true
      }
    )
    return bookCategory
  }
  
  export default bookCategoryModel