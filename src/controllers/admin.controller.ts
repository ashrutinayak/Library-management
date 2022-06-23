import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import messageConstant from "../constants/message.constant";
import bcrypt from "bcrypt";
import httpStatusConstant from "../constants/httpStatusCode.constant";

const salt: number = 10;

/**
 *
 *
 *
 * @param req
 * @param res
 * @returns
 */
const adminCreateLibrarian: RequestHandler = async (req, res) => {
  try {
    req.body.ProfileImage = req.file?.filename;
    req.body.RoleID = 2;
    req.body.Status = 1;
    req.body.Code = `LU_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    req.body.Password = await bcrypt.hash(req.body.Password, salt);
    req.body.UpdateUserID = req.body.UserID;
    const newLib = await models.User.create(req.body);
    if (newLib) {
      return res.successResponse(
        httpStatusConstant.CREATED,
        messageConstant.newUserCreated,
        { user: newLib }
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const adminUpdateLibrarian: RequestHandler = async (req, res) => {
  const upID = parseInt(req.params.ID);
  try {
    const libUser = await models.User.findOne({ where: { id: upID } });
    if (libUser.RoleID != 2) {
      res.status(400).json({ message: messageConstant.notLibrarian });
    }
    req.body.UpdateUserID = req.body.updater_ID;
    req.body.ProfileImage = req.file?.originalname;
    const updUser = await models.User.update(
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ProfileImage: req.body.ProfileImage,
        UpdateUserID: req.body.UserID,
        Status: req.body.Status,
      },
      { where: { id: upID } }
    );
    res.successResponse(
      httpStatusConstant.UPDATED,
      messageConstant.userUpdated
    );
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const adminDeleteLibrarian: RequestHandler = async (req, res) => {
  const delID = req.params.ID;

  try {
    const libUser = await models.User.findOne({ where: { id: delID } });
    if (libUser.RoleID != 2) {
      res.status(400).json({ message: messageConstant.notLibrarian });
    }
    const delUser = await models.User.update(
      {
        deletedAt: new Date(),
        UpdateUserID: req.body.UserID,
      },
      { where: { id: delID } }
    );
    return res.successResponse(
      httpStatusConstant.OK,
      messageConstant.userDeleted
    );
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const adminGetAllLibrarian: RequestHandler = async (req, res) => {
  try {
    const AllUser = await models.User.findAll({ where: { RoleID: 2 } });
    return res.successResponse(httpStatusConstant.OK, null, { AllUser });
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const updateAdmin: RequestHandler = async (req, res) => {
  try {
    req.body.ProfileImage = req.file?.originalname;
    const updatedUser = await models.User.update(
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ProfileImage: req.body.ProfileImage,
        UpdateUserID: req.body.UserID,
      },
      { where: { id: req.body.UserID } }
    );
    if (updatedUser) {
      return res.successResponse(
        httpStatusConstant.UPDATED,
        messageConstant.userUpdated,
        { user: updatedUser }
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

export default {
  adminCreateLibrarian,
  adminUpdateLibrarian,
  adminDeleteLibrarian,
  adminGetAllLibrarian,
  updateAdmin,
};
