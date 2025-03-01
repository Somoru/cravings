import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addToFavorites, getFavorites, removeFromFavorites } from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/:recipeId", authMiddleware, addToFavorites);
router.get("/", authMiddleware, getFavorites);
router.delete("/:recipeId", authMiddleware, removeFromFavorites);

export default router;
