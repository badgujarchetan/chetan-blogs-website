import express from "express";
const Authrouter = express.Router();
import {
  RegisterUser,
  LoginUser,
  GoogleLoginUser,
  Logout,
} from "../controller/Auth_controller.js";
Authrouter.post("/register", RegisterUser);
Authrouter.post("/login", LoginUser);
Authrouter.post("/google-login", GoogleLoginUser);
Authrouter.get("/logout", Logout);
export default Authrouter;
