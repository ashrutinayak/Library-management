"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        LastName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        Email: {
            allowNull: false,
            type: DataTypes.STRING,
            Unique: true
        },
        Password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        ProfileImage: {
            type: DataTypes.STRING
        },
        RoleID: {
            type: DataTypes.SMALLINT,
            defaultValue: 1,
            comment: '1:Customer, 2:Librarian, 3:ADMIN'
        },
        Status: {
            type: DataTypes.SMALLINT,
            defaultValue: 0,
            comment: '0:Inactive, 1:Active, 2:Block'
        },
        Note: {
            type: DataTypes.STRING
        },
        Token: {
            type: DataTypes.STRING
        },
        UpdateUserID: {
            type: DataTypes.INTEGER
        },
        LastLoginAt: {
            type: DataTypes.DATE
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
    }, {
        timestamps: true,
        paranoid: true
    });
    return User;
};
exports.default = UserModel;
