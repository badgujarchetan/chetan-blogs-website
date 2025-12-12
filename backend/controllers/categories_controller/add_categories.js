import Category from "../../models/categories_model.js";

const AddCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const existingCategory = await Category.find({ slug });
    if (existingCategory.length > 0) {
      return res
        .status(400)
        .json({ message: "Category with this slug already exists." });
    }
    const newCategory = new Category({ name, slug });
    await newCategory.save();
    res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default AddCategory;
