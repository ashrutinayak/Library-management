
const issuedBookModel = (sequelize: any, DataTypes: any) => {
    const issuedBook = sequelize.define(
      'issuedBook',
      {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          renewIssuedBookID: {
            type: DataTypes.INTEGER
          },
          bookID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model:'Book',
              key:'id'
            },
            onDelete: 'CASCADE'
          },
          customerUserID: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
              model:'User',
              key:'id'
            },
            onDelete: 'CASCADE'
          },
          librarianUserID: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
              model:'User',
              key:'id'
            },
            onDelete: 'CASCADE'
          },
          startDateTime: {
            type: DataTypes.DATEONLY
          },
          endDateTime: {
            type: DataTypes.DATEONLY
          },
          submitDateTime:{
            type: DataTypes.DATEONLY
          },
          status: {
            type: DataTypes.SMALLINT,
            comment: '1:Issued, 2:Renew, 3:Submitted, 4:Lost'
          }
      },
      {
        timestamps: true
      }
    )
    return issuedBook
  }
  
  export default issuedBookModel