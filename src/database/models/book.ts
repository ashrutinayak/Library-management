import { Unique } from "sequelize-typescript"

const BookModel = (sequelize: any, DataTypes: any) => {
    const Book = sequelize.define(
      'Book',
      {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          code: {
            allowNull: false,
            type: DataTypes.STRING
          },
          name: {
            allowNull: false,
            type: DataTypes.STRING
          },
          description: {
            type: DataTypes.STRING
          },
          inStock: {
            type: DataTypes.INTEGER
          },
          bookAuthorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model:'bookAuthor',
              key:'id'
            },
          },
          bookCategoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model:'bookCategory',
              key:'id'
            },
          },
          createdUserID: {
            type: DataTypes.INTEGER
          },
          updatedUserID: {
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
            allowNull: true,
            type: DataTypes.DATE
          }
      },
      {
        timestamps: true,
        paranoid: true
      }
    )
    return Book
  }
  
  export default BookModel