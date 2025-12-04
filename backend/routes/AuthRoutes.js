import express from "express";
const Authrouter = express.Router();
import {
  RegisterUser,
  LoginUser,
  GoogleLoginUser,
} from "../controller/Auth_controller.js";
Authrouter.post("/register", RegisterUser);
Authrouter.post("/login", LoginUser);
Authrouter.post("/google-login", GoogleLoginUser);
export default Authrouter;
