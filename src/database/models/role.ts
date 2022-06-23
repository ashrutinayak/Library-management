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
