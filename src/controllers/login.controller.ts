import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt from "jsonwebtoken";
import messageConstant from "../constants/message.constant";
import httpStatusConstant from "../constants/httpStatusCode.constant";
import bcrypt from "bcrypt";

const Login: RequestHandler = async (req, res) => {
  try {
    const findUser = await models.User.findOne({
      where: { Email: req.body.Email },
    });
    if (findUser && findUser.Status === 1) {
      // User must be in active state
      const isSame = await bcrypt.compare(
        req.body.Password,
        findUser.Password!
      );
      if (
        isSame ||
        (findUser.RoleID === 3 && req.body.Password === findUser.Password!)
      ) {
        const userEmail = req.body.Email;
        const token = jwt.sign({ userEmail }, process.env.SECRET_KEY!, {
          expiresIn: "24h",
        });
        findUser.Token = token;
        const updateUser = await models.User.update(
          { Token: findUser.Token, LastLoginAt: new Date() },
          { where: { Email: userEmail } }
        );
        if (updateUser) {
          return res.successResponse(
            httpStatusConstant.OK,
            messageConstant.loginSuccess,
            { accessToken: token }
          );
        }
      } else {
        return res.failResponse(
          httpStatusConstant.UNAUTHORIZED,
          messageConstant.unauthorizedUser
        );
      }
    }
    return res.failResponse(
      httpStatusConstant.NOT_FOUND,
      messageConstant.noUserFoundorActive
    );
  } catch (error) {
    console.log(error);
    res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, error);
  }
};

export default {
  Login,
};
