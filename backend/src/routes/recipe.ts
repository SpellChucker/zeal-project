import { Request, Response, NextFunction } from "express"
import { RecipeModel } from "../models";

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recipe = await RecipeModel.findById(req.params.id)
  res.send(recipe)
}
