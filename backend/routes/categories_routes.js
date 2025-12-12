import express from "express";
import AddCategory from "../controllers/categories_controller/add_categories.js";
import Editcategories from "../controllers/categories_controller/edit_categories.js";
import Showcategories from "../controllers/categories_controller/show_categories.js";
import Removecategories from "../controllers/categories_controller/remove_categories.js";
import Getallcategories from "../controllers/categories_controller/all_categories.js";

const router = express.Router();

router.post("/addcategories", AddCategory);
router.put("/editcategories/:categoryUpdateId", Editcategories);
router.get("/showcategories/:categoryShowId", Showcategories);
router.delete("/removecategories/:categoryRemoveId", Removecategories);
router.get("/getallcategories", Getallcategories);

export default router;
