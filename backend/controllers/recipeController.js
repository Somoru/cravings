import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
  try {
    const { title, image, ingredients, steps, prepTime, cookTime, servings, category } = req.body;
    const newRecipe = new Recipe({
      title, image, ingredients, steps, prepTime, cookTime, servings, category,
      author: req.user.id,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
};

// ✅ Get All Recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().select("title image category prepTime servings"); // Fetch specific fields for performance
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};


export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
};


// ✅ Update Recipe
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to edit this recipe" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Error updating recipe", error: error.message });
  }
};

// ✅ Delete Recipe
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
};
