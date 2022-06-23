import { Request, Response, NextFunction } from "express";
import messageConstant from "../constants/message.constant";
import httpStatusConstant from "../constants/httpStatusCode.constant";
import apiStatusConstant from "../constants/apiStatus.constant";

const apiResponseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.successResponse = (
    code: number = httpStatusConstant.OK,
    message: string = null,
    data: any = null,
    statusCode: any = apiStatusConstant.success
  ) => {
    message = !message ? messageConstant.success : message;
    return res.status(code).json({ statusType: statusCode, message, data });
  };

  res.failResponse = (
    code: number = httpStatusConstant.BAD_REQUEST,
    message: string = messageConstant.fail,
    error: any = null,
    statusCode: string = apiStatusConstant.fail
  ) => {
    if (code === httpStatusConstant.INTERNAL_SERVER_ERROR) {
      message = messageConstant.internalServerError;
      if (error) {
        res.json(`Internal Server Error  ==>  ${error.message}`);
      }
      res.json(
        JSON.stringify({
          path: req.originalUrl,
          params: req.params,
          body: req.body,
          statusType: statusCode,
          message,
        })
      );
    }
    return res.status(code).json({ statusType: statusCode, message });
  };
  next();
};

export { apiResponseHandler };
