import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// ✅ Add Recipe to Favorites
export const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    res.json({ message: "Recipe added to favorites", savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error saving recipe", error });
  }
};

// ✅ Get Favorite Recipes
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("savedRecipes");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved recipes", error });
  }
};

// ✅ Remove from Favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ message: "Recipe removed from favorites", savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error removing recipe", error });
  }
};
