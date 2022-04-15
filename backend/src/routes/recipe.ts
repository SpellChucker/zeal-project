import express, { Request, Response } from "express"
import { NotFoundError } from "../errors"
import { RecipeModel } from "../models"
import 'express-async-errors'

const router = express.Router()

router.get("/api/recipe/:id", async (req: Request, res: Response): Promise<void> => {
  const recipe = await RecipeModel.findById(req.params.id)

  if (!recipe) {
    throw new NotFoundError()
  }

  res.send(recipe)
})

export { router as recipeRouter }
