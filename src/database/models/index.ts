import RoleModel from "./role";
import UserModel from "./user";
const db: any = {}

const models: any = {
  modelsInitialization: (sequelize: any, DataType: any) => {
      db.Role = RoleModel(sequelize,DataType);
      db.User = UserModel(sequelize,DataType);
      return db;
  }
}

export default models;