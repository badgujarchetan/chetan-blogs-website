import express from "express";
import { getuserData } from "../controller/User_controller.js";
const UserRoutes = express.Router();

UserRoutes.get("/get-user", getuserData);

export default UserRoutes;
