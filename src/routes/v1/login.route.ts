import express from "express";
import { celebrate } from "celebrate";
import loginController from "../../controllers/login.controller";
import loginSchema from "../../validations/login.validation";
const router: express.Router = express.Router();

const { loginUserSchema } = loginSchema;

router.post("/", celebrate(loginUserSchema), loginController.Login);

export = router;
