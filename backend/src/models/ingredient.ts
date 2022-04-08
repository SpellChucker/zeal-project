import { Schema } from "mongoose"

export interface Ingredient {
  name: string
  unit: string
  amount: number
}

export const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  // Cleans up the weird mongodb schema.
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})
