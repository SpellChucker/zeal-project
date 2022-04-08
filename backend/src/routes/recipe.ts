import express, { NextFunction, Request, Response } from "express"
import { NotFoundError } from "../errors"
import { RecipeModel } from "../models"

const router = express.Router();

router.get("/api/recipe/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const recipe = await RecipeModel.findById(req.params.id)

    if (!recipe) {
      throw new NotFoundError();
    }

    res.send(recipe)
  } catch (err) {
    next(new NotFoundError())
  }
});

export { router as recipeRouter }
