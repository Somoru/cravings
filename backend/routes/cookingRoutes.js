import express from "express";
import { getCookingSteps } from "../controllers/cookingController.js";

const router = express.Router();

router.get("/:recipeId/steps", getCookingSteps);

export default router;
