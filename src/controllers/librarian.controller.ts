import { RequestHandler, Request, Response } from "express";
import httpStatusConstant from "../constants/httpStatusCode.constant";
import models from "../config/model.config";
import messageConstant from "../constants/message.constant";

const updateLibrarian: RequestHandler = async (req, res) => {
  try {
    req.body.ProfileImage = req.file?.filename;
    const updUser = await models.User.update(
      {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ProfileImage: req.body.ProfileImage,
        UpdateUserID: req.body.UserID,
      },
      { where: { id: req.body.UserID } }
    );
    if (updUser) {
      return res.successResponse(
        httpStatusConstant.UPDATED,
        messageConstant.userUpdated
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

export default {
  updateLibrarian,
};
