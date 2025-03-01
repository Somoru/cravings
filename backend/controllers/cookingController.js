import Recipe from "../models/Recipe.js";

// ✅ Get Step-by-Step Instructions
export const getCookingSteps = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json({ steps: recipe.steps });
  } catch (error) {
    res.status(500).json({ message: "Error fetching steps", error });
  }
};
