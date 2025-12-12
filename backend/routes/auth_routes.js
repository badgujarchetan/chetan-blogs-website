import express from "express";
import registerController from "../controllers/Auth_controller/register_controller.js";
import loginController from "../controllers/Auth_controller/login_controller.js";

import logOutController from "../controllers/Auth_controller/logout_controller.js";
import { GoogleLogin } from "../controllers/Auth_controller/google_login_controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/googlelogin", GoogleLogin);
router.get("/logout", logOutController);

export default router;
