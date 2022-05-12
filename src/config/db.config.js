require('dotenv').config();

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
        paranoid: false,
        timestamps: true,
        freezeTableName: true,
        underscored: false
      },
}
