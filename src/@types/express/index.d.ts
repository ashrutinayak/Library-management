import { json } from "sequelize";

declare global {
  namespace Express {
    interface Response {
      successResponse: json;
      failResponse: json;
    }
  }
}
