import { RequestHandler } from "express";
import httpStatusConstant from "../constants/httpStatusCode.constant";
import models from "../config/model.config";
import messageConstant from "../constants/message.constant";

const createBookCategory: RequestHandler = async (req, res) => {
  try {
    req.body.createdUserID = req.body.UserID;
    const newBook = await models.bookCategory.create(req.body);
    if (newBook) {
      return res.successResponse(
        httpStatusConstant.CREATED,
        messageConstant.categoryCreated,
        { category: newBook }
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};
const updateBookCategory: RequestHandler = async (req, res) => {
  try {
    const upID = req.params.id;
    const find_User = await models.bookCategory.findOne({
      where: { id: upID },
    });
    if (!find_User) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.nocategoryFoundwithid
      );
    }
    req.body.updateUserID = req.body.UserID;
    const updateCategory = await models.bookCategory.update(
      {
        name: req.body.name,
        description: req.body.description,
        updateUserID: req.body.updateUserID,
      },
      { where: { id: upID } }
    );
    if (updateCategory) {
      return res.successResponse(
        httpStatusConstant.UPDATED,
        messageConstant.categoryUpdated
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const deleteBookCategory: RequestHandler = async (req, res) => {
  const delID = req.params.id;

  try {
    const findCategory = await models.bookCategory.findOne({
      where: { id: delID },
    });
    if (!findCategory) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.nocategoryFoundwithid
      );
    }
    req.body.updateUserID = req.body.UserID;
    const delUser = await models.bookCategory.update(
      {
        deletedAt: new Date(),
        UpdateUserID: req.body.updateUserID,
      },
      { where: { id: delID } }
    );
    return res.successResponse(
      httpStatusConstant.OK,
      messageConstant.categoryDeleted
    );
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

const getAllBookCategory: RequestHandler = async (req, res) => {
  try {
    const allCategory = await models.bookCategory.findAll();
    return res.successResponse(httpStatusConstant.OK, null, {
      AllCategory: allCategory,
    });
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

export default {
  createBookCategory,
  updateBookCategory,
  deleteBookCategory,
  getAllBookCategory,
};
