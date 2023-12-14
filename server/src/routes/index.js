import express from "express";
const Router = express.Router();

import userApi from "./apis/user.api";

Router.use("/users", userApi);
export default Router;
