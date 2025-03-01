import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllRecipes); // ✅ Get all recipes
router.get("/:id", getRecipeById); // ✅ Get recipe details
router.post("/", authMiddleware, createRecipe); // ✅ Create recipe
router.put("/:id", authMiddleware, updateRecipe); // ✅ Edit recipe
router.delete("/:id", authMiddleware, deleteRecipe); // ✅ Delete recipe

export default router;
