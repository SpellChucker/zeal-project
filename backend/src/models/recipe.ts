import { Document, Schema, Model, model } from "mongoose"
import { Ingredient, IngredientSchema } from "./ingredient"

export interface Recipe extends Document {
  name: string;
  instructions: string;
  ingredients: Ingredient[];
}

const RecipeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  ingredients: [IngredientSchema],
}, {
  // Cleans up the weird mongodb schema.
  toJSON: {
    transform(doc, ret): void {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

export const RecipeModel = model<Recipe, Model<Recipe>>("Recipe", RecipeSchema)
