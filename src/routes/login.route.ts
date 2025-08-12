import express from "express";
import LoginController from "../controller/login.controller";

export const LoginRouter = express.Router();

//@ts-ignore
LoginRouter.post('/', LoginController.login);