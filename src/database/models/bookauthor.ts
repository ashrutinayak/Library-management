import { Unique } from "sequelize-typescript"

const bookAuthorModel = (sequelize: any, DataTypes: any) => {
    const bookAuthor = sequelize.define(
      'bookAuthor',
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
    return bookAuthor
  }
  
  export default bookAuthorModel