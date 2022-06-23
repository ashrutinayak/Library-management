import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import messageConstant from "../constants/message.constant";
import models from "../config/model.config";
import httpStatusConstant from "../constants/httpStatusCode.constant";

const ROLE = {
  Customer: 1,
  Librarian: 2,
  Admin: 3,
};

const Validate_User = (userRole: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerHeader = req.headers["authorization"];
      if (!bearerHeader) {
        return res.failResponse(
          httpStatusConstant.NOT_FOUND,
          messageConstant.tokenNotFound
        );
      }
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      const decodedtoken: any = jwt.verify(token, process.env.SECRET_KEY!);
      if (!decodedtoken) {
        return res.failResponse(
          httpStatusConstant.INVALID_TOKEN,
          messageConstant.invalidToken
        );
      }
      const { userEmail } = decodedtoken;
      const findUser = await models.User.findOne({
        where: { Email: userEmail },
      });
      if (
        findUser &&
        (findUser.RoleID === userRole[0] ||
          findUser.RoleID === userRole[1] ||
          findUser.RoleID === userRole[2])
      ) {
        req.body.UserID = findUser.id;
        next();
      } else {
        return res.failResponse(
          httpStatusConstant.UNAUTHORIZED,
          messageConstant.unauthorizedUser
        );
      }
    } catch (error) {
      console.log(error);
      res.failResponse(httpStatusConstant.INTERNAL_SERVER_ERROR, null, {
        error: error,
      });
    }
  };
};
export default {
  Validate_User,
  ROLE,
};
