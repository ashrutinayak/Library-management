import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import messageConstant from "../constants/message.constant";
import httpStatusConstant from "../constants/httpStatusCode.constant";

const createBookAuthor: RequestHandler = async (req, res) => {
  try {
    req.body.createdUserID = req.body.UserID;
    const newUser = await models.bookAuthor.create(req.body);
    if (newUser) {
      return res.successResponse(
        httpStatusConstant.CREATED,
        messageConstant.newUserCreated,
        { book_author: newUser }
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};
const updateBookAuthor: RequestHandler = async (req, res) => {
  try {
    const upID = req.params.id;
    const find_User = await models.bookAuthor.findOne({ where: { id: upID } });
    if (!find_User) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noUserFoundWithID
      );
    }
    req.body.updateUserID = req.body.UserID;
    const updateUser = await models.bookAuthor.update(
      {
        name: req.body.name,
        description: req.body.description,
        updateUserID: req.body.updateUserID,
      },
      { where: { id: upID } }
    );
    if (updateUser) {
      return res.successResponse(
        httpStatusConstant.UPDATED,
        messageConstant.userUpdated
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const deleteBookAuthor: RequestHandler = async (req, res) => {
  const delID = req.params.id;

  try {
    const User1 = await models.bookAuthor.findOne({ where: { id: delID } });
    if (!User1) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noUserFoundWithID
      );
    }
    req.body.updateUserID = req.body.UserID;
    const delUser = await models.bookAuthor.update(
      {
        deletedAt: new Date(),
        UpdateUserID: req.body.updateUserID,
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

const getAllBookAuthor: RequestHandler = async (req, res) => {
  try {
    const AllUser = await models.bookAuthor.findAll();
    return res.successResponse(httpStatusConstant.OK, null, { Users: AllUser });
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

export default {
  createBookAuthor,
  updateBookAuthor,
  deleteBookAuthor,
  getAllBookAuthor,
};
