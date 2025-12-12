import Category from "../../models/categories_model.js";
const Getallcategories = async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default Getallcategories;
