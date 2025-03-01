import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // URL of the uploaded image
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  category: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Only logged-in users can add recipes
});

export default mongoose.model("Recipe", RecipeSchema);
