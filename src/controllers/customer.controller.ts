import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt from "jsonwebtoken";
import messageConstant from "../constants/message.constant";
import httpStatusConstant from "../constants/httpStatusCode.constant";
import bcrypt from "bcrypt";
import { createData, createToken, transporter } from "../helpers/mail.helper";
require("dotenv").config();

const salt: number = 10;
const createCustomer: RequestHandler = async (req, res) => {
  req.body.ProfileImage = req.file?.filename;
  req.body.RoleID = 1;
  req.body.Status = 0;
  req.body.Code = `CU_${Date.now()}_${Math.floor(Math.random() * 10000)}`; //"CU_"+Date.now()+Math.floor(Math.random()*10000);
  const confirm = req.body.Password === req.body.Confirm_Password;
  if (!confirm) {
    return res.json({ message: messageConstant.passwordNotMatch });
  } else {
    try {
      const alreadyExist = await models.User.findOne({
        where: { Email: req.body.Email },
      });
      if (alreadyExist) {
        return res.failResponse(
          httpStatusConstant.BAD_REQUEST,
          messageConstant.emailAlreadyRegistered
        );
      } else {
        req.body.Password = await bcrypt.hash(req.body.Password, salt);
        const newCust = await models.User.create(req.body);
        if (newCust) {
          const token = createToken(
            newCust.Email,
            process.env.JWT_ACC_ACTIVATE!
          );
          const data = createData(
            newCust.Email,
            token,
            "Account Activation",
            `<a href = "${process.env.CLIENT_URL}/v1/customer/activate/${token}">Please click Here to Activate Your Account</a>`
          );
          transporter.sendMail(data, function (error, body) {
            if (error) {
              return res.failResponse(httpStatusConstant.BAD_REQUEST, null, {
                error: error,
              });
            }
          });
          return res.successResponse(
            httpStatusConstant.OK,
            messageConstant.emailtoActivateAccount
          );
        }
      }
    } catch (error) {
      console.log(error);
      res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
        error: error,
      });
    }
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const allUser = await models.User.findAll();
    return res.successResponse(httpStatusConstant.OK, null, { Users: allUser });
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const activateAccount: RequestHandler = async (req, res) => {
  const { token } = req.params;
  try {
    const decodedtoken: any = jwt.verify(token, process.env.JWT_ACC_ACTIVATE!);
    const { userEmail } = decodedtoken;
    const user = await models.User.findOne({ where: { Email: userEmail } });
    user.Status = 1;
    const updUser = await models.User.update(
      { Status: user.Status },
      { where: { Email: userEmail } }
    );
    if (updUser) {
      return res.successResponse(
        httpStatusConstant.OK,
        messageConstant.accountActivated
      );
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const updateCustomer: RequestHandler = async (req, res) => {
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

const forgotPassword: RequestHandler = async (req, res) => {
  const uEmail = req.body.Email;
  try {
    const find_User = await models.User.findOne({
      where: { Email: req.body.Email },
    });
    if (!find_User) {
      return res.failResponse(
        httpStatusConstant.NOT_FOUND,
        messageConstant.noUserFound
      );
    }
    const token = createToken(uEmail, process.env.FORGOT_PASSWORD);
    const updUser = await models.User.update(
      { Token: token },
      { where: { Email: uEmail } }
    );
    const data = createData(
      uEmail,
      token,
      "Reset Password",
      `<a href = "${process.env.CLIENT_URL}/v1/customer/reset_Password/${token}">Please click Here to Reset Your Password</a>`
    );
    transporter.sendMail(data, function (error, body) {
      if (error)
        return res.failResponse(httpStatusConstant.BAD_GATEWAY, null, {
          error: error,
        });
    });
    return res.successResponse(
      httpStatusConstant.OK,
      messageConstant.resetLinksend
    );
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const resetPassword: RequestHandler = async (req, res) => {
  const token = req.params.token;
  try {
    const decodedtoken: any = jwt.verify(token, process.env.FORGOT_PASSWORD!);
    const { userEmail } = decodedtoken;
    const find_User = await models.User.findOne({
      where: { Email: userEmail },
    });
    if (req.body.newPassword !== req.body.confirmPassword) {
      res.failResponse(
        httpStatusConstant.BAD_REQUEST,
        messageConstant.passwordNotMatch
      );
    } else {
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
      const updateUser = await models.User.update(
        {
          Password: req.body.newPassword,
          UpdateUserID: find_User.id,
        },
        { where: { Email: userEmail } }
      );
      if (updateUser) {
        res.status(200).json({ message: messageConstant.passReset });
      }
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};

const customerIssueBookHistory: RequestHandler = async (req, res) => {
  try {
    const allBooks = await models.issuedBook.findAll({
      where: {
        customerUserID: req.body.UserID,
        status: req.body.status,
      },
      order: [["updatedAt", "DESC"]],
    });
    if (allBooks) {
      return res.successResponse(httpStatusConstant.OK, null, {
        Books: allBooks,
      });
    }
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
      error: error,
    });
  }
};
export default {
  createCustomer,
  getAllUsers,
  activateAccount,
  forgotPassword,
  resetPassword,
  updateCustomer,
  customerIssueBookHistory,
};
