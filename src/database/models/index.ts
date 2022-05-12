import { sumBy } from "lodash";
import BookModel from "./book";
import bookAuthorModel from "./bookauthor";
import bookCategoryModel from "./bookcategory";
import RoleModel from "./role";
import UserModel from "./user";
const db: any = {}

const models: any = {
  modelsInitialization: (sequelize: any, DataType: any) => {
      db.Role = RoleModel(sequelize,DataType);
      db.User = UserModel(sequelize,DataType);
      db.bookAuthor = bookAuthorModel(sequelize,DataType);
      db.bookCategory = bookCategoryModel(sequelize,DataType);
      db.Book = BookModel(sequelize,DataType);
      db.User.belongsTo(db.Role,{ foreignKey: 'RoleID' });
      //bookAuthor has many books
      db.bookAuthor.hasMany(db.Book,{ foreignKey: 'bookAuthorID' });
      //book belong to one Author
      db.Book.belongsTo(db.bookAuthor,{ foreignKey: 'bookAuthorID' });
      //bookCategory has many books
      db.bookCategory.hasMany(db.Book,{ foreignKey: 'bookCategoryID' });
      //book belongs to one category
      db.Book.belongsTo(db.bookCategory,{ foreignKey: 'bookCategoryID' });
      return db;
  }
}

export default models;