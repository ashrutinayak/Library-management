import RoleModel from "./role";
import UserModel from "./user";
const db: any = {}

const models: any = {
  modelsInitialization: (sequelize: any, DataType: any) => {
      db.Role = RoleModel(sequelize,DataType);
      db.User = UserModel(sequelize,DataType);
      db.User.belongsTo(db.Role,{ foreignKey: 'RoleID' })
      return db;
  }
}

export default models;