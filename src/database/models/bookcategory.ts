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