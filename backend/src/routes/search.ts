import express, { Request, Response } from "express"
import { RecipeModel, Ingredient, Recipe } from "../models"

const router = express.Router()

const allIngredients = ["flour", "sugar", "salt", "butter", "milk"]

const escapeRegex = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

interface Query {
  name?: RegExp;
  ingredients?: Ingredient[];
}

const recipeCleaner = (recipe: Recipe): { id: string; name: string } => {
  const { id, name } = recipe
  return { id, name }
}

router.post("/api/search", async (req: Request, res: Response): Promise<void> => {
  const { name, ingredients } = req.body
  const query: Query = {}
  if (name) {
    query.name = new RegExp(escapeRegex(name), "gi")
  }
  if (ingredients && ingredients.length > 0) {
    const whatsLeft = allIngredients.filter((ing) => !ingredients.includes(ing))
    query["ingredients.name"] = { $nin: whatsLeft }

    const foundRecipes = await RecipeModel.find(query)
    const builtRecipes = foundRecipes.map(recipeCleaner)

    res.send(builtRecipes)
  } else {
    // No ingredients passed, so send no recipes.
    res.send([])
  }
})

export { router as searchRouter }
